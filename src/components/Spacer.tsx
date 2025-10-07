import React from 'react';
import {View} from 'react-native';
import {getWidth, getHeight} from '../utils';

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer: React.FC<SpacerProps> = ({width, height}) => {
  return (
    <View
      style={{
        width: width ? getWidth(width) : undefined,
        height: height ? getHeight(height) : undefined,
      }}
    />
  );
};

export default Spacer;

