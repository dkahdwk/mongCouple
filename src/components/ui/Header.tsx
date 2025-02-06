import React, { ReactElement } from 'react';
import { useWindowDimensions, ViewStyle, StyleProp, TextStyle, Animated, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { statusBarHeight } from 'utils/statusBarHeight';
import { CommonDivider } from 'styles/styles';
import { observer } from 'mobx-react';
import CustomPressable from 'components/custom/CustomPressable';
import CustomText from 'components/custom/CustomText';
import styled, { css } from '@emotion/native';

interface DefaultProps {
  containerStyle?: Animated.WithAnimatedObject<ViewStyle> | StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  contentComponent?: ReactElement;
  isBottomLineStyleTop?: boolean;
  title?: string | ReactElement; // 헤더 제목
  isBackButton?: boolean; // 뒤로가기 버튼을 보여줄지 여부
  isNavigation?: boolean; // 불러오는쪽에서 useNavigation()을 넘겨줄 수 있는지 여부
  isBottomLine?: boolean; // 헤더 아래 회색 라인
  isCenterTitle?: boolean; // 헤더 제목 가운데 배치
  iconColor?: string;
  onPressGoBack?: () => void;
}

const CreateAnimatedView = Animated.createAnimatedComponent(View);

const Header = observer(
  ({
    isBottomLineStyleTop = true,
    isCenterTitle = false,
    isBottomLine = false,
    isBackButton = true,
    isNavigation = true,
    contentComponent,
    containerStyle,
    titleStyle,
    iconColor,
    title,
    onPressGoBack,
  }: DefaultProps) => {
    const navigation = isNavigation ? useNavigation() : undefined;
    const { width } = useWindowDimensions();

    const handlePressBack = () => {
      if (typeof onPressGoBack !== 'undefined') {
        return onPressGoBack();
      }

      if (typeof navigation !== 'undefined') {
        navigation.goBack();
      }
    };

    return (
      <>
        <Container style={containerStyle} currentPaddingTop={statusBarHeight()}>
          <Row>
            {isBackButton && (
              <CustomPressable
                style={{ justifyContent: 'center', marginRight: 24 }}
                onPress={handlePressBack}
              >
                <ArrowIcon
                  tintColor={iconColor || '#000'}
                  source={require('assets/icons/header_arrow.png')}
                />
              </CustomPressable>
            )}
            {typeof title !== 'undefined' &&
              (typeof title === 'string' ? (
                !isCenterTitle && (
                  <TitleContainer isBackButton={isBackButton}>
                    <Title style={titleStyle}>{title}</Title>
                  </TitleContainer>
                )
              ) : (
                <TitleContainer isBackButton={isBackButton}>{title}</TitleContainer>
              ))}
            {typeof title !== 'undefined' && isCenterTitle && (
              <CenterTitleContainer deviceWidth={width} isBackButton={isBackButton}>
                <Title style={titleStyle}>{title}</Title>
              </CenterTitleContainer>
            )}
            {contentComponent && contentComponent}
          </Row>
        </Container>
        {isBottomLine && <CommonDivider marginTop={isBottomLineStyleTop ? 15 : 0} />}
      </>
    );
  },
);

const Container = styled(CreateAnimatedView)<{
  currentPaddingTop: number;
}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 49px;
  padding: 0 16px 0 16px;
  border-bottom-width: 1px;
  border-color: transparent;
  background-color: ${(props) => props.theme.colors.neutral0};
`;

const ArrowIcon = styled.Image<{ tintColor: string }>`
  width: 14px;
  height: 8px;
  tint-color: ${(props) => props.tintColor};
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TitleContainer = styled.View<{ isBackButton: boolean }>`
  flex: 1;
  justify-content: center;
`;

const CenterTitleContainer = styled.View<{ deviceWidth: number; isBackButton: boolean }>`
  ${(props) => css`
    justify-content: center;
    align-items: center;
    ${props?.deviceWidth && `width: ${props.deviceWidth - 52 * 2}px`};
  `}
`;

const Title = styled(CustomText)`
  font-size: 16px;
  line-height: 19.2px;
`;

export default Header;
