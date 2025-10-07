import React from 'react';
import {Text as RNText, TextProps as RNTextProps, StyleSheet} from 'react-native';
import {FontName} from '../constant/FontName';
import {getFonts} from '../utils';
import colors from '../constant/colors';

export interface TextProps extends RNTextProps {
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  fontSize?: number;
  children: React.ReactNode;
  fontFamily?: string;
}

const Text: React.FC<TextProps> = ({
  color = colors.primary,
  align = 'left',
  fontSize,
  style,
  children,
  fontFamily,
  ...props
}) => {
  const textStyle = [
    styles.base,
    {
      color,
      textAlign: align,
      ...(fontSize && {fontSize: getFonts(fontSize)}),
      ...(fontFamily && {fontFamily}),
    },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: FontName.Poppins,
    fontSize: getFonts(16),
    color: colors.black,
  },
});

export default Text;

