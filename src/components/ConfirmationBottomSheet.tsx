import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from './BottomSheet';
import Text from './CustomText';
import CustomButton from './CustomButton';
import Spacer from './Spacer';
import { colors, FontName } from '../constant';
import { getWidth, getHeight, getFonts } from '../utils';

interface ConfirmationBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  confirmVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  icon?: string;
  loading?: boolean;
}

const ConfirmationBottomSheet: React.FC<ConfirmationBottomSheetProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  confirmVariant = 'danger',
  icon = '⚠️',
  loading = false,
}) => {
  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      height="auto"
      borderRadius={24}
      backdropOpacity={0.6}
    >
      <View style={styles.container}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text fontSize={getFonts(48)}>{icon}</Text>
        </View>

        <Spacer height={getHeight(20)} />

        {/* Title */}
        <Text
          fontSize={getFonts(22)}
          color={colors.black}
          align="center"
          style={styles.title}
        >
          {title}
        </Text>

        <Spacer height={getHeight(12)} />

        {/* Message */}
        <Text
          fontSize={getFonts(15)}
          color={colors.textSecondary}
          align="center"
          style={styles.message}
        >
          {message}
        </Text>

        <Spacer height={getHeight(32)} />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title={confirmText}
            variant={confirmVariant}
            size="small"
            onPress={onConfirm}
            fullWidth
            loading={loading}
            disabled={loading}
          />
          <Spacer height={getHeight(12)} />
          <CustomButton
            title={cancelText}
            variant="secondary"
            size="small"
            onPress={onClose}
            fullWidth
            disabled={loading}
          />
        </View>

        <Spacer height={getHeight(20)} />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: getHeight(10),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: getHeight(10),
  },
  title: {
    fontFamily: FontName.PoppinsBold,
    lineHeight: getFonts(28),
  },
  message: {
    fontFamily: FontName.Poppins,
    lineHeight: getFonts(22),
    paddingHorizontal: getWidth(10),
  },
  buttonContainer: {
    width: '100%',
  },
});

export default ConfirmationBottomSheet;

