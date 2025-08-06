"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import BillingCard from "./_components/BillingCards";
import { userUser } from "@/app/Provider";

function Billing() {
  const { user } = userUser();
  const [widths, setWidths] = useState([0, 0, 0]);

  useEffect(() => {
    // Set all random widths at once on client side
    setWidths([
      Math.random() * 60 + 40,
      Math.random() * 60 + 40,
      Math.random() * 60 + 40,
    ]);
  }, []);

  return (
    <div className="p-6 space-y-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Alcruiter</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage your Payment and credits
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8">
        {/* Credits Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Your Credits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400">
                  Current usage and remaining credits
                </p>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold">
                    {user?.credits} interviews left
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Expires in 30 days
                </p>
              </div>
              <Button
                className="w-full text-[#6C63FF] hover:bg-[#6C63FF]/10"
                variant="outline"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add More Credits
              </Button>
            </CardContent>
          </Card>

          {/* Right Side - Credit Health Indicator */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Credit Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Radial progress indicator */}
                  <div className="flex justify-center">
                    <div className="relative h-40 w-40">
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                        />
                        {/* Foreground progress (partial) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#6C63FF"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="283"
                          strokeDashoffset="70"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-2xl font-bold">Good</span>
                        <span className="text-sm text-gray-500">Status</span>
                      </div>
                    </div>
                  </div>

                  {/* Health indicators */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="mx-auto h-3 w-16 bg-[#6C63FF]/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#6C63FF] rounded-full"
                          style={{ width: `${widths[0]}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Utilization</p>
                    </div>
                    <div>
                      <div className="mx-auto h-3 w-16 bg-[#6C63FF]/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#6C63FF] rounded-full"
                          style={{ width: `${widths[1]}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Efficiency</p>
                    </div>
                    <div>
                      <div className="mx-auto h-3 w-16 bg-[#6C63FF]/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#6C63FF] rounded-full"
                          style={{ width: `${widths[2]}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Longevity</p>
                    </div>
                  </div>

                  {/* Suggestion */}
                  <div className="text-center text-sm text-gray-500">
                    Your credit health is in good standing. Consider monitoring
                    weekly for optimal usage.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Billing Cards Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Available Plans</h2>
          <BillingCard />
        </div>
      </div>
    </div>
  );
}

export default Billing;
