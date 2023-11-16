import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const redirectURL = new URL(request.url).searchParams.get('route')
    ? new URL(request.url).searchParams.get('route')
    : '/home'

  return NextResponse.redirect(new URL(redirectURL as string, request.url), {
    headers: {
      'Set-Cookie': `token=; HttpOnly ;Max-Age=0;Path=/`,
    },
  })
}