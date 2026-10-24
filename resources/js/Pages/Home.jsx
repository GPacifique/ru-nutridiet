import { Head } from '@inertiajs/react';
import PublicNavigation from '@/Layouts/PublicNavigation';
import Footer from '@/Components/Footer';
import AnnouncementBar from '@/Components/Home/AnnouncementBar';
import HeroSlider from '@/Components/Home/HeroSlider';
import StatsStrip from '@/Components/Home/StatsStrip';
import ProductsSection from '@/Components/Home/ProductsSection';
import CoursesSection from '@/Components/Home/CoursesSection';
import ArticlesSection from '@/Components/Home/ArticlesSection';
import PractitionersSection from '@/Components/Home/PractitionersSection';
import TestimonialsSection from '@/Components/Home/TestimonialsSection';
import ContactCta from '@/Components/Home/ContactCta';
import { useEffect, useState } from 'react';

function InstallAppButton() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [message, setMessage] = useState('');
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setInstallPrompt(null);
            setMessage('RUNUTRIDIET has been installed.');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        if (
            window.matchMedia('(display-mode: standalone)').matches
            || window.navigator.standalone
        ) {
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const install = async () => {
        if (!installPrompt) {
            setMessage('Use your browser menu to install or add RUNUTRIDIET to your home screen.');
            return;
        }

        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        setInstallPrompt(null);
        setMessage(outcome === 'accepted' ? 'Installing RUNUTRIDIET...' : 'Installation was canceled.');
    };

    if (isInstalled) return null;

    return (
        <div className="fixed bottom-5 right-5 z-40 flex max-w-xs flex-col items-end gap-2">
            {message && (
                <p role="status" className="rounded-lg bg-white px-4 py-2 text-sm text-slate-700 shadow-lg">
                    {message}
                </p>
            )}
            <button
                type="button"
                onClick={install}
                className="rounded-full bg-emerald-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
                Install app
            </button>
        </div>
    );
}

export default function Home({
    brand, currency, products = [], courses = [], articles = [],
    practitioners = [], testimonials = [], announcements = [], stats = {},
}) {
    return (
        <div className="flex min-h-screen flex-col bg-white font-body text-slate-800">
            <Head title={brand.slogan}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
            </Head>

            <InstallAppButton />
            <AnnouncementBar announcements={announcements} />

            <main className="flex-1">
                <HeroSlider slogan={brand.slogan} products={products} />
                <StatsStrip stats={stats} />
                <ProductsSection products={products} currency={currency} />
                <CoursesSection courses={courses} currency={currency} />
                <ArticlesSection articles={articles} />
                <PractitionersSection practitioners={practitioners} />
                <TestimonialsSection testimonials={testimonials} />
                <ContactCta />
            </main>

            <Footer brand={brand} />
        </div>
    );
}

Home.layout = (page) => <PublicNavigation>{page}</PublicNavigation>;
