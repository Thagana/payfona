import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate name length
    if (body.name.trim().length < 2 || body.name.trim().length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Validate message length
    if (body.message.trim().length < 10 || body.message.trim().length > 5000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 5000 characters' },
        { status: 400 }
      );
    }

    // Validate phone if provided
    if (body.phone && body.phone.trim().length > 0) {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(body.phone)) {
        return NextResponse.json(
          { error: 'Invalid phone number format' },
          { status: 400 }
        );
      }
    }

    // TODO: Implement actual email sending logic here
    // For now, log the contact form submission
    console.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      message: body.message.substring(0, 100) + '...',
      phone: body.phone,
      timestamp: new Date().toISOString(),
    });

    // Track submission in Sentry as a breadcrumb for monitoring
    Sentry.addBreadcrumb({
      category: 'contact',
      message: 'Contact form submitted',
      level: 'info',
    });

    // TODO: Send email using SMTP service (e.g., SendGrid, AWS SES, Resend)
    // Example implementation with environment variables:
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL_TO,
    //   subject: `Contact Form: ${body.name}`,
    //   text: body.message,
    //   replyTo: body.email,
    // });

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!'
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error to Sentry
    Sentry.captureException(error);

    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'Failed to process contact form submission. Please try again later.' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}
