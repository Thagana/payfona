"use client";
import "../styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import { GoogleAnalytics } from "nextjs-google-analytics";
import format from "date-fns/format";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Payfona</title>
        <meta
          name="description"
          content="Invoice and subscriptions for South African businesses"
        />
        <link rel="icon" href="/images/logo.png" />
        <meta property="og:title" content="Payfona" key="title" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Payfona" />
        <meta name="keywords" content="invoice and subscriptions" />
      </head>
      <body>
        <style jsx global>{`
          @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Work+Sans:wght@300;400;500;600;700;800&display=swap");

          :root {
            --color-bg: #0a0e1a;
            --color-surface: #151b2e;
            --color-primary: #ff6b35;
            --color-secondary: #f7931e;
            --color-accent: #00d9ff;
            --color-text: #ffffff;
            --color-text-muted: #8b95b0;
            --font-display: "Work Sans", sans-serif;
            --font-mono: "Space Mono", monospace;
          }

          body {
            background: var(--color-bg);
            color: var(--color-text);
            font-family: var(--font-display);
            margin: 0;
            padding: 0;
          }

          /* Navbar Styles */
          .navbar {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: rgba(10, 14, 26, 0.8);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .navbar-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
          }

          .nav-logo img {
            height: 40px;
            width: auto;
            transition: transform 0.3s ease;
          }

          .nav-logo:hover img {
            transform: scale(1.05);
          }

          .nav-links {
            display: flex;
            gap: 2.5rem;
            align-items: center;
          }

          .nav-link {
            color: var(--color-text-muted);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            position: relative;
            transition: color 0.3s ease;
          }

          .nav-link::after {
            content: "";
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(
              90deg,
              var(--color-primary),
              var(--color-secondary)
            );
            transition: width 0.3s ease;
          }

          .nav-link:hover {
            color: var(--color-text);
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .nav-btn {
            padding: 0.6rem 1.5rem;
            font-family: var(--font-display);
            font-weight: 600;
            font-size: 0.9rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            display: inline-block;
          }

          .nav-btn-login {
            background: transparent;
            color: var(--color-text);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .nav-btn-login:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: var(--color-primary);
            transform: translateY(-1px);
          }

          .nav-btn-signup {
            background: linear-gradient(
              135deg,
              var(--color-primary),
              var(--color-secondary)
            );
            color: white;
            border: none;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            position: relative;
            overflow: hidden;
          }

          .nav-btn-signup::before {
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

          .nav-btn-signup:hover::before {
            left: 100%;
          }

          .nav-btn-signup:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
          }

          .mobile-menu-btn {
            display: none;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            color: var(--color-text);
          }

          .hamburger {
            width: 24px;
            height: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .hamburger span {
            display: block;
            width: 100%;
            height: 2px;
            background: var(--color-text);
            transition: all 0.3s ease;
          }

          .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translateY(9px);
          }

          .hamburger.active span:nth-child(2) {
            opacity: 0;
          }

          .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translateY(-9px);
          }

          .mobile-menu {
            display: none;
            background: var(--color-surface);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            animation: slideDown 0.3s ease-out;
          }

          .mobile-menu.active {
            display: block;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            margin-bottom: 1.5rem;
          }

          .mobile-nav-link {
            color: var(--color-text-muted);
            text-decoration: none;
            font-weight: 500;
            padding: 0.75rem;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .mobile-nav-link:hover {
            color: var(--color-text);
            background: rgba(255, 107, 53, 0.1);
          }

          .mobile-nav-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .mobile-nav-btn {
            width: 100%;
            text-align: center;
          }

          /* Footer Styles */
          .footer {
            background: var(--color-surface);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 4rem;
          }

          .footer-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 3rem 1.5rem;
          }

          .footer-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 2rem;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }

          .footer-logo img {
            height: 40px;
            width: auto;
          }

          .footer-links {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
          }

          .footer-link {
            color: var(--color-text-muted);
            text-decoration: none;
            font-size: 0.9rem;
            transition: color 0.3s ease;
          }

          .footer-link:hover {
            color: var(--color-primary);
          }

          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.5rem;
          }

          .footer-copyright {
            color: var(--color-text-muted);
            font-size: 0.9rem;
          }

          .footer-social {
            display: flex;
            gap: 1.5rem;
          }

          .footer-social a {
            color: var(--color-text-muted);
            transition: all 0.3s ease;
          }

          .footer-social a:hover {
            color: var(--color-primary);
            transform: translateY(-2px);
          }

          .footer-social svg {
            width: 20px;
            height: 20px;
          }

          /* Responsive */
          @media (max-width: 1024px) {
            .nav-links,
            .nav-actions {
              display: none;
            }

            .mobile-menu-btn {
              display: block;
            }
          }

          @media (max-width: 768px) {
            .navbar-container {
              padding: 0 1rem;
            }

            .footer-container {
              padding: 2rem 1rem;
            }

            .footer-top,
            .footer-bottom {
              flex-direction: column;
              text-align: center;
            }

            .footer-links {
              flex-direction: column;
              gap: 1rem;
            }
          }
        `}</style>

        {/* Navigation */}
        <nav className="navbar">
          <div className="navbar-container">
            {/* Logo */}
            <Link href="/" className="nav-logo">
              <Image
                src="/images/payfona.png"
                alt="Payfona logo"
                height={40}
                width={120}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links">
              <Link href="#about-section" className="nav-link">
                About
              </Link>
              <Link href="#contact" className="nav-link">
                Contact
              </Link>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="nav-actions">
              <button
                className="nav-btn nav-btn-login"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
              <button
                className="nav-btn nav-btn-signup"
                onClick={() => (window.location.href = "/register")}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
            <div className="mobile-nav-links">
              <Link
                href="#about-section"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/blog"
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
            <div className="mobile-nav-actions">
              <button
                className="nav-btn nav-btn-login mobile-nav-btn"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </button>
              <button
                className="nav-btn nav-btn-signup mobile-nav-btn"
                onClick={() => (window.location.href = "/register")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>

        {/* Google Analytics */}
        <GoogleAnalytics trackPageViews />

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            {/* Top Section */}
            <div className="footer-top">
              <Link href="/" className="footer-logo">
                <Image
                  src="/images/payfona.png"
                  alt="Payfona"
                  width={120}
                  height={40}
                />
              </Link>

              <div className="footer-links">
                <Link href="#about-section" className="footer-link">
                  About
                </Link>
                <Link href="/blog" className="footer-link">
                  Blog
                </Link>
                <Link href="#contact" className="footer-link">
                  Contact
                </Link>
                <Link href="/privacy" className="footer-link">
                  Privacy
                </Link>
                <Link href="/terms" className="footer-link">
                  Terms
                </Link>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="footer-bottom">
              <p className="footer-copyright">
                © {format(new Date(), "yyyy")} Payfona. All rights reserved.
              </p>

              <div className="footer-social">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
