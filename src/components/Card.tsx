import React from 'react';
import {View, StyleSheet, ViewStyle, useColorScheme} from 'react-native';
import {getWidth, getHeight} from '../utils';
import colors from '../constant/colors';

interface CardProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: boolean;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = true,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const cardStyles = [
    styles.card,
    styles[`card_${variant}`],
    isDarkMode ? styles.card_dark : styles.card_light,
    padding && styles.card_padding,
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: getWidth(12),
    overflow: 'hidden',
  },
  card_elevated: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: getHeight(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: getWidth(8),
    elevation: 4,
  },
  card_outlined: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  card_filled: {
    borderWidth: 0,
  },
  card_light: {
    backgroundColor: colors.white,
  },
  card_dark: {
    backgroundColor: colors.backgroundDark,
  },
  card_padding: {
    padding: getWidth(16),
  },
});

export default Card;

