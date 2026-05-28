from fastapi import APIRouter, HTTPException, Depends, File, UploadFile
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import get_db
import os
import shutil
import uuid

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[schemas.ProductSchema])
async def get_products(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Product)
    if category:
        query = query.filter(models.Product.category == category)
    return query.all()

@router.get("/categories", response_model=List[str])
async def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Product.category).distinct().all()
    return [c[0] for c in categories if c[0]]

@router.get("/{product_id}", response_model=schemas.ProductSchema)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=schemas.ProductSchema)
async def create_product(product_data: schemas.ProductCreate, db: Session = Depends(get_db)):
    new_product = models.Product(**product_data.model_dump())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@router.put("/{product_id}", response_model=schemas.ProductSchema)
async def update_product(product_id: int, product_data: schemas.ProductCreate, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    for key, value in product_data.model_dump().items():
        setattr(product, key, value)
        
    db.commit()
    db.refresh(product)
    return product

@router.post("/upload-image")
async def upload_image(file: UploadFile = File(...)):
    # Create uploads directory if not exists
    if not os.path.exists("uploads"):
        os.makedirs("uploads")
        
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join("uploads", unique_filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {"image_url": f"/uploads/{unique_filename}"}
