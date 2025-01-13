import pino from "pino";
import pretty from "pino-pretty";
import jwt from "jsonwebtoken";

import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
const stream = pretty({
  colorize: true,
});
const log = pino(
  {
    level: "debug",
  },
  stream,
);
// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/core/types#authconfig
export const { handlers, auth, signIn, signOut } = NextAuth({
  // https://authjs.dev/getting-started/authentication/oauth
  debug: true,
  logger: {
    error(code, ...message) {
      log.error(code, message);
    },
    warn(code, ...message) {
      log.warn(code, message);
    },
    debug(code, ...message) {
      log.debug(code, message);
    },
  },

  providers: [Github],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },
});
