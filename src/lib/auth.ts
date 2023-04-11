import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";
import GoogleProvider from "next-auth/providers/google"

function getGoogleCredintials() {
  //function to verify we set our google credentials else return an error
  const clientID = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if(!clientID || clientID.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID')
  }
  if(!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET')
  }

  return {clientID, clientSecret}
}


export const authOptions: NextAuthOptions = {
  //adapter that allows user auth info be taken
  adapter: UpstashRedisAdapter(db),
  session: {
    strategy: 'jwt', //json-web-tokens: dont handle session on db; allows to verify session in middlewares => for route protection
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredintials().clientID,
      clientSecret: getGoogleCredintials().clientSecret
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      const dbUser = (await db.get(`user: ${token.id}`)) as User | null

      if(!dbUser) {
        token.id = user!.id
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image
      }
    },
    async session({session, token}) {
      if(token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      
      }
      return session
    },
    redirect() {
      return '/dashboard'
    }
    
  },
}