import { NextResponse } from 'next/server'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const STORE_PATH = path.join(process.cwd(), 'data', 'subscribers.json')

function readSubscribers() {
  if (!fs.existsSync(STORE_PATH)) return []
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8'))
  } catch {
    return []
  }
}

function writeSubscribers(subscribers) {
  const dir = path.dirname(STORE_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STORE_PATH, JSON.stringify(subscribers, null, 2), 'utf8')
}

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
    const subscribers = readSubscribers()

    if (subscribers.some((s) => s.email === email)) {
      return NextResponse.json({ success: true, message: 'You are already subscribed!' })
    }

    subscribers.push({ email, subscribedAt: new Date().toISOString() })
    writeSubscribers(subscribers)

    return NextResponse.json({ success: true, message: 'You have been subscribed!' })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
