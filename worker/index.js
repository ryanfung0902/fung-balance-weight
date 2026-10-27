const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
const json = (body, status) => new Response(JSON.stringify(body), { status, headers: jsonHeaders })

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)

    if (pathname === '/api/teacher/verify') {
      if (request.method !== 'POST') {
        return new Response(null, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } })
      }
      if (!env.TEACHER_KEY) return json({ error: '教師密碼尚未設定' }, 503)

      let body
      try { body = await request.json() } catch { return json({ error: '資料格式錯誤' }, 400) }
      if (typeof body.password !== 'string' || body.password !== env.TEACHER_KEY) {
        return json({ error: '教師密碼不正確' }, 401)
      }
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
    }

    if (pathname.startsWith('/api/')) return json({ error: '找不到此功能' }, 404)
    return env.ASSETS.fetch(request)
  },
}
