"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userUser } from "@/app/Provider";
import { supabase } from "@/services/supabseClient";

function PayButton({ plan }) {
  const { user } = userUser();

  const onPaymentSuccess = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) + plan?.credits }) // Access credits from plan
      .eq("email", user?.email)
      .select();

    toast("Credit Updated");
    window.location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={plan?.isPopular ? "default" : "outline"}
          size="lg"
          className="w-full mt-6 text-base"
        >
          Purchase Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <div className="pt-4">
            <PayPalButtons
              style={{ layout: "vertical" }}
              onApprove={onPaymentSuccess}
              onCancel={() => toast("Payment Canceled")}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: plan?.price, // Access price from plan
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PayButton;
