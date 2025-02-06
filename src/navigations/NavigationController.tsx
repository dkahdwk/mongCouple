import React, { useRef } from 'react';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainerRef,
  NavigationContainer,
  DefaultTheme,
  RouteProp,
} from '@react-navigation/native';
import { FOLDABLE_WIDE_WIDTH_SIZE, ZFLIP_COVER_HEIGHT_SIZE } from 'const/dimension';
import { ImageSourcePropType, Platform, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomStackParamList } from 'types/navigation';
import { HIDE_ON_SCREEN } from 'const/hideOnScreens';
import { CommonContainer } from 'styles/styles';
import { useStore } from 'stores/RootStore';
import { observer } from 'mobx-react';
import { theme } from 'styles/theme';
import HomeTab from 'navigations/tabs/HomeTab';
import styled from '@emotion/native';

interface DefaultProps {}

const BOTTOM_TAB_ICON_HEIGHT = Platform.OS === 'android' ? 21 : 20;
const BOTTOM_TAB_ICON_WIDTH = Platform.OS === 'android' ? 20 : 19;

const NavigationController = observer(({}: DefaultProps) => {
  const navigationRef = useRef<NavigationContainerRef<CustomStackParamList>>(null);
  const { width, height } = useWindowDimensions();
  const BottomTab = createBottomTabNavigator();
  const {} = useStore();

  // tabBar의 visible 여부를 판단
  const getTabBarVisibility = (route: RouteProp<CustomStackParamList, any>) => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName) {
      return HIDE_ON_SCREEN.indexOf(routeName) === -1 ? 'flex' : 'none';
    }
  };

  const renderBottomTabIcon = ({
    focusIcon,
    blurIcon,
    focused,
  }: {
    focusIcon: ImageSourcePropType;
    blurIcon: ImageSourcePropType;
    focused: boolean;
  }) => {
    return <BottomTabIcon source={focused ? focusIcon : blurIcon} />;
  };

  return (
    <CommonContainer>
      <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
        <BottomTab.Navigator
          backBehavior={'none'}
          initialRouteName={'HomeTab'}
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: theme.colors.primary100,
            tabBarAllowFontScaling: false,
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIconStyle: {
              /* z-flip 커버화면 대응 */
              marginTop:
                width < FOLDABLE_WIDE_WIDTH_SIZE && height < ZFLIP_COVER_HEIGHT_SIZE ? 9 : 5,
              width: BOTTOM_TAB_ICON_WIDTH,
              height: BOTTOM_TAB_ICON_HEIGHT,
            },
            tabBarStyle: {
              display: getTabBarVisibility(route),
              height: 50,
              backgroundColor: theme.colors.neutral0,
            },
          })}
        >
          <BottomTab.Screen
            name={'HomeTab'}
            options={{
              headerShown: false,
              title: '홈',
              tabBarIcon: ({ focused }: { focused: boolean }) => {
                return renderBottomTabIcon({
                  focusIcon: require('assets/navigation/homeOn.png'),
                  blurIcon: require('assets/navigation/homeOff.png'),
                  focused,
                });
              },
            }}
            component={HomeTab}
          />
          <BottomTab.Screen
            name={'HomeTab2'}
            options={{
              headerShown: false,
              title: '나의 루틴',
              tabBarIcon: ({ focused }: { focused: boolean }) => {
                return renderBottomTabIcon({
                  focusIcon: require('assets/navigation/homeOn.png'),
                  blurIcon: require('assets/navigation/homeOff.png'),
                  focused,
                });
              },
            }}
            component={HomeTab}
          />
          <BottomTab.Screen
            name={'HomeTab3'}
            options={{
              headerShown: false,
              title: '마이핏',
              tabBarIcon: ({ focused }: { focused: boolean }) => {
                return renderBottomTabIcon({
                  focusIcon: require('assets/navigation/homeOn.png'),
                  blurIcon: require('assets/navigation/homeOff.png'),
                  focused,
                });
              },
            }}
            component={HomeTab}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </CommonContainer>
  );
});

const BottomTabIcon = styled.Image`
  width: ${`${BOTTOM_TAB_ICON_WIDTH}px`};
  height: ${`${BOTTOM_TAB_ICON_HEIGHT}px`};
`;

export default NavigationController;
