from model.expense_database import get_all_expenses, add_expense, update_expense, delete_expense, get_today_expense, get_expense_for_date

#add expense

def add_expense_service(title, amount, category, date, desc):
    print(title, amount, category, date, desc)
    saved = add_expense(title, amount, category, date, desc)
    return saved

#update expense

def update_expense_service(id, title, amount, category, date, desc = "None"):
    
    return update_expense(id, title, amount, category, desc, date )

#delete expense

def delete_expense_service(id):
    return delete_expense(id)

#getTodayExpense expense

def get_today_expense_service():
    return get_today_expense()

#getDatesExpenses expense

def get_expense_for_date_service(date):
    return get_expense_for_date(date)

def get_all_expenses_service():
    return get_all_expenses()
