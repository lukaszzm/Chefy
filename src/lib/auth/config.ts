export const AuthConfig = {
  /**
   * Name of the cookie that will be used to store the session
   */
  SESSION_COOKIE_NAME: "auth_session",
  /**
   * Time in seconds that the session will be valid
   */
  SESSION_EXPIRATION_TIME: 60 * 60 * 24 * 30, // 30 days
  /**
   * Time in seconds that the session will be updated
   */
  SESSION_VALIDATION_TIME: 60 * 60 * 24 * 15, // 15 days
} as const;
