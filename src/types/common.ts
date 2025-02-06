import { AxiosError } from 'axios';
import { theme } from 'styles/theme';

export type ThemeColor = keyof typeof theme.colors;

export interface Pagination {
  currentPageSize: number;
  totalPageSize: number;
  currentPage: number;
  totalPage: number;
}

export interface PaginationParams {
  limit?: number; // 미 입력 시 1로 검색
  page?: number; // 미 입력 시 10으로 검색
}

export interface ErrorResponse {
  code: string;
  error: string;
  showMessage: {
    description: string;
    buttonText: string;
    title: string;
  };
}

export interface ApiError
  extends AxiosError<{
    code?: string;
    showMessage: {
      description: string;
      buttonText: string;
      title: string;
    };
  }> {}

export type TextAlignType = 'left' | 'center' | 'right';

export type FontFamilyType =
  | 'extraBold'
  | 'extraLight'
  | 'semiBold'
  | 'regular'
  | 'medium'
  | 'light'
  | 'black'
  | 'bold'
  | 'thin';

export type TextDecorationType =
  | 'line-through'
  | 'underline'
  | 'overline'
  | 'dashed'
  | 'double'
  | 'dotted'
  | 'solid'
  | 'none';
