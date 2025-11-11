# Secure Web Application Deployment & Server Administration

**Live URL:** [https://ics-project.viscerealplate.me](https://ics-project.viscerealplate.me)

---

## 🚀 Project Overview

This document outlines the server administration and secure deployment process for the "Bridge Africa" web application. The primary focus of this project is the infrastructure setup, asynchronous team collaboration, and the implementation of security best practices.

The "Bridge Africa" application, a platform for connecting startups and investors, serves as the payload for this infrastructure project. This README details the team roles, workflow, and technical steps taken to deploy the application securely and efficiently.

## 🧑‍💻 Team & Asynchronous Workflow

This project was managed using an asynchronous workflow, allowing team members to work on their own schedules with minimal synchronous "handoff" meetings.

Here is the breakdown of team roles and responsibilities:

---

## Nathan Githinji
### Tasks

- Create user group
- DNS and Domain Configuration
- Firewall Configuration (UFW)
  
### Explanation of each task
### 1. Create user group
In order to work on the same server, I created a user group. 
```bash
sudo groupadd server-admin-group
```

I then created new accounts for each member of the team.
```bash
sudo adduser brown-wangeci
sudo adduser sharlet
sudo adduser deborah
```

I added all users to the `server-admin-group`
```bash
sudo usermod -aG server-admin-group brown-wangeci
sudo usermod -aG server-admin-group sharlet
sudo usermod -aG server-admin-group deborah
```

---

## Sharlet Kirui
### Tasks
- Project Management
- Application Security
- Documentation

### Explanation

### 1. Project Management

a. **Created Private GitHub Repository**: Set up the private repo for the project.

b. **Managed Team Access**: Invited all three of your teammates to the repository as collaborators.

c. **Pushed Initial Code**: Uploaded the project's starting codebase to the repository.

### 2. Application Security

a. **Fixed Backend Hashing**: Edited the backend code to securely handle passwords.

b. **Implemented `bcrypt.hash()`** in the signup/register functions to store a secure hash of the user's password instead of plain text.

c. **Implemented `bcrypt.compare()`** in the login function to securely check the user's password against the stored hash.

d. **Fixed Frontend Validation**: Edited the frontend (HTML/React) forms to improve data integrity and security.

e. Added the required attribute to all form fields.

f. Set `type="email"` on email fields for browser-level validation.

g. Set `minLength={8}` on password fields to enforce a **minimum password length.**

h. **Committed Security Fixes**: Committed all your security improvements and pushed them to the GitHub repository.

### 3. Documentation

a. **Helped writing the Project README**: Created the `README.md` file, explaining the project.

---

## Deborah Kaburu
### Tasks
- Implementing the SSL Certificate

### Explanation
### 1. Implementing the SSL Certificate
For this part of the project, I was responsible for implementing the SSL certificate to secure our domain `ics-project.viscerealplate.me` . I connected to the team’s VPS through SSH and used **Certbot** with **Nginx** to request and install a free SSL certificate from **Let’s Encrypt**. Once the certificate was issued, it was automatically configured on the server, enabling encrypted HTTPS connections for the site.

![SSL Certifacate configuration](https://github.com/user-attachments/assets/a9dbf2f1-6012-4e0e-b5b5-c1a42e5758e9)

The process ensured that all communication between users and the server is **encrypted** and **authenticated**, protecting data from interception and tampering. Certbot also set up automatic renewal, meaning the certificate will update itself before it expires. In the end, our domain successfully runs over HTTPS, verified by the browser’s padlock icon, demonstrating secure and professional web deployment.

<img width="1919" height="952" alt="image" src="https://github.com/user-attachments/assets/b3c37511-bbff-4ec7-b595-eb9d4955c064" />

---

## Brown Wangeci
**Tasks**
-  Installing Prerequisites
-  Cloning the Project from GitHub
-  Frontend (React) Build & Deployment
-  Backend (Node/Express) Setup
-  Pulling New Code & Redeploying
-  Testing

### Explanation
### 1. Installing Prerequisites
Node.js for backend & build, Git for version control, and Nginx for serving and proxying requests.

```bash
sudo apt install nodejs npm git nginx -y
```

### 2. Cloning the Project from GitHub
Fetched the project file

```bash
cd /var/www
sudo git clone https://github.com/Sharlet-Kirui/ICS-Project-I.git ics-project.viscerealplate.me
```

### 3. Frontend (React) Build & Deployment
Build the proiject locally

```bash
cd frontend
npm install
npm run build
```

Then copied the build to the server

```bash
scp -r ./build brown-wangeci@<server-ip>:/var/www/ics-project.viscerealplate.me/ICS-Project-I/frontend
```

**Nginx Configuration**

```bash
sudo nano /etc/nginx/sites-available/ics-project.viscerealplate.me

server {
    listen 80;
    server_name ics-project.viscerealplate.me;

    root /var/www/ics-project.viscerealplate.me/ICS-Project-I/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Then created a shortlink to the 'repository' and reloaded `Nginx` with the new configurations

```bash
sudo ln -s /etc/nginx/sites-available/ics-project.viscerealplate.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
This was to serve React frontend through Nginx and route API requests to the backend.

### 4. Backend (Node/Express) Setup
Ran the following commands to setup the backend in the server.

```bash
cd /var/www/ics-project.viscerealplate.me/ICS-Project-I/backend
npm install
sudo npm install -g pm2
pm2 start npm --name "ics-backend" -- start
pm2 save
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u brown-wangeci --hp /home/brown-wangeci
```

PM2 ensures the backend runs continuously and restarts after server reboot.

### 5. Pulling New Code & Redeploying
For backend updates

```bash
cd /var/www/ics-project.viscerealplate.me/ICS-Project-I
git pull origin main
cd backend
npm install
pm2 restart ics-backend
```

For frontend updates:

```bash
npm run build   # on local machine
scp -r ./build brown-wangeci@<207.154.233.235>:/var/www/ics-project.viscerealplate.me/ICS-Project-I/frontend
```

### 6. Testing

Access the deployed site via browser [https://ics-project.viscerealplate.me](https://ics-project.viscerealplate.me) and confirm frontend and API connectivity.

### Summary of Key Tools

- Ubuntu Server: Hosting environment
- Nginx: Reverse proxy and static file server
- Node.js + Express: Backend runtime and API
- React: Frontend framework
- PM2: Process manager for Node.js backend
- GitHub: Version control
- Digital Ocean: Cloud hosting infrastructure

---

## 🔧 Server Administration & Deployment Guide

The following steps outline the manual server administration and deployment process used for this project.

### 1. Server Setup (Infrastructure)
1.  Provision a cloud server (e.g., DigitalOcean, AWS) with **Ubuntu 22.04**.
2.  Log in via SSH and update the system:
    ```bash
    sudo apt update && sudo apt upgrade
    ```
3.  Install Nginx (web server) and Git (version control):
    ```bash
    sudo apt install nginx git
    ```
4.  Install and configure the **Uncomplicated Firewall (UFW)**:
    ```bash
    sudo apt install ufw
    sudo ufw allow ssh  # Or 22/tcp (CRITICAL: Do this first)
    sudo ufw allow http # Or 80/tcp
    sudo ufw allow https # Or 443/tcp
    sudo ufw enable
    ```

### 2. DNS Configuration
1.  Purchase a domain name (e.g., from Namecheap).
2.  In the registrar's DNS settings, create two records:
    * **'A' Record:**
        * **Host:** `@`
        * **Value:** The server's Public IP Address.
    * **'CNAME' Record:**
        * **Host:** `www`
        * **Value:** `@` (or your domain name)

### 3. SSL & Nginx Configuration
1.  Create a free account on **ZeroSSL.com**.
2.  Start a "New Certificate" for your domain (e.g., `yourproject.com` and `www.yourproject.com`).
3.  Choose **"HTTP File Upload"** for verification. ZeroSSL provides a file to upload to a specific folder (e.g., `/var/www/html/.well-known/acme-challenge/`).
4.  Use SSH to create the file and folder on the server as instructed.
5.  Verify the domain in the ZeroSSL dashboard and download the certificate files.
6.  Upload the certificate files to the server (e.g., to `/etc/ssl/certs/`).
7.  Configure the Nginx server block (e.g., in `/etc/nginx/sites-available/yourproject`) to use the SSL certificates and redirect all HTTP traffic to HTTPS.
8.  Restart Nginx: `sudo systemctl restart nginx`

### 4. Application Deployment
1.  Log into the server via SSH.
2.  Clone the secured application code from the private GitHub repository into the Nginx web root:
    ```bash
    git clone your_repo_link /var/www/yourproject
    ```
3.  Install application dependencies, build the React frontend (`npm run build`), and start the Node.js backend (e.g., using a process manager like `pm2`).
4.  Update this README with the final live URL.

---

## 🛡️ Security Measures Implemented

* **Firewall (UFW):** The server is protected by UFW, only allowing traffic on essential ports (SSH, HTTP, HTTPS).
* **SSL/TLS (HTTPS):** A certificate from ZeroSSL is installed, and Nginx is configured to enforce HTTPS-only connections, encrypting all traffic.
* **Password Hashing (bcrypt):** The application code was modified to use `bcrypt` for hashing all user passwords, preventing them from being stored in plaintext.
* **Input Validation:** Client-side HTML5 validation (e.g., `required`, `type="email"`, `minlength="8"`) was added to forms to improve data integrity and user experience.

---

## 💻 Technology Stacks

### Deployment & Server Stack
* **Cloud Provider:** DigitalOcean, AWS, or Azure
* **Operating System:** Ubuntu 22.04
* **Web Server:** Nginx
* **Firewall:** UFW (Uncomplicated Firewall)
* **SSL Certificate:** ZeroSSL
* **Version Control:** Git & GitHub

### Application Stack (Bridge Africa)
* **Frontend:** React.js
* **Backend:** Node.js & Express.js
* **Database:** MongoDB (via MongoDB Atlas)
* **Design:** Figma

---

## 📄 About the Deployed Application: "Bridge Africa"

"Bridge Africa" is the web application deployed in this project. It is a platform designed to connect African startups with local and global investors.

### Key Application Features
* **Secure Registration:** Multi-step signup for both startups and investors.
* **Admin Verification:** A mandatory admin approval process ensures all users are vetted.
* **Role-Based Dashboards:** Separate, tailored dashboards for startups, investors, and admins.
* **Discovery & Filtering:** Users can browse and filter potential connections based on industry, funding range, etc.
* **Connection System:** A "Show Interest" feature allows users to initiate contact and manage their network.

### Application Screenshots

| Login Page | Admin Verification Dashboard |
| :---: | :---: |
|  |  |

| Investor Dashboard (Discovering Startups) | Startup Network Page (Managing Connections) |
| :---: | :---: |
|  |  |

---

## 👥 Project Team & Authors

### Deployment & Server Admin Team
* **Person 1:** Cloud & Infrastructure Lead
* **Person 2:** DNS & Domain Specialist
* **Person 3:** SSL & Web Server Configuration
* **Person 4:** Application Security & Project Manager

### Original "Bridge Africa" Application Authors
This deployment project was made possible by the original application code developed by:
* Kaburu Deborah Wanjiru (166531)
* Kirui Sharlet Jerono (160588)
* **Supervisor:** Tiberius Tabulu
````
