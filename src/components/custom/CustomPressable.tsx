import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';

interface DefaultProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  opacity?: number;
  onPress: () => void;
}

const CustomPressable = ({
  opacity = 0.6,
  hitSlop = 16,
  children,
  style,
  onPress,
}: DefaultProps) => {
  return (
    <Pressable
      style={({ pressed }) => [style, { opacity: pressed ? opacity : 1 }]}
      hitSlop={hitSlop}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};

export default CustomPressable;
