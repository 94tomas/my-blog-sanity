import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import { sanityIntegration as sanity } from "@sanity/astro"

// import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    sanity({
      projectId: 'fooqb1zp',
      dataset: 'production',
      apiVersion: '2023-02-08',
      useCdn: false,
    })
  ] 
});