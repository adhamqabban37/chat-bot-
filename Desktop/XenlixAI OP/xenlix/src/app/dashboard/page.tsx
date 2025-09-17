import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Card from "./_components/Card";
import Kpi from "./_components/Kpi";
import Empty from "./_components/Empty";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { SignOutButton } from "./_components/SignOutButton";
import SEOGuidanceSection from "./_components/SEOGuidanceSection";
import { Suspense } from "react";
import SandboxSuccessBanner from "./_components/SandboxSuccessBanner";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Server-side authentication check
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    redirect("/signin");
  }

  // Fetch user data server-side for better performance
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    // include: {
    //   guidances: {
    //     orderBy: { createdAt: 'desc' },
    //     take: 3,
    //   },
    //   adDrafts: {
    //     orderBy: { createdAt: 'desc' },
    //     take: 3,
    //   },
    // },
  });

  if (!user) {
    redirect("/signin");
  }

  // Calculate stats - using mock data for now
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const mockGuidances: any[] = []; // user.guidances || [];
  const mockAdDrafts: any[] = []; // user.adDrafts || [];
  const recentGuidances = mockGuidances.filter((g: any) => g.createdAt > thirtyDaysAgo);
  const recentAdDrafts = mockAdDrafts.filter((d: any) => d.createdAt > thirtyDaysAgo);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sandbox Success Message */}
      <Suspense fallback={null}>
        <SandboxSuccessBanner />
      </Suspense>

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Welcome back, {user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/ai/guidance"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Get AEO Guidance
              </Link>
              <Link
                href="/tools/json-ld"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                JSON-LD Generator
              </Link>
              <Link
                href="/schema-generator"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Schema Generator
              </Link>
              <Link
                href="/city-management"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                City Manager
              </Link>
              <Link
                href="/ads"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Create Ads
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Kpi
            title="Subscription"
            value="Pro Plan"
            helpText="Active until next month"
            trend="neutral"
          />
          <Kpi
            title="Total Guidances"
            value={mockGuidances.length.toString()}
            helpText={`${recentGuidances.length} this month`}
            trend={recentGuidances.length > 0 ? "up" : "neutral"}
          />
          <Kpi
            title="Total Ad Drafts"
            value={mockAdDrafts.length.toString()}
            helpText={`${recentAdDrafts.length} this month`}
            trend={recentAdDrafts.length > 0 ? "up" : "neutral"}
          />
          <Kpi
            title="Account Status"
            value="Active"
            helpText="All systems operational"
            trend="neutral"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent AEO Guidances */}
          <Card
            title="Recent AEO Guidance"
            description="Latest automated guidance for your campaigns"
            action={
              <Link 
                href="/ai/guidance"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Get New Guidance →
              </Link>
            }
          >
            {mockGuidances.length > 0 ? (
              <div className="space-y-4">
                {mockGuidances.map((guidance: any) => {
                  const output = guidance.output as any;
                  return (
                    <div 
                      key={guidance.id}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {output?.guidance?.summary || "AEO Analysis"}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {output?.guidance?.keyRecommendations?.[0] || "Campaign optimization recommendations"}
                          </p>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(guidance.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty
                title="No guidance yet"
                description="Get AI-powered recommendations for your campaigns"
                actionLabel="Get Your First Guidance"
                actionHref="/ai/guidance"
              />
            )}
          </Card>

          {/* Recent Ad Drafts */}
          <Card
            title="Recent Ad Drafts"
            description="Latest AI-generated ad campaigns"
            action={
              <Link 
                href="/ads"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Create New Ads →
              </Link>
            }
          >
            {mockAdDrafts.length > 0 ? (
              <div className="space-y-4">
                {mockAdDrafts.map((adDraft: any) => {
                  const bundle = adDraft.bundle as any;
                  const drafts = bundle?.drafts || [];
                  return (
                    <div 
                      key={adDraft.id}
                      className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            Ad Bundle - {drafts.length} {drafts.length === 1 ? 'draft' : 'drafts'}
                          </h4>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {drafts.slice(0, 3).map((draft: any, index: number) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                              >
                                {draft.channel}
                              </span>
                            ))}
                            {drafts.length > 3 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                +{drafts.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(adDraft.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <Empty
                title="No ad drafts yet"
                description="Create AI-powered ads for Google, Bing, Meta, and TikTok"
                actionLabel="Create Your First Ads"
                actionHref="/ads"
              />
            )}
          </Card>
        </div>

        {/* SEO Optimization Guide */}
        <div className="mt-8">
          <SEOGuidanceSection />
        </div>

        {/* Quick Actions */}
        <Card
          title="Quick Actions"
          description="Common tasks to get you started"
          className="mt-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/ai/guidance"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">AEO Guidance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get optimization tips</p>
                </div>
              </div>
            </Link>

            <Link
              href="/ads"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Create Ads</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Generate campaign drafts</p>
                </div>
              </div>
            </Link>

            <Link
              href="/schema-generator"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Schema Generator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create JSON-LD markup</p>
                </div>
              </div>
            </Link>

            <Link
              href="/city-management"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900/50 transition-colors">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">City Manager</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage local SEO markets</p>
                </div>
              </div>
            </Link>

            <Link
              href="/profile"
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Profile Setup</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update business info</p>
                </div>
              </div>
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}