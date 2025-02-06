import { FontFamilyType, TextAlignType, TextDecorationType } from 'types/common';
import { Image, ScrollView, View } from 'react-native';
import { theme } from 'styles/theme';
import CustomText from 'components/custom/CustomText';
import styled, { css } from '@emotion/native';

// 가장 기본이 되는 최상위 View 컨테이너
export const CommonContainer = styled.View`
  flex: 1;
  background-color: ${theme.colors.neutral0};
`;

export const CommonSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${theme.colors.neutral0};
`;

export const CommonScrollContainer = styled(ScrollView)`
  flex: 1;
  background-color: ${theme.colors.neutral0};
`;

export const CommonImage = styled(Image)<{
  alignSelf?: 'flex-start' | 'center' | 'flex-end';
  marginBottom?: number;
  borderRadius?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  tintColor?: string;
  height: number;
  width?: number;
}>`
  ${(props) => css`
    ${props.alignSelf && `align-self: ${props.alignSelf}`};
    ${props.width && `width: ${props.width}px`};
    height: ${`${props?.height}px`};
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
    ${props?.borderRadius && `borderRadius: ${props?.borderRadius}px`};
    ${props.tintColor && `tint-color: ${props.tintColor};`}
  `};
`;

// flex-direction: row 형태의 기본
export const CommonRow = styled.View<{
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  alignSelf?: 'flex-start' | 'center' | 'flex-end';
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  width?: string;
  flex?: number;
}>`
  ${(props) => css`
    flex-direction: row;
    ${props?.flex && `flex: ${props.flex}`};
    ${props?.justifyContent && `justify-content: ${props.justifyContent}`};
    align-items: ${props.alignItems || 'center'};
    ${props.alignSelf && `align-self: ${props.alignSelf}`};
    ${props.width && `width: ${props.width}`};
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `};
`;

export const CommonColumn = styled(View)<{
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  flex?: number;
}>`
  ${(props) => css`
    flex-direction: column;
    ${props?.flex && `flex: ${props.flex}`};
    ${props.alignItems && `align-items: ${props.alignItems}`};
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `}
`;

export const CommonBetweenRow = styled.View<{
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  flex?: number;
}>`
  ${(props) => css`
    flex-direction: row;
    justify-content: space-between;
    ${props?.flex && `flex: ${props.flex}`};
    align-items: ${props.alignItems || 'center'};
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `};
`;

export const CommonWrap = styled.View<{
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  alignSelf?: 'flex-start' | 'center' | 'flex-end';
  marginHorizontal?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
}>`
  ${(props) => css`
    flex: 1;
    flex-wrap: wrap;
    flex-direction: row;
    ${props.alignItems && `align-items: ${props.alignItems}`};
    ${props.alignSelf && `align-self: ${props.alignSelf}`};
    margin: ${props?.marginTop || 0}px ${props.marginHorizontal ?? (props?.marginRight || 0)}px
      ${props?.marginBottom || 0}px ${props.marginHorizontal ?? (props?.marginLeft || 0)}px;
  `}
`;

export const CommonFlexEnd = styled.View<{
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
}>`
  ${(props) => css`
    flex: 1;
    justify-content: flex-end;
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `}
`;

export const CommonVerticalDivider = styled.View<{
  marginHorizontal?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  borderColor?: string;
  height?: number;
}>`
  ${(props) => css`
    width: 1px;
    height: ${props.height || 29}px;
    border-width: 0.5px;
    border-color: ${props.borderColor || theme.colors.neutral30};
    margin: ${props?.marginTop || 0}px ${props.marginHorizontal ?? (props?.marginRight || 0)}px
      ${props?.marginBottom || 0}px ${props.marginHorizontal ?? (props?.marginLeft || 0)}px;
  `};
`;

// 선에 대한 컴포넌트 (예: ------------ 이런 형태. 점선은 아님)
export const CommonDivider = styled.View<{
  marginVertical?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  borderColor?: string;
}>`
  ${(props) => css`
    border-top-width: 1px;
    border-color: ${props.borderColor || theme.colors.neutral30};
    margin: ${props.marginVertical ?? (props?.marginTop || 0)}px ${props?.marginRight || 0}px
      ${props.marginVertical ?? (props?.marginBottom || 0)}px ${props?.marginLeft || 0}px;
  `}
