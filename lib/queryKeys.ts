export const queryKeys = {
  projects: (type?: string) => type ? ["projects", type] : ["projects"],
  cases: () => ["cases"],
  testimonials: () => ["testimonials"],
} as const;
