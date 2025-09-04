# Skincare Store

**Author:** Septania Nopa Hafidzsyah  
**GitHub Repo:** [https://github.com/SeptaniaSep/Skincare_store](https://github.com/SeptaniaSep/Skincare_store)

---

## Deskripsi Project

Skincare Store adalah aplikasi **full-stack** yang terdiri dari REST API dan user interface. Aplikasi ini memungkinkan pengguna untuk:

- Membuat akun (sign up) dengan nama, email, dan jenis kelamin
- Login menggunakan akun yang telah dibuat
- Mengakses profile pengguna dengan autentikasi JWT
- Mengelola produk (CRUD: Create, Read, Update, Delete) dengan REST API yang aman
- Menjalankan session di frontend untuk kemudahan penggunaan

Aplikasi ini menggunakan stack berikut:

- **Backend:** Node.js + Express.js  
- **Frontend:** React.js (Vite)  
- **Database:** PostgreSQL  
- **Autentikasi:** JWT (JSON Web Token)

---

## Fitur

1. **User Authentication**
   - Sign Up (Create account)
   - Login (menghasilkan JWT)
   - Mendapatkan profile dengan header Authorization token

2. **CRUD Produk**
   - Create, Read, Update, Delete produk
   - Endpoint membutuhkan JWT pada header
   - Response berbentuk JSON

3. **Frontend**
   - Login dan Sign Up form
   - Halaman profile user
   - Halaman list produk dan form CRUD produk
   - Session management untuk menyimpan token login

---

## Instalasi & Setup

1. Clone repo

```bash
git clone https://github.com/SeptaniaSep/Skincare_store.git
cd Skincare_store

2. Backend setup
cd backend
npm install
Buat file .env di folder backend:

3. Buat file .env di folder backend:
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/skincare_store
JWT_SECRET=your_jwt_secret_key

4. Jalankan server Backend
npm run dev

5. Frontend setup
cd frontend
npm install
npm run dev

6. Dokumentasi REST API
Base URL
http://localhost:3000/api

**Endpoints User**
Method	Endpoint	Deskripsi	Header	Body
POST	/auth/register	Membuat akun baru	-	{ name, email, gender, password }
POST	/auth/login	Login user	-	{ email, password }
GET	/users/profile	Mengambil data profile	Authorization: Bearer <token>	-

**Endpoints Produk**
Method	Endpoint	Deskripsi	Header	Body
POST	/products	Menambah produk baru	Authorization: Bearer <token>	{ name, price, stock }
GET	/products	Mendapatkan semua produk	Authorization: Bearer <token>	-
GET	/products/:id	Mendapatkan produk spesifik	Authorization: Bearer <token>	-
PATCH	/products/:id	Mengupdate produk	Authorization: Bearer <token>	{ name?, price?, stock? }
DELETE	/products/:id	Menghapus produk	Authorization: Bearer <token>	-

7. Struktur Folder
Skincare_store/
├─ backend/
│  ├─ controllers/
│  ├─ routes/
│  ├─ services/
│  ├─ prisma/
│  ├─ app.ts
│  └─ .env
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ api/
│  │  └─ App.tsx
│  └─ package.json
└─ README.md
