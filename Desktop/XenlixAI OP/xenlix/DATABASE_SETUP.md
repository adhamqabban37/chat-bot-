# Database Setup Guide

## Production Database Setup (Neon PostgreSQL)

### Step 1: Create Neon Database

1. Go to [Neon](https://neon.tech)
2. Sign up/sign in
3. Create a new project named "xenlix-production"
4. Copy the connection string (it will look like this):
   ```
   postgresql://username:password@host:5432/database?sslmode=require
   ```

### Step 2: Set Up Staging Database (Optional)

1. In the same Neon project, create a branch called "staging"
2. Copy the staging connection string

### Step 3: Update Environment Variables

#### Production (.env.production)
```env
# Database
DATABASE_URL="your-neon-production-connection-string"

# App Environment
APP_ENV=production

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-super-secure-random-string

# Stripe (Live mode)
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_PRODUCTION=price_live_...

# Email
RESEND_API_KEY=re_...

# Base URL
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

#### Staging (.env.staging)
```env
# Database
DATABASE_URL="your-neon-staging-connection-string"

# App Environment
APP_ENV=staging

# NextAuth
NEXTAUTH_URL=https://staging-your-domain.com
NEXTAUTH_SECRET=your-staging-secret

# Stripe (Test mode)
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_test_...
STRIPE_PRICE_ID_STAGING=price_test_...

# Email
RESEND_API_KEY=re_...

# Base URL
NEXT_PUBLIC_APP_URL=https://staging-your-domain.com
```

### Step 4: Run Database Migrations

After setting up the database connection strings:

```bash
# Set the DATABASE_URL environment variable
$env:DATABASE_URL="your-neon-connection-string"

# Generate Prisma client
pnpm prisma generate

# Run migrations to create tables
pnpm prisma db push

# (Optional) Seed the database
pnpm prisma db seed
```

### Step 5: Verify Database Setup

```bash
# Check database connection
pnpm prisma studio

# Test in browser at http://localhost:5555
```

## Migration Notes

- **From SQLite to PostgreSQL**: The schema has been updated to use PostgreSQL-compatible syntax
- **Stripe Integration**: Added User.stripeCustomerId and Subscription table for billing
- **Production Ready**: Schema includes proper indexing and constraints

## Security Considerations

- Use connection pooling in production
- Enable SSL mode (already configured)
- Regular backups (Neon handles this automatically)
- Monitor connection limits

## Troubleshooting

### Common Issues:

1. **Connection timeout**: Check firewall settings
2. **SSL errors**: Ensure `sslmode=require` in connection string
3. **Migration errors**: Drop and recreate database if needed
4. **Prisma client errors**: Run `pnpm prisma generate` after schema changes

### Database URL Format:
```
postgresql://username:password@host:port/database?sslmode=require
```

Example:
```
postgresql://alexuser:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```