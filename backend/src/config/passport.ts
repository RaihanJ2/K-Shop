import dotenv from "dotenv";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as Auth0Strategy } from "passport-auth0";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { UserType } from "../types";

dotenv.config();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN!,
      clientID: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      callbackURL: "/auth/auth0/callback",
      state: false,
    },
    async (accessToken, refreshToken, extraParams, profile, done) => {
      try {
        // Find or create user based on Auth0 profile
        let user = await User.findOne({ email: profile.emails?.[0]?.value });

        if (!user) {
          // Create new user from Auth0 profile
          user = new User({
            username: profile.displayName || profile.name?.givenName || "User",
            email: profile.emails?.[0]?.value,
            password: await bcrypt.hash(
              Math.random().toString(36) + Date.now().toString(),
              10
            ),
          });
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: UserType, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
