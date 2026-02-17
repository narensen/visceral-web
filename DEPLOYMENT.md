# Deployment Guide for Visceral Web

## Prerequisites

Before deploying, ensure you have:
- A Supabase project with authentication enabled
- Backend API running at the specified URL
- Environment variables configured

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_actual_supabase_url
NEXT_PUBLIC_SUPABASE_KEY=your_actual_supabase_anon_key
NEXT_PUBLIC_BASE_URL=https://visceral-be.onrender.com
NEXT_PUBLIC_MARKETS_REALTIME_TABLE=market_prices
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env`

5. **Redeploy**:
   ```bash
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod --dir=.next
   ```

4. **Configure environment variables** in Netlify Dashboard

### Option 3: Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine AS base

   # Install dependencies only when needed
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci

   # Rebuild the source code only when needed
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   
   RUN npm run build

   # Production image
   FROM base AS runner
   WORKDIR /app
   
   ENV NODE_ENV production
   
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   
   USER nextjs
   
   EXPOSE 3000
   
   ENV PORT 3000
   
   CMD ["node", "server.js"]
   ```

2. **Build and run**:
   ```bash
   docker build -t visceral-web .
   docker run -p 3000:3000 --env-file .env visceral-web
   ```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication flow (login/signup)
- [ ] Check real-time market data updates
- [ ] Test responsive design on mobile devices
- [ ] Verify API connections to backend
- [ ] Check error handling and toast notifications
- [ ] Test navigation between pages
- [ ] Verify bottom navigation works on all routes

## Monitoring

Consider setting up:
- Error tracking (e.g., Sentry)
- Analytics (e.g., Google Analytics, Vercel Analytics)
- Performance monitoring
- Uptime monitoring

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check environment variables are set correctly

### Authentication Issues

If authentication doesn't work:
1. Verify Supabase URL and key are correct
2. Check Supabase project settings
3. Ensure authentication is enabled in Supabase dashboard
4. Check browser console for errors

### API Connection Issues

If API calls fail:
1. Verify `NEXT_PUBLIC_BASE_URL` is correct
2. Check CORS settings on backend
3. Ensure backend API is running
4. Check network tab in browser dev tools

## Performance Optimization

For production:
1. Enable caching headers
2. Use CDN for static assets
3. Enable gzip compression
4. Implement image optimization
5. Use production build only (`npm run build && npm start`)

## Security Best Practices

1. Never commit `.env` file to git
2. Use environment variables for all secrets
3. Enable HTTPS in production
4. Set up proper CORS policies
5. Regularly update dependencies
6. Enable Content Security Policy (CSP)

## Support

For issues or questions:
- Check the README.md file
- Review the codebase documentation
- Contact the development team
