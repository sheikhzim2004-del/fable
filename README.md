# 📚 Fable — Ebook Sharing Platform

**Fable** is a full-stack MERN ebook sharing platform that connects readers, writers, and collectors. Readers can browse, purchase, and read original ebooks, writers can publish and manage their work after a one-time verification payment, and admins oversee the entire ecosystem.

## 🔗 Live Site
[fable-ebook sharing platform](https://fable-hazel.vercel.app/) 

## 🎯 Purpose
Traditional ebook access is often limited to bookstores or libraries. Fable democratizes access to literature by giving emerging writers a platform to reach a global audience, while giving readers a secure and modern reading experience — built to demonstrate role-based access, payment integration, and interactive analytics using the MERN stack.

## ✨ Key Features
- 🔐 JWT authentication with Email/Password and Google Login <!--TODO: authentication kora thaklew JWT implement korar baki-->
- 👥 Role-based dashboards for **User**, **Writer**, and **Admin**
- 📖 Browse ebooks with search, genre/price filters, sorting & pagination
- 💳 Stripe-powered ebook purchase & writer verification payment
- 🖼️ Cover image & profile picture uploads via imgBB
- 🔖 Bookmark/Wishlist system for saved ebooks 
- 📊 Admin analytics dashboard with sales & genre charts
- 🎬 Smooth Framer Motion animations (hero fade-in, staggered card reveals)
- 🌗 Dark mode by default with light mode toggle (persisted) 
- 📱 Fully responsive design across mobile, tablet, and desktop
- 🚨 Custom 404 page, error boundaries, and toast notifications
- ⏳ Global loading spinner & skeleton loaders
<!-- TODO: (payment intrigration) writers can publish and manage their work after a one-time verification payment -->

## 🛠️ Tech Stack & Packages

**Client**
- Next.js
- Tailwind CSS v4
- HeroUI
- Framer Motion
- Gravity UI Icons
- Axios <!-- TODO: for implement (ata use kore shohoje JWT token attach kora jay)>
- React Hook Form
- next-themes

**Server**
- Express.js
- MongoDB / Mongoose
- JSON Web Token (jsonwebtoken) <!-- TODO: -->
- Stripe
- bcrypt <!-- TODO: -->
- cors
- dotenv

## 🔑 Admin Credentials
- **Email:** admin@fable.com
- **Password:** Admin@123

## ⚙️ Environment Variables

**Client (`.env.local`)**
```
BETTER_AUTH_SECRET=
NEXT_PUBLIC_BETTER_AUTH_URL=
BETTER_AUTH_SECRET=
AUTH_DB_NAME=
MONGODB_URI=
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_IMGBB_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

**Server (`.env`)**
```
PORT=
MONGODB_URI=
CLIENT_URI=

<!-- DB_USER=
DB_PASS=
JWT_SECRET=
STRIPE_SECRET_KEY= -->

```

## 🚀 Getting Started

```bash
# Client
git clone https://github.com/sheikhzim2004-del/fable.git

cd fable
npm install
npm run dev

# Server
git clone https://github.com/sheikhzim2004-del/fable-server.git

cd fable-server
npm install
npm run dev
```

## 📂 Repositories
- **Client:** [GitHub Link](https://github.com/sheikhzim2004-del/fable)
- **Server:** [GitHub Link](https://github.com/sheikhzim2004-del/fable-server)