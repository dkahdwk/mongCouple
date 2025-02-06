import React from 'react';
import { Text as DefaultText, TextStyle, StyleProp, TextProps, Animated } from 'react-native';
import { useTheme } from '@emotion/react';
import styled, { css } from '@emotion/native';

interface DefaultProps extends TextProps {
  style?: StyleProp<TextStyle> & Animated.AnimatedProps<StyleProp<Text>>;
  isAnimated?: boolean;
  children?: any;
}

const CreateAnimatedText = Animated.createAnimatedComponent(DefaultText);

const CustomText = ({ isAnimated, children, style, numberOfLines, onTextLayout }: DefaultProps) => {
  const theme = useTheme();

  // 공통 스타일 정의
  const baseTextStyle = {
    color: theme.colors.neutral100,
    fontFamily: theme.families.regular,
    letterSpacing: 0,
  } as TextStyle;

  const animatedTextStyle = {
    ...baseTextStyle,
    letterSpacing: -0.32,
  };

  return isAnimated ? (
    <CreateAnimatedText
      style={[animatedTextStyle, style]}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      onTextLayout={onTextLayout}
    >
      {children}
    </CreateAnimatedText>
  ) : (
    <CommonText
      style={style}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      onTextLayout={onTextLayout}
    >
      {children}
    </CommonText>
  );
};

const CommonText = styled(DefaultText)`
  ${(props) => css`
    color: ${props.theme.colors.neutral100};
    font-family: ${props.theme.families.regular};
    letter-spacing: 0px;
  `};
`;

export default CustomText;
