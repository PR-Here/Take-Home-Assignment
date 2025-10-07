import {Dimensions, PixelRatio, Platform} from 'react-native';

const DESIGN_WIDTH = 360;
const DESIGN_HEIGHT = 800;
const IPHONE6_START_THRESHOLD_HEIGHT = 667;
const IPHONE6_END_THRESHOLD_HEIGHT = 735;
const IPHONE7PLUS_END_THRESHOLD_HEIGHT = 736;

let baseWidth: number | null = null;
let baseHeight: number | null = null;
let previousOrientation: 'portrait' | 'landscape' | null = null;

export const getWidth = (value: number) => {
  const {width} = Dimensions.get('window');
  return (value / DESIGN_WIDTH) * (baseWidth || width);
};

export const getHeight = (value: number) => {
  const {width} = Dimensions.get('window');
  return (value / DESIGN_WIDTH) * (baseWidth || width);
};

export const getFonts = (size: number, supportiPhone7Plus = false) => {
  const {width, height} = Dimensions.get('window');

  const currentOrientation = width > height ? 'landscape' : 'portrait';

  if (currentOrientation !== previousOrientation) {
    previousOrientation = currentOrientation;
  }

  const portraitWidth = baseWidth || Math.min(width, height);
  const portraitHeight = baseHeight || Math.max(width, height);

  if (
    Platform.OS === 'ios' &&
    portraitHeight >= IPHONE6_START_THRESHOLD_HEIGHT &&
    portraitHeight <= IPHONE6_END_THRESHOLD_HEIGHT
  ) {
    return size * 0.85;
  }
  if (Platform.OS === 'ios' && supportiPhone7Plus) {
    if (
      portraitHeight >= IPHONE6_START_THRESHOLD_HEIGHT &&
      portraitHeight <= IPHONE7PLUS_END_THRESHOLD_HEIGHT
    ) {
      return size * 0.95;
    }
  }
  return Math.round(
    PixelRatio.roundToNearestPixel(size * (portraitWidth / DESIGN_WIDTH)),
  );
};

