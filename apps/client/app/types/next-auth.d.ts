import "next-auth"

declare module "next-auth" {
    interface User{
        id: string;
        email: string;
        accessToken: string;
    }
    interface Session {
        user: User;
        strategy: string;
    }
}