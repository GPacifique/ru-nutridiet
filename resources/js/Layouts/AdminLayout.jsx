import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    BookOpen,
    ClipboardCheck,
    Users,
    BarChart3,
    LogOut,
    Layers,
    FileText,
    HelpCircle,
    CreditCard,
    Award,
} from 'lucide-react';

const NAV = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
    { label: 'Courses', href: '/admin/courses', icon: BookOpen },
    { label: 'Categories', href: '/admin/course-categories', icon: Layers },
    { label: 'Lessons', href: '/admin/lessons', icon: FileText },
    { label: 'Quizzes', href: '/admin/quizzes', icon: ClipboardCheck },
    { label: 'Questions', href: '/admin/questions', icon: HelpCircle },
    { label: 'Enrollments', href: '/admin/enrollments', icon: Users },
    { label: 'Certificates', href: '/admin/certificates', icon: Award },
    { label: 'Payments', href: '/admin/payments', icon: CreditCard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
];

// Layout shell for every /admin/* page: fixed sidebar + scrollable content.
// Wrap pages like: <AdminLayout title="Dashboard"><...page content...></AdminLayout>
export default function AdminLayout({ title, children }) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-[#EEF1EC] text-[#1F2A24]">
            <div className="flex">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-[#D8DDD5] bg-[#F7F8F5] lg:flex">
                    <div className="px-6 py-6">
                        <p className="font-['Fraunces'] text-lg font-medium leading-tight">
                            NutriCred
                        </p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[#5B6B62]">
                            Provider console
                        </p>
                    </div>

                    <nav className="flex-1 px-3">
                        {NAV.map(({ label, href, icon: Icon }) => {
                            const active = url === href || url.startsWith(href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`mb-1 flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors ${
                                        active
                                            ? 'bg-[#2F6F5E] text-white'
                                            : 'text-[#3C4A42] hover:bg-[#E7EBE3]'
                                    }`}
                                >
                                    <Icon size={16} strokeWidth={2} />
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-[#D8DDD5] px-3 py-4">
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded px-3 py-2 text-sm text-[#5B6B62] hover:bg-[#E7EBE3]"
                        >
                            <LogOut size={16} strokeWidth={2} />
                            Sign out
                        </Link>
                    </div>
                </aside>

                {/* Main content */}
                <div className="flex-1 lg:pl-60">
                    <header className="border-b border-[#D8DDD5] bg-[#F7F8F5] px-6 py-4 lg:hidden">
                        <p className="font-['Fraunces'] text-lg">NutriCred</p>
                    </header>
                    <main className="px-6 py-8 lg:px-10 lg:py-10">
                        {title && (
                            <h1 className="mb-6 font-['Fraunces'] text-2xl font-medium">
                                {title}
                            </h1>
                        )}
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}