import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

export default NextAuth({
    providers: [
        SpotifyProvider({
            authorization:
                'https://accounts.spotify.com/authorize?scope=user-read-currently-playing%20user-top-read',
            clientId: "ffec0394389b449f91a8dd0ffbc1231f",
            clientSecret: "8174866d85f542078458e5209329e252",
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
    secret: "zamzam"
});