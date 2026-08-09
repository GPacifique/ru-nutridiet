import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichTextEditor({ value, onChange }) {

    const editor = useEditor({
        extensions: [StarterKit],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-lg bg-white">

            {/* Toolbar */}
            <div className="flex gap-2 p-2 border-b bg-gray-50">

                <button onClick={() => editor.chain().focus().toggleBold().run()}>
                    Bold
                </button>

                <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                    Italic
                </button>

                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                    H2
                </button>

            </div>

            {/* Editor Area */}
            <div className="p-4 min-h-[200px]">
                <EditorContent editor={editor} />
            </div>

        </div>
    );
}