---

# Employee Management System (EMS)

A full-stack **Employee Management System (EMS)** built with **React.js, Tailwind CSS, Spring Boot, and MySQL**.
This project helps manage employees efficiently with CRUD operations (Create, Read, Update, Delete).

---

## 🚀 Tech Stack

### **Frontend (ems\_frontend)**

* ⚛️ React.js
* 🎨 Tailwind CSS
* 📦 Axios (API calls)
* 🔥 Firebase (Google signin)

### **Backend (ems\_backend)**

* ☕ Java 17+
* 🚀 Spring Boot (Spring Web, Spring Data JPA)
* 🗄️ MySQL (Database)

---

## 📂 Project Structure

```
ems/
│── ems_frontend/     # React.js + Tailwind (UI)
│── ems_backend/      # Spring Boot + MySQL (API)
└── README.md         # Documentation
```

---

## ⚙️ Setup Instructions

### 🔹 Clone the Repository

```bash
git clone https://github.com/PavishK/Employee_Management_System
cd ems
```

---

### 🔹 Frontend Setup (ems\_frontend)

1. Navigate to frontend folder:

   ```bash
   cd ems_frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```
4. Open in browser: [http://localhost:5173](http://localhost:5173)

5. Create and open .env file and past: 
   VITE_SERVER_API="http://localhost:8080"
   VITE_API_KEY="" #Firebase config/firebase.js

---

### 🔹 Backend Setup (ems\_backend)

1. Navigate to backend folder:

   ```bash
   cd ems_backend
   ```
2. Update **MySQL database credentials** in `src/main/resources/application.properties`:

   ```properties
    spring.application.name=ems_backend
    spring.datasource.url=jdbc:mysql://localhost:3306/ems
    spring.datasource.username=username
    spring.datasource.password=password
    client.url=http://localhost:5173
    spring.jpa.show-sql=true
    spring.jpa.generate-ddl=true
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   ```
3. Build & run the project:

   ```bash
   ./mvnw spring-boot:run
   ```
4. Backend will run on: [http://localhost:8080](http://localhost:8080)

---

## 🔗 Connecting Frontend & Backend

* The frontend (`ems_frontend`) calls the backend APIs.
* If needed, set proxy in `ems_frontend/package.json`:

  ```json
  "proxy": "http://localhost:8080"
  ```

---

## 📦 Features

* 👤 Employee CRUD (Add, Update, Delete, View)
* 🔍 Search & Filter employees
* 🎨 Responsive UI with Tailwind CSS
* 🗄️ Data stored in MySQL
* ⚡ Fast API with Spring Boot & JPA

---

## 📸 Screenshots (Optional)

<img width="1900" height="936" alt="image" src="https://github.com/user-attachments/assets/3764d953-efcf-46c2-a866-5f6a6daf4361" />


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

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MY License**.

---
