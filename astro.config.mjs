import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  // 部署到 GitHub Pages 的必要配置
  site: 'https://spidercooker.github.io',
  base: '/My-own-website',
});
