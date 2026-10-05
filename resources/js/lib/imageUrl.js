export const PLACEHOLDER = '/images/placeholder.png';

export function resolveImage(path) {
    if (!path || typeof path !== 'string') return null;

    const p = path.trim();

    // external URL or inline data
    if (/^(https?:)?\/\//i.test(p) || p.startsWith('data:')) return p;

    // already points at storage (e.g. "/storage/products/x.png")
    if (/^\/?storage\//i.test(p)) return '/' + p.replace(/^\/+/, '');

    // static file in public/images (e.g. "/images/flyer.png" or "images/flyer.png")
    if (/^\/?images\//i.test(p)) return '/' + p.replace(/^\/+/, '');

    // uploaded file on the public disk (e.g. "products/images/xxx.png")
    return '/storage/' + p.replace(/^\/+/, '');
}