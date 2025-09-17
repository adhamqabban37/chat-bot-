# Deployment Guide

## Prerequisites

1. **Neon Database** - Production PostgreSQL instance
2. **Stripe Account** - With LIVE mode enabled
3. **Vercel Account** - For hosting
4. **Domain** - Custom domain for production
5. **Resend Account** - For email functionality

## Environment Variables

### Production Environment

Set these in Vercel → Project Settings → Environment Variables for **Production**:

```env
# Database
DATABASE_URL="postgresql://user:pass@host/dbname"

# NextAuth
NEXTAUTH_SECRET="secure-random-32+-character-string"
NEXTAUTH_URL="https://yourdomain.com"

# Stripe LIVE
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Stripe Live Price IDs (create these in Stripe Dashboard)
STRIPE_PRICE_BASIC_LIVE="price_1234567890_basic"
STRIPE_PRICE_PRO_LIVE="price_1234567890_pro"
STRIPE_PRICE_GROWTH_LIVE="price_1234567890_growth"

# App Configuration
APP_ENV="production"

# Email
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@yourdomain.com"
```

### Preview/Staging Environment

Set these in Vercel → Project Settings → Environment Variables for **Preview**:

```env
# Database (same as production or separate staging DB)
DATABASE_URL="postgresql://user:pass@host/dbname"

# NextAuth
NEXTAUTH_SECRET="secure-random-32+-character-string"
NEXTAUTH_URL="https://preview-branch.vercel.app"

# Stripe TEST
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_test_..."

# Stripe Test Price IDs
STRIPE_PRICE_BASIC_TEST="price_test_1234567890_basic"
STRIPE_PRICE_PRO_TEST="price_test_1234567890_pro"
STRIPE_PRICE_GROWTH_TEST="price_test_1234567890_growth"

# App Configuration
APP_ENV="staging"

# Email
RESEND_API_KEY="re_..."
ADMIN_EMAIL="admin@yourdomain.com"
```

## Deployment Steps

### 1. Database Setup (Neon)

1. Create Neon project: https://console.neon.tech
2. Create production database
3. Copy connection string to `DATABASE_URL`
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### 2. Stripe Configuration

1. **Create Live Products & Prices**:
   - Go to Stripe Dashboard → Products
   - Create 3 products: Basic ($99/mo), Pro ($199/mo), Growth ($399/mo)
   - Copy Live price IDs to environment variables

2. **Webhook Setup**:
   - Stripe Dashboard → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy signing secret to `STRIPE_WEBHOOK_SECRET`

### 3. Vercel Deployment

1. **Connect Repository**:
   ```bash
   vercel --prod
   ```

2. **Set Environment Variables**:
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all production variables
   - Add preview variables with TEST Stripe keys

3. **Domain Setup**:
   - Vercel Dashboard → Project → Domains
   - Add custom domain
   - Configure DNS (A/CNAME records)

### 4. Security Headers

✅ Already configured in `next.config.js`:
- HSTS
- Content-Type Options
- Frame Options
- Referrer Policy
- Permissions Policy

### 5. SEO Configuration

✅ Already configured:
- Production: indexable robots.txt
- Staging: noindex robots.txt
- Sitemap at `/sitemap.xml`

## Monitoring & Health Checks

### Health Check Endpoint
- URL: `https://yourdomain.com/api/health`
- Returns: `{ ok: true, version, time, env }`

### Uptime Monitoring
Set up monitoring service to ping `/api/health` every 60 seconds:
- **UptimeRobot**: https://uptimerobot.com
- **Better Stack**: https://betterstack.com
- **Pingdom**: https://www.pingdom.com

### Analytics
✅ Enable Vercel Analytics in project settings

## Rollback Plan

### Quick Rollback
1. Vercel Dashboard → Project → Deployments
2. Find last working deployment
3. Click "Redeploy"

### Database Rollback
```bash
# If migration issues
npx prisma migrate resolve --rolled-back "migration_name"
npx prisma migrate deploy
```

### Environment Issues
- Check Vercel environment variables
- Verify Stripe keys are correct (live vs test)
- Confirm webhook URLs match

## Testing Checklist

### Pre-Deploy Tests
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] All routes load locally
- [ ] Stripe test checkout works

### Post-Deploy Tests
- [ ] Homepage loads (https://yourdomain.com)
- [ ] All major routes work (/plans, /dallas, /contact, etc.)
- [ ] No console errors
- [ ] Lighthouse scores: LCP ≤ 2.8s, CLS ≤ 0.05
- [ ] Live Stripe checkout completes
- [ ] Webhook creates subscription record
- [ ] Health check returns 200: `/api/health`
- [ ] Robots.txt correct for environment

### Performance Requirements
- **LCP (Largest Contentful Paint)**: ≤ 2.8s
- **CLS (Cumulative Layout Shift)**: ≤ 0.05  
- **INP (Interaction to Next Paint)**: ≤ 200ms

## Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Verify `DATABASE_URL` format
   - Check Neon database is accessible
   - Run `npx prisma migrate deploy`

2. **Stripe Webhook Failures**
   - Verify webhook URL matches deployment
   - Check `STRIPE_WEBHOOK_SECRET` is correct
   - Ensure raw body processing enabled

3. **Build Failures**
   - Check TypeScript errors
   - Verify all environment variables set
   - Check image optimization settings

4. **SEO Issues**
   - Verify `APP_ENV` is set correctly
   - Check robots.txt response
   - Confirm canonical URLs

## Support

- **Database**: Neon Console → Support
- **Hosting**: Vercel Support
- **Payments**: Stripe Support
- **Email**: Resend Support

## Version History

- **v1.0.0**: Initial production deployment
- Add new versions as you deploy updates