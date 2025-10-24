# techincal_test
# Expense Tracker Application

## Setup

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   - Copy `config.env.example` to `config.env`
   - Update the following variables

**Note:** A fully configured `config.env.example` file with working credentials is included in the project for immediate testing.

```env
PORT=8000
DB_PASSWORD=your_mongodb_password
DB_CONNECTION=your_mongodb_connection_string
BREVO_API_KEY=your_brevo_api_key
SENDER_EMAIL=your_verified_email@domain.com
SENDER_NAME=Expense Tracker
NOTIFICATION_EMAIL=recipient@email.com
NOTIFICATION_NAME=Admin
EXPENSE_THRESHOLD=1000
```

4. Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Email Service Setup (Brevo)

### Why Brevo?

I chose Brevo as the email service for the following reasons:

- Free tier includes 300 emails per day (sufficient for this project)
- Simple and well-documented API
- Reliable delivery rates

### Setting Up Brevo

1. **Create an account:**

   - Sign up at [https://www.brevo.com/](https://www.brevo.com/)
   - Verify your email address

2. **Generate API Key:**

   - Go to Settings → SMTP & API
   - Click "Generate a new API key"
   - Copy the API key
   - Add it to `backend/config.env` as `BREVO_API_KEY`

3. **Verify Sender Email:**

   - Go to Senders & IP
   - Add your sender email address
   - Verify it through the confirmation email
   - Update `SENDER_EMAIL` in `config.env` with the verified email

4. **Set Notification Email:**

   - Update `NOTIFICATION_EMAIL` in `config.env` with the email where you want to receive alerts

5. **Test the Integration:**
   - Create expenses that total more than $1,000
   - Check the notification email inbox (including spam folder)

## Key Decisions Made

### Architecture Decisions

1. **Component Structure:**

   - Separated concerns by creating reusable modal components (`AddCategoryModal`, `AddExpenseModal`)
   - Created dedicated table component (`ExpenseTable`) for better maintainability
   - Used React Router for client-side navigation

2. **State Management:**

   - Used React hooks (useState, useEffect) for local state management
   - Implemented "fetch on success" pattern: after create/update/delete operations, always refresh data from the server
   - This ensures UI always reflects the server state

3. **API Design:**

   - RESTful API structure with clear endpoints
   - Consistent response format: `{ ok: boolean, data: any, error?: string }`
   - Email notification logic handled on the backend for security

4. **Error Handling:**

   - Try-catch blocks for all async operations
   - Empty state handling (when no categories or expenses exist)
   - Graceful error responses from backend

5. **Email Threshold:**
   - Made threshold configurable via environment variable (`EXPENSE_THRESHOLD`)
   - Email sent only once when crossing the threshold (from ≤$1000 to >$1000)
   - Prevents spam by not sending on every expense after threshold

## Time Spent

**Total Time: Approximately 2.5 hours of coding**

I have push the code after each of these point so the time can be verified via Github comits

Breakdown:

- Backend API setup (models, controllers, routes): ~1h
- Frontend components and UI: ~50 mins
- Email integration with Brevo: ~30 mins
- Testing and debugging: ~10 mins

## Challenges Faced

1. **Brevo API Package Issues:**

   - Initial attempt with deprecated `@sendinblue/client` package
   - Had to switch to newer `@getbrevo/brevo` package
   - Resolved initialization issues by following correct API pattern

2. **Email Threshold Logic:**

   - Ensuring email is sent only once when crossing threshold
   - Implemented comparison: `previousTotal <= THRESHOLD && newTotal > THRESHOLD`
   - Works for both create and update operations

## API Endpoints

### Categories

- `GET /api/v1/categories` - Get all categories (includes totalAmount)
- `POST /api/v1/categories` - Create a new category
- `GET /api/v1/categories/:id` - Get a single category
- `PATCH /api/v1/categories/:id` - Update a category
- `DELETE /api/v1/categories/:id` - Delete a category

### Expenses

- `POST /api/v1/expenses` - Create a new expense
- `GET /api/v1/expenses/:id` - Get a single expense
- `GET /api/v1/expenses/category/:categoryId` - Get expenses by category
- `PATCH /api/v1/expenses/:id` - Update an expense
- `DELETE /api/v1/expenses/:id` - Delete an expense

## Project Structure

```
├── backend/
│   ├── config.env
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── controllers/
│       ├── model/
│       ├── routes/
│       └── services/
│           └── emailService.js
└── frontend/
    └── src/
        ├── components/
        ├── routes/
        ├── services/
        └── styles/
```

