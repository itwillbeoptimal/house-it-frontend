export interface UserInfoResponse {
  nickname: string;
  profileUrl: string;
}

export interface NicknameCheckResponse {
  isAvailable: boolean;
}

export interface UpdateUserInfoRequest {
  nickname?: string;
  image?: File;
  isProfileImageDeleted: boolean;
}

export interface UpdateUserInfoResponse {
  userId: number;
  nickName: string;
  profile: string;
}
