from database import SessionLocal
import models

db = SessionLocal()
products = db.query(models.Product).all()
print(f"Total products: {len(products)}")
for p in products:
    print(f"ID: {p.id}, Name: {p.name}, Quantity: {p.quantity}")
db.close()
