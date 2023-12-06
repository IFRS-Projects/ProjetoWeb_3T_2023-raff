import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token')
  const redirectURL = new URL(request.url).searchParams.get('route')
    ? new URL(request.url).searchParams.get('route')
    : '/home'

  return NextResponse.redirect(new URL(redirectURL as string, request.url), {
    headers: {
      'Set-Cookie': `token=${token}; Max-Age=432000;Path=/`,
    },
  })
}
