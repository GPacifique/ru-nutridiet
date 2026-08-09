import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

export default function ArticleEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [StarterKit, Link.configure({ openOnClick: false })],
        content,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'font-body text-sm p-3 min-h-[300px] focus:outline-none prose max-w-none',
            },
        },
    });

    if (!editor) return null;

    const btn = (active) =>
        `font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 border-r border-[#D7DBDE] last:border-r-0
         ${active ? 'bg-[#14171F] text-white' : 'text-[#3A4048] hover:bg-[#EEF1F3]'}`;

    return (
        <div className="border border-[#D7DBDE] focus-within:border-[#25406B]">
            <div className="flex flex-wrap border-b border-[#D7DBDE] bg-[#FAFBFC]">
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive('bold'))}>Bold</button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive('italic'))}>Italic</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive('heading', { level: 2 }))}>H2</button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive('heading', { level: 3 }))}>H3</button>
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive('bulletList'))}>List</button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive('orderedList'))}>1. List</button>
                <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive('blockquote'))}>Quote</button>
                <button
                    type="button"
                    onClick={() => {
                        const url = window.prompt('URL');
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                    }}
                    className={btn(editor.isActive('link'))}
                >
                    Link
                </button>
                <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)}>Undo</button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)}>Redo</button>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}