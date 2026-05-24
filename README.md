# Glade — Premium Real Estate Showcase

> **Commercial Showcase & Demo Notice:** This repository is a static frontend concept built for design evaluation, user experience testing, and portfolio demonstration. It does **not** contain any active backend databases, private API keys, deployment configurations, or live Telegram bot tokens. 

---

## 🍃 About Glade

Glade is a high-end, responsive real estate web application designed to showcase luxury property listings, premium agent services, and interactive financial tools. 

This client-facing application is built using React, TypeScript, and Tailwind CSS to ensure fluid animations, responsive layouts, and a seamless interface.

---

## ✨ Features Implemented

* **Interactive Properties Grid:** Browse, filter, and view premium real estate properties dynamically.
* **Property Detail Modals:** Deep-dive into specific listing metrics, imagery, and structural amenities without changing pages.
* **Financial Tools:** Integrated interactive loan and mortgage calculator to estimate monthly payments instantly.
* **Lead Generation Showcase:** Built-in form modules designed to connect potential buyers with agents.
* **Modern Layout Elements:** Features sleek navigation, dedicated "About Us" branding, client services overviews, and recognized award-winning architectural showcases.

---

## 📂 Project Architecture

The codebase follows a modular React component structure paired with decoupled utility layers:

```text
src/
├── components/
│   ├── AboutUs.tsx           # Agency brand history and mission statement
│   ├── AwardedWorks.tsx      # Showcase of architectural highlights and achievements
│   ├── Footer.tsx            # Navigation links, copyright, and social placeholders
│   ├── Hero.tsx              # High-impact landing section with primary call-to-actions
│   ├── LoanCalculator.tsx    # Interactive frontend mortgage/loan calculator
│   ├── Navbar.tsx            # Responsive utility navigation bar
│   ├── PropertiesGrid.tsx    # Grid display featuring dynamic property filter sorting
│   ├── PropertyModal.tsx     # Lightbox-style detail popups for specific listings
│   └── Services.tsx          # Summary of company offerings (buying, selling, consulting)
├── utils/
│   └── telegram.ts           # Placeholder architecture for lead alert integrations
├── App.tsx                   # Main layout orchestration and application root
├── index.css                 # Global Tailwind CSS directives and custom typography
├── main.tsx                  # Application mount point and React strict-mode initiation
└── properties.ts             # Fictional static mock-data array for the listings grid
