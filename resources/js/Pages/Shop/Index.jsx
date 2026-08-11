import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import PublicNavigation from "@/Components/PublicNavigation";
import {
    Search,
    ShoppingBag,
    Star,
    SlidersHorizontal,
    ChevronDown,
    Heart,
    ArrowRight,
    Package,
} from "lucide-react";
import { useState } from "react";
import PublicNav from "@/Components/PublicNavigation";

export default function Index({
    products,
    categories = [],
    category = null,
}) {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");

    /*
    |--------------------------------------------------------------------------
    | Handle different Laravel pagination structures
    |--------------------------------------------------------------------------
    */
    const productItems = Array.isArray(products)
        ? products
        : products?.data || [];

    /*
    |--------------------------------------------------------------------------
    | Category filtering
    |--------------------------------------------------------------------------
    */
    const currentCategory =
        category ||
        new URLSearchParams(window.location.search).get("category");

    /*
    |--------------------------------------------------------------------------
    | Search products on the current page
    |--------------------------------------------------------------------------
    */
    const filteredProducts = productItems.filter((product) => {
        if (!search.trim()) return true;

        const term = search.toLowerCase();

        return (
            product.title?.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term)
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Sorting
    |--------------------------------------------------------------------------
    */
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === "price_low") {
            return Number(a.price) - Number(b.price);
        }

        if (sort === "price_high") {
            return Number(b.price) - Number(a.price);
        }

        if (sort === "rating") {
            return Number(b.rating || 0) - Number(a.rating || 0);
        }

        return (
            new Date(b.created_at || 0) -
            new Date(a.created_at || 0)
        );
    });

    /*
    |--------------------------------------------------------------------------
    | Format Rwandan Francs
    |--------------------------------------------------------------------------
    */
    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-RW", {
            style: "currency",
            currency: "RWF",
            maximumFractionDigits: 0,
        }).format(Number(price || 0));
    };

    /*
    |--------------------------------------------------------------------------
    | Category navigation
    |--------------------------------------------------------------------------
    */
    const handleCategory = (slug) => {
        if (!slug) {
            router.get("/shop");
            return;
        }

        router.get("/shop", {
            category: slug,
        });
    };

    return (
        <>
        <PublicNavigation/>
            <Head>
                <title>
                    {currentCategory
                        ? `${currentCategory} | RUNUTRIDIET Shop`
                        : "RUNUTRIDIET Shop"}
                </title>

                <meta
                    name="description"
                    content={
                        currentCategory
                            ? `Shop ${currentCategory} nutrition, wellness and healthy lifestyle products from RUNUTRIDIET.`
                            : "Shop nutrition, wellness, supplements and healthy lifestyle products from RUNUTRIDIET."
                    }
                />
            </Head>

            <div className="min-h-screen bg-slate-50">
                {/* =========================================================
                    HERO
                ========================================================== */}
                <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-800">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
                        <div className="absolute -bottom-32 left-10 h-80 w-80 rounded-full bg-emerald-300 blur-3xl" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
                        <div className="max-w-3xl">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50 backdrop-blur">
                                <ShoppingBag className="h-4 w-4" />
                                RUNUTRIDIET Shop
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Nourish your body.
                                <span className="block text-emerald-300">
                                    Live healthier.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/80 sm:text-lg">
                                Discover carefully selected nutrition,
                                wellness, supplements and healthy lifestyle
                                products to support your journey.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="mt-8 max-w-2xl">
                            <div className="flex items-center rounded-2xl bg-white p-2 shadow-2xl">
                                <Search className="ml-3 h-5 w-5 text-slate-400" />

                                <input
                                    type="search"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search supplements, vitamins, healthy foods..."
                                    className="w-full border-0 bg-transparent px-4 py-3 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:ring-0"
                                />

                                <button
                                    type="button"
                                    className="hidden rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:block"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    CATEGORY NAVIGATION
                ========================================================== */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
                        <div className="flex gap-3 overflow-x-auto py-4 scrollbar-hide">
                            <button
                                type="button"
                                onClick={() => handleCategory(null)}
                                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                                    !currentCategory
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                }`}
                            >
                                All Products
                            </button>

                            {categories.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() =>
                                        handleCategory(item.slug)
                                    }
                                    className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                                        currentCategory === item.slug ||
                                        currentCategory === item.name
                                            ? "bg-emerald-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =========================================================
                    SHOP CONTENT
                ========================================================== */}
                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
                    {/* Heading + sorting */}
                    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                                Shop
                            </p>

                            <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                                {currentCategory
                                    ? currentCategory
                                    : "All Products"}
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                {sortedProducts.length}{" "}
                                {sortedProducts.length === 1
                                    ? "product"
                                    : "products"}{" "}
                                available
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
                                <SlidersHorizontal className="h-4 w-4" />
                                Sort by
                            </div>

                            <div className="relative">
                                <select
                                    value={sort}
                                    onChange={(e) =>
                                        setSort(e.target.value)
                                    }
                                    className="appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                >
                                    <option value="latest">
                                        Latest
                                    </option>
                                    <option value="price_low">
                                        Price: Low to High
                                    </option>
                                    <option value="price_high">
                                        Price: High to Low
                                    </option>
                                    <option value="rating">
                                        Highest Rated
                                    </option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
                        PRODUCTS
                    ====================================================== */}
                    {sortedProducts.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {sortedProducts.map((product) => (
                                <article
                                    key={product.id}
                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    {/* Product image */}
                                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100">
                                                <Package className="h-20 w-20 text-emerald-300" />
                                            </div>
                                        )}

                                        {/* Rating */}
                                        {Number(product.rating) > 0 && (
                                            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow">
                                                <Star className="h-3.5 w-3.5 fill-current text-amber-400" />
                                                {Number(
                                                    product.rating
                                                ).toFixed(1)}
                                            </div>
                                        )}

                                        {/* Wishlist */}
                                        <button
                                            type="button"
                                            aria-label={`Add ${product.title} to wishlist`}
                                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow transition hover:bg-white hover:text-rose-500"
                                        >
                                            <Heart className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Product details */}
                                    <div className="p-5">
                                        <h3 className="line-clamp-2 min-h-[3rem] text-lg font-bold text-slate-900">
                                            {product.title}
                                        </h3>

                                        <p className="mt-2 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-slate-500">
                                            {product.description ||
                                                "Quality nutrition and wellness product from RUNUTRIDIET."}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <div>
                                                <p className="text-lg font-bold text-emerald-700">
                                                    {formatPrice(
                                                        product.price
                                                    )}
                                                </p>

                                                {product.downloads_count >
                                                    0 && (
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {
                                                            product.downloads_count
                                                        }{" "}
                                                        downloads
                                                    </p>
                                                )}
                                            </div>

                                            <Link
                                                href={`/products/${product.id}`}
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                            >
                                                View
                                                <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        /* =================================================
                           EMPTY STATE
                        ================================================== */
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                                <ShoppingBag className="h-8 w-8 text-emerald-600" />
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                No products found
                            </h3>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                We couldn't find products matching your
                                current search or category. Try another
                                category or search term.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    handleCategory(null);
                                }}
                                className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                View All Products
                            </button>
                        </div>
                    )}

                    {/* =====================================================
                        PAGINATION
                    ====================================================== */}
                    {products?.links &&
                        products.links.length > 3 && (
                            <div className="mt-10 flex flex-wrap justify-center gap-2">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={!link.url}
                                        onClick={() =>
                                            link.url &&
                                            router.visit(link.url)
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                                            link.active
                                                ? "bg-emerald-600 text-white"
                                                : link.url
                                                ? "bg-white text-slate-700 hover:bg-emerald-50"
                                                : "cursor-not-allowed bg-slate-100 text-slate-400"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                </main>

                {/* =========================================================
                    TRUST / CTA
                ========================================================== */}
                <section className="border-t border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-2xl bg-emerald-50 p-6">
                                <h3 className="font-bold text-slate-900">
                                    Nutrition First
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Products selected to complement healthy
                                    nutrition and lifestyle choices.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-teal-50 p-6">
                                <h3 className="font-bold text-slate-900">
                                    Wellness Focused
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Supporting your journey toward a healthier
                                    and more active lifestyle.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-100 p-6">
                                <h3 className="font-bold text-slate-900">
                                    Learn More
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Explore our nutrition education and wellness
                                    resources alongside our shop.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

