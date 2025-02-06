import React from 'react';
import { DotIndicator, MaterialIndicator, SkypeIndicator } from 'react-native-indicators';
import { StyleProp, View, ViewStyle } from 'react-native';
import { theme } from 'styles/theme';
import styled from '@emotion/native';

interface DefaultProps {
  mode?: 'SkypeIndicator' | 'MaterialIndicator' | 'DotIndicator';
  containerStyle?: StyleProp<ViewStyle>;
  color?: string;
  size?: number;
}

const Loader = ({
  mode = 'MaterialIndicator',
  color = theme.colors.primary100,
  containerStyle,
  size = 50,
}: DefaultProps) => {
  return (
    <Container style={containerStyle}>
      {mode === 'SkypeIndicator' && <SkypeIndicator color={color} size={size} />}
      {mode === 'MaterialIndicator' && <MaterialIndicator color={color} size={size} />}
      {mode === 'DotIndicator' && <DotIndicator color={color} size={size} />}
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.neutral0};
`;

export default Loader;
