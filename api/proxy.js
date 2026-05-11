export const config = { runtime: 'edge' };

// Server-side proxy that fetches a letterboxd.com URL on behalf of the
// client and returns the body with permissive CORS plus aggressive edge
// caching. Replaces the free CORS proxies (cors.lol / allorigins /
// codetabs) which rate-limit per-IP and frequently fail; this one is
// served by Vercel's network so the same content is reused across
// every visitor.
//
// Allowed hosts: letterboxd.com only. Everything else returns 403.
// Cache window: 1 day at the edge, 7 days stale-while-revalidate —
// film metadata changes infrequently enough that this is safe.

const ALLOWED_HOSTS = new Set(['letterboxd.com', 'www.letterboxd.com']);

export default async function handler(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method not allowed', { status: 405 });
    }

    const reqUrl = new URL(request.url);
    const target = reqUrl.searchParams.get('url');
    if (!target) return text(400, 'Missing url parameter');

    let parsed;
    try { parsed = new URL(target); }
    catch { return text(400, 'Invalid url'); }

    if (parsed.protocol !== 'https:') return text(400, 'https only');
    if (!ALLOWED_HOSTS.has(parsed.hostname)) return text(403, 'Host not allowed: ' + parsed.hostname);

    try {
        const upstream = await fetch(parsed.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml,application/rss+xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.7'
            },
            redirect: 'follow'
        });

        const body = await upstream.text();
        const contentType = upstream.headers.get('content-type') || 'text/html; charset=utf-8';

        return new Response(body, {
            status: upstream.status,
            headers: {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
                'X-Proxy-Source': 'film-shelf-vercel-edge'
            }
        });
    } catch (e) {
        return text(502, 'Upstream fetch failed: ' + (e && e.message ? e.message : 'unknown'));
    }
}

function text(status, body) {
    return new Response(body, {
        status,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        }
    });
}
