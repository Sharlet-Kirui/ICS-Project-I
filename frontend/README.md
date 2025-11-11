# Secure Web Application Deployment & Server Administration

**Live URL:** `https://your-project-domain.com` (Replace with final URL)

---

## 🚀 Project Overview

This document outlines the server administration and secure deployment process for the "Bridge Africa" web application. The primary focus of this project is the infrastructure setup, asynchronous team collaboration, and the implementation of security best practices.

The "Bridge Africa" application, a platform for connecting startups and investors, serves as the payload for this infrastructure project. This README details the team roles, workflow, and technical steps taken to deploy the application securely and efficiently.

## 🧑‍💻 Team & Asynchronous Workflow

This project was managed using an asynchronous workflow, allowing team members to work on their own schedules with minimal synchronous "handoff" meetings.

Here is the breakdown of team roles and responsibilities:

* **Person 1: Cloud & Infrastructure Lead**
    * **Role:** Build the "house" everyone will use.
    * **Tasks:** Provisioned the cloud server (Ubuntu 22.04), installed base software (Nginx, Git), and configured the UFW firewall.
    * **Deliverables:** Server Public IP Address, SSH login details.

* **Person 2: DNS & Domain Specialist**
    * **Role:** Buy the "address" and point it to the "house."
    * **Tasks:** Registered the project domain and configured the 'A' and 'CNAME' DNS records to point to the server's IP.
    * **Deliverables:** The final domain name.

* **Person 3: SSL & Web Server Configuration**
    * **Role:** Secure the "house" and open the "front door."
    * **Tasks:** Generated a free SSL certificate from ZeroSSL using HTTP File Upload verification, installed the certificate on the server, and configured Nginx to enforce HTTPS.
    * **Deliverables:** Confirmation of a working `https://` URL.

* **Person 4: Application Security & Project Manager**
    * **Role:** Fix the application code and document the project.
    * **Tasks:** Created the GitHub repository, invited collaborators, and pushed the initial code. Locally fixed security vulnerabilities by implementing `bcrypt` password hashing and adding HTML form validation. Wrote and maintained this README.md file.
    * **Final Task:** Deployed the secured application to the server by cloning the GitHub repository into the Nginx web root.

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