import { PassportStatic } from "passport";
import googleOauth2 from "passport-google-oauth20";
import User from "../models/User";

const GoogleStrategy = googleOauth2.Strategy;

export default function (passport: PassportStatic) {
  // passport를 사용한 로그인
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: "http://localhost:3000/auth/google/callback",
      },
      // 로그인
      // google(authorization server) 에서 인증처리 후
      // express-server(client application) 에서 인증처리
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
            console.log("기존 사용자의 로그인이 처리되었습니다.");
            done(null, user);
          } else {
            user = await User.create(newUser);
            console.log("회원가입을 처리하고 로그인을 처리했습니다.");
            done(null, user);
          }
        } catch (err) {
          console.error("로그인 처리를 실패했습니다.", err);
        }
      }
    )
  );

  // 세션 저장
  passport.serializeUser((user: any, done) => {
    // console.log("serializeUser");
    done(null, user.id);
  });

  // 세션 조회
  passport.deserializeUser(async (id, done) => {
    // console.log("deserializeUser");
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
