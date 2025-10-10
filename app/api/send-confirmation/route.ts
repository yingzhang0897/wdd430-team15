import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email, name } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'Handcraft Cottage <noreply@handcraftscottage.com>',
      to: email,
      subject: 'Welcome to Handcrafts Cottage!',
      html: `<p>Hi ${name}, thanks for registering! 🎉</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
