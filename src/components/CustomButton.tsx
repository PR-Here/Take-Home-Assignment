import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {getWidth, getHeight, getFonts} from '../utils';
import colors from '../constant/colors';
import { FontName } from '../constant/FontName';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
type ButtonSize = 'small' | 'medium' | 'large';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}) => {
  const buttonStyles = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    disabled && styles.button_disabled,
    fullWidth && styles.button_fullWidth,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${size}`],
    disabled && styles.text_disabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator
          color={colors.white}
          size={size === 'small' ? 'small' : 'large'}
        />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getWidth(10),
  },
  // Variants
  button_primary: {
    backgroundColor: colors.primary,
  },
  button_secondary: {
    backgroundColor: colors.secondary,
  },
  button_success: {
    backgroundColor: colors.success,
  },
  button_danger: {
    backgroundColor: colors.danger,
  },
  button_warning: {
    backgroundColor: colors.warning,
  },
  // Sizes
  button_small: {
    paddingHorizontal: getWidth(20),
    paddingVertical: getHeight(8),
    minWidth: getWidth(100),
  },
  button_medium: {
    paddingHorizontal: getWidth(30),
    paddingVertical: getHeight(15),
    minWidth: getWidth(150),
  },
  button_large: {
    paddingHorizontal: getWidth(40),
    paddingVertical: getHeight(20),
    minWidth: getWidth(200),
  },
  // States
  button_disabled: {
    backgroundColor: colors.lightGray,
    opacity: 0.6,
  },
  button_fullWidth: {
    width: '100%',
  },
  // Text
  text: {
    color: colors.white,
    fontFamily: FontName.PoppinsBold,
    fontSize: getFonts(14),
  },
  text_small: {
    fontSize: getFonts(14),
  },
  text_medium: {
    fontSize: getFonts(16),
  },
  text_large: {
    fontSize: getFonts(18),
  },
  text_disabled: {
    color: colors.white,
  },
});

export default CustomButton;

