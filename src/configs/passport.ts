import { PassportStatic } from "passport";
import googleOauth2 from "passport-google-oauth20";
import User from "../models/User";

const GoogleStrategy = googleOauth2.Strategy;

export default function (passport: PassportStatic) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      // 인증
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          image: profile.photos?.[0].value || "",
        };

        try {
          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // 세션 저장
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // 세션 조회
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Promise 방식
      console.log({ user });
      done(null, user);
    } catch (err) {
      done(err, null); // 에러 처리
    }
  });
}
