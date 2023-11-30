export type UserDTO = {
  userId: string;
  email: string;
  userName: string;
  avatarUrl: string;
  displayName: string;
  bio: string;
  role:string,
  currentRoomId: string;
  googleId?: string;
  githubId?: string;
  discordId?: string;
  lastSeen: string;
  createdAt: string;
};
