// AdSense supports a strict nonce CSP rather than a changing domain allowlist:
// https://support.google.com/adsense/answer/16283098
export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  if (url.pathname === '/magneticcore') {
    url.pathname = '/magneticcore/';
    return Response.redirect(url.toString(), 308);
  }
  const response = await context.next();
  if (response.status !== 200 || !response.headers.get('content-type')?.includes('text/html')) return response;
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(18))));
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', `object-src 'none'; script-src 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:; base-uri 'none'; frame-ancestors 'self'`);
  headers.set('Cache-Control', 'private, no-store');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.delete('etag');
  headers.delete('content-length');
  return new HTMLRewriter().on('script', {
    element(element) { element.setAttribute('nonce', nonce); },
  }).transform(new Response(response.body, { status: response.status, headers }));
}
