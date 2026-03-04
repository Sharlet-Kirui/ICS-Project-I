# Bridge Africa: Startup-Investor Matchmaking Platform

**🚀 Project: Bridge Africa Deployment** 

**Live URL:** [https://ics-project.viscerealplate.me](https://ics-project.viscerealplate.me)

---

## 📌 Project Overview
Africa has witnessed a rapid surge in entrepreneurial activity, but this growth is often hindered by the absence of a unified, accessible platform to connect local startups with potential investors. Traditional connection methods like networking events, pitch competitions, and social media are fragmented and inefficient.

**Bridge Africa** bridges this gap by providing a scalable, secure, and user-centered web platform. It serves as a digital marketplace to increase startup visibility, streamline investor discovery, and help close the funding gap in Africa's entrepreneurial ecosystem.

## 🛠️ Technologies Used
This project follows a classic Three-Tier Web Application Architecture:
* **Frontend (Presentation Tier):** React.js
* **Backend (Application Tier):** Node.js and Express.js
* **Database (Data Tier):** MongoDB Atlas (NoSQL)

## ✨ Key Features
* **Secure Role-Based Access:** Dedicated registration and login workflows for Startups, Investors, and System Administrators.
* **Verification & Moderation:** An administrative dashboard allows platform managers to review submitted documents and approve or reject user accounts to maintain platform integrity.
* **Advanced Filtering Engine:** Investors can search and filter startup profiles based on specific criteria like industry, geographical focus, and investment range.
* **Connection & Networking:** Startups and investors can express mutual interest, triggering real-time dashboard updates and automated email notifications to facilitate partnerships.
* **Comprehensive Dashboards:** Users have access to personalized dashboards to manage profiles, track pending/sent invitations, and view accepted connections. 

## 🛡️ Core Security Measures Implemented
* **Network Level:** UFW Firewall restricts access strictly to essential ports.
* **Transit Level:** Enforced HTTPS encrypted connections via automated SSL certificates (Let's Encrypt / Certbot).
* **Storage Level:** Cryptographic password hashing implemented via `bcrypt` to prevent plaintext credential storage.
* **Application Level:** Client-side form validations ensure data integrity before submission.

## 💻 Technology Stack Highlights
* **Application (Payload):** React.js, Node.js, Express.js, MongoDB Atlas
* **Server & Infrastructure:** DigitalOcean, Ubuntu 22.04, Nginx, PM2, Git
* **Security:** Let's Encrypt / Certbot, UFW, bcrypt
