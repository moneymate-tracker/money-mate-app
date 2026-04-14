# Money Mat — Student Budget Tracker

> A production-ready personal finance tracker built for college students. Track spending by category, enforce monthly budget limits, and gain instant visibility into budget variance.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend-stack)
  - [Backend](#backend-stack)
- [Project Structure](#project-structure)
  - [Frontend Folder Structure](#frontend-folder-structure)
  - [Backend Folder Structure](#backend-folder-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Key Commands](#key-commands)

---

## Overview

Money Mat is a full-stack monorepo application that helps college students manage their monthly finances. It provides a clean dashboard with per-category budget progress, variance reporting, and multi-month trend analysis — all backed by a type-safe REST API and a PostgreSQL database.

---

## Features

| Feature | Description |
|---|---|
| **Dashboard** | Monthly overview with total budgeted vs. spent, per-category progress bars, and a recent expense feed |
| **Expenses** | Log, edit, and delete individual expenses; filter by month or category |
| **Budgets** | Set monthly budget limits per spending category |
| **Categories** | Create and manage categories with custom names, colors, and icons |
| **Budget Variance** | See exactly how much you are over or under budget per category |
| **Monthly Trends** | View total spending vs. budget across the last 6 months |

---

## Tech Stack

### Frontend Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | **React 19** | Component-based UI |
| Build Tool | **Vite** | Fast dev server and optimized production builds |
| Styling | **Tailwind CSS** | Utility-first CSS framework |
| Component Library | **shadcn/ui** | Accessible, composable UI primitives |
| Routing | **Wouter** | Lightweight client-side routing |
| Data Fetching | **TanStack React Query** | Server-state management and caching |
| API Client | **Orval (codegen)** | Auto-generated React Query hooks from OpenAPI spec |
| Validation | **Zod v4** | Runtime schema validation (shared with backend) |

### Backend Stack

| Layer | Technology | Purpose |
|---|---|---|
| Runtime | **Node.js** | JavaScript server runtime |
| Framework | **Express 5** | HTTP server and routing |
| Database | **PostgreSQL** | Relational data storage |
| ORM | **Drizzle ORM** | Type-safe SQL query builder and schema manager |
| Validation | **Zod v4** | Request body and query param validation |
| API Contract | **OpenAPI 3.1** | Single source of truth for API shape |
| Codegen | **Orval** | Generates frontend hooks and Zod schemas from spec |
| Build | **esbuild** | Fast TypeScript bundling for production |
| Package Manager | **pnpm workspaces** | Monorepo dependency management |

---

## Project Structure

```
workspace/                          # Monorepo root
├── artifacts/                      # Deployable applications
│   ├── budget-tracker/             # React + Vite frontend app
│   └── api-server/                 # Express REST API server
├── lib/                            # Shared internal packages
│   ├── api-spec/                   # OpenAPI specification (source of truth)
│   ├── api-client-react/           # Generated React Query hooks
│   ├── api-zod/                    # Generated Zod validation schemas
│   └── db/                         # Drizzle ORM client + database schema
└── scripts/                        # Utility and maintenance scripts
```

---

### Frontend Folder Structure

```
artifacts/budget-tracker/
├── public/                         # Static assets (favicon, images)
├── src/
│   ├── pages/                      # Route-level page components
│   │   ├── Dashboard.tsx           # Monthly overview + progress bars
│   │   ├── Expenses.tsx            # Expense log with filters
│   │   ├── Budgets.tsx             # Budget management per category
│   │   └── Categories.tsx          # Category CRUD
│   ├── components/                 # Reusable UI components
│   │   ├── ui/                     # shadcn/ui primitives (Button, Card, etc.)
│   │   ├── CategoryBadge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── ExpenseRow.tsx
│   ├── lib/                        # Utilities and helpers
│   │   ├── utils.ts                # cn(), formatCurrency(), etc.
│   │   └── constants.ts            # App-wide constants
│   ├── hooks/                      # Custom React hooks
│   ├── App.tsx                     # Root component with router
│   └── main.tsx                    # Entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

### Backend Folder Structure

```
artifacts/api-server/
├── src/
│   ├── routes/                     # Express route handlers
│   │   ├── categories.ts           # GET / POST / PUT / DELETE /categories
│   │   ├── budgets.ts              # GET / POST / PUT / DELETE /budgets
│   │   ├── expenses.ts             # GET / POST / PUT / DELETE /expenses
│   │   └── summary.ts             # GET /summary, /recent-expenses, /monthly-totals
│   ├── middleware/                 # Express middleware
│   │   └── errorHandler.ts         # Global error handler
│   └── index.ts                    # Server entry point, route registration
├── tsconfig.json
└── package.json

lib/db/
├── src/
│   ├── client.ts                   # Drizzle ORM + postgres.js connection
│   └── schema.ts                   # Table definitions (categories, budgets, expenses)
├── drizzle.config.ts
└── package.json

lib/api-spec/
├── openapi.yaml                    # OpenAPI 3.1 specification
├── orval.config.ts                 # Codegen configuration
└── package.json
```

---

## Database Schema

### `categories`

| Column | Type | Description |
|---|---|---|
| `id` | `serial` (PK) | Auto-increment primary key |
| `name` | `text` | Category name (e.g. `"Food & Dining"`) |
| `color` | `text` | Hex color code (e.g. `#f97316`) |
| `icon` | `text` | Icon identifier (e.g. `utensils`) |
| `created_at` | `timestamptz` | Auto-set on creation |

### `budgets`

| Column | Type | Description |
|---|---|---|
| `id` | `serial` (PK) | Auto-increment primary key |
| `category_id` | `integer` (FK) | References `categories.id` (cascade delete) |
| `month` | `text` | Month in `YYYY-MM` format |
| `amount` | `numeric(10,2)` | Budget amount in dollars |
| `created_at` | `timestamptz` | Auto-set on creation |

> **Constraint:** `UNIQUE(category_id, month)` — one budget per category per month.

### `expenses`

| Column | Type | Description |
|---|---|---|
| `id` | `serial` (PK) | Auto-increment primary key |
| `category_id` | `integer` (FK) | References `categories.id` (cascade delete) |
| `amount` | `numeric(10,2)` | Expense amount in dollars |
| `description` | `text` | Short description of the expense |
| `date` | `text` | Date in `YYYY-MM-DD` format |
| `created_at` | `timestamptz` | Auto-set on creation |

> **Cascade:** Deleting a category removes all related budgets and expenses.

---

## API Reference

All endpoints are prefixed with `/api`.

### Categories

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/categories` | List all categories |
| `POST` | `/categories` | Create a new category |
| `PUT` | `/categories/:id` | Update a category |
| `DELETE` | `/categories/:id` | Delete a category (cascades) |

**Request body (POST / PUT):**
```json
{ "name": "Food & Dining", "color": "#f97316", "icon": "utensils" }
```

---

### Budgets

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/budgets?month=YYYY-MM` | List budgets (optional month filter) |
| `POST` | `/budgets` | Create or update a budget |
| `PUT` | `/budgets/:id` | Update budget amount |
| `DELETE` | `/budgets/:id` | Delete a budget |

**Request body (POST):**
```json
{ "categoryId": 1, "month": "2026-04", "amount": 200 }
```

> `POST` is idempotent — if a budget already exists for that category and month, it updates the amount.

---

### Expenses

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/expenses?month=YYYY-MM&categoryId=1` | List expenses (optional filters) |
| `POST` | `/expenses` | Log a new expense |
| `PUT` | `/expenses/:id` | Update an expense |
| `DELETE` | `/expenses/:id` | Delete an expense |

**Request body (POST):**
```json
{ "categoryId": 1, "amount": 14.50, "description": "Chipotle", "date": "2026-04-01" }
```

---

### Summary & Analytics

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/summary?month=YYYY-MM` | Monthly budget vs. spending summary with variance per category |
| `GET` | `/summary/recent-expenses?limit=10` | Most recent expenses across all categories |
| `GET` | `/summary/monthly-totals?months=6` | Total spent and budgeted per month for the last N months |

**Summary response:**
```json
{
  "month": "2026-04",
  "totalBudgeted": 580,
  "totalSpent": 220.74,
  "totalVariance": 359.26,
  "categories": [
    {
      "categoryId": 1,
      "categoryName": "Food & Dining",
      "categoryColor": "#f97316",
      "categoryIcon": "utensils",
      "budgeted": 200,
      "spent": 57.05,
      "variance": 142.95,
      "percentUsed": 28.5
    }
  ]
}
```

> `variance` is **positive** when under budget, **negative** when over budget.

---

## Environment Variables

Create a `.env` file in the repo root (or set these in your deployment environment):

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | Full PostgreSQL connection string |
| `PGHOST` | Yes | Database host |
| `PGPORT` | No | Database port (default: `5432`) |
| `PGUSER` | Yes | Database username |
| `PGPASSWORD` | Yes | Database password |
| `PGDATABASE` | Yes | Database name |
| `PORT` | No | HTTP server port (auto-set per artifact) |
| `BASE_PATH` | No | URL base path for frontend (auto-set) |

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- PostgreSQL >= 15

### Installation

```bash
# Install all workspace dependencies
pnpm install

# Push the database schema to your PostgreSQL instance
pnpm --filter @workspace/db run push

# Regenerate API client hooks and Zod schemas from the OpenAPI spec
pnpm --filter @workspace/api-spec run codegen
```

---

## Key Commands

```bash
# Start the frontend dev server
pnpm --filter @workspace/budget-tracker run dev

# Start the API server
pnpm --filter @workspace/api-server run dev

# Push database schema changes
pnpm --filter @workspace/db run push

# Regenerate API hooks and Zod schemas from OpenAPI spec
pnpm --filter @workspace/api-spec run codegen

# Full TypeScript typecheck across the monorepo
pnpm run typecheck

# Production build
pnpm run build
```

---

*Built with React 19, Express 5, Drizzle ORM, and PostgreSQL.*
