export const ROLE_LEVEL = {
  user: 1,
  vip: 2,
  admin: 3,
} as const;

export type AppRole = keyof typeof ROLE_LEVEL;

export const hasRequiredRole = (currentRole: AppRole, requiredRole: AppRole): boolean => {
  return ROLE_LEVEL[currentRole] >= ROLE_LEVEL[requiredRole];
};
