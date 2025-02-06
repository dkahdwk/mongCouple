import React from 'react';
import { BaseToast, ToastConfigParams } from 'react-native-toast-message';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';
import { isIphoneX } from 'react-native-iphone-screen-helper';
import { theme } from 'styles/theme';
import styled from '@emotion/native';

interface CustomToastInterface {
  toastProps: ToastConfigParams<any>;
  isRenderTrailingIcon?: boolean;
  icon?: ImageSourcePropType;
  backgroundColor?: string;
  borderRadius?: number;
  textColor?: string;
}

const CustomBaseToast = ({
  isRenderTrailingIcon = true,
  backgroundColor,
  borderRadius,
  toastProps,
  textColor,
  icon,
}: CustomToastInterface) => {
  const { width } = useWindowDimensions();

  const processedProps = { ...toastProps };
  if (typeof toastProps.text1 === 'string') {
    processedProps.text1 = toastProps.text1;
  }
  if (typeof toastProps.text2 === 'string') {
    processedProps.text2 = toastProps.text2;
  }

  return (
    <BaseToast
      {...processedProps}
      style={{
        width: width * 0.9,
        backgroundColor: backgroundColor || `rgba(87, 87, 87, 0.85)`,
        borderLeftWidth: 0,
        borderRadius: borderRadius ?? 2,
        height: 60,
        marginTop: isIphoneX() ? 20 : 0,
        marginBottom: isIphoneX() ? 30 : 20,
        elevation: 0,
      }}
      contentContainerStyle={{
        borderRadius: 8,
        paddingLeft: 20,
        paddingRight: 10,
      }}
      text1Style={{
        color: textColor || 'white',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: theme.families.regular,
      }}
      text1Props={{ numberOfLines: 2 }}
      text2Style={{
        color: textColor || 'white',
        fontWeight: '400',
        fontSize: 14,
        fontFamily: theme.families.regular,
      }}
      renderLeadingIcon={
        icon
          ? () => (
              <LeadingIconContainer>
                <LeadingIcon tintColor={textColor} source={icon} />
              </LeadingIconContainer>
            )
          : undefined
      }
      renderTrailingIcon={
        isRenderTrailingIcon
          ? () => (
              <TrailingIconContainer onPress={() => toastProps.hide()}>
                <TrailingIcon
                  tintColor={textColor}
                  source={require('assets/images/icons/cancel.png')}
                />
              </TrailingIconContainer>
            )
          : undefined
      }
    />
  );
};

const LeadingIconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 0 -8px 0 0;
  padding: 0 0 0 20px;
`;

const LeadingIcon = styled.Image<{ tintColor?: string }>`
  width: 14px;
  height: 17px;
`;

const TrailingIcon = styled.Image<{ tintColor?: string }>`
  width: 16px;
  height: 20px;
  tint-color: ${(props) => props.tintColor || 'white'};
`;

const TrailingIconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 0 20px 0 10px;
`;

export default CustomBaseToast;
