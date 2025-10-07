import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, SCREEN_NAMES } from '../../navigation';
import { Container, Text, Spacer, Card } from '../../components';
import { colors, FontName, strings } from '../../constant';
import { CowEvent } from '../../types/cow';
import { getWidth, getHeight, getFonts } from '../../utils';
import { useCowDetail } from '../../hooks';

type CowDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.COW_DETAIL
>;

type CowDetailRouteProp = RouteProp<
  RootStackParamList,
  typeof SCREEN_NAMES.COW_DETAIL
>;

interface Props {
  navigation: CowDetailNavigationProp;
  route: CowDetailRouteProp;
}

const CowDetailScreen: React.FC<Props> = ({ route }) => {
  const {
    cow,
    gradientColors,
    statusColor,
    formatDate,
    formatShortDate,
  } = useCowDetail(route);

  if (!cow) {
    return (
      <Container center>
        <Text fontSize={getFonts(18)} color={colors.textSecondary}>
          Cow not found
        </Text>
      </Container>
    );
  }

  // Event component  for the timeline
  const renderEvent = useCallback(({ item }: { item: CowEvent }) => (
    <LinearGradient
      colors={[colors.gradientEventStart, colors.white]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.eventGradientCard}>
      <View style={styles.eventContent}>
        <View style={styles.eventHeader}>
          <Text fontSize={getFonts(16)} color={colors.black}>
            {item.type}
          </Text>
          <Text fontSize={getFonts(12)} color={colors.textLight}>
            {formatShortDate(item.date)}
          </Text>
        </View>
        <Spacer height={getHeight(6)} />
        <Text fontSize={getFonts(14)} color={colors.textSecondary}>
          {item.description}
        </Text>
        {item.metadata?.weight && (
          <>
            <Spacer height={getHeight(6)} />
            <Text fontSize={getFonts(12)} color={colors.textLight}>
              Weight: {item.metadata.weight} {strings.screens.cowDetail.kg}
            </Text>
          </>
        )}
      </View>
    </LinearGradient>
  ), [formatShortDate]);

  // InfoRow component
  const InfoRow = useCallback(({ label, value }: { label: string; value: string; highlight?: boolean }) => (
    <View style={styles.infoRow}>
      <Text fontSize={getFonts(14)} color={colors.textLight} fontFamily={FontName.PoppinsMedium}>
        {label}
      </Text>
      <Text fontSize={getFonts(14)} color={colors.black} style={styles.infoValue} fontFamily={FontName.PoppinsMedium}>
        {value}
      </Text>
    </View>
  ), []);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.content}>
        <Spacer height={getHeight(20)} />

        {/* Header with Ear Tag */}
        <View style={styles.header}>
          <Text fontSize={getFonts(28)} color={colors.black} style={styles.headerText}>
            {cow.earTag}
          </Text>
          <View
            style={[
              styles.headerStatusBadge,
              { backgroundColor: statusColor },
            ]}>
            <Text fontSize={getFonts(14)} color={colors.white}>
              {cow.status}
            </Text>
          </View>
        </View>

        <Spacer height={getHeight(20)} />

        {/* Basic Information */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}>
          <View style={styles.cardContent}>
            <Text fontSize={getFonts(18)} color={colors.black} fontFamily={FontName.PoppinsBold}>
              {strings.screens.cowDetail.basicInfo}
            </Text>
            <Spacer height={getHeight(16)} />

            <InfoRow label={strings.screens.cowDetail.sex} value={cow.sex} />
            <Spacer height={getHeight(12)} />
            <InfoRow label={strings.screens.cowDetail.pen} value={cow.pen} />
            <Spacer height={getHeight(12)} />
            <InfoRow
              label={strings.screens.cowDetail.currentWeight}
              value={
                cow.weight
                  ? `${cow.weight} ${strings.screens.cowDetail.kg}`
                  : strings.screens.cowDetail.notAvailable
              }
            />
            {cow.dailyWeightGain && (
              <>
                <Spacer height={getHeight(12)} />
                <InfoRow
                  label={strings.screens.cowDetail.dailyWeightGain}
                  value={`${cow.dailyWeightGain} ${strings.screens.cowDetail.kgPerDay}`}
                />
              </>
            )}
            <Spacer height={getHeight(12)} />
            <InfoRow
              label={strings.screens.cowDetail.createdDate}
              value={formatShortDate(cow.createdAt)}
            />
          </View>
        </LinearGradient>

        <Spacer height={getHeight(24)} />

        {/* Event Timeline */}
        <Text fontSize={getFonts(18)} color={colors.black} fontFamily={FontName.PoppinsBold}>
          {strings.screens.cowDetail.timeline}
        </Text>
        <Spacer height={getHeight(12)} />

        {cow.events.length === 0 ? (
          <Card variant="outlined">
            <Text fontSize={getFonts(14)} color={colors.textSecondary} align="center">
              {strings.screens.cowDetail.noEvents}
            </Text>
          </Card>
        ) : (
          cow.events.map((event, index) => (
            <View key={event.id}>
              {renderEvent({ item: event })}
              {index < cow.events.length - 1 && <Spacer height={getHeight(8)} />}
            </View>
          ))
        )}

        <Spacer height={getHeight(32)} />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: getWidth(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerStatusBadge: {
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(8),
    borderRadius: getWidth(20),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: getHeight(2),
    },
    shadowOpacity: 0.2,
    shadowRadius: getWidth(4),
    elevation: 3,
  },
  gradientCard: {
    borderRadius: getWidth(16),
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
    padding: getWidth(20),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',

  },
  eventGradientCard: {
    borderRadius: getWidth(12),
    marginBottom: getHeight(8),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: getHeight(2),
    },
    shadowOpacity: 0.08,
    shadowRadius: getWidth(6),
    elevation: 2,
    overflow: 'hidden',
  },
  eventContent: {
    padding: getWidth(16),
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: FontName.PoppinsBold,
  },
});

export default CowDetailScreen;

