import sqlite3
from datetime import date

DB_NAME = "expenses.db"

# --- Initialize DB ---
def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            desc TEXT,
            amount REAL NOT NULL,
            category TEXT,
            date TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


# --- Add Expense ---
def add_expense(title, amount, category, date_str, desc="None"):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        'INSERT INTO expenses (title, amount, category, date, desc) VALUES (?, ?, ?, ?, ?)',
        (title, amount, category, date_str, desc)
    )
    conn.commit()
    conn.close()
    return {"title": title, "desc": desc, "amount": amount, "category": category, "date": date_str}


# --- Update Expense ---
def update_expense(id, title, desc, amount, category, date_str):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        'UPDATE expenses SET title=?, desc=?, amount=?, category=?, date=? WHERE id=?',
        (title, desc, amount, category, date_str, id)
    )
    conn.commit()
    conn.close()
    return {"id": id, "title": title, "desc": desc, "amount": amount, "category": category, "date": date_str}


# --- Delete Expense ---
def delete_expense(id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM expenses WHERE id=?', (id,))
    conn.commit()
    conn.close()


# --- Get Today's Expenses ---
def get_today_expense():
    today = date.today().isoformat()
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses WHERE date=?', (today,))
    expenses = cursor.fetchall()
    conn.close()
    return expenses


# --- Get Expenses for Specific Date ---
def get_expense_for_date(expense_date):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses WHERE date=?', (expense_date,))
    rows = cursor.fetchall()
    conn.close()

    expenses = [
        {
            "id": row[0],
            "title": row[1],
            "category": row[2],
            "amount": row[3],
            "desc": row[4],
            "date": row[5],
        }
        for row in rows
    ]
    return expenses


# --- Get All Expenses ---
def get_all_expenses():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM expenses")
    rows = cursor.fetchall()
    conn.close()

    expenses_list = [
        {"id": row[0], "title": row[1], "category": row[2], "amount": row[3], "desc": row[4], "date": row[5]}
        for row in rows
    ]
    return expenses_list


# --- Get total for a specific day ---
def get_total_for_day(day):
    """
    day: str in 'YYYY-MM-DD'
    Returns: float
    """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT SUM(amount) FROM expenses WHERE date=?", (day,))
    total = cursor.fetchone()[0]
    conn.close()
    return float(total) if total else 0.0


# --- Get total for a specific month ---
def get_total_for_month(month):
    """
    month: str in 'YYYY-MM' (e.g., '2026-01')
    Returns: float
    """
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    # SQLite substring: get first 7 chars from date (YYYY-MM)
    cursor.execute("SELECT SUM(amount) FROM expenses WHERE substr(date,1,7)=?", (month,))
    total = cursor.fetchone()[0]
    conn.close()
    return float(total) if total else 0.0
