# Production Deployment Checklist

## Pre-Deployment Setup ✅

### 1. Build Verification
- [x] Production build passes (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint blocking errors
- [x] All imports resolved
- [x] Client/server component boundaries correct

### 2. Environment Configuration
- [x] `.env.example` created with all required variables
- [x] Security headers configured in `next.config.js`
- [x] Robots.txt handles staging/production indexing
- [x] Health check endpoint available at `/api/health`

### 3. Database Schema
- [x] PostgreSQL schema ready in `prisma/schema.prisma`
- [x] Stripe billing models included (User, Subscription)
- [x] Migration files generated
- [ ] Production database created (Neon)
- [ ] Migrations applied to production

### 4. API Integration
- [x] Stripe checkout API (`/api/checkout`)
- [x] Stripe webhook handler (`/api/stripe/webhook`)
- [x] Health monitoring endpoint
- [x] Contact form with Resend integration
- [ ] Stripe live mode configured
- [ ] Webhook endpoints registered with Stripe

## Deployment Phase 🚀

### 5. Vercel Setup
- [ ] Create Vercel project
- [ ] Connect GitHub repository
- [ ] Configure production environment variables
- [ ] Configure preview environment variables
- [ ] Set up custom domain
- [ ] Enable automatic deployments

### 6. Environment Variables Setup

#### Required Production Variables:
```env
# App
APP_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Database
DATABASE_URL=postgresql://...

# Auth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=crypto-random-string

# Stripe Live
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRODUCTION=price_live_...

# Email
RESEND_API_KEY=re_...
```

#### Required Staging Variables:
```env
# App
APP_ENV=staging
NEXT_PUBLIC_APP_URL=https://staging-your-domain.com

# Database
DATABASE_URL=postgresql://staging...

# Auth
NEXTAUTH_URL=https://staging-your-domain.com
NEXTAUTH_SECRET=staging-secret

# Stripe Test
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
STRIPE_PRICE_ID_STAGING=price_test_...

# Email
RESEND_API_KEY=re_...
```

### 7. Stripe Configuration
- [ ] Create live mode products and prices
- [ ] Configure webhook endpoints:
  - Production: `https://your-domain.com/api/stripe/webhook`
  - Staging: `https://staging-your-domain.com/api/stripe/webhook`
- [ ] Test checkout flow
- [ ] Verify subscription management
- [ ] Test webhook event handling

### 8. Domain & SSL
- [ ] Point custom domain to Vercel
- [ ] Verify SSL certificate
- [ ] Test HTTPS redirect
- [ ] Update CORS settings if needed

## Post-Deployment Testing ✅

### 9. Core Functionality
- [ ] Homepage loads correctly
- [ ] User registration/login works
- [ ] Dashboard authentication
- [ ] Social proof components display
- [ ] Case studies load with images
- [ ] Contact form submissions
- [ ] Health check endpoint responds

### 10. Billing Integration
- [ ] Checkout flow works end-to-end
- [ ] Stripe webhook receives events
- [ ] User subscription status updates
- [ ] Payment confirmation emails
- [ ] Subscription cancellation flow

### 11. SEO & Performance
- [ ] Robots.txt allows production crawling
- [ ] Meta tags render correctly
- [ ] JSON-LD schema validates
- [ ] Page load speeds acceptable
- [ ] Core Web Vitals pass

### 12. Security & Monitoring
- [ ] Security headers active
- [ ] HTTPS enforcement
- [ ] Environment separation works
- [ ] Staging is noindex
- [ ] Production is indexable
- [ ] Health monitoring setup

## Rollback Procedures 🔄

### Emergency Rollback
1. **Vercel Console**: Revert to previous deployment
2. **Database**: Restore from backup if schema changed
3. **Stripe**: Disable webhooks if billing issues
4. **DNS**: Switch to maintenance page if needed

### Safe Rollback Process
1. Check current deployment health
2. Identify specific issue (app, database, payments)
3. Use Vercel's instant rollback feature
4. Verify rollback success with health checks
5. Communicate status to users if needed

## Monitoring Setup 📊

### Uptime Monitoring
- [ ] Configure uptime monitoring service
- [ ] Set up alerting for downtime
- [ ] Monitor `/api/health` endpoint
- [ ] Track response times

### Error Tracking
- [ ] Set up error monitoring (Sentry, LogRocket)
- [ ] Configure alert thresholds
- [ ] Monitor Stripe webhook failures
- [ ] Track user signup/login issues

### Performance Monitoring
- [ ] Core Web Vitals tracking
- [ ] Database query performance
- [ ] API response times
- [ ] Checkout conversion rates

## Maintenance Procedures 🔧

### Regular Tasks
- Weekly: Review error logs and performance metrics
- Monthly: Database backup verification
- Quarterly: Security audit and dependency updates
- As needed: Scale database/hosting based on usage

### Update Process
1. Test changes in staging environment
2. Verify database migrations work
3. Deploy to production during low-traffic hours
4. Monitor deployment for issues
5. Be ready to rollback if problems occur

---

**Status**: Ready for database setup and Vercel deployment 🚀