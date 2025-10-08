import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Refund and Cancellation Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Order Cancellation</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">Before Shipment</h3>
            <p>
              You may cancel your order at any time before it has been shipped. To cancel an order, please 
              contact us immediately at mithilasattvikmakhana@gmail.com or call 9288205923. Once cancelled, 
              you will receive a full refund within 5-7 business days.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">After Shipment</h3>
            <p>
              Once an order has been shipped, it cannot be cancelled. However, you may refuse delivery and 
              request a return as per our return policy below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Return Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you are not satisfied, you may 
              return eligible products within 7 days of delivery.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Eligible Returns</h3>
            <p>Products may be returned if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product is damaged or defective upon delivery</li>
              <li>You received the wrong product</li>
              <li>The product is expired or nearing expiration (within 30 days of expiry)</li>
              <li>The packaging is tampered with or broken</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Non-Eligible Returns</h3>
            <p>We cannot accept returns if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The product packaging has been opened or the seal is broken (unless damaged/defective)</li>
              <li>More than 7 days have passed since delivery</li>
              <li>The product shows signs of use or consumption</li>
              <li>You changed your mind about the flavor or quantity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Return Process</h2>
            <p>To initiate a return:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact us at mithilasattvikmakhana@gmail.com or call 9288205923 within 7 days of delivery</li>
              <li>Provide your order number and reason for return</li>
              <li>Share photos of the product and packaging (if damaged or defective)</li>
              <li>Our team will review your request and provide return instructions</li>
              <li>Pack the product securely in its original packaging</li>
              <li>Ship the product to the address provided by our team</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Refund Process</h2>
            <p>
              Once we receive and inspect the returned product, we will send you an email notification regarding 
              the approval or rejection of your refund.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Approved Refunds</h3>
            <p>
              If approved, your refund will be processed and credited to your original payment method within 
              7-10 business days. You will receive an email confirmation once the refund is processed.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Rejected Refunds</h3>
            <p>
              If your refund is rejected, we will provide a detailed explanation and, if applicable, return 
              the product to you at your expense.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Shipping Costs</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>If the return is due to our error (damaged, defective, or wrong product), we will cover return shipping costs</li>
              <li>For all other eligible returns, the customer is responsible for return shipping costs</li>
              <li>Original shipping charges are non-refundable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Replacement Policy</h2>
            <p>
              If you received a damaged or defective product, you may request a replacement instead of a refund. 
              We will ship a replacement product at no additional cost once we confirm the issue.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. Partial Refunds</h2>
            <p>Partial refunds may be granted in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Product returned after 7 days but within 14 days of delivery (at our discretion)</li>
              <li>Product packaging shows minor damage but contents are intact</li>
              <li>Only part of your order was damaged or incorrect</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">8. Contact for Cancellations and Refunds</h2>
            <p>
              For any questions or to initiate a cancellation or return, please contact us:
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="font-semibold">Mithila Sattvik Makhana</p>
              <p>Email: mithilasattvikmakhana@gmail.com</p>
              <p>Phone: 9288205923</p>
              <p>Address: Darbhanga, Bihar, India</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
