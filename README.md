# 🔐 Cybersecurity CTF Challenge Hub

![GitHub last commit](https://img.shields.io/github/last-commit/Joyfernandas/ctf-challenges)
![GitHub repo size](https://img.shields.io/github/repo-size/Joyfernandas/ctf-challenges)
![License](https://img.shields.io/badge/license-MIT-blue)

A collection of interactive Capture The Flag (CTF) challenges designed to teach web application security concepts through hands-on practice. Perfect for cybersecurity enthusiasts and bug bounty hunters!

## 🚀 Features

- **Three Difficulty Levels**:
  - 🟢 Easy: Hidden Flag Challenge (Source code inspection)
  - 🟠 Medium: SQL Injection Challenge (Authentication bypass)
  - 🔴 Hard: JWT Bypass Challenge (Token forgery)

- **Interactive Learning**:
  - Realistic vulnerable applications
  - Progressive hints system
  - Detailed solution explanations
  - Visual feedback on exploit success

- **Educational Focus**:
  - OWASP Top 10 vulnerabilities
  - Secure coding principles
  - Ethical hacking techniques

## 🛠️ Challenge Structure

/ctf-challenges
│
├── /web
│ ├── /easy-hidden-flag # Source code analysis
│ ├── /medium-sqli-login # SQL injection
│ └── /hard-jwt-bypass # Token forgery
│
├── /assets
│ ├── /css # Global styles
│ └── /js # Challenge scripts
│
├── README.md # This file
└── LICENSE # MIT License


## 🎯 Getting Started

### Prerequisites
- Modern web browser (Chrome/Firefox recommended)
- Basic understanding of web technologies (HTML/JS)
- Optional: Burp Suite or browser dev tools

### Installation
```bash
git clone https://github.com/Joyfernandas/ctf-challenges.git
cd ctf-challenges

#Running Challenges

Open any challenge's index.html in your browser
Read the instructions carefully
Attempt to find/flags or bypass security
Use hints if needed (click "Show Hint" buttons)

#🧩 Challenge Details

1. Easy: Hidden Flag Challenge
Objective: Find the hidden flag in webpage source

Skills Tested:

Source code inspection

Basic HTML knowledge

Solution Path: Right-click → View Page Source

2. Medium: SQL Injection Challenge
Objective: Bypass login authentication

Skills Tested:

SQL injection techniques

Input manipulation

Boolean-based attacks

Solution: ' OR '1'='1 as username

3. Hard: JWT Bypass Challenge
Objective: Forge admin JWT token

Skills Tested:

JWT structure analysis

Signature validation bypass

Token tampering techniques

Solution: Change algorithm to "none" and role to "admin"

📚 Learning Resources
OWASP Web Security Testing Guide

PortSwigger Web Security Academy

JWT.io Debugger

SQL Injection Cheat Sheet

🤝 Contributing
Found a bug or have an idea for a new challenge? Contributions welcome!

Fork the repository

Create your feature branch (git checkout -b feature/new-challenge)

Commit your changes (git commit -am 'Add new challenge')

Push to the branch (git push origin feature/new-challenge)

Open a Pull Request

📜 License
Distributed under the MIT License. See LICENSE for more information.

Project Link: https://github.com/Joyfernandas/ctf-challenges


