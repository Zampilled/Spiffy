import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
    providers: [
        SpotifyProvider({
            authorization:
                'https://accounts.spotify.com/authorize?scope=%20user-top-read',
            clientId: "",
            clientSecret: "",
        }),
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.accessToken = account.refresh_token;
            }
            return token;
        },
        async session(session, user) {
            session.user = user;
            return session;
        },
    },
    secret: ""
});