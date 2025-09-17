import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const startTime = Date.now();
    
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    const dbResponseTime = Date.now() - startTime;
    
    // Get package.json version
    const packageJson = require('../../../../package.json');
    
    const healthData = {
      ok: true,
      status: "healthy",
      time: new Date().toISOString(),
      mode: process.env.BILLING_MODE || "unknown",
      version: packageJson.version,
      env: process.env.APP_ENV || 'development',
      uptime: process.uptime(),
      database: {
        connected: true,
        responseTime: `${dbResponseTime}ms`
      },
      services: {
        nextjs: "15.5.3",
        node: process.version,
        platform: process.platform
      }
    };

    return NextResponse.json(healthData, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    const errorData = {
      ok: false,
      status: "unhealthy",
      time: new Date().toISOString(),
      mode: process.env.BILLING_MODE || "unknown",
      version: "unknown",
      env: process.env.APP_ENV || 'development',
      error: error instanceof Error ? error.message : "Unknown error",
      database: {
        connected: false,
        error: "Database connection failed"
      }
    };

    return NextResponse.json(errorData, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache', 
        'Expires': '0'
      }
    });
  } finally {
    await prisma.$disconnect();
  }
}