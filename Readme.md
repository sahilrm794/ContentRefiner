# 📘 Content Refiner – Automated SEO Article Enhancement Platform

**Content Refiner** is a full-stack web application that automates the process of improving blog articles using top-ranking reference content and Large Language Models (LLMs). It scrapes articles, refines them using AI, stores both original and updated versions, and presents them in a clean, professional frontend UI.

## 🚀 Live Demo

**🔗 Frontend (Live):** [https://content-refiner.vercel.app/](https://content-refiner.vercel.app/)

**What you can do:**
* View original articles.
* View AI-generated updated articles.
* Check reference sources used for rewriting.

---

## 🧩 Project Overview

### Phase 1 – Article Scraping & CRUD
* Scraped the 5 oldest articles from: [https://beyondchats.com/blogs/](https://beyondchats.com/blogs/)
* Stored scraped articles in **MongoDB**.
* Built full **CRUD APIs** using **Express**.

### Phase 2 – Automation & AI Rewrite
* Automated **Node.js script** that:
    * Fetches articles from the database.
    * Searches article titles on Google.
    * Scrapes top 2 ranking blog/article links.
    * Rewrites the original article using **LLM (GROQ API)**.
    * Stores updated articles with reference links.

### Phase 3 – Frontend UI
* **React-based UI** to display:
    * Original articles
    * Updated (AI-refined) articles
    * Reference URLs
* Deployed on **Vercel**.

---

## 🏗️ Architecture / Data Flow Diagram

```text
┌────────────────────┐
│ BeyondChats Blogs  │
│ (Source Website)   │
└─────────┬──────────┘
          │ Scraping
          ▼
┌────────────────────────┐
│ Backend (Node + Express│
│ Article CRUD APIs      │
└─────────┬──────────────┘
          │ Store
          ▼
┌────────────────────────┐
│ MongoDB Database       │
│ - Articles             │
│ - UpdatedArticles      │
└─────────┬──────────────┘
          │ Fetch
          ▼
┌────────────────────────────────┐
│ Phase-2 Automation Script      │
│ - Google Search                │
│ - Content Scraping             │
│ - LLM Rewrite (GROQ API)       │
└─────────┬──────────────────────┘
          │ Save
          ▼
┌────────────────────────┐
│ Updated Articles       │
│ with References        │
└─────────┬──────────────┘
          │ API
          ▼
┌────────────────────────┐
│ Frontend (React)       │
│ Hosted on Vercel       │
└────────────────────────┘
```
# 🛠️ Tech Stack

### Frontend
* **React (Vite)**
* **Axios**
* **Tailwind CSS**
* *Deployed on Vercel*

### Backend
* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* *Deployed on Render*

### Automation & AI
* **Axios + Cheerio** (Scraping)
* **Google Search Scraping**
* **GROQ LLM API** (Article Rewriting)

---

## 📂 Project Structure

```text
root/
│
├── server/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── phase-2-automation/
│   │   ├── services/
│   │   └── index.js
│   ├── utils/
│   ├── configs/
│   └── index.js
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```
## ⚙️ Local Setup Instructions

Follow these steps to run the project locally.

### 1️⃣ Clone the Repository
```bash
git clone <your-github-repo-url>
cd content-refiner
```
### 2️⃣ Backend Setup
Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```
Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
CORS_ORIGIN=http://localhost:5173
ARTICLES_API=http://localhost:5000/api/articles
NODE_ENV=development
```
### Start the backend server:

```bash
npm start
The backend runs on: http://localhost:5000
```
## 3️⃣ Run Automation Script (Phase 2)

To run the scraping and AI rewriting automation, execute the following commands from the **server/** directory:

```bash
# Scrape original articles from BeyondChats
node src/scraper/scrapeBeyondChat.js

# Run Phase 2 Automation (Google Search → Scrape References → Rewrite via LLM)
node src/phase-2-automation/index.js
```
### 🔄 Automation Workflow

This automation workflow performs the following steps:

- Fetches stored articles from MongoDB  
- Searches article titles on Google  
- Scrapes top-ranking reference articles  
- Rewrites content using an LLM  
- Stores the updated article with reference citations back into MongoDB  

---

## 4️⃣ Frontend Setup

Navigate to the `client/` directory and install dependencies:

```bash
cd client
npm install
```
### 🧩 Environment Configuration

Create a `.env` file inside the `client/` directory and add the following:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```
This variable is used by the frontend to communicate with the backend API.

▶ Run the Frontend Application

Start the frontend development server by running:

npm run dev


Once the server starts successfully, the frontend will be available at:

👉 http://localhost:5173

✨ Key Features

✅ Automated SEO article refinement
✅ AI-powered article rewriting
✅ Reference citation support
✅ Clean and responsive UI
✅ Production-style backend automation
✅ Fully deployed full-stack project

✅ Assignment Requirements Checklist

✔ Local setup instructions
✔ Architecture / data flow diagram
✔ Live frontend link
✔ Original & updated article visibility

👨‍💻 Author

Sahil Rajesh Mustilwar
B.Tech – Information Technology
IIEST Shibpur