
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  console.log(messages)
  const response = await fetch('http://127.0.0.1:8000/api/bot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "messages": messages,
      }),
    }).then((res) => res.json())
  return NextResponse.json(response)
}
