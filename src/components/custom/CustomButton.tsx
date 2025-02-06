import React, { ReactElement, useEffect, useRef } from 'react';
import {
  ImageSourcePropType,
  TouchableOpacity,
  ImageStyle,
  ViewStyle,
  StyleProp,
  TextStyle,
  Animated,
  View,
} from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { useTheme } from '@emotion/react';
import CustomText from 'components/custom/CustomText';
import styled, { css } from '@emotion/native';

interface DefaultProps {
  activeColor?: 'defaultColor' | 'pointColor' | 'subColor';
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  iconSource?: ImageSourcePropType;
  title: string | ReactElement;
  activeOpacity?: number;
  loadingColor?: string;
  isDisabled?: boolean;
  isAnimated?: boolean;
  isLoading?: boolean;
  onPress?: () => void;
}

const CreateAnimatedView = Animated.createAnimatedComponent(View);

const CustomButton = ({
  activeColor = 'defaultColor',
  isDisabled = false,
  containerStyle,
  activeOpacity,
  loadingColor,
  buttonStyle,
  titleStyle,
  isAnimated,
  isLoading,
  title,
  onPress,
}: DefaultProps) => {
  const theme = useTheme();
  const backgroundColor = useRef(new Animated.Value(0)).current;

  // 배경 컬러 애니메이션 interpolate
  const getBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.colors.neutral30,
      activeColor === 'defaultColor' ? theme.colors.neutral100 : theme.colors.primary100,
    ],
  });

  const buttonContent = () => {
    if (isLoading)
      return <SkypeIndicator color={loadingColor || theme.colors.neutral0} size={30} />;

    return (
      <>
        {typeof title === 'string' ? (
          <Title activeColor={activeColor} isDisabled={isDisabled} style={titleStyle}>
            {title}
          </Title>
        ) : (
          title
        )}
      </>
    );
  };

  useEffect(() => {
    // 배경색 변화 애니메이션
    Animated.timing(backgroundColor, {
      toValue: isDisabled ? 0 : 1,
      duration: isAnimated ? 400 : 0,
      useNativeDriver: false,
    }).start();
  }, [isDisabled]);

  return (
    <Button
      style={containerStyle}
      disabled={isDisabled || isLoading}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <AnimatedView
        style={[buttonStyle, isAnimated ? { backgroundColor: getBackgroundColor } : {}]}
        activeColor={activeColor}
        isDisabled={isDisabled}
      >
        {buttonContent()}
      </AnimatedView>
    </Button>
  );
};

const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 55px;
`;

const AnimatedView = styled(CreateAnimatedView)<{
  isDisabled?: boolean;
  activeColor: 'defaultColor' | 'pointColor' | 'subColor';
}>`
  ${(props) => css`
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    ${props.activeColor === 'defaultColor' && `background-color: ${props.theme.colors.neutral100}`};
    ${props.activeColor === 'pointColor' && `background-color: ${props.theme.colors.primary100}`};
    ${props.activeColor === 'subColor' && `background-color: ${props.theme.colors.neutral20}`};
    ${props.isDisabled && `background-color: ${props.theme.colors.neutral30}`};
  `};
`;

const Title = styled(CustomText)<{
  isDisabled?: boolean;
  activeColor: 'defaultColor' | 'pointColor' | 'subColor';
}>`
  ${(props) => css`
    color: ${props.theme.colors.neutral0};
    font-size: 16px;
    line-height: 22px;
    ${props.activeColor === 'subColor' && `color: ${props.theme.colors.neutral100}`};
    ${props.isDisabled && `color: ${props.theme.colors.neutral50}`};
  `};
`;

export default CustomButton;
