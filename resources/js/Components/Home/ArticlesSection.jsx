import { Link } from '@inertiajs/react';
import Section from './Section';

export default function ArticlesSection({ articles = [] }) {
    if (!articles.length) return null;
    return (
        <Section title="From the blog" intro="Practical reading on food and health." href={route('blog.index')} linkLabel="Read the blog">
            <div className="grid gap-8 md:grid-cols-3">
                {articles.map((a) => (
                    <article key={a.id}>
                        <Link href={a.url} className="block aspect-[3/2] overflow-hidden rounded-2xl bg-[#F3F7F4]">
                            {a.image && <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                        </Link>
                        {a.date && <p className="mt-4 text-sm text-slate-500">{a.date}</p>}
                        <h3 className="mt-1 text-lg font-semibold text-[#0F3D2E]"><Link href={a.url} className="hover:underline">{a.title}</Link></h3>
                        <p className="mt-2 text-sm text-slate-600">{a.excerpt}</p>
                    </article>
                ))}
            </div>
        </Section>
    );
}
