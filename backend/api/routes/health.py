import os
import sys
import time
import shutil
import platform
import stripe
import importlib.metadata
from typing import Dict, Any, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Response, status
import schemas
from database import SessionLocal
from sqlalchemy import text

router = APIRouter(prefix="/health", tags=["health"])

START_TIME = time.time()

# Configure Stripe API Key
stripe.api_key = os.getenv("STRIPE_API_KEY")

def get_db_health() -> Dict[str, Any]:
    db = None
    start = time.time()
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
        latency = (time.time() - start) * 1000
        return {
            "status": "healthy",
            "latency_ms": round(latency, 2),
            "error": None
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "latency_ms": None,
            "error": str(e)
        }
    finally:
        if db:
            db.close()

def get_stripe_health() -> Dict[str, Any]:
    if not stripe.api_key:
        return {
            "status": "unhealthy",
            "latency_ms": None,
            "error": "Stripe API key is not configured"
        }
    start = time.time()
    try:
        # A lightweight call to verify connectivity to Stripe
        stripe.Balance.retrieve()
        latency = (time.time() - start) * 1000
        return {
            "status": "healthy",
            "latency_ms": round(latency, 2),
            "error": None
        }
    except stripe.error.AuthenticationError as e:
        # The key is invalid, but Stripe API is reachable and responded
        latency = (time.time() - start) * 1000
        return {
            "status": "unhealthy",
            "latency_ms": round(latency, 2),
            "error": f"Stripe authentication failed: {str(e)}"
        }
    except stripe.error.APIConnectionError as e:
        # Connection to Stripe failed
        return {
            "status": "unhealthy",
            "latency_ms": None,
            "error": f"Stripe connection failed: {str(e)}"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "latency_ms": None,
            "error": str(e)
        }

def get_system_resources() -> Dict[str, Any]:
    import multiprocessing
    cpu_cores = multiprocessing.cpu_count()
    
    # CPU usage and load avg
    cpu_usage_percent = None
    load_averages = None
    try:
        load_averages = list(os.getloadavg())
        cpu_usage_percent = round((load_averages[0] / cpu_cores) * 100, 2)
    except Exception:
        pass
        
    # Memory usage
    memory_info = {
        "memory_total_bytes": None,
        "memory_available_bytes": None,
        "memory_used_bytes": None,
        "memory_used_percent": None
    }
    
    # Read /proc/meminfo on Linux
    if platform.system().lower() == "linux":
        try:
            with open('/proc/meminfo', 'r') as f:
                lines = f.readlines()
            mem_data = {}
            for line in lines:
                parts = line.split(':')
                if len(parts) == 2:
                    name = parts[0].strip()
                    val = parts[1].split()[0].strip()
                    mem_data[name] = int(val) * 1024 # Convert KB to Bytes
            
            total = mem_data.get('MemTotal', 0)
            free = mem_data.get('MemFree', 0)
            available = mem_data.get('MemAvailable', free)
            used = total - available
            used_percent = round((used / total) * 100, 2) if total > 0 else 0
            
            memory_info = {
                "memory_total_bytes": total,
                "memory_available_bytes": available,
                "memory_used_bytes": used,
                "memory_used_percent": used_percent
            }
        except Exception:
            pass

    # Disk usage
    disk_info = {
        "disk_total_bytes": None,
        "disk_free_bytes": None,
        "disk_used_bytes": None,
        "disk_used_percent": None
    }
    try:
        usage = shutil.disk_usage("/")
        disk_info = {
            "disk_total_bytes": usage.total,
            "disk_free_bytes": usage.free,
            "disk_used_bytes": usage.used,
            "disk_used_percent": round((usage.used / usage.total) * 100, 2)
        }
    except Exception:
        pass

    return {
        "cpu_cores": cpu_cores,
        "cpu_usage_percent": cpu_usage_percent,
        "load_averages": load_averages,
        **memory_info,
        **disk_info,
        "os_name": platform.system(),
        "os_release": platform.release(),
        "python_version": sys.version
    }

def get_dependencies_status() -> Dict[str, Dict[str, Any]]:
    dependencies = [
        "fastapi",
        "uvicorn",
        "sqlalchemy",
        "psycopg2-binary",
        "pydantic",
        "pydantic-settings",
        "python-dotenv",
        "stripe",
        "alembic",
        "email-validator",
        "passlib",
        "bcrypt",
        "python-jose",
        "python-multipart"
    ]
    status_map = {}
    for dep in dependencies:
        try:
            version = importlib.metadata.version(dep)
            status_map[dep] = {
                "status": "healthy",
                "version": version
            }
        except importlib.metadata.PackageNotFoundError:
            alt_name = dep
            if dep == "psycopg2-binary":
                alt_name = "psycopg2"
            elif dep == "python-jose":
                alt_name = "jose"
            
            try:
                version = importlib.metadata.version(alt_name)
                status_map[dep] = {
                    "status": "healthy",
                    "version": version
                }
            except importlib.metadata.PackageNotFoundError:
                try:
                    __import__(alt_name.replace("-", "_"))
                    status_map[dep] = {
                        "status": "healthy",
                        "version": "unknown"
                    }
                except ImportError:
                    status_map[dep] = {
                        "status": "unhealthy",
                        "version": None
                    }
    return status_map

@router.get("", response_model=schemas.HealthCheckResponse)
async def check_health(response: Response):
    db_health = get_db_health()
    stripe_health = get_stripe_health()
    sys_resources = get_system_resources()
    deps_status = get_dependencies_status()

    overall_status = "healthy"
    if db_health["status"] == "unhealthy" or stripe_health["status"] == "unhealthy":
        overall_status = "unhealthy"
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    for dep, info in deps_status.items():
        if info["status"] == "unhealthy":
            overall_status = "unhealthy"
            response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE

    return {
        "status": overall_status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": round(time.time() - START_TIME, 2),
        "components": {
            "database": db_health,
            "stripe": stripe_health
        },
        "system": sys_resources,
        "dependencies": deps_status
    }
