import { NextResponse } from 'next/server';

export async function GET() {
  const isProduction = process.env.APP_ENV === 'production';
  
  if (isProduction) {
    const robots = `User-agent: *
Allow: /

Sitemap: https://xenlix.ai/sitemap.xml`;
    
    return new NextResponse(robots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } else {
    // Staging/preview: block all crawlers
    const robots = `User-agent: *
Disallow: /`;
    
    return new NextResponse(robots, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}