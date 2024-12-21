import React, { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { supabase } from "../../lib/supabase";

interface PaymentProcessorProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentProcessor({
  bookingId,
  amount,
  onSuccess,
  onCancel,
}: PaymentProcessorProps) {
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // In a real application, you would integrate with a payment gateway here
      // For this demo, we'll simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Record the payment in our database
      await supabase.from("payments").insert({
        booking_id: bookingId,
        amount,
        status: "completed",
        payment_method: "credit_card",
      });

      onSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Payment Details</h2>
          <Lock className="text-gray-500" />
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium">Total Amount</p>
          <p className="text-3xl font-bold">${amount}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                required
                pattern="[0-9]{16}"
                maxLength={16}
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <CreditCard
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                maxLength={5}
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                required
                pattern="[0-9]{3,4}"
                maxLength={4}
                placeholder="123"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cardholder Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onCancel}
              disabled={processing}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          This is a demo payment form. No real payments will be processed.
        </p>
      </div>
    </div>
  );
}
