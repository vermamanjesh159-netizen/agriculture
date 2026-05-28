from database import SessionLocal
import models
from api.routes.auth import get_password_hash

db = SessionLocal()

admin_email = "admin@agrifeed.com"
existing_admin = db.query(models.User).filter(models.User.email == admin_email).first()

if not existing_admin:
    admin_user = models.User(
        full_name="Admin User",
        email=admin_email,
        hashed_password=get_password_hash("admin123"),
        is_admin=True
    )
    db.add(admin_user)
    db.commit()
    print(f"Admin user created: {admin_email} / admin123")
else:
    print("Admin user already exists.")

db.close()
