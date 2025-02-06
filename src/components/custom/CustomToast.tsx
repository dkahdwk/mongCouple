import React from 'react';
import Toast, { ToastConfig } from 'react-native-toast-message';
import CustomBaseToast from 'components/custom/CustomBaseToast';

interface DefaultProps {
  backgroundColor?: string;
}

const CustomToast = ({ backgroundColor }: DefaultProps) => {
  const toastConfig: ToastConfig = {
    default: (props) => <CustomBaseToast toastProps={props} backgroundColor={backgroundColor} />,
    error: (props) => (
      <CustomBaseToast
        toastProps={props}
        backgroundColor={backgroundColor}
        icon={require('assets/images/icons/warning.png')}
      />
    ),
    success: (props) => (
      <CustomBaseToast
        toastProps={props}
        backgroundColor={backgroundColor}
        isRenderTrailingIcon={false}
        borderRadius={6}
        icon={require('assets/images/icons/success.png')}
      />
    ),
    reject: (props) => (
      <CustomBaseToast
        toastProps={props}
        backgroundColor={backgroundColor}
        isRenderTrailingIcon={false}
        borderRadius={6}
        icon={require('assets/images/icons/reject.png')}
      />
    ),
  };

  return <Toast config={toastConfig} />;
};

export default CustomToast;
