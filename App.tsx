import React, { useEffect } from 'react';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider } from '@emotion/react';
import { theme } from 'styles/theme';
import NavigationController from 'navigations/NavigationController';
import RNBootSplash from 'react-native-bootsplash';

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Disable strict mode
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 3 },
  },
  queryCache: new QueryCache({
    onError: async (error: unknown) => {
      // query 공용 에러 처리
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      // mutation 공용 에러 처리
    },
  }),
});

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <StatusBar
                barStyle="dark-content"
                // backgroundColor: Android 에서만 동작한다
                backgroundColor={theme.colors.neutral0}
              />
              <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <NavigationController />
              </SafeAreaView>
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
