import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getFollowing, getUser } from "./services";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized: ({ auth }) => {
      return !!auth?.user;
    },
    signIn: async ({ user, account, profile }) => {
      try {
        const existedGuest = await getUser(user.email);
        if (!existedGuest)
          await createUser({
            email: user.email,
            fullName: user.name,
            avatar: user.image,
          });

        return true;
      } catch (err) {
        return false;
      }
    },
    session: async ({ session, user }) => {
      const guest = await getUser(session.user.email);
      const following  = await getFollowing(guest.id);
      session.user.userId = guest.id;
      session.user.avatar = guest.avatar
      session.user.following = following ?? [];
      session.user.bookmarks = guest?.bookmarks ?? [];

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
