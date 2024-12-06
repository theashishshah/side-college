import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "signup",
      name: "Sign up with Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        // name: {
        //   label: "Full Name",
        //   type: "text",
        //   placeholder: "Ashish Shah",
        // },
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
      ): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided.");
        }
        const { email, password, username } = credentials;

        await dbConnect();
        console.log("this is credentials", credentials);
        try {
          const user = await UserModel.findOne({
            $or: [{ username }, { email }],
          });
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
            return user;
          } else {
            throw new Error("Please provide correct password.");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessage = token.isAcceptingMessage;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET_KEY,
};
