import React, { useMemo } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';
import { CustomStackParamList } from 'types/navigation';
import { Platform } from 'react-native';
import AllScreens from 'navigations/NavigationAllScreens';

// 네비게이션 화면 전환 애니메이션 부드럽게
export const transitionSpecConfig: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

interface DefaultProps {
  mainScreen: 'HomeMainScreen';
}

const NavigationScreens = ({ mainScreen }: DefaultProps) => {
  const Stack = createStackNavigator<CustomStackParamList>();

  const mainScreenStack = useMemo(() => {
    switch (mainScreen) {
      case 'HomeMainScreen':
        return <Stack.Screen name="HomeMainScreen" component={AllScreens.HomeMainScreen} />;
      default:
        break;
    }
  }, [mainScreen]);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: Platform.select({
          android: CardStyleInterpolators.forHorizontalIOS,
          ios: CardStyleInterpolators.forHorizontalIOS,
        }),
        transitionSpec: {
          open: transitionSpecConfig,
          close: transitionSpecConfig,
        },
        headerShown: false,
      }}
      initialRouteName={mainScreen}
    >
      {mainScreenStack}
      <Stack.Screen name="FoodThemeListScreen" component={AllScreens.FoodThemeListScreen} />
      <Stack.Screen name="FoodDetailScreen" component={AllScreens.FoodDetailScreen} />
      <Stack.Screen name="FoodListScreen" component={AllScreens.FoodListScreen} />
      <Stack.Screen name="AiChatScreen" component={AllScreens.AiChatScreen} />
    </Stack.Navigator>
  );
};

export default NavigationScreens;
