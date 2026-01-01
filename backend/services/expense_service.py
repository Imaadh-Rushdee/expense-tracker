from model.expense_database import *
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

def get_total_for_current_month(month): 
    return get_total_for_month(month)

def get_total_for_current_day(day): 
    return get_total_for_day(day)