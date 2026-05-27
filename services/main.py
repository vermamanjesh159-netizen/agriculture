from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

import models
from database import SessionLocal, engine
from api.router import api_router

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), "../.env"))

# Create tables
models.Base.metadata.create_all(bind=engine)

from fastapi.staticfiles import StaticFiles

app = FastAPI(title="AgriFeed Monolith API")

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Router
app.include_router(api_router)

@app.get("/health")
async def health():
    return {"status": "healthy"}
