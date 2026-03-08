# 📝 Notes Management API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

A secure, robust RESTful API for managing personal notes. Built with Express, TypeScript, PostgreSQL, and Prisma. It natively implements JWT role-based access control (RBAC), input validation via Zod, pagination, note search, and is fully documented interactively with Swagger (OpenAPI 3.0).

---

## 🚀 Features

- **🔐 Authentication & Authorization:** Secure user registration, login, and token refresh logic using `bcrypt` and JWTs.
- **🛡️ Role-Based Access Control (RBAC):** Distinct `USER` and `ADMIN` roles. Admins have absolute system access.
- **📝 Notes CRUD:** Authenticated users can create, read, update, and delete exclusively *their own* notes.
- **🔍 Search & Pagination:** First-class support for page-based reading and title-substring note filtering.
- **✅ Strict Input Validation:** Strongly-typed API payloads verified at runtime using `Zod` to maintain data fidelity.
- **🚨 Unified Error Handling:** Intercepted architectural errors transformed into standardized, consistent JSON responses.
- **📚 Interactive Documentation:** Zero-configuration Swagger UI to interactively test endpoints locally.
- **🐳 Docker Native:** Preconfigured `Dockerfile` with multi-stage logic for effortless containerization.

---

## 🛠️ Tech Stack & Architecture

- **Runtime Environment:** Node.js (v18+)
- **Framework:** Express.js (v5)
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL (Cloud Ready)
- **Validation:** Zod
- **Documentation:** SwaggerUI (YAML)

### Directory Structure
```text
/src
├── controllers      # Core business logic processing incoming HTTP requests.
├── middlewares      # Zod validation interception, JWT Auth, and Error handling.
├── routes           # Express routing definitions mapping paths to controllers.
└── utils            # Singletons like Prisma client initializations.
```

---

## ⚙️ Getting Started 

Follow these steps to quickly test and run the project locally.

### Prerequisites
Make sure you have Node Package Manager (`npm`) and Node.js (`v18+`) installed on your machine.

### 1. Installation

Clone the repository and install all node packages:

```bash
git clone <your-repo-link>
cd notes-api
npm install
```

### 2. Environment Configuration

Copy the example environment securely (or create a `.env` file at the root).

```env
PORT=3000
DATABASE_URL="file:./dev.db"
JWT_SECRET="supersecret_jwt_key_here"
```

### 3. Initialize the Database

Make sure your `.env` `DATABASE_URL` is pointing directly at your local or remote PostgreSQL instance. Then push the schema:

```bash
npx prisma db push
npx prisma generate
```

### 4. Run the Dev Server

Spin up the local backend server via nodemon for hot-reloading:

```bash
npm run dev
```

The server should output: `Server is running on port 3000`.

---

## 📖 API Documentation & Testing

Once the server is running, the fastest way to interact with the endpoints is via the built-in Swagger dashboard.

Navigate to **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**.

Here, you can:
1. Hit `POST /api/auth/register` to create a user.
2. Hit `POST /api/auth/login` to secure a returning raw JWT Token.
3. Click **Authorize** at the top right of the dashboard and insert that token to test protected routes.

---

## ☁️ Free Cloud Deployment (Render + Supabase)

Because this API uses **PostgreSQL**, it is perfectly primed for free serverless deployments.

### 1. Database (Supabase / Neon)
1. Go to **Supabase** or **Neon.tech** and create a free PostgreSQL database.
2. Copy the connection string.

### 2. Hosting (Render / Railway)
1. Push this repository to GitHub.
2. Go to **Render.com** and create a new Web Service linked to your GitHub repository.
3. **Build Command:** `npm install && npx prisma generate && npm run build`
4. **Start Command:** `npm start`
5. **Environment Variables:** Add your `DATABASE_URL` and your secret `JWT_SECRET` in the Render dashboard.

Once Render successfully deploys, anyone in the world can hit your API via the URL they provide (e.g., `https://your-api.onrender.com/api-docs`)!

---

## 🐳 Docker Local Deployment

To build and run this API completely isolated in a container:

```bash
# Build the Docker image natively
docker build -t notes-api .

# Run the container
docker run -p 3000:3000 notes-api
```
*(Note: Because the database used is SQLite, state will exclusively persist inside the running container footprint unless bound to an external host volume.)*

---

*(Screenshots to be added below by the Author)*
