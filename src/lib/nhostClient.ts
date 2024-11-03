import { NhostClient } from '@nhost/nextjs';

const nhost = new NhostClient({
  authUrl: `${process.env.NEXT_PUBLIC_NHOST_URL}/v1/auth`,
  graphqlUrl: `${process.env.NEXT_PUBLIC_NHOST_URL}/v1/graphql`,
  storageUrl: `${process.env.NEXT_PUBLIC_NHOST_URL}/v1/storage`,
  functionsUrl: `${process.env.NEXT_PUBLIC_NHOST_URL}/v1/functions`,
  adminSecret: process.env.NEXT_PUBLIC_NHOST_ADMIN_SECRET || '',
});

export { nhost };
