import React from 'react';
import {View, StyleSheet, ViewStyle, useColorScheme} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getWidth} from '../utils';
import colors from '../constant/colors';

interface ContainerProps {
  children: React.ReactNode;
  center?: boolean;
  padding?: boolean;
  paddingHorizontal?: boolean;
  paddingVertical?: boolean;
  useSafeArea?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({
  children,
  center = false,
  padding = false,
  paddingHorizontal = false,
  paddingVertical = false,
  useSafeArea = false,
  backgroundColor,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';
  const defaultBgColor = isDarkMode ? colors.backgroundDark : colors.background;

  const containerStyles = [
    styles.container,
    center && styles.center,
    padding && styles.padding,
    paddingHorizontal && styles.paddingHorizontal,
    paddingVertical && styles.paddingVertical,
    useSafeArea && {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    {backgroundColor: backgroundColor || defaultBgColor},
    style,
  ];

  return <View style={containerStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    padding: getWidth(20),
  },
  paddingHorizontal: {
    paddingHorizontal: getWidth(20),
  },
  paddingVertical: {
    paddingVertical: getWidth(20),
  },
});

export default Container;

