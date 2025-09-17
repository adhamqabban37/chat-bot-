# Contact Form Setup Instructions

## Required Environment Variables

To enable email functionality for the contact form, add these variables to your `.env` file:

```env
# Resend API Key (get from https://resend.com)
RESEND_API_KEY=your_resend_api_key_here

# Admin email for receiving contact form notifications
ADMIN_EMAIL=admin@xenlix.ai

# Optional: Custom domain for sending emails (if you have one set up with Resend)
EMAIL_FROM_DOMAIN=xenlix.ai
```

## Setup Steps

1. **Sign up for Resend**
   - Go to [https://resend.com](https://resend.com)
   - Create an account
   - Get your API key from the dashboard

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Resend API key
   - Set your admin email address

3. **Test the Contact Form**
   - Navigate to `/contact`
   - Fill out and submit the form
   - Check that leads are saved to the database
   - Verify emails are sent (if Resend is configured)

## Features Included

### Contact Form
- ✅ Form validation (client-side)
- ✅ Database storage (Prisma + SQLite)
- ✅ Email notifications to admin
- ✅ Auto-reply to user
- ✅ Loading states and error handling
- ✅ Success/error messages

### Demo Scheduling
- ✅ Calendly iframe embed
- ✅ Benefits list for demos
- ✅ Professional styling

### SEO Optimization
- ✅ Page metadata (title, description, keywords)
- ✅ Open Graph tags
- ✅ Twitter cards
- ✅ JSON-LD schema markup
- ✅ Canonical URLs

### Email Templates
- ✅ Professional HTML email templates
- ✅ Admin notification email
- ✅ User auto-reply email
- ✅ Mobile-responsive design

## Navigation Updates

The contact page has been added to the main navigation:
- Header navigation link
- Homepage CTA button changed from "See How It Works" to "Book a Demo"

## Database Schema

The `Lead` model includes:
- `id` - Unique identifier
- `name` - Contact's full name
- `email` - Contact's email address
- `company` - Company name (optional)
- `message` - Contact message (optional)
- `createdAt` - Timestamp

## Error Handling

The contact form includes comprehensive error handling:
- Form validation errors
- API request failures
- Email sending failures (graceful degradation)
- Database connection issues

## Without Email Service

If you don't configure Resend, the contact form will still:
- Validate input
- Save leads to the database
- Show success messages
- Log email errors to console (but continue processing)

This ensures the lead capture functionality works even if email notifications fail.