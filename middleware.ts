import { NextRequest, NextResponse } from 'next/server'

export const config = {
  // Защищаем ТОЛЬКО админку Payload
  // НЕ блокируем API endpoints и фронтенд!
  matcher: ['/admin/:path*'],
}

export function middleware(req: NextRequest) {
  // Работает ТОЛЬКО на production
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const basicAuth = req.headers.get('Authorization')
  const url = req.nextUrl

  // Проверяем что переменные окружения заданы
  const validUser = process.env.BASIC_AUTH_USER
  const validPassword = process.env.BASIC_AUTH_PASSWORD

  if (!validUser || !validPassword) {
    // Если переменные не заданы - блокируем доступ
    return new NextResponse('Configuration error: Basic Auth credentials not set', {
      status: 500,
    })
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, password] = atob(authValue).split(':')

    if (user === validUser && password === validPassword) {
      // Доступ разрешен
      return NextResponse.next()
    }
  }

  // Запрашиваем авторизацию
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="Secure Area"`,
    },
  })
}

