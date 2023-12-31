// This file was generated by a custom prisma generator, do not edit manually.
export const Role = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const Plan = {
  FREE: "FREE",
  PRO: "PRO",
  ENTERPRISE: "ENTERPRISE",
} as const;

export type Plan = (typeof Plan)[keyof typeof Plan];

export const Status = {
  OPEN: "OPEN",
  UNDER_REVIEW: "UNDER_REVIEW",
  PLANNED: "PLANNED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  CLOSED: "CLOSED",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const Sentiment = {
  POSITIVE: "POSITIVE",
  NEUTRAL: "NEUTRAL",
  NEGATIVE: "NEGATIVE",
} as const;

export type Sentiment = (typeof Sentiment)[keyof typeof Sentiment];

export const Source = {
  MANUAL: "MANUAL",
  DISCORD: "DISCORD",
  WIDGET: "WIDGET",
  PAGE: "PAGE",
  SLACK: "SLACK",
  INTERCOM: "INTERCOM",
  CRISP: "CRISP",
  TELEGRAM: "TELEGRAM",
  TEAMS: "TEAMS",
} as const;

export type Source = (typeof Source)[keyof typeof Source];

export const Visibility = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];
