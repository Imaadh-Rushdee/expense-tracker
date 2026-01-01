from fastapi import APIRouter
from pydantic import BaseModel
from services.expense_service import *

router = APIRouter()

# Pydantic model for request validation
class Expense(BaseModel):
    title: str
    amount: float
    category: str
    date: str
    desc: str = "None"

# Home route
@router.get("/")
def home():
    return {"message": "Hello User!! :)"}

# Add expense
@router.post("/expenses")
def add_expense_route(expense: Expense):
    new_expense = add_expense_service(
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
        desc=expense.desc
    )
    print(expense)
    return {"message": "Expense added", "expense": new_expense}

# Get today's expenses
@router.get("/expenses/today")
def get_today_expenses_route():
    return get_today_expense_service()

@router.get("/expenses/all")
def get_all_expenses_route():
    return get_all_expenses_service()
    
# Get expenses for a specific date
@router.get("/expenses/{expense_date}")
def get_expenses_by_date_route(expense_date: str):
    print(get_expense_for_date_service(expense_date))
    return get_expense_for_date_service(expense_date)

# Update expense
@router.put("/expenses/{id}")
def update_expense_route(id: int, expense: Expense):
    updated_expense = update_expense_service(
        id=id,
        title=expense.title,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
        desc=expense.desc
    )
    return {"message": "Expense updated", "expense": updated_expense}

# Delete expense
@router.delete("/expenses/{id}")
def delete_expense_route(id: int):
    delete_expense_service(id)
    return {"message": "Expense deleted"}
