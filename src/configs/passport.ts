import { PassportStatic } from "passport";
import googleOauth2 from "passport-google-oauth20";
import User from "../models/User";
import naverOauth2 from "passport-naver"; // passport-naver 모듈을 추가

const GoogleStrategy = googleOauth2.Strategy;
const NaverStrategy = naverOauth2.Strategy;

export default function (passport: PassportStatic) {
  // Google OAuth2.0 전략 설정
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log({ profile });
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

  // Naver OAuth2.0 전략 설정
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID as string,
        clientSecret: process.env.NAVER_CLIENT_SECRET as string,
        callbackURL: process.env.NAVER_CALLBACK_URL as string,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log({ profile });
        const newUser = {
          naverId: profile.id,
          displayName: profile.displayName,
          image: profile._json.profile_image || "",
        };
        console.log({ newUser });

        try {
          let user = await User.findOne({ naverId: profile.id });

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
          done(err, null);
        }
      }
    )
  );

  // 세션 저장
  passport.serializeUser((user: any, done) => {
    console.log("serializeUser", { user });
    done(null, user.id);
  });

  // 세션 조회
  passport.deserializeUser(async (id, done) => {
    console.log("deserializeUser", { id });
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
}
