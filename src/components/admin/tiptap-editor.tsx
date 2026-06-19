'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import {
  Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered,
  Quote, Code, Undo, Redo, Link, Image, Pilcrow,
} from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const lowlight = createLowlight(common);

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function TipTapEditor({ content, onChange, placeholder = 'Mulai menulis...' }: TipTapEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      ImageExtension.configure({ inline: false }),
      LinkExtension.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[400px] px-6 py-4',
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL link:', linkUrl || 'https://');
    if (url) {
      setLinkUrl(url);
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL gambar:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  const ToolButton = ({ onClick, active, children }: { onClick: () => void; active?: boolean; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded p-1.5 text-muted-foreground hover:bg-surface hover:text-foreground transition-colors',
        active && 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400'
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border border-border bg-background overflow-hidden">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/50 px-3 py-2">
        <ToolButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic className="h-4 w-4" />
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-border" />
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
          <Heading1 className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')}>
          <Pilcrow className="h-4 w-4" />
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-border" />
        <ToolButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
          <Quote className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')}>
          <Code className="h-4 w-4" />
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-border" />
        <ToolButton onClick={addLink} active={editor.isActive('link')}>
          <Link className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={addImage}>
          <Image className="h-4 w-4" />
        </ToolButton>
        <span className="mx-1 h-5 w-px bg-border" />
        <ToolButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </ToolButton>
        <ToolButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </ToolButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
