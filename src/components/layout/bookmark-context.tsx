'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ContentItem } from '@/types';

interface BookmarkContextType {
  bookmarkedIds: string[];
  toggleBookmark: (content: ContentItem) => void;
  isBookmarked: (id: string) => boolean;
  bookmarkedItems: ContentItem[];
}

const BOOKMARKS_KEY = 'ideguru-bookmarks';
const CONTENT_KEY = 'ideguru-bookmarked-content';

const BookmarkContext = createContext<BookmarkContextType>({
  bookmarkedIds: [],
  toggleBookmark: () => {},
  isBookmarked: () => false,
  bookmarkedItems: [],
});

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [bookmarkedItems, setBookmarkedItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    if (stored) {
      try {
        setBookmarkedIds(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  const toggleBookmark = useCallback((content: ContentItem) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(content.id)) {
        return prev.filter((id) => id !== content.id);
      }
      return [content.id, ...prev];
    });
    setBookmarkedItems((prev) => {
      if (prev.find((item) => item.id === content.id)) {
        return prev.filter((item) => item.id !== content.id);
      }
      return [content, ...prev];
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarkedIds.includes(id),
    [bookmarkedIds]
  );

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedIds, toggleBookmark, isBookmarked, bookmarkedItems }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
