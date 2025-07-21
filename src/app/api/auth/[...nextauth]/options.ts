import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { User} from "next-auth"
import { Document } from "mongoose";

console.log("auth options file");
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Sign in with Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        username: {
          label: "Username",
          type: "text",
          placeholder: "iamashishshah",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(
        credentials:
          | Record<"email" | "username" | "password", string>
          | undefined
      ): Promise<User & Document> {
        // console.log("authorize code block");
        if (!credentials) {
          throw new Error("No credentials provided.");
        }
        const { email, password, username } = credentials;

        await dbConnect();
        // console.log("DB is connected in option file.");
        // console.log("in authorize section");
        try {
          const user = await UserModel.findOne({
            $or: [{ email }, { username }],
          });
          // console.log("User found in database:", user);

          if (!user) {
            throw new Error("No user found with this email or username");
          }

          if (!user.isVerified) {
            throw new Error(
              "Before login, Please verify your account first. Thank you!"
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordCorrect) {
            // console.log("User authenticated:", user); // Debug log
            // console.log("User's user name in the options file", user.username);
            return {
             
              _id: (user as Document & { _id: string })._id.toString(),
            } as User & Document;
          } else {
            throw new Error("Please provide correct password.");
          }
        } catch (error: unknown) {
          console.error("Error during authentication:", error);
          throw error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // This block runs only on the initial login
      if (user) {
        // console.log("User in JWT callback (initial login):", user);
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      } else {
        // console.log("JWT callback - Subsequent requests, no user:", user);
      }

      // console.log("Token data in JWT callback:", token);
      return token;
    },
    // async session({ session, token }) {
    //   if (token) {
    //     session.user._id = token._id;
    //     session.user.isVerified = token.isVerified;
    //     session.user.isAcceptingMessage = token.isAcceptingMessage;
    //     session.user.username = token.username;
    //     // session.user.email = token.email; // Add email
    //   }
    //   console.log("Session data in option file", session);
    //   return session;
    // },
    async session({ session, token }) {
      session.user = {
        _id: token._id,
        email: token.email,
        username: token.username,
        isVerified: token.isVerified,
        isAcceptingMessage: token.isAcceptingMessage,
      };

      // console.log("Session data in session callback:", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
};
