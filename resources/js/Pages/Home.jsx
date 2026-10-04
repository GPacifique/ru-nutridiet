import { Head } from '@inertiajs/react';
import PublicNavigation from '@/Components/PublicNavigation';
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

            <PublicNavigation />
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
