# Employee Management Application

A responsive Employee Management Application built for the Frontend Developer Assignment.

## Stack

- React + Vite
- Redux Toolkit
- Axios
- Material UI
- React Hook Form + Yup
- React Router
- Vitest + React Testing Library + MSW

## Features

- Employee listing with Name, Email, Mobile and Country
- Search employee by ID using the provided API
- Add employee
- Edit employee with pre-populated data
- Delete employee with confirmation
- Country API integration
- Redux Toolkit state management
- Loading, error and empty states
- Form validation
- Responsive desktop/mobile UI
- Toast notifications
- Retry API actions
- Smart/Dumb component separation
- Unit tests for services, Redux and form validation

## Run

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Test

```bash
npm run test:run
```

For interactive test mode:

```bash
npm test
```

## Build

```bash
npm run build
```

## API

Countries:
https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country

Employees:
https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee

## Architecture

- `pages/` = Smart/container components
- `components/` = Dumb/presentational and reusable UI components
- `features/` = Redux slices, thunks and selectors
- `services/` = API layer
- `validation/` = form schemas
- `tests/` = unit/component tests
