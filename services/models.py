from sqlalchemy import Column, Integer, String, Float, JSON, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True) 
    price = Column(Float)
    stock_quantity = Column(Integer, default=0)
    brand = Column(String)
    image_url = Column(String, nullable=True)
    attributes = Column(JSON) 
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    customer_email = Column(String)
    items = Column(JSON) 
    subtotal = Column(Float)
    shipping_charges = Column(Float, default=50.0)
    tax = Column(Float)
    total_amount = Column(Float) # This is the Grand Total
    shipping_address = Column(JSON) 
    payment_status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    delivery = relationship("Delivery", back_populates="order", uselist=False)

class Delivery(Base):
    __tablename__ = "deliveries"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    status = Column(String, default="Confirmed") 
    estimated_delivery_date = Column(DateTime)
    current_step = Column(Integer, default=1) 
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    order = relationship("Order", back_populates="delivery")
