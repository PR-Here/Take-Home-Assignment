import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {Text} from './index';
import {getWidth, getHeight, getFonts} from '../utils';
import colors from '../constant/colors';

interface FilterButtonProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  selected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        selected ? styles.buttonSelected : styles.buttonUnselected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text
        fontSize={14}
        color={selected ? colors.white : colors.textSecondary}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(8),
    borderRadius: getWidth(20),
    marginRight: getWidth(10),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonUnselected: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
});

export default FilterButton;

