import sqlite3
from datetime import date

DB_NAME = "expenses.db"

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

def add_expense(title, amount, category, date, desc):
    print(title, amount, category, date, desc)
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO expenses (title, amount, category, date, desc) VALUES (?, ?, ?, ?, ?)',
                   (title, amount, category, date, desc))
    conn.commit()
    conn.close()
    return {"title": title, "desc": desc, "amount": amount, "category": category, "date": date}

def update_expense(id, title, desc, amount, category, date):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('UPDATE expenses SET title=?, desc=?, amount=?, category=?, date=? WHERE id=?',
                   (title, desc, amount, category, date, id))
    conn.commit()
    conn.close()
    return {"id": id, "title": title, "desc": desc, "amount": amount, "category": category, "date": date}

def delete_expense(id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM expenses WHERE id=?', (id,))
    conn.commit()
    conn.close()

def get_today_expense():
    today = date.today().isoformat()
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses WHERE date=?', (today,))
    expenses = cursor.fetchall()
    conn.close()
    return expenses

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


def get_all_expenses():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM expenses")  # no WHERE clause
    expenses = cursor.fetchall()
    conn.close()

    # Optional: convert to dict for JSON response
    expenses_list = [
        {"id": row[0], "title": row[1], "category": row[2], "amount": row[3], "desc": row[4], "date": row[5]}
        for row in expenses
    ]
    return expenses_list
