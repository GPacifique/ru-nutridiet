import { useForm, usePage, Head } from '@inertiajs/react';

export default function Contact() {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Head title="Contact" />

            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Contact us</h1>

                {flash?.success && (
                    <div className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-green-800">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Message</label>
                        <textarea
                            rows={5}
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="w-full rounded border p-2"
                        />
                        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
                    >
                        {processing ? 'Sending...' : 'Send message'}
                    </button>
                </form>
            </div>
        </>
    );
}