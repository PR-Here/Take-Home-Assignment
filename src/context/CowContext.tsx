import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Cow, CowEvent, CowFilters} from '../types/cow';
import {cowStorage} from '../storage/cowStorage';

interface CowContextType {
  cows: Cow[];
  filters: CowFilters;
  loading: boolean;
  loadCows: () => Promise<void>;
  addCow: (cow: Cow) => Promise<void>;
  updateCow: (cow: Cow) => Promise<void>;
  deleteCow: (id: string) => Promise<void>;
  clearAllCows: () => Promise<void>;
  getCowById: (id: string) => Cow | undefined;
  setFilters: (filters: CowFilters) => void;
  getFilteredCows: () => Cow[];
  addEvent: (cowId: string, event: CowEvent) => Promise<void>;
}

const CowContext = createContext<CowContextType | undefined>(undefined);

export const useCows = () => {
  const context = useContext(CowContext);
  if (!context) {
    throw new Error('useCows must be used within CowProvider');
  }
  return context;
};

interface CowProviderProps {
  children: ReactNode;
}

export const CowProvider: React.FC<CowProviderProps> = ({children}) => {
  const [cows, setCows] = useState<Cow[]>([]);
  const [filters, setFilters] = useState<CowFilters>({
    searchQuery: '',
    statusFilter: 'All',
    penFilter: 'All',
  });
  const [loading, setLoading] = useState(true);

  const loadCows = async () => {
    try {
      setLoading(true);
      const loadedCows = await cowStorage.getCows();
      setCows(loadedCows);
    } catch (error) {
      console.error('Error loading cows:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCow = async (cow: Cow) => {
    try {
      await cowStorage.addCow(cow);
      setCows(prevCows => [...prevCows, cow]);
    } catch (error) {
      console.error('Error adding cow:', error);
      throw error;
    }
  };

  const updateCow = async (updatedCow: Cow) => {
    try {
      await cowStorage.updateCow(updatedCow);
      setCows(prevCows =>
        prevCows.map(cow => (cow.id === updatedCow.id ? updatedCow : cow)),
      );
    } catch (error) {
      console.error('Error updating cow:', error);
      throw error;
    }
  };

  const deleteCow = async (id: string) => {
    try {
      await cowStorage.deleteCow(id);
      setCows(prevCows => prevCows.filter(cow => cow.id !== id));
    } catch (error) {
      console.error('Error deleting cow:', error);
      throw error;
    }
  };

  const clearAllCows = async () => {
    try {
      await cowStorage.clearAll();
      setCows([]);
      setFilters({
        searchQuery: '',
        statusFilter: 'All',
        penFilter: 'All',
      });
    } catch (error) {
      console.error('Error clearing all cows:', error);
      throw error;
    }
  };

  const getCowById = (id: string): Cow | undefined => {
    return cows.find(cow => cow.id === id);
  };

  const getFilteredCows = (): Cow[] => {
    return cows.filter(cow => {
      const matchesSearch =
        filters.searchQuery === '' ||
        cow.earTag.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchesStatus =
        filters.statusFilter === 'All' || cow.status === filters.statusFilter;

      const matchesPen =
        filters.penFilter === 'All' || cow.pen === filters.penFilter;

      return matchesSearch && matchesStatus && matchesPen;
    });
  };

  const addEvent = async (cowId: string, event: CowEvent) => {
    const cow = getCowById(cowId);
    if (!cow) return;

    const updatedCow = {
      ...cow,
      events: [event, ...cow.events],
      lastEventDate: event.date,
    };

    await updateCow(updatedCow);
  };

  useEffect(() => {
    loadCows();
  }, []);

  const value: CowContextType = {
    cows,
    filters,
    loading,
    loadCows,
    addCow,
    updateCow,
    deleteCow,
    clearAllCows,
    getCowById,
    setFilters,
    getFilteredCows,
    addEvent,
  };

  return <CowContext.Provider value={value}>{children}</CowContext.Provider>;
};

