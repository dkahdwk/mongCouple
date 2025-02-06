import React, { createContext, useContext } from 'react';
import { MobXProviderContext, ProviderProps } from 'mobx-react';
import CommonStore from 'stores/CommonStore';
import UIStore from 'stores/UIStore';

export interface RootStoreType {
  commonStore: CommonStore;
  uiStore: UIStore;
}

// eslint-disable-next-line import/prefer-default-export
export const RootStore: RootStoreType = {
  commonStore: new CommonStore(),
  uiStore: new UIStore(),
};

const CustomContext = createContext(RootStore);

// MobX와 Hook을 동시에 사용하기 위해서는 다음과 같은 Wrapper가 필요하다
export const useStore = () => useContext(CustomContext);

/**
 * 기본 Mobx Provider에서 사용하는 props를 가져옵니다. 직접 value를 넣어주는 경우가 아니라면
 * (이 프로젝트 같은경우엔) 직접적으로 사용할 일은 없습니다
 */
export const MobxProvider = ({ children }: ProviderProps) => {
  // 위 선언되었던 컨텍스트를 할당 후, 사용합니다.
  const parentContext = useContext(CustomContext);

  return (
    <MobXProviderContext.Provider value={parentContext}>{children}</MobXProviderContext.Provider>
  );
};
