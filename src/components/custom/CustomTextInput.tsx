import React, { forwardRef, ReactElement, useImperativeHandle, useRef, useState } from 'react';
import { TextInputProps, StyleProp, TextInput, ViewStyle, Keyboard, View } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { CommonImage, CommonText } from 'styles/styles';
import { useTheme } from '@emotion/react';
import CustomPressable from 'components/custom/CustomPressable';
import styled, { css } from '@emotion/native';

export interface DefaultProps extends Omit<TextInputProps, 'defaultValue' | 'value'> {
  textContainerStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  validTextStyle?: StyleProp<ViewStyle>;
  rightInputComponent?: ReactElement;
  leftInputComponent?: ReactElement;
  isBottomSheetTextInput?: boolean;
  rightComponent?: ReactElement;
  isShowDeletedButton?: boolean;
  leftComponent?: ReactElement;
  isShowSearchButton?: boolean;
  isShowSecureButton?: boolean;
  showMaxLength?: boolean;
  isDisabled?: boolean;
  validLength?: number;
  isFocused?: boolean;
  validText?: string;
  isValid?: boolean;
  value?: string;
  onPressSearch?: () => void;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const CustomTextInput = forwardRef((props: DefaultProps, ref) => {
  const textRef = useRef<TextInput>(null);
  const [isCurrentFocused, setIsCurrentFocused] = useState<boolean>(false);
  const [isCurrentSecure, setIsCurrentSecure] = useState<boolean | undefined>(
    props.secureTextEntry,
  );
  const theme = useTheme();

  useImperativeHandle(ref, () => ({
    blurFocus,
    focus,
    clear,
  }));

  const blurFocus = () => {
    if (textRef.current !== null) {
      textRef.current?.blur();
    }
  };

  const focus = () => {
    if (textRef.current !== null) {
      textRef.current?.focus();
    }
  };

  const clear = () => {
    if (textRef.current !== null) {
      textRef.current?.clear();
    }
  };

  // secureTextEntry 아이콘의 버튼 핸들러
  const handlePressSecure = () => {
    setIsCurrentSecure(!isCurrentSecure);
  };

  // 검색어 삭제 버튼 (입력값을 초기화 한다)
  const handleDeleteTextInput = () => {
    if (typeof props.onChangeText === 'function') {
      props.onChangeText('');
      textRef.current?.focus();
      Keyboard.dismiss();
    }
  };

  const handleFocus = () => {
    if (typeof props.onFocus === 'function') {
      props.onFocus();
    }
    // 용도는 DeleteButton 보일지 말지에 쓰인다
    setIsCurrentFocused(true);
  };

  const handleBlur = () => {
    if (typeof props.onBlur === 'function') {
      props.onBlur();
    }
    // 용도는 DeleteButton 보일지 말지에 쓰인다
    setIsCurrentFocused(false);
  };

  // 동적으로 TextInput을 사용할지, BottomSheetTextInput를 사용할지 판단
  const CustomTextInput = props?.isBottomSheetTextInput ? BottomSheetTextInput : TextInput;

  return (
    <>
      <ShakeContainer
        style={props?.containerStyle}
        isValid={
          typeof props?.validLength !== 'undefined'
            ? props?.value?.length !== props?.validLength || props?.isValid
            : props?.isValid
        }
        rightComponent={props?.rightComponent}
        leftComponent={props?.leftComponent}
        multiline={props?.multiline}
      >
        <TextContainer
          style={props.textContainerStyle}
          isValid={
            typeof props?.validLength !== 'undefined'
              ? props?.value?.length !== props?.validLength || props?.isValid
              : props?.isValid
          }
          isFocused={props?.isFocused ?? isCurrentFocused}
          isDisabled={props?.isDisabled}
          multiline={props?.multiline}
        >
          {/* 텍스트 인풋 "안쪽"의 왼쪽 컴포넌트 */}
          {props?.leftInputComponent && props?.leftInputComponent}

          {/* @gorhom/bottom-sheet의 BottomSheetTextInput로 쓸지 여부 */}
          <CustomTextInput
            {...props}
            ref={textRef}
            style={[
              {
                flex: 1,
                height: props.multiline ? '100%' : 55,
                color: props.isDisabled ? theme.colors.neutral40 : theme.colors.neutral100,
                fontSize: 16,
                fontFamily: theme.families.medium,
                // multiline === true일 때, iOS와 android의 기본 스타일이 달라 아래 구문 추가
                paddingTop: props.multiline ? 15 : 15,
                paddingRight: 16,
                paddingBottom: 15,
                paddingLeft: 16,
                textAlignVertical: props.multiline ? 'top' : 'center',
              },
              props.style,
            ]}
            placeholderTextColor={theme.colors.neutral50}
            secureTextEntry={isCurrentSecure}
            allowFontScaling={false}
            value={props.value}
            numberOfLines={20}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {props.value !== '' && typeof props?.isShowSecureButton !== 'undefined' && (
            <CustomPressable
              style={{ marginRight: props?.isShowDeletedButton ? 8 : 15 }}
              hitSlop={20}
              onPress={handlePressSecure}
            >
              <SecureIcon
                tintColor={isCurrentSecure ? theme.colors.neutral50 : theme.colors.primary100}
                source={require('assets/icons/secure.png')}
              />
            </CustomPressable>
          )}

          {/* 입력값이 있다면 입력값 삭제 아이콘을 출력한다 */}
          {props?.isShowDeletedButton && props.value !== '' && !props?.multiline && (
            <CustomPressable
              style={{ marginRight: 20 }}
              hitSlop={5}
              onPress={handleDeleteTextInput}
            >
              <CommonImage
                source={require('assets/icons/input_delete_icon.png')}
                width={22}
                height={22}
              />
            </CustomPressable>
          )}

          {/* 검색 버튼 */}
          {props?.isShowSearchButton && (
            <SearchButton
              onPress={() => {
                if (props?.onPressSearch) return props?.onPressSearch();
              }}
            >
              <SearchIcon source={require('assets/icons/search.png')} />
            </SearchButton>
          )}
          {props?.rightInputComponent && props?.rightInputComponent}
        </TextContainer>
        {props.multiline && props.showMaxLength && (
          <CommonText
            marginTop={-17}
            marginRight={20}
            textAlign={'right'}
            color={theme.colors.neutral50}
          >{`${props.value?.length}/${props.maxLength}`}</CommonText>
        )}
      </ShakeContainer>
    </>
  );
});

const ShakeContainer = styled(View)<{
  rightComponent?: ReactElement;
  leftComponent?: ReactElement;
  multiline?: boolean;
  isValid?: boolean;
}>`
  flex-direction: ${(props) =>
    typeof props?.rightComponent !== 'undefined' || typeof props?.leftComponent !== 'undefined'
      ? 'row'
      : 'column'};
  justify-content: ${(props) => (props?.multiline ? 'flex-start' : 'center')};
  height: 55px;
  border: ${(props) => (props?.multiline ? `1px solid ${props.theme.colors.neutral25}` : '0px')};
  border-width: ${(props) => (props.multiline ? 1 : 0)}px;
  border-color: ${(props) =>
    props?.isValid ? props.theme.colors.neutral25 : props.theme.colors.red};
`;

const TextContainer = styled(View)<{
  multiline?: boolean;
  isValid?: boolean;
  isDisabled?: boolean;
  isFocused: boolean;
}>`
  ${(props) => css`
    flex: 1;
    flex-direction: row;
    align-items: center;
    height: 35px;
    ${props.isFocused &&
    css`
      border-width: 1px;
      border-color: ${props.theme.colors.primary100};
    `};
    ${!props.isValid &&
    css`
      border-width: 1px;
      border-color: ${props.theme.colors.red};
    `};
    border-radius: 6px;
    background-color: ${props.isFocused
      ? props.theme.colors.neutral0
      : props.theme.colors.neutral20};
    ${props.isDisabled &&
    css`
      background-color: ${props.theme.colors.neutral30};
    `}
  `}
`;

const SearchButton = styled.TouchableOpacity`
  margin: 0 0 0 8px;
  padding: 16px 0 16px 8px;
  background-color: ${(props) => props.theme.colors.neutral0};
`;

const SearchIcon = styled.Image`
  width: 14px;
  height: 16px;
`;

const SecureIcon = styled.Image<{ tintColor: string }>`
  width: 22px;
  height: 22px;
  tint-color: ${(props) => props.tintColor};
`;

CustomTextInput.defaultProps = CustomTextInput.defaultProps || {};
CustomTextInput.defaultProps.showMaxLength = false;
CustomTextInput.defaultProps.isValid = true;

export default CustomTextInput;
