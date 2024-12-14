import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwind from '@astrojs/tailwind';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  integrations: [react(), markdoc(), keystatic(), tailwind()],
  adapter: cloudflare(),
});