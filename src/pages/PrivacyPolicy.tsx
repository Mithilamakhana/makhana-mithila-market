import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-12 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">1. Introduction</h2>
            <p>
              Mithila Sattvik Makhana ("we," "us," or "our") is committed to protecting your privacy. This Privacy 
              Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website and purchase our products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Billing and shipping address</li>
              <li>Payment information (processed securely through our payment gateway)</li>
              <li>Order history and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Non-Personal Information</h3>
            <p>We may also collect non-personal information such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>IP address</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing and fulfilling your orders</li>
              <li>Communicating with you about your orders and our products</li>
              <li>Improving our website and customer service</li>
              <li>Sending promotional emails about new products and special offers (with your consent)</li>
              <li>Detecting and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">4. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your 
              information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist us in operating our website and conducting our business</li>
              <li>Payment processors for secure transaction processing</li>
              <li>Shipping companies for order delivery</li>
              <li>Law enforcement or regulatory authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site 
              traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where we rely on consent to process your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 18 years of age. We do not knowingly collect 
              personal information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us:
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

export default PrivacyPolicy;
