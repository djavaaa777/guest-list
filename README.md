# Guest List 🛎️

A fullstack web application for managing hotel guest check-ins. Built with Node.js, Express, EJS, and MySQL. The app allows adding, editing, and deleting guest records with real-time updates and feedback messages.

## 🚀 Features

- View all guests in a table
- Add new guest entries with form validation
- Edit or delete existing guests
- Display status messages after each action
- RESTful routes (GET, POST, PUT, DELETE)
- Clean and responsive UI with EJS templating

## 🛠️ Tech Stack

- Node.js
- Express
- MySQL (with `mysql2`)
- EJS
- HTML5, CSS3, JavaScript (vanilla)

## 📂 Project Structure

```
guest-list/
├── index.js
├── db.js
├── package.json
├── package-lock.json
├── .gitignore
├── views/
│   └── index.ejs
├── static/
│   ├── main.css
│   ├── script.js
│   ├── icons8-delete.svg
│   ├── icons8-edit.svg
│   └── icons8-speichern-16.png
└── node_modules/ (ignored)
```

## 💻 How to Run Locally

1. Clone this repository  
2. Install dependencies:

```bash
npm install
```

3. Create a MySQL database and configure the credentials in `db.js`
4. Create the `guests` table using the following SQL:

```sql
CREATE TABLE guests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100),
  email VARCHAR(100),
  country VARCHAR(100),
  check_in DATE,
  check_out DATE,
  room_type VARCHAR(50),
  room_number INT
);
```

5. Start the app:

```bash
npm start
```

6. Visit the app in your browser:  
👉 http://localhost:3000

## 🌐 Live Demo

🔗 [https://guest-list-pb15.onrender.com](https://guest-list-pb15.onrender.com)

## 📄 License

This project is licensed under the MIT License.