`;

// 각 하단 탭의 메인 헤더 타이틀에 해당하는 스타일
export const CommonMainTitle = styled(CustomText)<{
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  lineHeight?: number;
  color?: string;
}>`
  ${(props) => css`
    font-size: 20px;
    font-family: ${props.theme.families.semiBold};
    line-height: ${props.lineHeight || 28}px;
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `}
`;

export const CommonText = styled(CustomText)<{
  textDecoration?: TextDecorationType;
  textAlign?: TextAlignType;
  family?: FontFamilyType;
  letterSpacing?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  flexShrink?: number;
  lineHeight?: number;
  underline?: boolean;
  color?: string;
  flex?: number;
  size?: number;
}>`
  ${(props) => css`
    margin-top: ${`${props?.marginTop || 0}px`};
    margin-right: ${`${props?.marginRight || 0}px`};
    margin-bottom: ${`${props?.marginBottom || 0}px`};
    margin-left: ${`${props?.marginLeft || 0}px`};
    color: ${props?.color || '#111'};
    font-size: ${`${props?.size || 14}px`};
    line-height: ${`${props?.lineHeight || 24}px`};
    ${props?.textAlign && `text-align: ${props.textAlign}`};
    ${props?.flexShrink && `flex-shrink: ${props.flexShrink}`};
    ${props?.flex && `flex: ${props.flex}`};
    ${props?.underline && `text-decoration: underline`};
    ${props?.textDecoration && `text-decoration: ${props.textDecoration}`};
    ${props?.family === 'extraBold' && `font-family: ${props.theme.families.extraBold}`};
    ${props?.family === 'extraLight' && `font-family: ${props.theme.families.extraLight}`};
    ${props?.family === 'semiBold' && `font-family: ${props.theme.families.semiBold}`};
    ${props?.family === 'black' && `font-family: ${props.theme.families.black}`};
    ${props?.family === 'light' && `font-family: ${props.theme.families.light}`};
    ${props?.family === 'medium' && `font-family: ${props.theme.families.medium}`};
    ${props?.family === 'bold' && `font-family: ${props.theme.families.bold}`};
    ${props?.family === 'regular' && `font-family: ${props.theme.families.regular}`};
    ${props?.family === 'thin' && `font-family: ${props.theme.families.thin}`};
    ${props?.letterSpacing && `letter-spacing: ${props.letterSpacing}px`};
  `};
`;

export const CommonBoldText = styled(CustomText)<{
  textAlign?: TextAlignType;
  letterSpacing?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  underline?: boolean;
  lineHeight?: number;
  color?: string;
  flex?: number;
  size?: number;
}>`
  ${(props) => css`
    color: ${props.color || props.theme.colors.neutral100};
    font-size: ${props?.size || 14}px;
    font-family: ${props.theme.families.semiBold};
    ${props?.flex && `flex: ${props.flex}`};
    ${props?.underline && `text-decoration: underline`};
    ${props?.textAlign && `text-align: ${props.textAlign}`};
    line-height: ${props?.lineHeight || 24}px;
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
    ${props?.letterSpacing && `letter-spacing: ${props.letterSpacing}px`};
  `};
`;

// (flatList) ItemSeparatorComponent 에 쓰이는 공용 스타일
export const CommonListLine = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.neutral25};
`;

