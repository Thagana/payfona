"use client";

import { useState } from "react";

export default function PayfonaLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2)
      errors.name = "Name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Valid email is required";
    if (!formData.topic) errors.topic = "Subject is required";
    if (!formData.message || formData.message.length < 10)
      errors.message = "Message is required (min 10 characters)";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const payload = await response.json();
      if (payload.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", topic: "", message: "" });
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="payfona-landing">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600;700;800&display=swap");

        .payfona-landing {
          --color-bg: #0a0e1a;
          --color-surface: #151b2e;
          --color-primary: #ff6b35;
          --color-secondary: #f7931e;
          --color-accent: #00d9ff;
          --color-text: #ffffff;
          --color-text-muted: #8b95b0;
          --font-display: "Work Sans", sans-serif;
          --font-mono: "Space Mono", monospace;

          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-display);
          min-height: 100vh;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(
              circle at 20% 50%,
              rgba(255, 107, 53, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(0, 217, 255, 0.08) 0%,
              transparent 50%
            ),
            linear-gradient(180deg, transparent 0%, var(--color-surface) 100%);
          z-index: 0;
        }

        .grid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(255, 107, 53, 0.03) 1px,
              transparent 1px
            );
          background-size: 60px 60px;
          opacity: 0.5;
          animation: gridFloat 20s ease-in-out infinite;
        }

        @keyframes gridFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.02);
          }
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          text-align: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          background: linear-gradient(
            135deg,
            rgba(255, 107, 53, 0.2),
            rgba(247, 147, 30, 0.1)
          );
          border: 1px solid rgba(255, 107, 53, 0.3);
          border-radius: 50px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-primary);
          margin-bottom: 2rem;
          animation: fadeSlideUp 0.8s ease-out;
        }

        .badge::before {
          content: "●";
          color: var(--color-primary);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          animation: fadeSlideUp 0.8s ease-out 0.2s backwards;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            var(--color-primary) 0%,
            var(--color-secondary) 50%,
            var(--color-accent) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .hero p {
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: var(--color-text-muted);
          max-width: 800px;
          margin: 0 auto 3rem;
          line-height: 1.6;
          animation: fadeSlideUp 0.8s ease-out 0.4s backwards;
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeSlideUp 0.8s ease-out 0.6s backwards;
        }

        .btn {
          padding: 1rem 2.5rem;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
          );
          color: white;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          transition: left 0.5s;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--color-text);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        .features-list {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
          animation: fadeSlideUp 0.8s ease-out 0.8s backwards;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .checkmark {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        /* Features Section */
        .section {
          padding: 8rem 2rem;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-header h2 {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .section-header p {
          font-size: 1.25rem;
          color: var(--color-text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: linear-gradient(
            135deg,
            var(--color-surface) 0%,
            rgba(21, 27, 46, 0.5) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--color-primary),
            var(--color-secondary),
            var(--color-accent)
          );
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 107, 53, 0.3);
          box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
        }

        .feature-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(
            135deg,
            rgba(255, 107, 53, 0.2),
            rgba(0, 217, 255, 0.1)
          );
          border: 1px solid rgba(255, 107, 53, 0.3);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .feature-card h3 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: var(--color-text-muted);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .feature-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          padding: 0.4rem 0.8rem;
          background: rgba(255, 107, 53, 0.1);
          border: 1px solid rgba(255, 107, 53, 0.2);
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--color-primary);
        }

        /* Stats Section */
        .stats-container {
          background: linear-gradient(
            135deg,
            var(--color-surface) 0%,
            rgba(21, 27, 46, 0.8) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }

        .stat {
          text-align: center;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          margin: 0 auto 1rem;
          font-size: 2rem;
        }

        .stat-value {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-accent)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--color-text-muted);
        }

        /* How It Works */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .step {
          position: relative;
        }

        .step-number {
          font-family: var(--font-mono);
          font-size: 5rem;
          font-weight: 700;
          color: rgba(255, 107, 53, 0.2);
          line-height: 1;
          margin-bottom: 1rem;
        }

        .step h3 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .step p {
          color: var(--color-text-muted);
          line-height: 1.7;
        }

        /* Pricing Section */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pricing-card {
          background: linear-gradient(
            135deg,
            var(--color-surface) 0%,
            rgba(21, 27, 46, 0.5) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 2.5rem;
          position: relative;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .pricing-card.featured {
          border-color: var(--color-primary);
          box-shadow: 0 20px 60px rgba(255, 107, 53, 0.3);
        }

        .pricing-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 0.4rem 1rem;
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
          );
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .pricing-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .pricing-description {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }

        .price {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 2rem;
        }

        .price-period {
          font-size: 1rem;
          color: var(--color-text-muted);
          font-weight: 400;
        }

        .features-list-pricing {
          list-style: none;
          margin-bottom: 2rem;
        }

        .features-list-pricing li {
          padding: 0.75rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          color: var(--color-text-muted);
        }

        .features-list-pricing li::before {
          content: "✓";
          color: var(--color-primary);
          font-weight: 700;
          flex-shrink: 0;
        }

        /* Contact Section */
        .contact-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .contact-form {
          background: linear-gradient(
            135deg,
            var(--color-surface) 0%,
            rgba(21, 27, 46, 0.8) 100%
          );
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 3rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--color-text-muted);
        }

        .form-group input,
        .form-group textarea {
          padding: 1rem;
          background: rgba(10, 14, 26, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--color-text);
          font-family: var(--font-display);
          font-size: 1rem;
          transition: all 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 150px;
        }

        .error {
          color: #ff4444;
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        .form-group input.has-error,
        .form-group textarea.has-error {
          border-color: #ff4444;
        }

        .success-message {
          text-align: center;
          padding: 3rem;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: linear-gradient(
            135deg,
            var(--color-primary),
            var(--color-secondary)
          );
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-message h3 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            min-height: 80vh;
          }

          .section {
            padding: 4rem 1rem;
          }

          .cta-group {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .features-list {
            flex-direction: column;
            gap: 1rem;
          }

          .contact-form {
            padding: 2rem 1.5rem;
          }
        }

        /* Scroll animations */
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        .slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.8s ease-out forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero">
        <div className="grid-bg"></div>
        <div className="hero-content">
          <div className="badge">South African Built</div>
          <h1>
            Get Paid.
            <br />
            <span className="gradient-text">Stay Paid.</span>
          </h1>
          <p>
            Invoice, subscribe, and collect payments with zero friction. Payfona
            powers transactions for ambitious businesses across South Africa.
          </p>
          <div className="cta-group">
            <a
              href="https://payfona.netlify.app/register"
              className="btn btn-primary"
            >
              Start Free Trial →
            </a>
            <button className="btn btn-secondary">Watch Demo ⚡</button>
          </div>
          <div className="features-list">
            <div className="feature-item">
              <div className="checkmark">✓</div>
              <span>No credit card</span>
            </div>
            <div className="feature-item">
              <div className="checkmark">✓</div>
              <span>Setup in 2 minutes</span>
            </div>
            <div className="feature-item">
              <div className="checkmark">✓</div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="section-header">
          <h2>
            Everything You Need.
            <br />
            <span className="gradient-text">Nothing You Don`t.</span>
          </h2>
          <p>
            Three powerful tools. One seamless platform. Built for businesses
            that move fast.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Smart Invoicing</h3>
            <p>
              Create professional invoices in seconds. Automated reminders,
              payment tracking, and instant notifications keep you in control.
            </p>
            <div className="feature-tags">
              <span className="tag">Automated reminders</span>
              <span className="tag">Multi-currency</span>
              <span className="tag">Custom branding</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Subscriptions</h3>
            <p>
              Recurring revenue on autopilot. Manage memberships, track usage,
              and scale your subscription business effortlessly.
            </p>
            <div className="feature-tags">
              <span className="tag">Usage tracking</span>
              <span className="tag">Flexible billing</span>
              <span className="tag">Customer portal</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Virtual POS</h3>
            <p>
              Accept payments anywhere. No hardware needed. Just your phone,
              tablet, or laptop and you&apos;re ready to go.
            </p>
            <div className="feature-tags">
              <span className="tag">Mobile ready</span>
              <span className="tag">QR codes</span>
              <span className="tag">Instant settlement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-icon">📈</div>
              <div className="stat-value">10K+</div>
              <div className="stat-label">Transactions Processed</div>
            </div>
            <div className="stat">
              <div className="stat-icon">🛡️</div>
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Platform Uptime</div>
            </div>
            <div className="stat">
              <div className="stat-icon">⚡</div>
              <div className="stat-value">&lt; 5min</div>
              <div className="stat-label">Average Setup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Get started in three simple steps</p>
        </div>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Sign Up</h3>
            <p>
              Create your account in under 2 minutes. No credit card required to
              start.
            </p>
          </div>
          <div className="step">
            <div className="step-number">02</div>
            <h3>Configure</h3>
            <p>
              Add your business details, connect your payment gateway, and
              customize your branding.
            </p>
          </div>
          <div className="step">
            <div className="step-number">03</div>
            <h3>Get Paid</h3>
            <p>
              Start sending invoices, managing subscriptions, and accepting
              payments immediately.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section">
        <div className="section-header">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that fits your business</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="pricing-description">Perfect for getting started</p>
            <div className="price">Free</div>
            <ul className="features-list-pricing">
              <li>Up to 5 invoices/month</li>
              <li>Basic subscription management</li>
              <li>Virtual POS</li>
              <li>Email support</li>
              <li>Paystack integration</li>
            </ul>
            <button className="btn btn-secondary" style={{ width: "100%" }}>
              Start Free
            </button>
          </div>

          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <h3>Professional</h3>
            <p className="pricing-description">For growing businesses</p>
            <div className="price">
              R299<span className="price-period">/month</span>
            </div>
            <ul className="features-list-pricing">
              <li>Unlimited invoices</li>
              <li>Advanced subscriptions</li>
              <li>Virtual POS</li>
              <li>Priority support</li>
              <li>Custom branding</li>
              <li>API access</li>
              <li>Analytics dashboard</li>
            </ul>
            <button className="btn btn-primary" style={{ width: "100%" }}>
              Start Trial
            </button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="pricing-description">For large organizations</p>
            <div className="price">Custom</div>
            <ul className="features-list-pricing">
              <li>Everything in Professional</li>
              <li>Dedicated account manager</li>
              <li>Custom integrations</li>
              <li>SLA guarantee</li>
              <li>White-label options</li>
              <li>Advanced security</li>
            </ul>
            <button className="btn btn-secondary" style={{ width: "100%" }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="section-header">
          <h2>Let`s Talk</h2>
          <p>Have questions? We`d love to hear from you.</p>
        </div>
        <div className="contact-container">
          <div className="contact-form">
            {submitSuccess ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p style={{ color: "var(--color-text-muted)" }}>
                  We`ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={formErrors.name ? "has-error" : ""}
                    />
                    {formErrors.name && (
                      <span className="error">{formErrors.name}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? "has-error" : ""}
                    />
                    {formErrors.email && (
                      <span className="error">{formErrors.email}</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="topic">Subject</label>
                  <input
                    type="text"
                    id="topic"
                    name="topic"
                    placeholder="What's this about?"
                    value={formData.topic}
                    onChange={handleChange}
                    className={formErrors.topic ? "has-error" : ""}
                  />
                  {formErrors.topic && (
                    <span className="error">{formErrors.topic}</span>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleTextAreaChange}
                    className={formErrors.message ? "has-error" : ""}
                  />
                  {formErrors.message && (
                    <span className="error">{formErrors.message}</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
