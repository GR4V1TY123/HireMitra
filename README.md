# HireMitra

HireMitra is a job-finding platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js) with **Tailwind CSS**, **Vite**, and **JWT authentication**. It helps recruiters and job seekers connect seamlessly.

## 🌐 Live Demo
[HireMitra on Render](https://hiremitra.onrender.com/)

## 🚀 Features
- 🏢 **Recruiter Dashboard** - Post and manage job listings.
- 👩‍💻 **Job Seeker Dashboard** - Browse and apply for jobs.
- 🔒 **JWT Authentication** - Secure user login system.
- 📡 **Cloudinary Integration** - For profile and job post images.
- 📌 **Responsive UI** - Styled with Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JWT (JSON Web Token)
- **Deployment**: Render

## 📦 Installation
### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/hiremitra.git
cd hiremitra
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```sh
MONGO_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=your_cloudinary_url
```
Run the backend server:
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd frontend/vite-project
npm install
npm run dev
```

## 🏗 Deployment
The project is deployed on **Render**. To deploy manually:
1. Push the project to GitHub.
2. Create a Render web service for the backend.
3. Deploy the frontend using Netlify/Vercel.

## 🎯 Future Plans
I built HireMitra to practice the **MERN stack** and am looking forward to adding more features as I explore more about web development. Some potential features include:
- 📩 **Real-time chat using Socket.io**
- 📄 **Resume parsing and AI job recommendations**
- 🎥 **Video interviews and scheduling**
- 📊 **Analytics for recruiters and job seekers**

## 🤝 Contributing
Pull requests are welcome! Open an issue if you find a bug or want a feature added.

## 📜 License
MIT License. Free to use and modify!

