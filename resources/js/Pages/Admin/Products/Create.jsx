import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import ProductForm from '@/Components/Admin/ProductForm';

export default function Create({ categories }) {
    const form = useForm({
        title: '',
        description: '',
        category_id: '',
        price: '0',
        image: null,
        file: null,
    });

    const submit = (e) => {
        e.preventDefault();
        form.post('/admin/products', { forceFormData: true });
    };

    return (
        <>
            <Head title="New product" />
            <div className="mx-auto max-w-2xl p-4 sm:p-6">
                <Link href="/admin/products" className="text-sm text-teal-700">&larr; Back to products</Link>
                <h1 className="mb-6 mt-3 text-2xl font-bold text-slate-900">New product</h1>
                <div className="rounded-md border border-slate-200 bg-white p-6">
                    <ProductForm form={form} categories={categories} onSubmit={submit} submitLabel="Create product" />
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;