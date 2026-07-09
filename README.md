# 🛍️ Loom-Apparel - Full-Stack E-Commerce Platform

[![Node.js](https://badgen.net)](https://nodejs.org)
[![Express.js](https://badgen.net)](https://expressjs.com)
[![MongoDB](https://badgen.net)](https://mongodb.com)
[![JWT](https://badgen.net)](https://jwt.io)


A robust, production-ready full-stack e-commerce web application built from scratch. This project was developed to master enterprise-level industry standards, MVC architecture, secure authentication patterns, and scalable data modeling.

---

## 🎯 Project Purpose & Architectural Goals

Unlike basic tutorial applications, this platform was built from the ground up to mimic a real-world enterprise codebase. 

* **Industry Standards:** Implementing strict separation of concerns using the MVC design pattern.
* **Security First:** Protecting user data with production-grade encryption and tokenization.
* **Session & State Management:** Utilizing server-side sessions and flash messages for seamless user feedback.
* **Asset Pipelines:** Handling multipart form data and file streams for automated product image hosting.

---

## ✨ Core Features

### 👤 User Experience
* **Secure Auth:** Registration and login powered by `bcrypt` hashing and `JSON Web Tokens (JWT)`.
* **State Preservation:** Middleware-driven `express-session` keeps items saved in the user's journey.
* **Persistent Cart:** Fully reactive shopping cart with automated total cost calculations.
* **Interactive Checkout:** Structured billing summary page detailing product breakdowns before final order confirmation.
* **Order History:** Dedicated portal to view chronological summaries of all successfully completed orders.

### 🛡️ Admin Infrastructure
* **Privileged Dashboard:** Restricted access portal built exclusively for store administrators.
* **Full CRUD Catalog:** Ability to dynamically upload new apparel lines with image files via `multer`.
* **Data Integrity:** Cascading deletes through `mongoose` models to prevent orphaned database references.

---

## 🏗️ Technical Stack & Ecosystem

| Layer | Technologies Used |
| :--- | :--- |
| **Backend Core** | `Node.js`, `Express.js` |
| **Database & ORM** | `MongoDB`, `Mongoose` |
| **Templating Engine** | `EJS (Embedded JavaScript)` |
| **Security & Auth** | `bcrypt`, `jsonwebtoken (JWT)`, `express-session` |
| **File Handling** | `multer` (Multipart Form Uploads) |
| **UX & Feedback** | `connect-flash` (Session-based alerts) |
| **Environment Control**| `dotenv`, `nodemon` |

---

## 📂 Project Directory Structure

```text
├── config/             # Database connection & third-party setup
├── controllers/        # Business logic & request handling
├── middlewares/        # JWT validation, Session checks, & Route guards
├── models/             # Mongoose Schemas (User, Product, Order, Cart)
├── public/             # Static assets (CSS, Client JS, Uploaded Images)
├── routes/             # Express Router pathways (Auth, Admin, Shop)
├── views/              # EJS dynamic interface templates
├── .env.example        # Blueprint template for environment configurations
├── app.js              # Application entry point & middleware pipeline
└── package.json        # Dependencies & script configurations
```

---

## 🚀 Local Installation & Setup

Follow these steps to replicate the development environment locally.

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB** installed and running on your system.

### 2. Clone and Install Dependencies
```bash
git clone https://github.com
cd https://github.com/SiddharthMathura/loom-apparel-ecommerce.git
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and populate it with your credentials:
```env
SECRET_KEY=$2b$10$WtiSGVhAQyWz22Xj6w00zoRKPbHENGFlDzzTDyPROrOmsUaacr7ncjolqxQq6MrXGA33bRXy
EXPRESS_SESSION_SECRET=PbHENGFlDzzTDyXGA33bRXy$2b$10$
```

### 4. Execute the Application
Run the boot script configured with explicit debugging strings and local runtime environments:
```bash
NODE_ENV=development PORT=3000 DEBUG=development:* npx nodemon app.js
```
Once executed, navigate to `http://localhost:3000` in your web browser.

---

## 💡 Note for Reviewers
*This system bypasses an active payment gateway provider (e.g., Razorpay) by design. The focus remains heavily targeted on architectural cleanliness, data routing, backend request pipelines, and database state accuracy.*
