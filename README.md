# 🚜 AgriFeed Marketplace & Portal

AgriFeed is a modern, full-stack digital marketplace and management portal tailored for the agricultural sector. The platform enables farmers, agricultural businesses, and suppliers to browse, purchase, and manage premium agricultural feeds, supplements, and specialized nutrition solutions.

---

## 🏗️ Architecture Overview

The project is structured as a monorepo consisting of two primary services, orchestrated together using Docker:

```mermaid
graph TD
    User([User Browser]) -->|HTTP / React| Frontend[Next.js Frontend: Port 3001]
    Frontend -->|REST APIs| Backend[FastAPI Backend: Port 8000]
    Backend -->|SQLAlchemy| DB[(PostgreSQL Database: Port 5435)]
    Backend -->|Payment Intent| Stripe[Stripe API]
```

### Key Components:
1. **Frontend (`/frontend`)**: A high-performance web application built with **Next.js 15 (React)**. Features responsive catalog browsing, customer profiles, shopping cart, custom Stripe payment integration, and a conversational AI assistant.
2. **Backend (`/services`)**: A modular API service built using **FastAPI (Python)**. Deals with product catalogs, authentication via JWT tokens, order management, and secure Stripe checkouts.
3. **Database**: A containerized **PostgreSQL 15** database managed via SQLAlchemy models and Alembic migrations.

---

## 🌟 Core Features

- **🛒 Interactive Product Catalog**: Browse specialized feeds categorized into:
  - **Concentrates**: High-energy, scientific animal formulas.
  - **Roughages**: Premium fiber and natural forage.
  - **Supplements**: Essential vitamins, mineral mixes, and health boosters.
  - **Aqua Feed**: Balanced nutritional products designed for fish and aquatic life.
- **💳 Secure Checkout with Stripe**: Full integration with Stripe (Test environment) supporting checkout sessions, webhook events, order placement, and payment verification.
- **💬 Smart AI Chat Assistant**: An interactive floating chat interface that helps users query the product catalog, check shipping options, get direct recommendations, and receive real-time answers.
- **🔐 User & Admin Portals**: JWT-based secure signup, login, and profile editing. Administrators gain access to specific views for managing products, categories, and viewing global sales.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Next.js 15, Custom Vanilla CSS, Lucide Icons, Stripe JS SDK |
| **Backend** | FastAPI, Python 3.11+, SQLAlchemy, Alembic, Uvicorn, Jose JWT |
| **Database** | PostgreSQL 15 |
| **DevOps & Tooling** | Docker, Docker Compose, python-dotenv, Stripe Webhooks |

---

## 🚀 Getting Started

### Prerequisites
- [Docker & Docker Compose](https://docs.docker.com/get-docker/) (Recommended)
- **OR** Python 3.10+ & Node.js 18+ (for local development)
- A Stripe Developer Account (for API credentials)

### Environment Configuration
Create a `.env` file in the root directory (based on the provided `.env` template):

```env
# Stripe Keys
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Database Connection
DATABASE_URL=postgresql+psycopg2://postgres:admin123@localhost:5432/agriculture

# URLs
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🐳 Running with Docker (Recommended)

To spin up the entire application stack including the database, run:

```bash
docker-compose up --build
```

- **Frontend**: Accessible at [http://localhost:3001](http://localhost:3001)
- **FastAPI Backend**: Accessible at [http://localhost:8000](http://localhost:8000)
- **PostgreSQL Database**: Port `5435` exposed on the host machine.

---

## 💻 Local Development Setup

If you prefer to run the services individually without Docker:

### 1. Database Setup
Ensure you have a PostgreSQL server running locally, create a database named `agriculture`, and update the `DATABASE_URL` in `.env`.

### 2. Backend (FastAPI Services)
Navigate to the services directory, set up a virtual environment, and install dependencies:

```bash
cd services
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Seeding Initial Data
Prepare the database schema and populate it with initial products and categories:
```bash
python seed_data.py
```

#### Running the Server
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Frontend (Next.js Application)
Open a new terminal window, navigate to the frontend directory, install npm packages, and run the dev server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at [http://localhost:3000](http://localhost:3000).

---

## 🔌 API Documentation Summarized

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Registers a new user account | No |
| `/auth/login` | `POST` | Authenticates user & returns JWT Token | No |
| `/products` | `GET` | Retrieves all catalog products | No |
| `/products` | `POST` | Creates a new product (Admin only) | Yes |
| `/orders` | `GET` | Retrieves order history for current user | Yes |
| `/payments/create-checkout-session` | `POST` | Generates a Stripe checkout session | Yes |

---

## 🛡️ Git Guidelines

To maintain a clean codebase, please ensure:
1. **Never commit `.env` or sensitive credentials.** Keep them locked in your local `.env`.
2. Do not commit build artifacts (`.next/`, `node_modules/`, `venv/`, `__pycache__/`). These are safely ignored by the updated root `.gitignore`.
3. Check status before pushing using `git status`.
