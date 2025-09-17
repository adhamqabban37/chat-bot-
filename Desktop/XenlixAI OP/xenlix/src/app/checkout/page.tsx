"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [billingMode, setBillingMode] = useState("sandbox");

  // Check billing mode on mount
  useEffect(() => {
    fetch('/api/billing-mode')
      .then(res => res.json())
      .then(data => setBillingMode(data.mode))
      .catch(() => setBillingMode("sandbox"));
  }, []);

  const planDetails = {
    basic: { name: "Basic Plan", price: "$29/month" },
    pro: { name: "Pro Plan", price: "$79/month" },
    growth: { name: "Growth Plan", price: "$199/month" }
  };

  const selectedPlan = planId ? planDetails[planId as keyof typeof planDetails] : null;

  const handleCheckout = async () => {
    if (!planId) return;
    
    setIsProcessing(true);
    setError("");
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();
      
      if (response.ok) {
        if (data.sandbox) {
          // Sandbox mode - redirect directly
          router.push(data.url);
        } else {
          // Stripe mode - redirect to Stripe
          window.location.href = data.url;
        }
      } else {
        setError(data.error || 'Checkout failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Checkout</h1>
            {planId ? (
              <div className="space-y-2">
                <p className="text-lg sm:text-xl text-gray-300">
                  Checkout for Plan: <span className="text-purple-400 font-semibold">{planId}</span>
                </p>
                {selectedPlan && (
                  <div className="bg-slate-700/50 rounded-lg p-3 sm:p-4 mt-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{selectedPlan.name}</h3>
                    <p className="text-xl sm:text-2xl font-bold text-purple-400">{selectedPlan.price}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-300">No plan selected</p>
            )}
          </div>

          {planId && (
            <div className="space-y-6">
              <div className="border-t border-slate-600 pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Order Summary</h3>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm sm:text-base text-gray-300">Plan</span>
                  <span className="text-sm sm:text-base text-white">{selectedPlan?.name}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-slate-600 mt-4 pt-4">
                  <span className="text-base sm:text-lg font-semibold text-white">Total</span>
                  <span className="text-base sm:text-lg font-bold text-purple-400">{selectedPlan?.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                {error && (
                  <div className="bg-red-600/20 border border-red-600 rounded-lg p-3 text-red-200 text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className={`${billingMode === 'sandbox' ? 'bg-amber-600/20 border-amber-600' : 'bg-blue-600/20 border-blue-600'} border rounded-lg p-3`}>
                    <h4 className={`${billingMode === 'sandbox' ? 'text-amber-200' : 'text-blue-200'} font-medium mb-2 flex items-center gap-2`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {billingMode === 'sandbox' ? 'Sandbox Mode' : billingMode === 'test-stripe' ? 'Test Mode' : 'Live Mode'}
                    </h4>
                    <p className={`${billingMode === 'sandbox' ? 'text-amber-100' : 'text-blue-100'} text-sm`}>
                      {billingMode === 'sandbox' 
                        ? 'Free testing mode with 14-day trial access to all features.'
                        : billingMode === 'test-stripe'
                        ? 'Test payment processing with Stripe test cards.'
                        : 'Live payment processing with real credit cards.'
                      }
                    </p>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className={`w-full ${
                      billingMode === 'sandbox' 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    } text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                            billingMode === 'sandbox' 
                              ? "M13 10V3L4 14h7v7l9-11h-7z" 
                              : "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          } />
                        </svg>
                        {billingMode === 'sandbox' 
                          ? 'Start Free Trial (14 Days)'
                          : `Continue to ${billingMode === 'test-stripe' ? 'Test ' : ''}Payment`
                        }
                      </>
                    )}
                  </button>
                </div>
                
                <p className="text-center text-sm text-gray-400">
                  {billingMode === 'sandbox' 
                    ? 'No payment required • Full feature access'
                    : 'Secure checkout powered by Stripe'
                  }
                </p>
              </div>
            </div>
          )}

          {!planId && (
            <div className="text-center">
              <p className="text-gray-400 mb-4">Please select a plan to continue</p>
              <a
                href="/plans"
                className="inline-block bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                View Plans
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}