from database import engine
from sqlalchemy import text

tables = ["shipping_addresses", "order_items", "orders", "products", "categories"]

with engine.connect() as conn:
    for table in tables:
        print(f"Dropping table {table} CASCADE...")
        conn.execute(text(f"DROP TABLE IF EXISTS {table} CASCADE"))
    conn.commit()

import models
print("Creating all tables...")
models.Base.metadata.create_all(bind=engine)
print("Tables recreated successfully!")
