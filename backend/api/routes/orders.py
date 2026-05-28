from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
import os
import stripe
import models
import schemas
from database import get_db
import datetime

router = APIRouter(tags=["orders"])

stripe.api_key = os.getenv("STRIPE_API_KEY")

@router.post("/initiate-checkout")
async def initiate_checkout(order_data: schemas.OrderCreate, db: Session = Depends(get_db)):
    # Validate stock and calculate total
    total_amount = 0
    items_json = []
    for item in order_data.items:
        product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
        if not product or product.stock_quantity < item.quantity:
            raise HTTPException(status_code=400, detail=f"Stock unavailable for {item.name}")
        
        total_amount += product.price * item.quantity
        items_json.append({
            "product_id": item.product_id,
            "name": item.name,
            "quantity": item.quantity,
            "unit_price": item.unit_price,
            "remaining_stock": product.stock_quantity - item.quantity # Estimated stock after order
        })

    shipping_charges = 50.0
    tax = total_amount * 0.05
    grand_total = total_amount + shipping_charges + tax

    try:
        # 1. Create Order
        shipping_addr = order_data.shipping_address.model_dump()
        shipping_addr["customer_name"] = order_data.customer_name

        new_order = models.Order(
            customer_email=order_data.customer_email,
            items=items_json,
            subtotal=total_amount,
            shipping_charges=shipping_charges,
            tax=tax,
            total_amount=grand_total,
            shipping_address=shipping_addr,
            payment_status="Pending"
        )
        db.add(new_order)
        db.flush()

        # 2. Create Delivery (Realistic 6-day timeline)
        delivery_date = datetime.datetime.utcnow() + datetime.timedelta(days=6)
        new_delivery = models.Delivery(
            order_id=new_order.id,
            status="Confirmed",
            estimated_delivery_date=delivery_date,
            current_step=1
        )
        db.add(new_delivery)

        # 3. Update Product Stock
        for item in order_data.items:
            product = db.query(models.Product).filter(models.Product.id == item.product_id).first()
            product.stock_quantity -= item.quantity

        db.commit()
        return {"order_id": new_order.id}
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/my-orders", response_model=List[schemas.OrderSchema])
async def get_my_orders(email: str, db: Session = Depends(get_db)):
    return db.query(models.Order).filter(models.Order.customer_email == email).all()

@router.get("/orders/{order_id}", response_model=schemas.OrderSchema)
async def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
