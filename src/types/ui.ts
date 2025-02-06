import { ToastPosition } from 'react-native-toast-message';
import { StyleProp, TextStyle } from 'react-native';
import { ReactElement, ReactNode } from 'react';
import UIStore from 'stores/UIStore';

export interface ModalViewOptions {
  children: ReactNode;
}

export type ToastType = 'default' | 'success' | 'error' | 'reject';

export interface ConfirmOptions {
  subTitle?: { text: string; tag?: string };
  confirmText?: ReactElement | string;
  element?: ReactElement;
  isLoading?: boolean;
  cancelText?: string;
  message?: ReactNode;
  isSingle?: boolean;
  title?: ReactNode;
  boxText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface SpinnerOptions {
  subtitleStyle?: StyleProp<TextStyle>;
  isHideIndicator?: boolean;
  subtitle?: string;
  title?: string;
}

export interface ShowSpinnerProps {
  uiStore: UIStore;
  title?: string;
  subtitle?: string;
  isHideIndicator?: boolean;
}

export interface ShowToastProps {
  position?: ToastPosition;
  duration?: number;
  subText?: string;
  type?: ToastType;
  text: string;
  onPress?: () => void;
}

export interface ShowConfirmProps {
  subTitle?: { text: string; tag?: string };
  confirmText?: ReactElement | string;
  title: ReactNode | undefined;
  element?: ReactElement;
  isLoading?: boolean;
  cancelText?: string;
  message?: ReactNode;
  isSingle?: boolean;
  uiStore: UIStore;
  boxText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}
