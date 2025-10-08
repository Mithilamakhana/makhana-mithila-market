import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Shipping and Delivery Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Shipping Coverage</h2>
            <p>
              We currently ship our premium Mithila Sattvik Makhana products across India. We deliver to all 
              serviceable pin codes. During checkout, you can verify if we deliver to your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Delivery Timeline</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">Processing Time</h3>
            <p>
              Orders are typically processed within 1-2 business days after payment confirmation. Orders placed 
              on weekends or holidays will be processed on the next business day.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Delivery Time</h3>
            <p>Expected delivery times based on location:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Metro Cities:</strong> 3-5 business days</li>
              <li><strong>Major Cities:</strong> 5-7 business days</li>
              <li><strong>Other Areas:</strong> 7-10 business days</li>
              <li><strong>Remote Areas:</strong> 10-15 business days</li>
            </ul>
            <p className="mt-4">
              Please note that these are estimated delivery times and may vary due to unforeseen circumstances 
              such as weather conditions, festivals, or courier delays.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Shipping Charges</h2>
            <p>
              Shipping charges are calculated based on the weight of your order and the delivery location. 
              The exact shipping cost will be displayed at checkout before you confirm your order.
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="font-semibold">Free Shipping</p>
              <p>We offer free shipping on orders above ₹999 (before taxes) to all locations within India.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Order Tracking</h2>
            <p>
              Once your order is shipped, you will receive a tracking number via email and SMS. You can use 
              this tracking number to monitor your shipment's progress on the courier partner's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Packaging</h2>
            <p>
              We take great care in packaging our products to ensure they reach you in perfect condition:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All products are sealed and packed in food-grade packaging</li>
              <li>Products are placed in sturdy boxes with protective cushioning</li>
              <li>Boxes are sealed and labeled with fragile stickers where necessary</li>
              <li>We use eco-friendly packaging materials wherever possible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Delivery Attempts</h2>
            <p>
              Our courier partners will make up to 3 delivery attempts:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will receive a call or SMS before delivery attempt</li>
              <li>If delivery fails, the courier will leave a notice with contact information</li>
              <li>After 3 failed attempts, the order will be returned to us</li>
              <li>Returned orders due to failed delivery may incur reshipment charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. Delivery Address</h2>
            <p>
              Please ensure that you provide a complete and accurate delivery address:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Include apartment/house number, street name, and landmark</li>
              <li>Provide a working phone number for delivery coordination</li>
              <li>Ensure someone is available to receive the order during business hours</li>
              <li>Address changes after order placement may not be possible</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">8. Damaged or Lost Shipments</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">Damaged Package</h3>
            <p>
              If your package arrives damaged, please do not accept the delivery. Take photos of the damaged 
              package and contact us immediately at mithilasattvikmakhana@gmail.com. We will arrange for a 
              replacement at no additional cost.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Lost Shipment</h3>
            <p>
              If your shipment is marked as delivered but you haven't received it, please check with your 
              neighbors or building security. If you still can't locate it, contact us within 48 hours of the 
              delivery date. We will investigate with our courier partner and provide a resolution.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">9. Unserviceable Areas</h2>
            <p>
              If your location is not serviceable, you will be notified during checkout or via email after 
              order placement. In such cases, we will process a full refund within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">10. International Shipping</h2>
            <p>
              Currently, we do not offer international shipping. We only deliver within India. We are working 
              on expanding our services to international markets in the future.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">11. Contact Us</h2>
            <p>
              For any shipping-related queries or concerns, please contact us:
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="font-semibold">Mithila Sattvik Makhana</p>
              <p>Email: mithilasattvikmakhana@gmail.com</p>
              <p>Phone: 9288205923</p>
              <p>Address: Darbhanga, Bihar, India</p>
              <p className="mt-2">Customer Support Hours: Monday - Saturday, 10:00 AM - 6:00 PM IST</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
