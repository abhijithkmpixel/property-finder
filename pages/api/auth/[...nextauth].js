import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

import AppleProvider from "next-auth/providers/apple";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    // // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
// export default NextAuth({
//   providers: [
//     // OAuth authentication providers...
//     // AppleProvider({
//     //   clientId: "" ,
//     //   clientSecret: ''
//     // }),
//     // FacebookProvider({
//     //   clientId: "",
//     //   clientSecret: ""
//     // }),
//     // GoogleProvider({
//     //   clientId: "",
//     //   clientSecret: ""
//     // }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // Passwordless / email sign in
//     // EmailProvider({
//     //   server: "",
//     //   from: 'NextAuth.js <no-reply@example.com>'
//     // }),
//   ]
// })
