import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

const contactSchema = z.object({
  name:         z.string().min(2, 'Name must be at least 2 characters'),
  email:        z.string().email('Please enter a valid email address'),
  organisation: z.string().optional(),
  subject:      z.enum(['General Enquiry', 'Partnership', 'Media', 'Research Collaboration', 'Speaking Request', 'Other']),
  message:      z.string().min(20, 'Message must be at least 20 characters'),
})

function createTransporter() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, organisation, subject, message } = result.data

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = createTransporter()
      const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
      await transporter.sendMail({
        from:    `"ADGH Website" <${process.env.SMTP_USER}>`,
        to:      process.env.CONTACT_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `[ADGH Contact] ${subject} - ${name}`,
        text:    `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <h2 style="color:#0E1A14;font-family:Georgia,serif;">New Contact Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:system-ui,sans-serif;font-size:14px;">
            <tr><td style="padding:8px 0;color:#7A8C7F;width:130px;">Name</td><td style="padding:8px 0;color:#3A4A3E;">${esc(name)}</td></tr>
            <tr><td style="padding:8px 0;color:#7A8C7F;">Email</td><td style="padding:8px 0;"><a href="mailto:${esc(email)}" style="color:#C9973A;">${esc(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#7A8C7F;">Organisation</td><td style="padding:8px 0;color:#3A4A3E;">${esc(organisation) || '-'}</td></tr>
            <tr><td style="padding:8px 0;color:#7A8C7F;">Subject</td><td style="padding:8px 0;color:#3A4A3E;">${esc(subject)}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#FAF7F2;border-left:4px solid #C9973A;border-radius:4px;">
            <p style="margin:0;color:#3A4A3E;font-size:14px;line-height:1.7;">${esc(message).replace(/\n/g, '<br>')}</p>
          </div>
        `,
      })
    } else {
      // Development fallback
      console.log('[ADGH Contact Form]', { name, email, organisation, subject, message })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
