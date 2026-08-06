import React, { useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function UploadImages() {
    const { property } = usePage().props;

    const { post, processing, progress } = useForm({
        images: [],
    });

    const [files, setFiles] = useState([]);

    // HANDLE FILES
    const handleFiles = (selectedFiles) => {
        const fileArray = Array.from(selectedFiles);

        const mapped = fileArray.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setFiles((prev) => [...prev, ...mapped]);
    };

    // DROP HANDLER
    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // FILE INPUT CHANGE
    const handleChange = (e) => {
        handleFiles(e.target.files);
    };

    // REMOVE IMAGE
    const removeImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // SUBMIT
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        files.forEach((item) => {
            formData.append("images[]", item.file);
        });

        post(route("owner.properties.images.store", property.id), {
            data: formData,
            forceFormData: true,
        });
    };

    return (
        <>
            <Head title="Upload Images" />
            <Navbar />

            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-4">
                    Upload Images for: {property.title}
                </h1>

                {/* DROP AREA */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-gray-400 p-8 text-center rounded-lg cursor-pointer hover:bg-gray-50"
                >
                    <p className="text-gray-600">
                        Drag & drop images here
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        or click below to select files
                    </p>

                    <input
                        type="file"
                        multiple
                        onChange={handleChange}
                        className="mt-4"
                    />
                </div>

                {/* PREVIEWS */}
                {files.length > 0 && (
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {files.map((item, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={item.preview}
                                    className="w-full h-32 object-cover rounded-lg"
                                />

                                <button
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* UPLOAD BUTTON */}
                <button
                    onClick={submit}
                    disabled={processing || files.length === 0}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? "Uploading..." : "Upload Images"}
                </button>

                {/* PROGRESS BAR */}
                {progress && (
                    <div className="w-full bg-gray-200 mt-4 rounded">
                        <div
                            className="bg-blue-600 text-xs text-white text-center p-1 rounded"
                            style={{ width: `${progress.percentage}%` }}
                        >
                            {progress.percentage}%
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}