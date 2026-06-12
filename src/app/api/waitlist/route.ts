import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod/v4';

const waitlistSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  company: z.string().optional(),
  role: z.string().optional(),
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

    const { fullName, email, company, role, module } = result.data;

    const existing = await db.waitlistEntry.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { message: 'You are already on the waitlist!', alreadyExists: true },
        { status: 200 }
      );
    }

    await db.waitlistEntry.create({
      data: {
        fullName,
        email,
        company: company || null,
        role: role || null,
        module: module || null,
      },
    });

    return NextResponse.json(
      { message: 'Welcome to the waitlist! We will be in touch soon.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}