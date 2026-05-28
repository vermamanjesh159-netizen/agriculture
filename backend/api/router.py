from fastapi import APIRouter
from api.routes import products, orders, payments, auth

api_router = APIRouter()
api_router.include_router(products.router)
api_router.include_router(orders.router)
api_router.include_router(payments.router)
api_router.include_router(auth.router)
