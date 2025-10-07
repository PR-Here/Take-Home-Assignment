import { useState, useCallback, useLayoutEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SCREEN_NAMES } from '../navigation';
import { colors, strings } from '../constant';
import { useCows } from '../context/CowContext';
import { Cow, CowStatus } from '../types/cow';

type CowListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.COW_LIST
>;

export const useCowList = (navigation: CowListNavigationProp) => {
  const { loading, filters, setFilters, getFilteredCows, cows, loadCows, clearAllCows } = useCows();
  const filteredCows = getFilteredCows();
  const [refreshing, setRefreshing] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const allPens = Array.from(new Set(cows.map(cow => cow.pen))).sort();

  const statusOptions: Array<CowStatus | 'All'> = [
    'All',
    'Active',
    'In Treatment',
    'Deceased',
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCows();
    setRefreshing(false);
  }, [loadCows]);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }, []);

  const getStatusColor = useCallback((status: CowStatus) => {
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

  const handleSearchChange = useCallback((text: string) => {
    setFilters({ ...filters, searchQuery: text });
  }, [filters, setFilters]);

  const handleStatusFilter = useCallback((status: CowStatus | 'All') => {
    setFilters({ ...filters, statusFilter: status });
  }, [filters, setFilters]);

  const handlePenFilter = useCallback((pen: string | 'All') => {
    setFilters({ ...filters, penFilter: pen });
  }, [filters, setFilters]);

  const handleCowPress = useCallback((cowId: string) => {
    navigation.navigate(SCREEN_NAMES.COW_DETAIL, { cowId });
  }, [navigation]);

  const handleAddCowPress = useCallback(() => {
    navigation.navigate(SCREEN_NAMES.ADD_COW);
  }, [navigation]);

  const handleClearData = useCallback(() => {
    setShowClearConfirmation(true);
  }, []);

  const handleCloseClearConfirmation = useCallback(() => {
    setShowClearConfirmation(false);
  }, []);

  const handleConfirmClearData = useCallback(async () => {
    try {
      setIsClearing(true);
      await clearAllCows();
      setIsClearing(false);
      setShowClearConfirmation(false);
      // Success feedback could be added here if needed (e.g., Toast)
    } catch (error) {
      setIsClearing(false);
      console.error('Failed to clear data:', error);
      // Error feedback could be added here if needed (e.g., Toast)
    }
  }, [clearAllCows]);

  const keyExtractor = useCallback((item: Cow) => item.id, []);

  const handleAllPensPress = useCallback(() => {
    handlePenFilter('All');
  }, [handlePenFilter]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => null, // Will be set in the component
    });
  }, [navigation]);

  return {
    // State
    loading,
    refreshing,
    filters,
    cows,
    filteredCows,
    allPens,
    statusOptions,
    showClearConfirmation,
    isClearing,

    // Handlers
    onRefresh,
    formatDate,
    getStatusColor,
    getGradientColors,
    handleSearchChange,
    handleStatusFilter,
    handlePenFilter,
    handleCowPress,
    handleAddCowPress,
    handleClearData,
    handleCloseClearConfirmation,
    handleConfirmClearData,
    keyExtractor,
    handleAllPensPress,
  };
};

