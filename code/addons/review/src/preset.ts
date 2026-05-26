import { createProxyMiddleware } from 'http-proxy-middleware';
import type { Middleware, ServerApp } from 'storybook/internal/types';

const BASELINE_PROXY_PATH = '/__review-baseline';
const BASELINE_TARGET_ORIGIN = 'https://next--635781f3500dd2c49e189caf.chromatic.com';

export const experimental_devServer = (app: ServerApp) => {
  const proxyRequest = createProxyMiddleware({
    target: BASELINE_TARGET_ORIGIN,
    changeOrigin: true,
    pathRewrite: (path) =>
      path.startsWith(BASELINE_PROXY_PATH) ? path.slice(BASELINE_PROXY_PATH.length) || '/' : path,
  }) as unknown as Middleware;

  app.use(BASELINE_PROXY_PATH, proxyRequest);
  return app;
};
