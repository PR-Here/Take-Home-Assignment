import React, { useCallback, useLayoutEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SCREEN_NAMES } from '../../navigation';
import {
  Container,
  Text,
  SearchBar,
  FilterButton,
  CustomButton,
  Spacer,
  ConfirmationBottomSheet,
} from '../../components';
import { colors, strings } from '../../constant';
import { Cow } from '../../types/cow';
import { getWidth, getHeight, getFonts } from '../../utils';
import { useCowList } from '../../hooks';

type CowListNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.COW_LIST
>;

interface Props {
  navigation: CowListNavigationProp;
}

const CowListScreen: React.FC<Props> = ({ navigation }) => {
  const {
    loading,
    refreshing,
    filters,
    cows,
    filteredCows,
    allPens,
    statusOptions,
    showClearConfirmation,
    isClearing,
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
  } = useCowList(navigation);

  // Setup header button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleClearData}
          style={styles.headerButton}
          activeOpacity={0.7}>
          <Text fontSize={getFonts(24)} color={colors.white}>
            🗑️
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleClearData]);

  const renderCowItem = useCallback(({ item }: { item: Cow }) => {
    const gradientColors = getGradientColors(item.status);
    const statusColor = getStatusColor(item.status);

    return (
      <TouchableOpacity
        onPress={() => handleCowPress(item.id)}
        activeOpacity={0.7}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}>
          <View style={styles.cardContent}>
            <View style={styles.cowHeader}>
              <View style={styles.earTagContainer}>
                <Text fontSize={getFonts(20)} color={colors.black}>
                  {item.earTag}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: statusColor },
                ]}>
                <Text fontSize={getFonts(12)} color={colors.white}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Spacer height={getHeight(12)} />
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text fontSize={getFonts(12)} color={colors.textLight}>
                  {strings.screens.cowList.sex}
                </Text>
                <Text fontSize={getFonts(16)} color={colors.black}>
                  {item.sex}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.infoItem}>
                <Text fontSize={getFonts(12)} color={colors.textLight}>
                  {strings.screens.cowList.pen}
                </Text>
                <Text fontSize={getFonts(16)} color={colors.black}>
                  {item.pen}
                </Text>
              </View>
            </View>
            <Spacer height={getHeight(8)} />
            <View style={styles.footer}>
              <Text fontSize={getFonts(12)} color={colors.textLight}>
                {strings.screens.cowList.lastEvent}
              </Text>
              <Text fontSize={getFonts(12)} color={colors.textSecondary}>
                {formatDate(item.lastEventDate)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }, [formatDate, getStatusColor, getGradientColors, handleCowPress]);

  if (loading) {
    return (
      <Container center>
        <ActivityIndicator size="large" color={colors.primary} />
      </Container>
    );
  }

  return (
    <Container paddingHorizontal>
      <Spacer height={getHeight(16)} />
      <SearchBar
        value={filters.searchQuery}
        onChangeText={handleSearchChange}
        placeholder={strings.screens.cowList.searchPlaceholder}
      />
      <Spacer height={getHeight(16)} />
      <Text fontSize={getFonts(14)} color={colors.textSecondary}>
        {strings.screens.cowList.filterByStatus}
      </Text>
      <Spacer height={getHeight(8)} />
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}>
          {statusOptions.map(status => (
            <FilterButton
              key={status}
              label={status === 'All' ? strings.screens.cowList.allStatuses : status}
              selected={filters.statusFilter === status}
              onPress={() => handleStatusFilter(status)}
            />
          ))}
        </ScrollView>
      </View>
      <Spacer height={getHeight(12)} />
      <Text fontSize={getFonts(14)} color={colors.textSecondary}>
        {strings.screens.cowList.filterByPen}
      </Text>
      <Spacer height={getHeight(8)} />
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}>
          <FilterButton
            label={strings.screens.cowList.allPens}
            selected={filters.penFilter === 'All'}
            onPress={handleAllPensPress}
          />
          {allPens.map(pen => (
            <FilterButton
              key={pen}
              label={pen}
              selected={filters.penFilter === pen}
              onPress={() => handlePenFilter(pen)}
            />
          ))}
        </ScrollView>
      </View>
      <Spacer height={12} />

      {/* Results Count */}
      {cows.length > 0 && (
        <>
          <Text fontSize={getFonts(14)} color={colors.textSecondary}>
            {filteredCows.length} {filteredCows.length === 1 ? 'cow' : 'cows'} found
          </Text>
          <Spacer height={getHeight(12)} />
        </>
      )}

      {filteredCows.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text fontSize={getFonts(18)} color={colors.textSecondary} align="center">
            {cows.length === 0
              ? strings.screens.cowList.noCowsMessage
              : strings.screens.cowList.noCowsFound}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredCows}
          renderItem={renderCowItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
      <View style={styles.fabContainer}>
        <CustomButton
          title={strings.screens.cowList.addCowButton}
          variant="success"
          size="small"
          onPress={handleAddCowPress}
          fullWidth
        />
      </View>
      <Spacer height={getHeight(16)} />

      {/* Clear Data Confirmation Bottom Sheet */}
      <ConfirmationBottomSheet
        visible={showClearConfirmation}
        onClose={handleCloseClearConfirmation}
        onConfirm={handleConfirmClearData}
        title={strings.screens.cowList.clearDataTitle}
        message={strings.screens.cowList.clearDataMessage}
        confirmText={strings.screens.cowList.clearDataConfirm}
        cancelText={strings.common.cancel}
        confirmVariant="danger"
        icon="🗑️"
        loading={isClearing}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    height: getHeight(40),
  },
  filterScrollContent: {
    paddingRight: getWidth(10),
    alignItems: 'center',
  },
  gradientCard: {
    borderRadius: getWidth(16),
    marginBottom: getHeight(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: getHeight(4),
    },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(8),
    elevation: 4,
    overflow: 'hidden',
  },
  cardContent: {
    padding: getWidth(16),
  },
  cowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  earTagContainer: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: getWidth(12),
    paddingVertical: getHeight(6),
    borderRadius: getWidth(16),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: getHeight(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: getWidth(4),
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItem: {
    flex: 1,
  },
  infoValue: {
    marginTop: getHeight(4),
  },
  divider: {
    width: 1,
    height: getHeight(30),
    backgroundColor: colors.border,
    marginHorizontal: getWidth(16),
    opacity: 0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(40),
  },
  listContent: {
    paddingBottom: getHeight(100),
  },
  fabContainer: {
    position: 'absolute',
    bottom: getHeight(20),
    left: getWidth(20),
    right: getWidth(20),
  },
  headerButton: {
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(8),
  },
});

export default CowListScreen;

