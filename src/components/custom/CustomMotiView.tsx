import React, { useMemo } from 'react';
import { animationTransition } from 'utils/motiHelper';
import { Easing } from 'react-native-reanimated';
import { ViewProps } from 'react-native';
import { MotiView } from 'moti';

type DefaultProps = ViewProps &
  (
    | {
        animation: 'fade';
        duration?: number;
        isFade?: boolean;
      }
    | {
        animation: 'shake';
        duration?: number;
        isShake: boolean; // shake일 때만 필수
      }
  );

const CustomMotiView = (props: DefaultProps) => {
  const isFade = props?.animation === 'fade' ? props?.isFade ?? true : undefined;

  const animationProps = useMemo(() => {
    // fade in-out 효과
    if (props?.animation === 'fade') {
      return {
        transition: animationTransition('opacity', { duration: props?.duration || 400 }),
        animate: { opacity: isFade ? 1 : 0 },
        from: { opacity: 0 },
        exit: { opacity: 0 },
      };
    }

    // shake 효과 (옆으로 흔들리는)
    if (props?.animation === 'shake') {
      return {
        transition: animationTransition('translateX', {
          duration: 66,
          easing: Easing.bezier(0.445, 0.05, 0.55, 0.95),
        }),
        animate: { translateX: props?.isShake ? [-9, 9, -8, 8, -6, 6, -4, 4, -2, 2, 0] : 0 }, // 흔들리는 애니메이션
        from: { translateX: 0 },
      };
    }

    return {};
  }, [
    props?.animation === 'shake' && props?.isShake,
    props?.animation,
    props?.duration,
    isFade,
    animationTransition,
  ]);

  return (
    <MotiView {...animationProps} {...props}>
      {props?.children}
    </MotiView>
  );
};

export default CustomMotiView;
