import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to Mithila Sattvik Makhana. These Terms and Conditions govern your use of our website 
              and the purchase of products from us. By accessing our website and placing an order, you agree 
              to be bound by these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Use of Website</h2>
            <p>
              You may use our website for lawful purposes only. You must not use our website:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>In any way that breaches any applicable local, national, or international law or regulation</li>
              <li>To transmit any unsolicited or unauthorized advertising or promotional material</li>
              <li>To knowingly transmit any data or material that contains viruses or any other harmful programs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. Product Information</h2>
            <p>
              We strive to ensure that all information on our website is accurate. However, we do not warrant 
              that product descriptions, images, or other content is accurate, complete, reliable, current, or 
              error-free. All products are subject to availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Pricing and Payment</h2>
            <p>
              All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless otherwise 
              stated. We reserve the right to change prices at any time without prior notice. Payment must be made 
              at the time of purchase through our secure payment gateway.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Orders and Acceptance</h2>
            <p>
              When you place an order, you will receive an email acknowledging receipt of your order. This 
              acknowledgement does not constitute acceptance of your order. We reserve the right to refuse any 
              order for any reason, including but not limited to product availability, errors in pricing, or 
              suspected fraud.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and software, is the property 
              of Mithila Sattvik Makhana and is protected by copyright and other intellectual property laws. You 
              may not reproduce, distribute, or create derivative works from any content without our express 
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Mithila Sattvik Makhana shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising out of or relating to your use of the 
              website or products purchased.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">8. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. 
              Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts 
              in Darbhanga, Bihar.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective 
              immediately upon posting on the website. Your continued use of the website after any changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
