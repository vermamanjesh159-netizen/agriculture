from database import SessionLocal
import models
from passlib.context import CryptContext
import datetime

db = SessionLocal()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 1. Seed Admin User
if db.query(models.User).count() == 0:
    admin = models.User(
        full_name="Admin User",
        email="admin@agrifeed.com",
        hashed_password=pwd_context.hash("admin123"),
        is_admin=True
    )
    db.add(admin)
    print("Admin user seeded.")

# 2. Seed Products (String Categories)
if db.query(models.Product).count() == 0:
    products = [
        models.Product(name="Premium Cattle Feed", category="Concentrates", price=1200.0, stock_quantity=50, brand="AgriGrow", attributes={"protein": "20%"}),
        models.Product(name="Organic Alfalfa Hay", category="Roughages", price=850.0, stock_quantity=100, brand="GreenField", attributes={"moisture": "12%"}),
        models.Product(name="Vitamin Mineral Premix", category="Supplements", price=450.0, stock_quantity=200, brand="VitaNutri", attributes={"dosage": "10g/day"}),
        models.Product(name="High-Protein Shrimp Feed", category="Aqua Feed", price=2500.0, stock_quantity=30, brand="AquaGrow", attributes={"crude_protein": "40%"})
    ]
    db.add_all(products)
    print("Products seeded.")

db.commit()
db.close()
