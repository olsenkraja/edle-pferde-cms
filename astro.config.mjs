import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';

export default defineConfig({  redirects: {
    '/': '/keystatic'
  },
  integrations: [react(), markdoc(), keystatic(), tailwind(), mdx()],
  adapter: vercel(),
});