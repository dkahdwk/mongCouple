import { makeAutoObservable } from 'mobx';

class CommonStore {
  root: any = {};

  constructor() {
    makeAutoObservable(this);
  }
}

export default CommonStore;
