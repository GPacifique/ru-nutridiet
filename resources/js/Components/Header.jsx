import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import ApplicationLogo from "./ApplicationLogo";
import {
    Menu,
    X,
    ChevronDown,
    Search,
} from "lucide-react";

export default function Header() {
    const { auth } = usePage().props;
    const { t } = useTranslation();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const menus = [
        {
            title: "Languages",
            items: [
                ["HTML", "html"],
                ["CSS", "css"],
                ["JavaScript", "javascript"],
                ["TypeScript", "typescript"],
                ["Python", "python"],
                ["PHP", "php"],
                ["Java", "java"],
                ["C#", "csharp"],
                ["C++", "cpp"],
                ["Go", "golang"],
                ["Rust", "rust"],
                ["Kotlin", "kotlin"],
                ["Swift", "swift"],
                ["Dart", "dart"],
            ],
        },
        {
            title: "Frontend",
            items: [
                ["React", "react"],
                ["Next.js", "nextjs"],
                ["Vue", "vue"],
                ["Nuxt", "nuxt"],
                ["Angular", "angular"],
                ["Svelte", "svelte"],
                ["Astro", "astro"],
                ["Tailwind CSS", "tailwind"],
                ["Bootstrap", "bootstrap"],
                ["Shadcn UI", "shadcn"],
                ["Material UI", "mui"],
            ],
        },
        {
            title: "Backend",
            items: [
                ["Laravel", "laravel"],
                ["Node.js", "nodejs"],
                ["Express", "express"],
                ["NestJS", "nestjs"],
                ["Django", "django"],
                ["FastAPI", "fastapi"],
                ["Spring Boot", "springboot"],
                ["ASP.NET", "aspnet"],
                ["Ruby on Rails", "rails"],
                ["Gin", "gin"],
            ],
        },
        {
            title: "Mobile",
            items: [
                ["Flutter", "flutter"],
                ["React Native", "react-native"],
                ["SwiftUI", "swiftui"],
                ["Jetpack Compose", "compose"],
                ["Kotlin Multiplatform", "kmp"],
            ],
        },
        {
            title: "AI",
            items: [
                ["OpenAI", "openai"],
                ["LangChain", "langchain"],
                ["LlamaIndex", "llamaindex"],
                ["PyTorch", "pytorch"],
                ["TensorFlow", "tensorflow"],
                ["Hugging Face", "huggingface"],
            ],
        },
        {
            title: "Cloud",
            items: [
                ["AWS", "aws"],
                ["Azure", "azure"],
                ["Google Cloud", "gcp"],
                ["Docker", "docker"],
                ["Kubernetes", "kubernetes"],
                ["GitHub Actions", "github-actions"],
            ],
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white shadow border-b">

            <div className="max-w-7xl mx-auto px-4">

                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                
            
                        <Link href={route('home')}>
    <ApplicationLogo className="h-9 w-auto text-[#14171F]" />
</Link>

                        

                    {/* Desktop Navigation */}

                    <nav className="hidden lg:flex items-center gap-6">

                        <Link
                            href={route("home")}
                            className="hover:text-red-600 font-medium"
                        >
                            {t("Home")}
                        </Link>

                        {menus.map((menu) => (
                            <div
                                key={menu.title}
                                className="relative"
                                onMouseEnter={() =>
                                    setOpenDropdown(menu.title)
                                }
                                onMouseLeave={() =>
                                    setOpenDropdown(null)
                                }
                            >
                                <button className="flex items-center gap-1 hover:text-red-600">
                                    {menu.title}
                                    <ChevronDown size={16} />
                                </button>

                                {openDropdown === menu.title && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border p-3 grid grid-cols-1 gap-2">

                                        {menu.items.map(([label, slug]) => (
                                            <Link
                                                key={slug}
                                                href={route(
                                                    "categories.show",
                                                    slug
                                                )}
                                                className="hover:bg-red-50 rounded px-2 py-1"
                                            >
                                                {label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                    </nav>

                    {/* Right Side */}

                    <div className="hidden lg:flex items-center gap-3">

                        <form
                            action={route("search")}
                            method="GET"
                            className="relative"
                        >
                            <Search
                                className="absolute left-3 top-2.5 text-gray-400"
                                size={16}
                            />

                            <input
                                name="q"
                                placeholder="Search..."
                                className="border rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-red-500"
                            />
                        </form>

                        <LanguageSwitcher />

                        {auth?.user ? (
                            <Link
                                href={route("dashboard")}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="text-gray-700"
                                >
                                    Login
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile */}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden"
                    >
                        {mobileOpen ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>

                </div>

                {mobileOpen && (
                    <div className="lg:hidden pb-6 space-y-2">

                        <Link
                            href={route("home")}
                            className="block py-2"
                        >
                            Home
                        </Link>

                        {menus.map((menu) => (
                            <details key={menu.title}>
                                <summary className="cursor-pointer py-2 font-semibold">
                                    {menu.title}
                                </summary>

                                <div className="ml-4 space-y-1">

                                    {menu.items.map(([label, slug]) => (
                                        <Link
                                            key={slug}
                                            href={route(
                                                "categories.show",
                                                slug
                                            )}
                                            className="block py-1"
                                        >
                                            {label}
                                        </Link>
                                    ))}

                                </div>
                            </details>
                        ))}

                        <LanguageSwitcher />

                    </div>
                )}

            </div>

        </header>
    );
}
