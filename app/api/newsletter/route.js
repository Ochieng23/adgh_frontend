import { NextResponse } from 'next/server'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export async function POST(request) {
  try {
    const body = await request.json()
    const result = newsletterSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const { email } = result.data

    // TODO: Integrate with Mailchimp, ConvertKit, or other email service
    // For now, log to console in development
    console.log(`[ADGH Newsletter] New subscription: ${email}`)

    return NextResponse.json({
      success: true,
      message: 'You have been subscribed!',
    })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