export const CommonLabel = styled(CustomText)<{
  textAlign?: TextAlignType;
  family?: FontFamilyType;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  underline?: boolean;
  lineHeight?: number;
  width?: string;
  size?: number;
  flex?: number;
}>`
  ${(props) => css`
    ${props?.flex && `flex: ${props.flex}`};
    ${props?.width && `width: ${props.width}`};
    color: ${props.theme.colors.neutral50};
    font-size: ${props?.size || 14}px;
    line-height: ${props?.lineHeight || 24}px;
    ${props?.textAlign && `text-align: ${props.textAlign}`};
    ${props?.underline &&
    `text-decoration: underline; text-decoration-color: ${props.theme.colors.neutral50}`};
    ${props?.family === 'extraBold' && `font-family: ${props.theme.families.extraBold}`};
    ${props?.family === 'extraLight' && `font-family: ${props.theme.families.extraLight}`};
    ${props?.family === 'semiBold' && `font-family: ${props.theme.families.semiBold}`};
    ${props?.family === 'black' && `font-family: ${props.theme.families.black}`};
    ${props?.family === 'light' && `font-family: ${props.theme.families.light}`};
    ${props?.family === 'medium' && `font-family: ${props.theme.families.medium}`};
    ${props?.family === 'bold' && `font-family: ${props.theme.families.bold}`};
    ${props?.family === 'regular' && `font-family: ${props.theme.families.regular}`};
    ${props?.family === 'thin' && `font-family: ${props.theme.families.thin}`};
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `}
`;

export const CommonInputTitle = styled(CustomText)<{ flex?: number; marginTop?: number }>`
  ${(props) =>
    typeof props.flex !== 'undefined' &&
    css`
      flex: ${props.flex};
    `};
  font-size: 16px;
  line-height: 19.2px;
  margin: ${(props) => (typeof props.marginTop !== 'undefined' ? props.marginTop : 30)}px 0 20px 0;
`;

export const CommonPointText = styled(CustomText)<{
  textAlign?: TextAlignType;
  family?: FontFamilyType;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  underline?: boolean;
  lineHeight?: number;
  flex?: number;
  size?: number;
}>`
  ${(props) => css`
    ${props?.flex && `flex: ${props.flex}`};
    color: ${props.theme.colors.primary100};
    font-size: ${props?.size || 18}px;
    font-family: ${props.theme.families.semiBold};
    line-height: ${props.lineHeight || 18}px;
    ${props?.textAlign && `text-align: ${props.textAlign}`};
    ${props.underline &&
    `text-decoration: underline; text-decoration-color: ${props.theme.colors.primary100};`};
    ${props?.family === 'extraBold' && `font-family: ${props.theme.families.extraBold}`};
    ${props?.family === 'extraLight' && `font-family: ${props.theme.families.extraLight}`};
    ${props?.family === 'semiBold' && `font-family: ${props.theme.families.semiBold}`};
    ${props?.family === 'black' && `font-family: ${props.theme.families.black}`};
    ${props?.family === 'light' && `font-family: ${props.theme.families.light}`};
    ${props?.family === 'medium' && `font-family: ${props.theme.families.medium}`};
    ${props?.family === 'bold' && `font-family: ${props.theme.families.bold}`};
    ${props?.family === 'regular' && `font-family: ${props.theme.families.regular}`};
    ${props?.family === 'thin' && `font-family: ${props.theme.families.thin}`};
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `}
`;

export const CommonScreenTitle = styled(CustomText)<{
  textAlign?: TextAlignType;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  underline?: boolean;
  lineHeight?: number;
  flex?: number;
  size?: number;
}>`
  ${(props) => css`
    ${props?.flex && `flex: ${props.flex}`};
    ${props?.underline && `text-decoration: underline`};
    ${props?.textAlign && `text-align: ${props.textAlign}`};
    color: ${props.theme.colors.neutral100};
    font-family: ${props.theme.families.semiBold};
    font-size: ${props?.size || 20}px;
    line-height: ${props.lineHeight || 28}px;
    margin: ${props?.marginTop || 0}px ${props?.marginRight || 0}px ${props?.marginBottom || 0}px
      ${props?.marginLeft || 0}px;
  `}
`;

export const CommonLine = styled.View<{
  marginVertical?: number;
  marginBottom?: number;
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  height?: number;
}>`
  ${(props) => css`
    width: 100%;
    height: ${props?.height ?? 16}px;
    margin: ${(props.marginVertical ?? props?.marginTop) || 0}px ${props?.marginRight || 0}px
      ${(props.marginVertical ?? props?.marginBottom) || 0}px ${props?.marginLeft || 0}px;
    background-color: ${props.theme.colors.neutral20};
  `}
`;

export const CommonPaddingContainer = styled.View<{ flex?: number }>`
  ${(props) => css`
    ${props?.flex && `flex: ${props?.flex}`};
    padding: 0 16px 0 16px;
  `}
`;
