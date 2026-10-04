export default function ProductForm({ form, categories, product, onSubmit, submitLabel }) {
    const { data, setData, errors, processing, progress } = form;

    const Field = ({ label, error, children }) => (
        <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
            {children}
            {error && <p className="mt-1 text-sm text-rose-600">{error}</p>}
        </div>
    );

    const input = 'w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-700';

    return (
        <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Title" error={errors.title}>
                <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className={input} />
            </Field>

            <Field label="Description" error={errors.description}>
                <textarea rows={5} value={data.description} onChange={(e) => setData('description', e.target.value)} className={input} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Category" error={errors.category_id}>
                    <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className={input}>
                        <option value="">No category</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Price" error={errors.price}>
                    <input type="number" step="0.01" min="0" value={data.price} onChange={(e) => setData('price', e.target.value)} className={input} />
                </Field>
            </div>

            <Field label="Cover image (max 2 MB)" error={errors.image}>
                {product?.image_url && (
                    <img src={product.image_url} alt="" className="mb-2 h-24 w-24 rounded-md border object-cover" />
                )}
                <input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0] ?? null)} className="block w-full text-sm" />
                {product?.image_url && <p className="mt-1 text-xs text-slate-500">Choose a new file only if you want to replace the current image.</p>}
            </Field>

            <Field label="Downloadable file (max 50 MB)" error={errors.file}>
                {product?.file_url && (
                    <a href={product.file_url} target="_blank" rel="noreferrer" className="mb-2 block text-sm text-teal-700 underline">
                        Current file
                    </a>
                )}
                <input type="file" onChange={(e) => setData('file', e.target.files[0] ?? null)} className="block w-full text-sm" />
            </Field>

            {progress && (
                <div className="h-2 w-full overflow-hidden rounded bg-slate-200">
                    <div className="h-2 bg-teal-700" style={{ width: `${progress.percentage}%` }} />
                </div>
            )}

            <button
                type="submit"
                disabled={processing}
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 disabled:opacity-50"
            >
                {processing ? 'Saving...' : submitLabel}
            </button>
        </form>
    );
}