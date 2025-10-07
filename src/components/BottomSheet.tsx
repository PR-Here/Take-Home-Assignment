import React, { useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import colors from '../constant/colors';
import { getHeight, getWidth } from '../utils/scaling';

const { height: screenHeight } = Dimensions.get('window');

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | string;
  backgroundColor?: string;
  showBackdrop?: boolean;
  backdropOpacity?: number;
  borderRadius?: number;
  animationDuration?: number;
  disableBackdropPress?: boolean;
  position?: 'top' | 'bottom';
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  height = '50%',
  backgroundColor = colors.white,
  showBackdrop = true,
  backdropOpacity = 0.5,
  borderRadius = 20,
  animationDuration = 300,
  disableBackdropPress = false,
  position = 'bottom',
}) => {
  const slideAnim = useRef(new Animated.Value(position === 'top' ? -screenHeight : screenHeight)).current;
  const backdropAnim = useRef(new Animated.Value(0)).current;

  const sheetHeight = typeof height === 'string'
    ? (screenHeight * parseInt(height.replace('%', '')) / 100)
    : height || screenHeight * 0.5;

  useEffect(() => {
    if (visible) {
      showBottomSheet();
    } else {
      hideBottomSheet();
    }
  }, [visible]);

  const showBottomSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: backdropOpacity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideBottomSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: position === 'top' ? -screenHeight : screenHeight,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backdropAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleBackdropPress = () => {
    if (!disableBackdropPress) {
      hideBottomSheet();
    }
  };

  const isTopPosition = position === 'top';
  const borderRadiusStyle = isTopPosition 
    ? { borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }
    : { borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={[
        styles.container,
        isTopPosition ? styles.containerTop : styles.containerBottom
      ]}>
        {/* Backdrop */}
        {showBackdrop && (
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <Animated.View
              style={[
                styles.backdrop,
                {
                  opacity: backdropAnim,
                },
              ]}
            />
          </TouchableWithoutFeedback>
        )}

        {/* Bottom/Top Sheet Content */}
        <Animated.View
          style={[
            styles.sheet,
            isTopPosition ? styles.topSheet : styles.bottomSheet,
            {
              height: sheetHeight,
              backgroundColor,
              ...borderRadiusStyle,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Handle Bar */}
          <View style={styles.handleBar}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBottom: {
    justifyContent: 'flex-end',
  },
  containerTop: {
    justifyContent: 'flex-start',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.black,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomSheet: {
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },
  topSheet: {
    top: 0,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  handleBar: {
    alignItems: 'center',
    paddingVertical: getHeight(12),
  },
  handle: {
    width: getWidth(40),
    height: getHeight(4),
    backgroundColor: colors.lightGray,
    borderRadius: getWidth(2),
  },
  content: {
    flex: 1,
    paddingHorizontal: getWidth(20),
  },
});

export default BottomSheet;
