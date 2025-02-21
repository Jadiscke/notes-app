# Notes App

A Next.js application for managing notes with GitHub authentication.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A GitHub account
- Supabase account and project

## Local Development Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd notes-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env.local file in the root directory and add the following environment variables:

```plaintext
# Auth
AUTH_GITHUB_ID=your_github_oauth_client_id
AUTH_GITHUB_SECRET=your_github_oauth_client_secret
AUTH_SECRET=your_auth_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Set up local Supabase:
Install Supabase CLI:

```bash
npm install -g supabase
```

Start local Supabase:

```bash
supabase start
```

This will create a local Supabase instance with:

- Database URL: postgresql://postgres:postgres@localhost:54322/postgres
- Studio URL: http://localhost:54323
- API URL: http://localhost:54321
- Update your .env.local with local credentials:

```plaintext

NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<generated-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<generated-service-role-key>
```

Start the development server:

```bash
npm run dev
```

Testing
The project uses Vitest for testing. To run the tests:

Run all tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Generate test coverage report:

```bash
npm run test:coverage
```

## Project Structure

/src/app - Next.js app router pages and API routes
/src/components - React components
/src/lib - Utility functions and shared code
/test - Test setup and configuration
/supabase - Database migrations and configuration

## Authentication

- Create a new OAuth app in GitHub:
- Go to GitHub Settings > Developer Settings > OAuth Apps > New OAuth App
- Set Homepage URL to http://localhost:3000
- Set Authorization callback URL to http://localhost:3000/api/auth/callback/github
- Copy the client ID and secret to your .env.local file

For more information see **[Creating a Github OAuth App](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)**

## Database Management

See **[Supabase CLI](https://supabase.com/docs/reference/cli/introduction)** for more information.

### Local Development

Apply migrations:

```bash
supabase db reset
```

Create new migration:

```bash
supabase migration new <migration-name>
```

Push schema changes:

```bash
supabase db push
```

View database changes in Studio:

```bash
supabase studio
```

Stop local instance:

```bash
supabase stop
```

## Available Scripts

- npm run dev - Start development server
- npm run build - Build for production
- npm run start - Start production server
- npm run lint - Run ESLint
- npm test - Run tests
- npm run test:watch - Run tests in watch mode
- npm run test:coverage - Generate test coverage report

## Troubleshooting

Local Supabase Issues
If the database connection fails, try restarting the local instance:

```bash
supabase stop
supabase start
```

To reset the database to a clean state:

```bash
supabase db reset
```

## Authentication Issues

Ensure your GitHub OAuth app URLs match your local development URLs
Check that all environment variables are properly set in .env.local
