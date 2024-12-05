export interface IUser {
  googleId: string; // Google OAuth ID
  displayName: string; // 사용자 표시 이름
  firstName: string; // 사용자 이름
  lastName?: string | null; // lastName을 string | null로 변경
  image?: string | null;
  createdAt?: Date; // 생성 날짜
}
