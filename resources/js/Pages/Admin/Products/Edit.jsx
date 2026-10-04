import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductForm from '@/Components/Admin/ProductForm';

export default function Edit({ product, categories }) {
    const form = useForm({
        _method: 'put', // multipart uploads need POST with method spoofing
        title: product.title,
        description: product.description ?? '',
        category_id: product.category_id ?? '',
        price: product.price,
        image: null,
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(`/admin/products/${product.id}`, { forceFormData: true });
    };

    return (
        <>
            <Head title={`Edit ${product.title}`} />
            <div className="mx-auto max-w-2xl p-4 sm:p-6">
                <Link href="/admin/products" className="text-sm text-teal-700">&larr; Back to products</Link>
                <h1 className="mb-6 mt-3 text-2xl font-bold text-slate-900">Edit product</h1>
                <div className="rounded-md border border-slate-200 bg-white p-6">
                    <ProductForm form={form} categories={categories} product={product} onSubmit={submit} submitLabel="Save changes" />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;