import { BACKEND_URL } from "@repo/backend-common/config";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "@/lib/axios";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "test@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                try {
                    const res = await axios.post(`${BACKEND_URL}/api/v1/login`, {
                        email: credentials?.email,
                        password: credentials?.password
                    });
                    
                    const { user} = res.data;
                    return {
                        id: user.id,
                        email: user.email,
                    }
                } catch (error) {
                    console.log(error)
                    return null;
                }

            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],

    callbacks: {
        async signIn({ user, account }: { user: any; account: any }) {
            if (account?.provider !== "credentials") {
                const res = await axios.post(`${BACKEND_URL}/api/v1/oauth-login`, {
                    email: user.email,
                    image: user.image,
                });
                 user.id = res.data.user.id;   
            }
            return true;
        },

        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },

        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
            }
            return session;
        }

    },

    session:{
        strategy:"jwt" 
    },
    secret:process.env.NEXTAUTH_SECRET
}

