# IELTS Mock Mini - Backend

Bu loyiha **IELTS Mock Mini** platformasining backend qismi bo‘lib, foydalanuvchilarga IELTS testlarini onlayn topshirish imkonini beradi. Backend **Node.js** va **Express.js** asosida ishlab chiqilgan va **MongoDB** bilan bog‘langan. Deploy Render platformasida amalga oshirilgan.

## 🌐 Live Link

- **Backend:** [Render Link](https://ielts-mock-backend-b2je.onrender.com)

## 🛠 Technologies Used

- **Node.js** – Server platformasi  
- **Express.js** – REST API yaratish uchun  
- **MongoDB** – Ma’lumotlar bazasi  
- **Mongoose** – MongoDB bilan ishlash uchun ORM  
- **CORS** – Cross-origin requests uchun  
- **dotenv** – Muhit o‘zgaruvchilarini o‘qish uchun  

## 📂 Features

- ✅ Admin panel orqali savol CRUD (qo‘shish, o‘qish, tahrirlash, o‘chirish)  
- ✅ Testni boshlash  
- ✅ Tasodifiy savollar  
- ✅ Foydalanuvchi javoblarini tekshirish va yakuniy natija hisoblash  

## 📌 API Endpoints

**Admin**  
- POST `/api/questions` — Savol qo‘shish  
- GET `/api/questions` — Barcha savollarni olish  
- PUT `/api/questions/:id` — Savolni tahrirlash  
- DELETE `/api/questions/:id` — Savolni o‘chirish  

**User**  
- GET `/api/test` — Tasodifiy test savollarini olish  
- POST `/api/test/result` — Test javoblarini yuborish va natija olish  

## 🔗 Environment Variables

Backend ishga tushishi uchun `.env` faylida quyidagi o‘zgaruvchilar bo‘lishi kerak:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=4000
