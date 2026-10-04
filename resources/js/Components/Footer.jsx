import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Footer({ brand }) {
    const groups = [
        { title: 'Shop', links: [['Shop', route('shop')], ['Marketplace', route('marketplace')], ['Cart', route('cart')], ['My orders', route('orders.index')]] },
        { title: 'Learn', links: [['Courses', route('courses.index')], ['Blog', route('blog.index')], ['Services', route('services')]] },
        { title: 'Care', links: [['Book an appointment', route('book')], ['Contact', route('contact')]] },
        { title: 'Account', links: [['Log in', route('login')], ['Register', route('register')]] },
    ];
    return (
        <footer className="bg-[#0A2B20] text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-5 lg:px-8">
                <div className="lg:col-span-1">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-auto fill-current text-white" />
                        <span className="font-display text-xl font-bold">{brand.name}</span>
                    </Link>
                    <p className="mt-4 text-white/70">{brand.slogan}</p>
                </div>
                {groups.map((g) => (
                    <nav key={g.title} aria-label={g.title} className="lg:col-span-1">
                        <h3 className="font-semibold text-[#F2B632]">{g.title}</h3>
                        <ul className="mt-4 space-y-2 text-sm text-white/80">
                            {g.links.map(([label, href]) => (
                                <li key={label}><Link href={href} className="hover:text-white hover:underline">{label}</Link></li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className="border-t border-white/10 py-5 text-center text-sm text-white/60">
                © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </div>
        </footer>
    );
}
