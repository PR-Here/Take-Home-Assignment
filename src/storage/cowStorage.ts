import AsyncStorage from '@react-native-async-storage/async-storage';
import {Cow} from '../types/cow';

const COWS_STORAGE_KEY = '@cows_data';

export const cowStorage = {
  async saveCows(cows: Cow[]): Promise<void> {
    try {
      await AsyncStorage.setItem(COWS_STORAGE_KEY, JSON.stringify(cows));
    } catch (error) {
      console.error('Error saving cows:', error);
      throw error;
    }
  },

  async getCows(): Promise<Cow[]> {
    try {
      const data = await AsyncStorage.getItem(COWS_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting cows:', error);
      return [];
    }
  },

  async addCow(cow: Cow): Promise<void> {
    try {
      const cows = await this.getCows();
      cows.push(cow);
      await this.saveCows(cows);
    } catch (error) {
      console.error('Error adding cow:', error);
      throw error;
    }
  },

  async updateCow(updatedCow: Cow): Promise<void> {
    try {
      const cows = await this.getCows();
      const index = cows.findIndex(cow => cow.id === updatedCow.id);
      if (index !== -1) {
        cows[index] = updatedCow;
        await this.saveCows(cows);
      }
    } catch (error) {
      console.error('Error updating cow:', error);
      throw error;
    }
  },

  async deleteCow(id: string): Promise<void> {
    try {
      const cows = await this.getCows();
      const filtered = cows.filter(cow => cow.id !== id);
      await this.saveCows(filtered);
    } catch (error) {
      console.error('Error deleting cow:', error);
      throw error;
    }
  },

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(COWS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cows:', error);
      throw error;
    }
  },
};

