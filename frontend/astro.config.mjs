import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

// import { sanityIntegration as sanity } from "@sanity/astro"

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [vue()]
});