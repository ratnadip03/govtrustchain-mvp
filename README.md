# 🚀 GovTrustChain  
### 🔗 *Trust, Verified — Not Assumed.*

<p align="center">
  <img src="https://img.shields.io/badge/Blockchain-Inspired-blueviolet?style=for-the-badge&logo=ethereum" />
  <img src="https://img.shields.io/badge/Firebase-Deployed-orange?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/Hackathon-MVP-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Status-Live-green?style=for-the-badge" />
</p>

<p align="center">
  <b>GovTrustChain</b> is a blockchain-inspired governance platform that introduces a  
  <b>Government Trust Score</b> to bring transparency, accountability, and citizen participation into public services.
</p>

---

## 🌍 Problem Statement

Public trust in government services is often weakened due to:

❌ Lack of transparency  
❌ Delays without accountability  
❌ Manipulated or unverifiable reports  
❌ No measurable way to evaluate institutional performance  

Today, citizens are expected to **trust blindly**, without the ability to **verify independently**.

---

## 💡 GovTrustChain – Full Vision (Actual Solution)

GovTrustChain converts **public trust into a measurable, verifiable score**.

### 🔮 In the complete solution:
- 🧾 Every government project/service is registered on a **blockchain ledger**
- 🔐 Actions and milestones are enforced via **smart contracts**
- 📊 Trust Scores update automatically based on:
  - Timely completion  
  - Budget compliance  
  - Verified citizen feedback  
  - Audit outcomes  
- 👥 Citizens can **verify records**, not just read reports  
- 🛡️ Personal data stays private (only hashes & proofs stored)

> 🧠 *Transparency becomes system-driven, not promise-driven.*

---

## 🧪 What This MVP Implements (Current Stage)

This repository contains a **fully deployed, Round-1 MVP** that validates the **core workflow** of GovTrustChain.

### ✅ Implemented Features

### 🌐 Public Transparency Dashboard
- Publicly accessible list of government projects/services
- Displays:
  - Project name  
  - Responsible department  
  - 📊 **Live Trust Score (0–100)**  
  - Progress bar  
  - Current status (On-time / Delayed)

---

### 🔐 Secure Citizen Login
- Google Sign-In using Firebase Authentication
- No passwords stored
- Protected routes for authenticated users

---

### 👤 Citizen Dashboard
- Personalized dashboard after login
- View submitted feedback
- Interact with public services

---

### 💬 Citizen Feedback System
- Submit feedback for any listed project
- Optional image metadata upload
- Feedback directly influences the trust score

---

### 📈 Real-Time Trust Score Logic
- Trust scores update instantly based on actions
- Smooth animated visual feedback for score changes

---

### 🛠️ Admin Demo Panel (Hidden Route)
- Demo-only admin controls:
  - ✔️ Mark milestone complete (+5)
  - ❌ Mark project delayed (−10)
- Demonstrates automated accountability logic

---

### 🎨 UI & Experience
- Clean, professional government-style UI
- Smooth micro-animations using Framer Motion
- Fully responsive design (mobile + desktop)

---

## ⚙️ Technology Stack

### 🖥️ Frontend
- ⚛️ **React 18 (Vite)** – Modern UI framework  
- 🎨 **Tailwind CSS** – Utility-first styling  
- 🎞️ **Framer Motion** – Smooth animations  

### ☁️ Backend & Platform
- 🔐 **Firebase Authentication** – Google Sign-In  
- 📦 **Firebase Firestore** – Real-time database  
- 🚀 **Firebase Hosting** – Live deployment  

### 🔗 Planned (Full Solution)
- ⛓️ **Polygon / Ethereum Blockchain**
- 📜 **Solidity Smart Contracts**
- 🗂️ **IPFS** for decentralized proof storage

---

## 🧠 Trust Score Logic (MVP)

| Action | Impact |
|------|--------|
| Initial Score | 80 |
| Milestone Completed | +5 |
| Project Delayed | −10 |
| Verified Feedback | +5 |
| Score Range | 0–100 |

> ⚠️ Blockchain logic is **simulated** in the MVP for rapid validation.

---

## 🗂️ Firestore Collections

### `projects`
- `name`
- `department`
- `trustScore`
- `status`
- `lastUpdated`

### `feedback`
- `userId`
- `userName`
- `userEmail`
- `projectId`
- `projectName`
- `feedback`
- `verified`
- `createdAt`

### `users`
- `displayName`
- `email`
- `photoURL`
- `createdAt`
- `updatedAt`

---

## 🚧 MVP Limitations (Intentional)

⚠️ Blockchain integration is simulated  
⚠️ No real document storage (metadata only)  
⚠️ Firestore uses test rules  
⚠️ Not connected to real government systems  

These are **planned upgrades**, not missing ideas.

---

## 🚀 Deployment

The MVP is deployed using **Firebase Hosting**.

```bash
npm install
npm run dev
npm run build
firebase deploy

🌐 Live Demo:
https://govtrustchain-mvp.web.app/