import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';
import fs from 'fs';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      VitePWA({
        registerType: 'prompt',
        injectRegister: 'auto',
        pwaAssets: {
          disabled: true,
        },
        manifest: {
          name: '하우스잇',
          short_name: '하우스잇',
          description: '생활에서 생기는 모든 질문의 답, 하우스잇',
          theme_color: '#f7f9f9',
          icons: [
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
            },
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          cleanupOutdatedCaches: true,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [
            /^\/api(\/|$)/,
            /^\/actuator(\/|$)/,
            /^\/docs(\/|$)/,
            /^\/oauth2(\/|$)/,
            /^\/login\/oauth2(\/|$)/,
          ],
          runtimeCaching: [
            {
              urlPattern: /^\/api(\/|$)/,
              handler: 'NetworkOnly',
              method: 'GET',
            },
            {
              urlPattern: /^\/actuator(\/|$)/,
              handler: 'NetworkOnly',
              method: 'GET',
            },
            {
              urlPattern: /^\/docs(\/|$)/,
              handler: 'NetworkFirst',
              method: 'GET',
            },
            {
              urlPattern: /^\/oauth2(\/|$)/,
              handler: 'NetworkOnly',
            },
            {
              urlPattern: /^\/login\/oauth2(\/|$)/,
              handler: 'NetworkOnly',
            },
          ],
          skipWaiting: true,
          clientsClaim: true,
        },
        devOptions: {
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
      svgrPlugin(),
    ],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: true,
        },
        '/oauth2': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: true,
        },
        '/login/oauth2': {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          secure: true,
        },
      },
      ...(command === 'serve' && {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        },
      }),
    },
  };
});
