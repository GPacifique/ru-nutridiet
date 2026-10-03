import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { ARTICLE_CONTENT_CLASSES } from './articleContent';

/* ------------------------------------------------------------------ */
/* Styling shared by the editor and the published article              */
/* ------------------------------------------------------------------ */
/*
 * Tailwind's preflight strips default heading/list styles, so the article
 * typography is spelled out here. Reuse ARTICLE_CONTENT_CLASSES on any page
 * that renders the saved HTML so it looks exactly like the editor:
 *
 *   <div className={ARTICLE_CONTENT_CLASSES}
 *        dangerouslySetInnerHTML={{ __html: article.content }} />
 */
export { ARTICLE_CONTENT_CLASSES };

const EDITOR_ONLY_CLASSES = [
    'min-h-[360px] px-5 py-4 focus:outline-none',
    '[&_.is-editor-empty:first-child::before]:pointer-events-none',
    '[&_.is-editor-empty:first-child::before]:float-left',
    '[&_.is-editor-empty:first-child::before]:h-0',
    '[&_.is-editor-empty:first-child::before]:text-slate-400',
    '[&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
    '[&_img.ProseMirror-selectednode]:outline [&_img.ProseMirror-selectednode]:outline-2 [&_img.ProseMirror-selectednode]:outline-teal-700',
].join(' ');

/* ------------------------------------------------------------------ */
/* Image upload                                                        */
/* ------------------------------------------------------------------ */

async function uploadImage(url, file) {
    const body = new FormData();
    body.append('image', file);

    // Laravel sets an XSRF-TOKEN cookie; send it back as a header.
    const cookie = document.cookie.split('; ').find((row) => row.startsWith('XSRF-TOKEN='));
    const headers = { Accept: 'application/json', 'X-Requested-With': 'XMLHttpRequest' };
    if (cookie) headers['X-XSRF-TOKEN'] = decodeURIComponent(cookie.split('=')[1]);

    const response = await fetch(url, { method: 'POST', body, headers, credentials: 'same-origin' });

    if (!response.ok) {
        const err = await response.json().catch(() => null);
        throw new Error(err?.errors?.image?.[0] ?? err?.message ?? 'Image upload failed.');
    }

    return (await response.json()).url;
}

/* ------------------------------------------------------------------ */
/* Toolbar pieces                                                      */
/* ------------------------------------------------------------------ */

function Btn({ label, active = false, disabled = false, onClick, children, className = '' }) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            aria-pressed={active}
            disabled={disabled}
            onClick={onClick}
            className={`min-w-[2rem] rounded px-2 py-1.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700 disabled:cursor-not-allowed disabled:opacity-40 ${
                active ? 'bg-teal-50 text-teal-800' : 'text-slate-700 hover:bg-slate-100'
            } ${className}`}
        >
            {children}
        </button>
    );
}

const Divider = () => <span className="mx-1 h-6 w-px bg-slate-200" aria-hidden="true" />;

/* ------------------------------------------------------------------ */
/* Editor                                                              */
/* ------------------------------------------------------------------ */

