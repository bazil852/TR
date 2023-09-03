import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/users";
import * as AWS from "aws-sdk";

const options = {
  accessKeyId: "AKIA6Q4YWN4JX6XKJE4T",
  secretAccessKey: "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",
  region: "eu-north-1",
};

const SES = new AWS.SES(options);

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}users/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: req.body.email,
              password: req.body.password,
            }),
          }
        );

        console.log("nextauth", response);
        if (response.ok) {
          const responseData = await response.json();
          console.log("nextauth", responseData);

          return responseData;
        } else {
          throw new Error("Invaild Credentials");
        }
        // Add logic here to look up the user from the credentials supplied
      },
    }),
  ],
  callbacks: {
    // async session(session, user) {
    //   if (user && user.id) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // },
    // async jwt(token, user, account, profile, isNewUser) {
    //   if (user && user.id) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
    async jwt({ token, user, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.user.firstName = token.user.firstName;
      session.user.lastName = token.user.lastName;
      session.user.accountVerified = token.user.accountVerified;
      session.user.verificationCode = token.user.verificationCode;
      session.user.exchanges = token.user.exchanges;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
