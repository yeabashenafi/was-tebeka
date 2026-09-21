
# Was Tebeka (ዋስ ጠበቃ)

> **OSF × Andela Hackathon 2026** | **Track:** Safety, Reporting & Protection
> **Live Application:** [https://was-tebeka.vercel.app](https://was-tebeka.vercel.app)

**Was Tebeka** is a trauma-informed, zero-knowledge SGBV reporting and triage platform. It enables survivors across Africa to securely report incidents, access statutory legal and emergency medical resources, and track case progress completely anonymously without leaving a digital footprint.

---

## 🌟 Key Features

- **Zero-Knowledge Anonymous Reporting**: Survivors submit incidents without phone numbers, emails, names, or pinpoint GPS coordinates.
- **Cryptographic Case Tracking**: Dynamic milestone timelines tracked via one-way SHA-256 hashed claim tokens.
- **Statutory Civic Rights Portal**: Plain-language legal guides and myth-busting tools mapped directly to national codices:
  - **Ethiopia**: FDRE Criminal Code (Arts. 564, 565, 620)
  - **Kenya**: Protection Against Domestic Violence Act (PADV 2015) & Sexual Offences Act (2006)
  - **Côte d'Ivoire**: Code Pénal (Arts. 381–382, Loi N° 2021-893)
- **WHO 72-Hour Clinical Triage**: Automated urgency escalation for incidents within the 72-hour Post-Exposure Prophylaxis (PEP) window.
- **Universal Civic Accessibility (WCAG 2.1 AA)**:
  - In-browser native Web Speech API Text-to-Speech (TTS) for non-literate and visually impaired users.
  - Skip-to-content keyboard navigation and ARIA live-announcements.
  - High-contrast, trauma-informed interface with zero external accessibility library bloat.
- **Pan-African Localization**: Interface and rights content localized in English, Amharic (አማርኛ), French (Français), Swahili (Kiswahili), and Arabic (العربية).
- **Persistent Quick Exit Panic Protocol**: Instant state purge and redirect to a neutral search page to protect against device inspection.
- **Multi-Agency Coordination Desk**: Administrative portal allowing verified civil society partners (EWLA, AWSAD, hospital GBV units) to triage cases and append verified referral timelines.

---

## 🛠 Tech Stack

### Frontend

- **Framework**: Nuxt 3 (Vue.js, SSR enabled)
- **Styling & UI**: Nuxt UI & Tailwind CSS
- **Accessibility**: Native Web Speech API, WCAG 2.1 AA compliant semantic tree

### Backend

- **Framework**: Django REST Framework (Python)
- **Database**: PostgreSQL
- **Security**: One-way SHA-256 token hashing, strict CORS/CSRF headers, coarse geo-scoping

### Infrastructure & Deployment

- **Cloud Hosting**: Railway (Django API & PostgreSQL) & Vercel (Nuxt 3 Frontend)
- **Containerization**: Docker & Docker Compose

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (v18+)
- Python (v3.10+)

### Quick Start (Recommended)

Run the unified local development script:

```bash
./start-dev.sh
```

**What this does:**

1. Starts PostgreSQL and the Django API in the background via Docker Compose.
2. Automatically installs frontend dependencies (`npm install`) if it's your first time running it.
3. Starts the Nuxt 3 frontend server.
4. Streams the backend logs directly to your terminal.

When you're done, just press `Ctrl+C` to gracefully shut down both the frontend and the Docker containers.

### Manual Setup (Without Docker)

If you prefer to run the backend natively without Docker:

**Backend Setup:**

1. `cd backend`
2. `python -m venv venv && source venv/bin/activate`
3. `pip install -r requirements.txt`
4. Make sure your local PostgreSQL database is running and update `.env`.
5. `python manage.py migrate && python manage.py runserver`

**Frontend Setup:**

1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 🔒 Security & Privacy Architecture

This project strictly adheres to privacy-by-design principles:

- **No PII Collection**: Exact physical locations, names, phone numbers, and device telemetry are explicitly never requested or persisted.
- **One-Way Token Hashing** : Case tracking tokens are stored in the database exclusively as SHA-256 cryptographic hashes; the raw plaintext token is only shown to the survivor once upon submission.
- **Zero Third-Party Telemetry** : Absolute absence of tracking cookies, ad network pixels, or third-party behavioral analytics.
- **Client Session Sanitization** : The Quick Exit protocol immediately clears local session memory, cancels speech synthesis, and executes a hard document replacement to protect against device snatching.


## 🤖 AI Assistance & Tooling Disclosure

In compliance with OSF × Andela Hackathon submission guidelines:

* **Tooling Used** : Antigravity with Gemini was utilized for rapid API scaffolding, Nuxt UI component templating, bilingual state dictionaries, and statutory legal schema mapping . Gemini was used for research regarding the legal concepts , architectural considerations, mechanisms for accessibility and localizations and general content related to the project's scope.
* **Human Oversight** : Architectural designs, trauma-informed privacy boundaries and zero-knowledge cryptographic flows were engineered and vetted under direct human control.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
