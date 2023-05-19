export interface GoogleIdToken {
  idToken: string;
}

export interface FacebookTokenPayload {
  email: string;
  accessToken: string;
  facebookId: string;
}

export interface FacebookDecodedToken {
  name: string;
  id: string;
}

export interface ReservationDetails {
  phone: string;
  date: string;
  time: string;
  guestCount: number;
  message: string;
}

export interface UserInfoDetails {
  fcmToken?: string | null;
  deviceToken?: string | null;
  deviceOs?: 'android' | 'ios' | 'web' | null;
  profilePicture?: string | null;
}

export interface PushNotificationPayload {
  source: string;
  userIds: string[];
  title: string;
  content: string;
  data: Record<string, string>;
}

export interface UserPushPayload {
  title: string;
  content: string;
  userId: string;
  data: Record<string, string>;
  try_attempt: number;
}

export type CommonObject = Record<string, string | number | boolean | null>;

export interface CustomErrorPayload {
  statusCode: number;
  message: string;
}

export type CustomErrorDetails = Record<string, CustomErrorPayload>;
