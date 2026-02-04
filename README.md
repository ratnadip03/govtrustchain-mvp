🚀 GovTrustChain
Trust, Verified — Not Assumed.

GovTrustChain is a blockchain-inspired governance platform that introduces a Government Trust Score to bring transparency, accountability, and citizen participation into public services.

This repository contains the Round-1 MVP, fully deployed and demo-ready, validating the core workflow of the proposed solution.

🌍 Problem Statement

Public trust in government services is often low due to:

Lack of transparency in execution

Delays and unclear accountability

Manipulated or unverifiable reports

No measurable way to assess institutional performance

Today, citizens are expected to trust systems without the ability to verify them.

💡 The GovTrustChain Vision (Full Solution)

GovTrustChain converts public trust into a measurable, verifiable score.

In the complete solution:

Every government project or service is registered on a blockchain ledger

Milestones and actions are enforced using smart contracts

Trust scores update automatically based on:

Timely completion

Budget compliance

Verified citizen feedback

Audit outcomes

Citizens can verify records instead of relying on reports

Personal data remains private; only hashes and proofs are stored

Transparency becomes system-driven, not promise-driven.

🧪 What This MVP Demonstrates (Current Implementation)

This MVP focuses on validating the core workflow and user experience of GovTrustChain.

✅ Implemented in the MVP:
🌐 Public Transparency Dashboard

Publicly visible list of government projects/services

Displays:

Project name

Responsible department

Live Trust Score (0–100)

Visual progress indicators

Current status (On-time / Delayed)

🔐 Secure Citizen Login

Google Sign-In using Firebase Authentication

No passwords stored

Protected routes for authenticated users

👤 Citizen Dashboard

Personalized dashboard after login

View submitted feedback

Interact with government services

💬 Citizen Feedback System

Submit feedback for any listed project

Optional image metadata upload

Feedback directly influences trust score

📊 Real-Time Trust Score Logic

Trust score updates instantly based on actions

Animated visual feedback for increases or drops

🛠️ Admin Demo Panel (Hidden Route)

Simulated administrative controls:

Mark milestones complete (+5)

Mark project delayed (−10)

Demonstrates automated accountability logic

🎨 Engaging UI & Animations

Smooth micro-animations using Framer Motion

Professional, government-style dashboard design

Fully responsive across devices

⚙️ Tech Stack
Frontend

React 18 (Vite) – Fast, modern UI framework

Tailwind CSS – Clean, consistent styling

Framer Motion – Smooth UI animations

Backend & Platform

Firebase Authentication – Secure Google Sign-In

Firebase Firestore – Real-time NoSQL database

Firebase Hosting – Free, fast deployment

Planned (Full Solution)

Polygon / Ethereum Blockchain

Solidity Smart Contracts

IPFS for decentralized proof storage

🧠 Trust Score Logic (MVP)
Action	Trust Score Impact
Initial score	80
Milestone completed	+5
Project delayed	−10
Verified feedback	+5
Score bounds	0–100

Note: Blockchain logic is simulated in the MVP for rapid validation.

🗂️ Firestore Data Model
projects

name (string)

department (string)

trustScore (number)

status (string)

lastUpdated (timestamp)

feedback

userId

userName

userEmail

projectId

projectName

feedback

verified

createdAt

users

displayName

email

photoURL

createdAt

updatedAt

🚧 MVP Limitations (Intentional)

⚠️ Blockchain integration is simulated
⚠️ No real document storage (metadata only)
⚠️ Firestore uses test rules for demo
⚠️ Not connected to real government systems

These are planned upgrades, not missing ideas.

🚀 Deployment

The MVP is deployed using Firebase Hosting.

npm install
npm run dev
npm run build
firebase deploy


Live URL:

https://<your-project-id>.web.app

🏁 Conclusion

GovTrustChain is not just an idea —
this MVP proves the feasibility, usability, and scalability of a trust-based governance system.

From assumptions to verification.
From promises to proof.

📜 License

This project is developed for hackathon and research demonstration purposes.