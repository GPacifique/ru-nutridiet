export const PLACEHOLDER = '/images/image.png';

export function resolveImage(path) {
    if (!path || typeof path !== 'string') return null;

    const p = path.trim();

    if (/^https?:\/\//i.test(p)) return p;
    if (/^\/?images\//i.test(p)) return '/' + p.replace(/^\/+/, '');

    return null;
}