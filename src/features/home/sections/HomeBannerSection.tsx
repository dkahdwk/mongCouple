import React, { ReactElement, useState } from 'react';
import { useWindowDimensions, LayoutChangeEvent } from 'react-native';
import { CommonBetweenRow, CommonText } from 'styles/styles';
import AutoHeightImage from 'react-native-auto-height-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-reanimated-carousel';
import CustomText from 'components/custom/CustomText';
import styled, { css } from '@emotion/native';

const data = [
  {
    image: require('assets/dummy/banner1.png'),
    title: `물은 언제 마시는 게\n가장 좋을까?`,
  },
  {
    image: require('assets/dummy/banner2.png'),
    title: `요즘 뜨는 '간헐적 단식'\n다이어트 효과 분석`,
  },
  {
    image: require('assets/dummy/banner3.png'),
    title: `흰쌀밥,\n정말 건강에 나쁠까?`,
  },
];

const HomeBannerSection = () => {
  const [imageHeight, setImageHeight] = useState<number>(0);
  const { width } = useWindowDimensions();
  const imageWidth = width - 80;
  const gradientHeight = 68;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setImageHeight(height); // 렌더링된 이미지의 높이 저장
  };

  const renderItem = ({ item, index }: { item: ReactElement; index: number }) => {
    return (
      <ListButton index={index} activeOpacity={0.9} onPress={() => {}}>
        <AutoHeightImage
          key={`${item}-${index}`}
          style={{ borderRadius: 4 }}
          defaultSource={data?.[index]?.image}
          source={data?.[index]?.image}
          width={imageWidth}
          onLayout={handleLayout}
        />
        <GradientBox width={imageWidth} height={gradientHeight}>
          <GradientTextBox>
            <GradientText>{data?.[index]?.title}</GradientText>
          </GradientTextBox>
          <LinearGradient
            style={{ width: '100%', height: gradientHeight }}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: -2 }}
            colors={[`rgba(0, 0, 0, 0.3)`, 'rgba(255, 255, 255, 0)']}
          />
        </GradientBox>
      </ListButton>
    );
  };

  return (
    <Container>
      <TopContainer>
        <Title>오늘의 건강 추천</Title>
        <CommonText>전체보기</CommonText>
      </TopContainer>
      <Carousel
        modeConfig={{
          moveSize: imageWidth + 12,
          stackInterval: imageWidth + 12,
          scaleInterval: 0,
          rotateZDeg: 0,
          snapDirection: 'left',
        }}
        scrollAnimationDuration={1000}
        mode={'horizontal-stack'}
        pagingEnabled
        data={data}
        width={width}
        height={imageHeight}
        loop={false}
        snapEnabled
        renderItem={renderItem}
      />
    </Container>
  );
};

const Container = styled.View``;

const TopContainer = styled(CommonBetweenRow)`
  margin: 0 0 12px 0;
`;

const Title = styled(CustomText)`
  font-size: 18px;
`;

const ListButton = styled.TouchableOpacity<{ index: number }>`
  position: relative;
  margin: 0 0 0 ${(props) => (props.index === 0 ? 0 : 20)}px;
`;

const LastButton = styled.TouchableOpacity`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 50px;
  height: 300px;
  background-color: black;
`;

const GradientBox = styled.View<{ width: number; height: number }>`
  position: absolute;
  bottom: 0;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

const GradientTextBox = styled.View`
  position: absolute;
  z-index: 1;
  padding: 8px 12px 0 12px;
`;

const GradientText = styled(CustomText)`
  ${(props) => css`
    color: ${props.theme.colors.neutral0};
    font-size: 18px;
    font-family: ${props.theme.families.medium};
  `}
`;

export default HomeBannerSection;
