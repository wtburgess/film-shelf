export const config = { runtime: 'edge' };

// Server-side store for enriched watchlists, keyed by Letterboxd
// username. Anyone who types a username gets the cached result
// instantly (no re-sync), and any sync run pushes the latest data
// back so the next visitor benefits.
//
// Storage: Upstash Redis REST (which is also what Vercel KV ships
// under the hood). The function reads either KV_REST_API_* or
// UPSTASH_REDIS_REST_* so the same code works for the Vercel
// integration and a direct Upstash account.

const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const KEY_PREFIX = 'filmshelf:lb:';
const TTL_SECONDS = 60 * 24 * 60 * 60;   // 60 days
const MAX_BODY_BYTES = 4 * 1024 * 1024;  // 4 MB hard cap on stored value

function isConfigured() { return !!(KV_URL && KV_TOKEN); }

async function kvGet(key) {
    const r = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` }
    });
    if (!r.ok) return null;
    const data = await r.json();
    return data && data.result ? data.result : null;
}

async function kvSet(key, value, ttl) {
    const r = await fetch(`${KV_URL}/set/${encodeURIComponent(key)}?EX=${ttl}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${KV_TOKEN}`,
            'Content-Type': 'text/plain'
        },
        body: value
    });
    return r.ok;
}

function json(status, body) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
}

export default async function handler(request) {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    }

    if (!isConfigured()) {
        return json(503, { error: 'kv_not_configured', detail: 'Set KV_REST_API_URL and KV_REST_API_TOKEN env vars in Vercel.' });
    }

    const url = new URL(request.url);
    const user = (url.searchParams.get('user') || '').toLowerCase().trim();
    if (!user || !/^[a-z0-9_-]+$/.test(user)) return json(400, { error: 'invalid_user' });

    const key = KEY_PREFIX + user;

    if (request.method === 'GET') {
        const value = await kvGet(key);
        if (!value) return json(404, { error: 'no_cache' });
        return new Response(value, {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // Short edge cache. Anyone hitting the same username
                // within a minute gets the response straight from the
                // edge without a KV round-trip.
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
            }
        });
    }

    if (request.method === 'POST') {
        const body = await request.text();
        if (body.length > MAX_BODY_BYTES) return json(413, { error: 'too_large', max: MAX_BODY_BYTES });
        let parsed;
        try { parsed = JSON.parse(body); }
        catch { return json(400, { error: 'invalid_json' }); }
        if (!parsed || parsed.username !== user || !Array.isArray(parsed.films)) {
            return json(400, { error: 'invalid_shape' });
        }
        const ok = await kvSet(key, body, TTL_SECONDS);
        if (!ok) return json(502, { error: 'kv_write_failed' });
        return json(200, { ok: true, count: parsed.films.length });
    }

    return json(405, { error: 'method_not_allowed' });
}
