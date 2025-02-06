import { MotiTransition, MotiTransitionProp } from 'moti';
import { Easing } from 'react-native-reanimated';
import { ViewStyle } from 'react-native';

/**
 * MotiView의 transition props 공용함수
 * @param property 애니메이션을 적용할 속성, 여러개의 속성을 적용하려면 배열로 활용
 * @param props MotiTransition
 * (기본값) type: 'timing' / duration: 400 / easing: Easing.out(Easing.ease)
 * @returns MotiTransitionProp
 */
export const animationTransition = (
  property: keyof ViewStyle | Array<keyof ViewStyle>,
  props?: MotiTransition,
) => {
  if (Array.isArray(property)) {
    // 배열일 경우 모든 속성 처리
    return property.reduce((acc, key) => {
      acc[key] = {
        ...props,
        type: props?.type || 'timing',
        duration: props?.duration || 400,
        easing:
          props?.easing || (acc?.property === 'opacity' ? Easing.ease : Easing.out(Easing.ease)),
      };
      return acc;
    }, {} as Record<string, any>);
  }

  // 단일 속성 처리
  return {
    [property]: {
      ...props,
      type: props?.type || 'timing',
      duration: props?.duration || 400,
      easing: props?.easing || (property === 'opacity' ? Easing.ease : Easing.out(Easing.ease)),
    },
  } as MotiTransitionProp<any>;
};
