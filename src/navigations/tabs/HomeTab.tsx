import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomStackParamList } from 'types/navigation';
import { observer } from 'mobx-react';
import NavigationScreens from 'navigations/NavigationScreens';

interface DefaultProps {
  navigation: StackScreenProps<CustomStackParamList, any>;
}

const HomeTab = observer(({}: DefaultProps) => {
  return <NavigationScreens mainScreen="HomeMainScreen" />;
});

export default HomeTab;
