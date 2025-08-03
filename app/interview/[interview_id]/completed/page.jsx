import React from "react";
import { Home, ArrowRight, CheckCircle } from "lucide-react";
import Image from "next/image";

const InterviewComplete = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden p-8 sm:p-10">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Interview Complete!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for participating in the AI-driven interview process
            </p>
          </div>

          {/* Interview Illustration */}
          <div className="mt-8 mb-6 mx-auto w-full max-w-md">
            <div className="relative aspect-square w-full h-90 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src="/interview-complete.jpg"
                alt="Interview completed illustration"
                fill
                className="object-center"
                priority
              />
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                What's Next?
              </h2>
              <p className="text-gray-600">
                Our team will review your interview responses and contact you
                regarding next steps.
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Response within 2-3 business days
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark shadow-sm transition-colors cursor-pointer">
              <Home className="mr-2 h-5 w-5" />
              Return to Homepage
            </button>
            <button className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 border-gray-300 shadow-sm transition-colors cursor-pointer">
              View Other Opportunities
              <ArrowRight className="ml-2 h-5 w-5" />
            </button> 
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Alcruiter. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default InterviewComplete;
