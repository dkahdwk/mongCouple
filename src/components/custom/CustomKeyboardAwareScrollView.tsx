import React, { ReactNode, Ref, forwardRef, useEffect, useMemo, useState } from 'react';
import {
  AndroidSoftInputModes,
  KeyboardController,
  KeyboardEvents,
} from 'react-native-keyboard-controller';
import {
  KeyboardAwareScrollViewProps,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import { useSharedValue } from 'react-native-reanimated';
import { Platform } from 'react-native';
import { theme } from 'styles/theme';

interface DefaultProps extends KeyboardAwareScrollViewProps {}

interface DefaultProps {
  children: ReactNode;
}

const CustomKeyboardAwareScrollView = forwardRef(
  (props: DefaultProps, ref: Ref<KeyboardAwareScrollView>) => {
    const [isKeyboardShow, setIsKeyboardShow] = useState<boolean>(false);
    const translateY = useSharedValue(0);

    // KeyboardAwareScrollView의 contentContainerStyle paddingBottom
    const paddingBottom = useMemo(() => {
      return Platform.OS === 'android' ? 30 : 0;
    }, [Platform, isKeyboardShow]);

    useEffect(() => {
      // Android SoftInputModes 변경
      KeyboardController.setInputMode(AndroidSoftInputModes.SOFT_INPUT_ADJUST_PAN);

      const show = KeyboardEvents.addListener('keyboardWillShow', () => {
        setIsKeyboardShow(true);
      });
      const hide = KeyboardEvents.addListener('keyboardWillHide', () => {
        setIsKeyboardShow(false);
      });

      return () => {
        KeyboardController.setInputMode(AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE);
        show.remove();
        hide.remove();
      };
    }, []);

    return (
      <KeyboardAwareScrollView
        {...props}
        ref={ref}
        contentContainerStyle={[
          {
            flexGrow: 1,
            paddingBottom,
          },
          props.contentContainerStyle,
        ]}
        style={[{ flex: 1, backgroundColor: theme.colors.neutral0 }, props.style]}
        enableResetScrollToCoords={
          typeof props?.enableResetScrollToCoords === 'undefined'
            ? Platform.OS === 'ios'
            : props?.enableResetScrollToCoords
        } // android는 반드시 false
        extraScrollHeight={props?.extraScrollHeight || Platform.OS === 'ios' ? -25 : -10} // android는 반드시 음수
        enableAutomaticScroll={props?.enableAutomaticScroll || Platform.OS === 'ios'} // android는 반드시 false
        keyboardOpeningTime={props?.keyboardOpeningTime || Number.MAX_SAFE_INTEGER}
        showsVerticalScrollIndicator={props?.showsVerticalScrollIndicator || false}
        extraHeight={props?.extraHeight || 55}
        keyboardShouldPersistTaps={'handled'}
        overScrollMode={'never'}
        scrollEventThrottle={0} // scroll 이벤트 1번만 출력
        enableOnAndroid
      >
        {props?.children}
      </KeyboardAwareScrollView>
    );
  },
);

export default CustomKeyboardAwareScrollView;
