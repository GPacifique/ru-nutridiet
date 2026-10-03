/*
 * Typography for article HTML. Tailwind's preflight strips default heading
 * and list styles, so they are spelled out here.
 *
 * Lives in its own file so public pages can import it WITHOUT pulling the
 * whole TipTap editor into their bundle:
 *
 *   import { ARTICLE_CONTENT_CLASSES } from '@/Components/articleContent';
 *
 *   <div className={ARTICLE_CONTENT_CLASSES}
 *        dangerouslySetInnerHTML={{ __html: article.content }} />
 */
export const ARTICLE_CONTENT_CLASSES = [
    'text-base leading-7 text-slate-800',
    '[&_h1]:mb-3 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight',
    '[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight',
    '[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold',
    '[&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-lg [&_h4]:font-semibold',
    '[&_p]:my-4',
    '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
    '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
    '[&_li]:my-1',
    '[&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-teal-700 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600',
    '[&_a]:text-teal-700 [&_a]:underline',
    '[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg',
    '[&_hr]:my-8 [&_hr]:border-slate-200',
    '[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-slate-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-slate-100',
    '[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-sm',
    '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-slate-100',
    '[&_mark]:rounded [&_mark]:px-0.5',
].join(' ');