export default function RichTextEditor({
    value = '',
    onChange,
    error,
    uploadUrl = '/admin/articles/upload-image',
    placeholder = 'Start writing your article…',
}) {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const fileInput = useRef(null);
    const editorRef = useRef(null);

    const insertFiles = async (files) => {
        const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
        if (images.length === 0 || !editorRef.current) return;

        setUploading(true);
        setUploadError(null);

        try {
            for (const file of images) {
                const src = await uploadImage(uploadUrl, file);
                editorRef.current
                    .chain()
                    .focus()
                    .setImage({ src, alt: file.name.replace(/\.[^.]+$/, '') })
                    .run();
            }
        } catch (e) {
            setUploadError(e.message);
        } finally {
            setUploading(false);
        }
    };

    const editor = useEditor({
        shouldRerenderOnTransaction: true,
        extensions: [
            // TipTap v3: StarterKit already includes Underline and Link.
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4] },
                link: {
                    openOnClick: false,
                    HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
                },
            }),
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Image,
            Placeholder.configure({ placeholder }),
        ],
        content: value,
        editorProps: {
            attributes: {
                class: `${ARTICLE_CONTENT_CLASSES} ${EDITOR_ONLY_CLASSES}`,
                role: 'textbox',
                'aria-multiline': 'true',
                'aria-label': 'Article content',
            },
            // Paste or drop images straight into the text.
            handlePaste: (_view, event) => {
                const files = event.clipboardData?.files;
                if (files?.length && Array.from(files).some((f) => f.type.startsWith('image/'))) {
                    event.preventDefault();
                    insertFiles(files);
                    return true;
                }
                return false;
            },
            handleDrop: (_view, event) => {
                const files = event.dataTransfer?.files;
                if (files?.length && Array.from(files).some((f) => f.type.startsWith('image/'))) {
                    event.preventDefault();
                    insertFiles(files);
                    return true;
                }
                return false;
            },
        },
        // An empty editor is "<p></p>"; send '' so server-side "required" works.
        onUpdate: ({ editor }) => onChange?.(editor.isEmpty ? '' : editor.getHTML()),
    });

    editorRef.current = editor;

    // Keep the editor in sync if the parent resets or replaces the value.
    useEffect(() => {
        if (!editor) return;
        const current = editor.isEmpty ? '' : editor.getHTML();
        if (value !== current) editor.commands.setContent(value || '', { emitUpdate: false });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    if (!editor) {
        return <div className="min-h-[360px] rounded-md border border-slate-300 bg-slate-50" aria-busy="true" />;
    }

    const setLink = () => {
        const previous = editor.getAttributes('link').href ?? '';
        const input = window.prompt('Link address (leave empty to remove the link)', previous);
        if (input === null) return;

        const url = input.trim();
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        const href = /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}`;
        editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
    };

    const headingValue = [1, 2, 3, 4].find((level) => editor.isActive('heading', { level })) ?? 0;

    const words = editor.getText().trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    return (
        <div>
            <div
                className={`rounded-md border bg-white ${
                    error ? 'border-rose-400' : 'border-slate-300 focus-within:border-teal-700'
                }`}
            >
                {/* Toolbar */}
                <div
                    className="sticky top-16 z-10 flex flex-wrap items-center gap-0.5 rounded-t-md border-b border-slate-200 bg-white px-2 py-1.5"
                    role="toolbar"
                    aria-label="Text formatting"
                >
                    <Btn label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
                        ↶
                    </Btn>
                    <Btn label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
                        ↷
                    </Btn>

                    <Divider />

                    <label className="sr-only" htmlFor="rte-heading">Text style</label>
                    <select
                        id="rte-heading"
                        value={headingValue}
                        onChange={(e) => {
                            const level = Number(e.target.value);
                            const chain = editor.chain().focus();
                            level === 0 ? chain.setParagraph().run() : chain.toggleHeading({ level }).run();
                        }}
                        className="rounded border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                    >
                        <option value={0}>Paragraph</option>
                        <option value={1}>Heading 1</option>
                        <option value={2}>Heading 2</option>
                        <option value={3}>Heading 3</option>
                        <option value={4}>Heading 4</option>
                    </select>

                    <Divider />

                    <Btn label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} className="font-bold">
                        B
                    </Btn>
                    <Btn label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} className="italic">
                        I
                    </Btn>
                    <Btn label="Underline" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} className="underline">
                        U
                    </Btn>
                    <Btn label="Strikethrough" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} className="line-through">
                        S
                    </Btn>

                    <Divider />

                    <label className="flex items-center gap-1 rounded px-1.5 py-1 text-sm text-slate-700 hover:bg-slate-100">
                        <span aria-hidden="true">A</span>
                        <span className="sr-only">Text colour</span>
                        <input
                            type="color"
                            value={editor.getAttributes('textStyle').color ?? '#1e293b'}
                            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                            className="h-5 w-6 cursor-pointer border-0 bg-transparent p-0"
                        />
                    </label>
                    <Btn label="Reset text colour" onClick={() => editor.chain().focus().unsetColor().run()}>
                        A✕
                    </Btn>
                    <Btn
                        label="Highlight"
                        active={editor.isActive('highlight')}
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                    >
                        <span className="rounded bg-yellow-200 px-1">H</span>
                    </Btn>

                    <Divider />

                    <Btn label="Align left" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                        ⇤
                    </Btn>
                    <Btn label="Align centre" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                        ↔
                    </Btn>
                    <Btn label="Align right" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                        ⇥
                    </Btn>
                    <Btn label="Justify" active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                        ≡
                    </Btn>

                    <Divider />

                    <Btn label="Bulleted list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        • List
                    </Btn>
                    <Btn label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        1. List
                    </Btn>
                    <Btn label="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                        “ ”
                    </Btn>
                    <Btn label="Code block" active={editor.isActive('codeBlock')} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                        {'</>'}
                    </Btn>
                    <Btn label="Horizontal line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        ―
                    </Btn>

                    <Divider />

                    <Btn label="Link" active={editor.isActive('link')} onClick={setLink}>
                        Link
                    </Btn>
                    <Btn label="Insert image" disabled={uploading} onClick={() => fileInput.current?.click()}>
                        {uploading ? 'Uploading…' : 'Image'}
                    </Btn>
                    <Btn
                        label="Clear formatting"
                        onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                    >
                        Clear
                    </Btn>

                    <input
                        ref={fileInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            insertFiles(e.target.files);
                            e.target.value = '';
                        }}
                    />
                </div>

                <EditorContent editor={editor} />

                {/* Status bar */}
                <div className="flex items-center justify-between rounded-b-md border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-500">
                    <span>
                        {words} {words === 1 ? 'word' : 'words'} · about {minutes} min read
                    </span>
                    <span>Tip: paste or drop images straight into the text</span>
                </div>
            </div>

            {uploadError && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-rose-700">
                    {uploadError}
                </p>
            )}
        </div>
    );
}