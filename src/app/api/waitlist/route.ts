import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistNotification } from '@/lib/email';
import { z } from 'zod/v4';

const waitlistSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  company: z.string().optional(),
  module: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = waitlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { fullName, email, company, module } = result.data;

    const emailSent = await sendWaitlistNotification({
      fullName,
      email,
      company,
      module,
    });

    if (!emailSent) {
      return NextResponse.json(
        { error: 'The notification email could not be sent. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: 'Thank you. Your details have been sent successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
