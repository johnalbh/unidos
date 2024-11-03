export const env = {
  nhost: {
    subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NEXT_PUBLIC_NHOST_REGION,
    url: process.env.NEXT_PUBLIC_NHOST_URL,
    adminSecret: process.env.NEXT_PUBLIC_NHOST_ADMIN_SECRET,
  },
} as const;

Object.entries(env.nhost).forEach(([key, value]) => {
  if (!value) {
    throw new Error(
      `Environment variable NEXT_PUBLIC_NHOST_${key.toUpperCase()} is not defined`
    );
  }
});
