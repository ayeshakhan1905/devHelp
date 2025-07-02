# 💬 Doubt Resolver

A full-stack web application where students can raise doubts and mentors can resolve them through a collaborative dashboard.

---

## ✨ Features

- 🔐 Role-based Authentication (Student & Mentor)
- 📝 Students can:
  - Create, update, delete doubts
  - Attach images/files to doubts
- 👨‍🏫 Mentors can:
  - View all doubts
  - Toggle doubt status (open/resolved)
  - Add comments to doubts
- 💬 Real-time-like threaded comment system
- 📂 File upload support
- 🛡️ Protected routes using JWT & secure cookies
- 📱 Fully responsive UI
- 🔔 Toast notifications for user feedback

---

## 🛠️ Tech Stack

**Frontend**  
- React.js  
- Redux Toolkit  
- React Router  
- Axios  
- Tailwind CSS  
- React Toastify  

**Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Auth  
- Multer (for file upload)  
- CORS, Cookie Parser  

---

## 🚀 Getting Started

### 📦 Clone the repository

```bash
git clone https://github.com/your-username/doubt-resolver.git
cd doubt-resolver
```

### ⚙️ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Run the backend:

```bash
npm run dev
```

### 💻 Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🗂️ Project Structure (Brief)

```
/client
  └── src
      ├── pages
      ├── features
      ├── components
      ├── context
      ├── services
      └── utils

/server
  ├── config
  ├── controllers
  ├── routes
  ├── models
  ├── utils
  └── middlewares
```

---

## 🙋‍♀️ Author

Made with 💙 by **Ayesha Khan**  
[GitHub Profile](https://github.com/ayeshakhan1905)

---

## 📃 License

This project is licensed under the **MIT License**.
