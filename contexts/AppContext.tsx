import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/data/productCatalog';
import { AIResponse } from '@/services/aiService';

interface AppContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recommendations: AIResponse | null;
  setRecommendations: (recommendations: AIResponse | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        recommendations,
        setRecommendations,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}