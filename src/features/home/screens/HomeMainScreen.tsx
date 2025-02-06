import React, { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { CustomStackParamList } from 'types/navigation';
import HomeBannerSection from 'features/home/sections/HomeBannerSection';
import CustomText from 'components/custom/CustomText';
import styled from '@emotion/native';

interface DefaultProps {
  navigation: NavigationProp<CustomStackParamList, 'HomeMainScreen'>;
}

const HomeMainScreen = ({ navigation }: DefaultProps) => {
  const dummyMenu = [
    {
      id: 0,
      title: '영양소정보',
      icon: require('assets/icons/food.png'),
      onPress: () => {
        navigation.navigate('FoodListScreen');
      },
    },
    { id: 1, title: '다이어트', icon: require('assets/icons/diet.png'), onPress: () => {} },
    { id: 2, title: '헬스', icon: require('assets/icons/health.png'), onPress: () => {} },
    { id: 3, title: '필라테스', icon: require('assets/icons/pilates.png'), onPress: () => {} },
    {
      id: 4,
      title: 'AI 건강코치',
      icon: require('assets/icons/ai_helper.png'),
      onPress: () => navigation.navigate('AiChatScreen'),
    },
    { id: 5, title: '식단기록', icon: require('assets/icons/diet_records.png'), onPress: () => {} },
    { id: 6, title: '건강분석', icon: require('assets/icons/health_care.png'), onPress: () => {} },
    { id: 7, title: '건강뉴스', icon: require('assets/icons/health_news.png'), onPress: () => {} },
  ];

  useEffect(() => {}, []);

  return (
    <ScrollContainer contentContainerStyle={{ flexGrow: 1, paddingTop: 16, paddingHorizontal: 16 }}>
      <HomeBannerSection />
      <WrapContainer>
        {dummyMenu.map((item) => (
          <MenuButton key={item.title} onPress={item.onPress}>
            {item?.icon && <MenuIcon source={item.icon} />}
            <MenuText>{item.title}</MenuText>
          </MenuButton>
        ))}
      </WrapContainer>
    </ScrollContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const WrapContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  max-width: 360px;
  margin: 30px 0 0 0;
`;

const MenuButton = styled.TouchableOpacity`
  align-items: center;
  width: 80px;
  padding: 0 4px 4px 4px;
  border-radius: 6px;
`;

const MenuIcon = styled.Image`
  width: 47px;
  height: 47px;
`;

const MenuText = styled(CustomText)`
  margin: 8px 0 0 0;
  text-align: center;
`;

export default HomeMainScreen;
