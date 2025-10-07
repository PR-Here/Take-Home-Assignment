import { useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SCREEN_NAMES } from '../navigation';
import { colors } from '../constant';
import { useCows } from '../context/CowContext';
import { CowStatus } from '../types/cow';

type CowDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof SCREEN_NAMES.COW_DETAIL
>;

export const useCowDetail = (route: CowDetailRouteProp) => {
  const { cowId } = route.params;
  const { getCowById } = useCows();
  const cow = getCowById(cowId);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }, []);

  const formatShortDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Active':
        return colors.success;
      case 'In Treatment':
        return colors.warning;
      case 'Deceased':
        return colors.danger;
      default:
        return colors.gray;
    }
  }, []);

  const getGradientColors = useCallback((status: CowStatus): [string, string] => {
    switch (status) {
      case 'Active':
        return [colors.gradientActiveStart, colors.gradientEnd];
      case 'In Treatment':
        return [colors.gradientTreatmentStart, colors.gradientEnd];
      case 'Deceased':
        return [colors.gradientDeceasedStart, colors.gradientEnd];
      default:
        return [colors.gradientDefault, colors.gradientEnd];
    }
  }, []);

  const gradientColors = cow ? getGradientColors(cow.status) : [colors.gradientDefault, colors.gradientEnd];
  const statusColor = cow ? getStatusColor(cow.status) : colors.gray;

  return {
    // Data
    cow,
    gradientColors,
    statusColor,

    // Formatters
    formatDate,
    formatShortDate,

    // Helpers
    getStatusColor,
    getGradientColors,
  };
};

