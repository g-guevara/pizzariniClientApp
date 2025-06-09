// app/components/toasts/CustomToast.tsx - Red Theme
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text } from 'react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  visible: boolean;
  message: string;
  type: ToastType;
  duration?: number;
  onHide: () => void;
}

const { width } = Dimensions.get('window');

export const CustomToast: React.FC<ToastProps> = ({
  visible,
  message,
  type,
  duration = 3000,
  onHide,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 50,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          onHide();
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible) return null;

  const getStyleByType = () => {
    switch (type) {
      case 'success':
        return {
          container: styles.successContainer,
          text: styles.successText,
        };
      case 'error':
        return {
          container: styles.errorContainer,
          text: styles.errorText,
        };
      case 'warning':
        return {
          container: styles.warningContainer,
          text: styles.warningText,
        };
      case 'info':
        return {
          container: styles.infoContainer,
          text: styles.infoText,
        };
      default:
        return {
          container: styles.defaultContainer,
          text: styles.defaultText,
        };
    }
  };

  const typeStyles = getStyleByType();

  return (
    <Animated.View
      style={[
        styles.container,
        typeStyles.container,
        {
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.text, typeStyles.text]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    maxWidth: width - 40,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  defaultContainer: {
    backgroundColor: '#333',
  },
  defaultText: {
    color: '#fff',
  },
  successContainer: {
    backgroundColor: '#ECFDF3',
    borderWidth: 1,
    borderColor: '#ABEFC6',
  },
  successText: {
    color: '#067647',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2', // Light red background
    borderWidth: 1,
    borderColor: '#FECACA', // Light red border
  },
  errorText: {
    color: '#DC2626', // Red text (matching theme)
  },
  warningContainer: {
    backgroundColor: '#FFFAEB',
    borderWidth: 1,
    borderColor: '#F79009',
  },
  warningText: {
    color: '#B54708',
  },
  infoContainer: {
    backgroundColor: '#fef2f2', // Light red for info (matching theme)
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  infoText: {
    color: '#DC2626', // Red text for info (matching theme)
  },
});