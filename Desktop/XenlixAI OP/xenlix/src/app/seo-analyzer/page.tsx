"use client";

import { useState } from 'react';
import { BusinessProfile, SEOAnalysisResult } from '@/types/seo';

export default function SEOAnalyzer() {
  const [businessProfile, setBusinessProfile] = useState<Partial<BusinessProfile>>({
    businessName: '',
    industry: '',
    services: [],
    city: '',
    state: '',
    description: '',
    contact: {
      phone: '',
      email: '',
      address: ''
    }
  });
  
  const [analysisResult, setAnalysisResult] = useState<SEOAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof BusinessProfile, value: any) => {
    setBusinessProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setBusinessProfile(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleServicesChange = (services: string) => {
    const serviceArray = services.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setBusinessProfile(prev => ({
      ...prev,
      services: serviceArray
    }));
  };

  const analyzeSEO = async () => {
    if (!businessProfile.businessName || !businessProfile.industry) {
      setError('Business name and industry are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/seo/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessProfile),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data.data);
      } else {
        setError(data.error || 'Failed to analyze SEO');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/seo/recommendations?demo=true');
      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data.data);
        // Also populate the form with demo data
        setBusinessProfile(data.data.businessProfile);
      } else {
        setError('Failed to load demo');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SEO Recommendation Engine
          </h1>
          <p className="text-lg text-gray-600">
            Analyze your business profile and get comprehensive SEO recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Business Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessProfile.businessName || ''}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Business Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Industry *
                </label>
                <select
                  value={businessProfile.industry || ''}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Industry</option>
                  <option value="automotive">Automotive</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="home services">Home Services</option>
                  <option value="legal">Legal</option>
                  <option value="fitness">Fitness</option>
                  <option value="beauty">Beauty</option>
                  <option value="technology">Technology</option>
                  <option value="real estate">Real Estate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services (comma-separated)
                </label>
                <input
                  type="text"
                  value={businessProfile.services?.join(', ') || ''}
                  onChange={(e) => handleServicesChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="service 1, service 2, service 3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={businessProfile.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={businessProfile.state || ''}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Description
                </label>
                <textarea
                  value={businessProfile.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your business..."
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                <input
                  type="tel"
                  value={businessProfile.contact?.phone || ''}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                />
                <input
                  type="email"
                  value={businessProfile.contact?.email || ''}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                />
                <input
                  type="text"
                  value={businessProfile.contact?.address || ''}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Business Address"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={analyzeSEO}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Analyzing...' : 'Analyze SEO'}
                </button>
                <button
                  onClick={loadDemo}
                  disabled={loading}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Load Demo
                </button>
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">SEO Recommendations</h2>
            
            {!analysisResult && !loading && (
              <div className="text-gray-500 text-center py-8">
                Enter your business information and click "Analyze SEO" to get recommendations
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Generating SEO recommendations...</p>
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                {/* Meta Tags Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Meta Tags</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="mb-2">
                      <span className="font-medium">Recommended Title:</span>
                      <p className="text-sm text-gray-700 mt-1">{analysisResult.recommendations.metaTags.title.primary}</p>
                    </div>
                    <div>
                      <span className="font-medium">Recommended Description:</span>
                      <p className="text-sm text-gray-700 mt-1">{analysisResult.recommendations.metaTags.description.primary}</p>
                    </div>
                  </div>
                </div>

                {/* Headings Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Heading Structure</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="mb-2">
                      <span className="font-medium">H1:</span>
                      <p className="text-sm text-gray-700 mt-1">{analysisResult.recommendations.headings.h1.primary}</p>
                    </div>
                    <div>
                      <span className="font-medium">Suggested H2s:</span>
                      <ul className="text-sm text-gray-700 mt-1 list-disc list-inside">
                        {analysisResult.recommendations.headings.h2.suggestions.slice(0, 3).map((h2, index) => (
                          <li key={index}>{h2}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Keywords Section */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Primary Keywords</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.recommendations.keywordStrategy.primary.map((keyword, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {keyword.keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Local Content Ideas */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Local Content Ideas</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ul className="text-sm text-gray-700 space-y-1">
                      {analysisResult.recommendations.localContent.localTopics.slice(0, 3).map((topic, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          {topic.topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Plan */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Immediate Action Items</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <ul className="text-sm text-gray-700 space-y-2">
                      {analysisResult.actionPlan.immediate.map((action, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`w-2 h-2 rounded-full mr-2 mt-2 ${
                            action.impact === 'high' ? 'bg-red-500' : 
                            action.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                          <div>
                            <span className="font-medium">{action.task}</span>
                            <div className="text-xs text-gray-500">
                              Impact: {action.impact} | Effort: {action.effort}/10
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Download Full Report */}
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(analysisResult, null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'seo-analysis-report.json';
                    link.click();
                  }}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                  Download Full Report (JSON)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}