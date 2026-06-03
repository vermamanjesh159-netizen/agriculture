from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: str = None

class UserCreate(UserBase):
    password: str
    register_as_admin: bool = False

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserSchema(UserBase):
    id: int
    is_admin: bool
    created_at: datetime
    class Config:
        from_attributes = True

# Product Schemas
class ProductBase(BaseModel):
    name: str
    category: str
    price: float
    stock_quantity: int
    brand: str
    image_url: Optional[str] = None
    attributes: Optional[Dict[str, Any]] = None

class ProductCreate(ProductBase):
    pass

class ProductSchema(ProductBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Order Schemas
class ShippingAddressSchema(BaseModel):
    address_line: str
    city: str
    state: str
    pincode: str
    phone: str

class OrderItemSchema(BaseModel):
    product_id: int
    name: str
    quantity: int
    unit_price: float

class OrderCreate(BaseModel):
    customer_name: str
    customer_email: str
    items: List[OrderItemSchema]
    shipping_address: ShippingAddressSchema

# Delivery Schema
class DeliverySchema(BaseModel):
    id: int
    status: str
    estimated_delivery_date: datetime
    current_step: int
    class Config:
        from_attributes = True

class OrderSchema(BaseModel):
    id: int
    customer_email: str
    customer_name: Optional[str] = None
    items: List[Dict[str, Any]]
    subtotal: Optional[float] = 0.0
    shipping_charges: Optional[float] = 50.0
    tax: Optional[float] = 0.0
    total_amount: float
    shipping_address: Dict[str, Any]
    payment_status: str
    created_at: datetime
    delivery: Optional[DeliverySchema] = None
    class Config:
        from_attributes = True

# Payment Schemas
class PaymentIntentCreate(BaseModel):
    order_id: int

class PaymentIntentResponse(BaseModel):
    client_secret: str
    payment_intent_id: str


# Health Check Schemas
class DatabaseHealthSchema(BaseModel):
    status: str
    latency_ms: Optional[float] = None
    error: Optional[str] = None

class StripeHealthSchema(BaseModel):
    status: str
    latency_ms: Optional[float] = None
    error: Optional[str] = None

class SystemResourceSchema(BaseModel):
    cpu_cores: Optional[int] = None
    cpu_usage_percent: Optional[float] = None
    load_averages: Optional[List[float]] = None
    memory_total_bytes: Optional[int] = None
    memory_available_bytes: Optional[int] = None
    memory_used_bytes: Optional[int] = None
    memory_used_percent: Optional[float] = None
    disk_total_bytes: Optional[int] = None
    disk_free_bytes: Optional[int] = None
    disk_used_bytes: Optional[int] = None
    disk_used_percent: Optional[float] = None
    os_name: str
    os_release: str
    python_version: str

class DependencyHealthSchema(BaseModel):
    status: str
    version: Optional[str] = None

class HealthCheckResponse(BaseModel):
    status: str
    timestamp: str
    uptime_seconds: float
    components: Dict[str, Any]
    system: SystemResourceSchema
    dependencies: Dict[str, DependencyHealthSchema]

