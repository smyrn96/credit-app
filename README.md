# Credit Application

A credit application web app built with React and Vite featuring a multi-step wizard form and an applications dashboard. The app interacts with a mock API to submit, fetch and delete credit applications.

---

## Features

### Wizard Form (3 Steps)
1. **Personal Info**
   - Full Name
   - Email
   - Date of Birth

2. **Finances**
   - Income
   - Employment Type (Full time, Part time, Unemployed)
   - Accept Terms (checkbox)

3. **Congratulations Screen**
   - Confirmation message displayed after successful submission

### Applications Screen
- Fetches all submitted applications from a mock API
- Displays applications as individual cards with relevant details and a delete button

---

## Technology Stack

- **React** (v19.1.0) with **Vite** for fast bundling and development
- **Formik** for form state management and validation
- **Yup** for schema-based form validation
- **React Query** (`@tanstack/react-query`) for data fetching and caching
- **Axios** for HTTP requests
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling
- **React Spinners** for loading indicators
- **React Toastify** for toast notifications
- **Vitest** and **@testing-library/react** for testing and test utilities

---
## Deployment
   Open your browser and navigate to
   [credit-app](https://credit-app-six.vercel.app/)

## Run the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/smyrn96/credit-app.git
   cd credit-application

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install

3. Create a `.env` file in the root of your project (if it doesn't exist):
   ```bash
   VITE_MOCK_API_URL=https://your-mockapi-url.com

4. Open your browser and navigate to
   ```bash
   http://localhost:3000

## Testing

Uses **Vitest** and **React Testing Library** for unit and integration tests.

### Run tests with:

```bash
npm run test
# or
yarn test

