import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import {getWidth, getHeight, getFonts} from '../utils';
import colors from '../constant/colors';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  style?: ViewStyle;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        isDarkMode ? styles.containerDark : styles.containerLight,
        style,
      ]}>
      <TextInput
        style={[
          styles.input,
          {color: isDarkMode ? colors.white : colors.black},
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? colors.gray : colors.textSecondary}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: getWidth(10),
    paddingHorizontal: getWidth(15),
    paddingVertical: getHeight(12),
    borderWidth: 1,
  },
  containerLight: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  containerDark: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.borderDark,
  },
  input: {
    fontSize: getFonts(16),
    padding: 0,
  },
});

export default SearchBar;

