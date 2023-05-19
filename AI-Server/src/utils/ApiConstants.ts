export const AppHeaders = {
  X_USER_ID: 'x-user-id',
  X_CLIENT_ID: 'x-client-id',
  X_AUTH_KEY: 'x-auth-key',
};

export const RedisKeys = {
  JWT_TOKEN: 'jwt_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const UserStatus = {
  None: 0,
  Active: 1,
  SUSPENDED: 2,
  DELETED: 3,
};

export const LinkedAccountType = {
  None: 0,
  Google: 1,
  Facebook: 2,
  Apple: 3,
};

export const UserInfoKeys = {
  FCM_TOKEN: 'fcmToken',
  DEVICE_TOKEN: 'deviceToken',
  DEVICE_OS: 'deviceOs',
  PROFILE_PICTURE: 'profilePicture',
};

export const ApiUrls = {
  todos: 'https://jsonplaceholder.typicode.com/todos',
};
