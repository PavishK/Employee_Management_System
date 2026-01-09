# 👨‍💼 Employee Management System (EMS)

A full-stack **Employee Management System (EMS)** built using **React.js, Tailwind CSS, Spring Boot, and MySQL**.  
This application helps organizations efficiently **manage employees** with complete **CRUD operations**, authentication, and a modern UI.

🌐 **Live Demo**:  
👉 https://employee-management-system-client-abji.onrender.com/home  
⏳ *Note: Since the backend is hosted on a free server, initial load may take **2–3 minutes**.*

---

## ✨ Key Highlights

- 🔐 Google Authentication using **Firebase**
- 👤 Complete Employee CRUD (Create, Read, Update, Delete)
- 🔍 Search & manage employees easily
- 📊 Clean dashboard UI
- 🎨 Responsive design with **Tailwind CSS**
- ⚡ Fast REST APIs with **Spring Boot**
- 🗄️ Secure data storage using **MySQL**

---

## 🚀 Tech Stack

### 🖥️ Frontend (`ems_frontend`)
- ⚛️ React.js
- 🎨 Tailwind CSS
- 📦 Axios
- 🔐 Firebase (Google Sign-In)

### ⚙️ Backend (`ems_backend`)
- ☕ Java 17+
- 🚀 Spring Boot
- 📦 Spring Data JPA
- 🗄️ MySQL

---

## 📂 Project Structure

```

ems/
│── ems_frontend/     # React + Tailwind UI
│── ems_backend/      # Spring Boot + MySQL API
└── README.md         # Documentation

````

---

## 🌍 Live Application

- **Frontend**: Render
- **Backend**: Render (cold start enabled)
- **Database**: MySQL

⚠️ First request may take **2–3 minutes** to wake up the backend.

---

## 📸 Screenshots

### 🏠 Home / Login (Google Authentication)
![Home](https://github.com/user-attachments/assets/3764d953-efcf-46c2-a866-5f6a6daf4361)

---

### 📊 Dashboard – Manage Employees
![Dashboard](https://github.com/user-attachments/assets/27797a9e-1689-4d77-ac18-539c2f768fd3)

---

### ➕ Add Employee
![Add Employee](https://github.com/user-attachments/assets/4e635e7f-d256-4b90-91a5-843061ef6363)

---

### 👤 Profile View & Logout
![Profile](https://github.com/user-attachments/assets/24c90a52-6f4c-4f1d-a4ad-bf18e899f8e8)

---

## ⚙️ Setup Instructions

### 🔹 Clone the Repository
```bash
git clone https://github.com/PavishK/Employee_Management_System
cd ems
````

---

## 🖥️ Frontend Setup (`ems_frontend`)

```bash
cd ems_frontend
npm install
npm run dev
```

🔗 Open: [http://localhost:5173](http://localhost:5173)

### 🔐 Environment Variables (`.env`)

```env
VITE_SERVER_API="http://localhost:8080"
VITE_API_KEY="YOUR_FIREBASE_API_KEY"
```

⚠️ **Security Note**:
Firebase API keys shown in screenshots are **restricted & regenerated**.
Always keep real credentials **hidden in `.env` files**.

---

## ⚙️ Backend Setup (`ems_backend`)

```bash
cd ems_backend
```

### 🗄️ MySQL Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.application.name=ems_backend
spring.datasource.url=jdbc:mysql://localhost:3306/ems
spring.datasource.username=your_username
spring.datasource.password=your_password

client.url=http://localhost:5173

spring.jpa.show-sql=true
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### ▶️ Run Backend

```bash
./mvnw spring-boot:run
```

🔗 Backend runs on: [http://localhost:8080](http://localhost:8080)

---

## 🔗 Frontend ↔ Backend Connection

Frontend communicates with backend using REST APIs.

Optional proxy (`ems_frontend/package.json`):

```json
"proxy": "http://localhost:8080"
```

---

## 📦 Features

* 👤 Add / Edit / Delete Employees
* 🔍 Search & Filter Employees
* 🔐 Google Login (Firebase)
* 📊 Dashboard View
* 🚪 Secure Logout
* 🎨 Responsive UI
* 🗄️ Persistent MySQL Storage

---

## 🛠️ Build for Production

### Frontend

```bash
cd ems_frontend
npm run build
```

### Backend

```bash
cd ems_backend
mvn clean package
```

---

## 🤝 Contribution

Contributions are welcome 🚀

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## 📜 License

This project is licensed under **MY License**.

---

## 👨‍💻 Author

**Pavish K**
💼 Full-Stack Developer
🚀 React | Spring Boot | MySQL | Firebase

⭐ If you like this project, don’t forget to **star the repo!**
Just tell me 👍
```
