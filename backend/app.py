from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model.expense_database import init_db
from controllers.expense_controller import router

# Initialize DB
init_db()

app = FastAPI(title="Mini Expense Tracker API")

# CORS setup
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)
