import '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

// Mock Next.js server module and auth
vi.mock('next/server', () => {
  const mod = {
    NextResponse: {
      json: vi.fn(),
      redirect: vi.fn(),
      next: vi.fn(),
    },
  }
  return {
    ...mod,
    default: mod,
  }
})

vi.mock('next-auth', () => {
  const handlers = {
    GET: vi.fn(),
    POST: vi.fn()
  }

  const mod = {
    handlers,
    auth: vi.fn(() => Promise.resolve({ user: null })),
    signIn: vi.fn(),
    signOut: vi.fn(),
    NextAuth: vi.fn(() => ({ handlers, auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }))
  }

  return {
    ...mod,
    default: mod.NextAuth
  }
})

vi.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  getSession: vi.fn(() => Promise.resolve(null)),
}))

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))




afterEach(() => {
  cleanup()
})