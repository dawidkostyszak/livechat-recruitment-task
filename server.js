import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors());
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://randomuser.me/api',
    changeOrigin: true,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
  }),
);
app.listen(5000);
