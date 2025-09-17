import Link from "next/link";
import { Metadata } from "next";
import Testimonials from "./(components)/Testimonials";
import LogoRow from "./(components)/LogoRow";
import JsonLd from "./(components)/JsonLd";
import { orgAggregateRatingJsonLd, calculateAggregateRating } from "./(lib)/schema";

// Testimonials data for schema calculation
const testimonials = [
  { rating: 5 }, { rating: 5 }, { rating: 5 }, 
  { rating: 5 }, { rating: 5 }, { rating: 5 }
];

export const metadata: Metadata = {
  title: "XenlixAI | AI Marketing Automation Platform for Small Business",
  description: "Scale your business with AI-driven marketing automation, website building, SEO optimization, and ad creation. Get found in AI search engines like ChatGPT and Gemini.",
  keywords: "AI marketing automation, AI website builder, AI SEO optimization, small business marketing, ChatGPT optimization, AI search visibility",
};

export default function Home() {
  const { average, count } = calculateAggregateRating(testimonials);
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is XenlixAI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "XenlixAI is an AI-powered marketing platform that helps businesses create websites, optimize SEO, and generate ad campaigns automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Who is XenlixAI for?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Small to medium businesses, startups, and entrepreneurs looking to scale quickly with AI-driven marketing automation."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <JsonLd data={faqSchema} id="faq-schema" />
      <JsonLd data={orgAggregateRatingJsonLd(average, count)} id="aggregate-rating-schema" />
      
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white">
            XenlixAI
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/ai-seo-automation" className="text-gray-300 hover:text-white transition-colors">
              SEO Automation
            </Link>
            <Link href="/ai-website-builder" className="text-gray-300 hover:text-white transition-colors">
              Website Builder
            </Link>
            <Link href="/vs-competitors" className="text-gray-300 hover:text-white transition-colors">
              Compare
            </Link>
            <Link href="/plans" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Scale Your Business with AI Marketing
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            AI-powered marketing automation platform that builds websites, optimizes SEO, creates ads, and gets you found in ChatGPT, Gemini, and other AI search engines.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/plans"
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border border-purple-400 text-purple-400 font-bold py-4 px-8 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200 text-lg"
            >
              Book a Demo
            </Link>
          </div>
          <p className="text-gray-400 mt-4">14-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Everything You Need to Dominate AI Search
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Website Builder</h3>
              <p className="text-gray-300">
                Build professional websites in minutes with our one-click AI builder. Mobile-optimized and SEO-ready.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">SEO on Autopilot</h3>
              <p className="text-gray-300">
                Automated keyword research, technical SEO fixes, and schema markup to rank higher in search engines.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Ad Creator</h3>
              <p className="text-gray-300">
                Generate high-converting ad copy and creatives for Facebook, Google, and other platforms automatically.
              </p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Analytics Dashboard</h3>
              <p className="text-gray-300">
                Real-time insights on website performance, SEO rankings, and ad campaign ROI in one dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Row */}
      <LogoRow />

      {/* Testimonials */}
      <Testimonials />

      {/* Local Services */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Local AI Marketing Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We help businesses dominate local AI search results and grow their customer base
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link 
              href="/dallas"
              className="group bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200">
                Dallas AI Marketing
              </h3>
              <p className="text-gray-300 mb-4">
                Answer-Engine Optimization + AI ads for Dallas businesses. Get found in ChatGPT, Gemini, and Copilot.
              </p>
              <div className="text-blue-400 font-medium group-hover:text-blue-200">
                Learn More →
              </div>
            </Link>

            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6">
              <div className="text-3xl mb-4">🌎</div>
              <h3 className="text-xl font-bold text-white mb-3">
                More Cities Coming
              </h3>
              <p className="text-gray-300 mb-4">
                Houston, Austin, San Antonio, and more markets launching soon.
              </p>
              <div className="text-gray-400">
                Stay tuned
              </div>
            </div>

            <Link 
              href="/case-studies"
              className="group bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-6 hover:from-green-700 hover:to-teal-700 transition-all duration-300"
            >
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-200">
                Local Success Stories
              </h3>
              <p className="text-gray-300 mb-4">
                See how local businesses tripled leads with AI marketing and answer-engine optimization.
              </p>
              <div className="text-green-400 font-medium group-hover:text-green-200">
                View Case Studies →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Scale with AI Marketing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses automating their marketing and dominating AI search results.
          </p>
          <Link
            href="/plans"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 inline-block text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
