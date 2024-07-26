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
        const existeduser = await getUser(user.email);
        if (!existeduser)
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
    session: async ({ session }) => {
      const user = await getUser(session.user.email);
      const following = await getFollowing(user.id);
      session.user.userId = user.id;
      session.user.avatar = user.avatar;
      session.user.bio = user.bio
      session.user.fullName = user.fullName
      session.user.following = following ?? [];
      session.user.bookmarks = user?.bookmarks ?? [];

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
