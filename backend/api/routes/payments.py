import stripe
import os
from fastapi import APIRouter, Depends, HTTPException, Request, Header
from sqlalchemy.orm import Session
from database import get_db
from models import Order, Product
from schemas import PaymentIntentCreate, PaymentIntentResponse
from dotenv import load_dotenv

load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")
webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/create-payment-intent", response_model=PaymentIntentResponse)
async def create_payment_intent(data: PaymentIntentCreate, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == data.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order.total_amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid order amount")

    amount = int(order.total_amount * 100)  # Convert to cents

    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency="inr", # Matching Indian market as per previous UI
            automatic_payment_methods={"enabled": True},
            metadata={
                "order_id": order.id,
                "customer_email": order.customer_email
            }
        )
        return {
            "client_secret": intent.client_secret,
            "payment_intent_id": intent.id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    payload = await request.body()
    try:
        event = stripe.Webhook.construct_event(payload, stripe_signature, webhook_secret)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        order_id = payment_intent.get('metadata', {}).get('order_id')
        if order_id:
            db = next(get_db())
            order = db.query(Order).filter(Order.id == int(order_id)).first()
            if order:
                order.payment_status = "Paid"
                db.commit()
    
    return {"status": "success"}
