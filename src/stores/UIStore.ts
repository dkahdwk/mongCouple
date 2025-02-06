import { ConfirmOptions, ModalViewOptions, SpinnerOptions } from 'types/ui';
import { makeAutoObservable } from 'mobx';

class UIStore {
  options: any = undefined;

  confirm: Confirm = new Confirm();

  spinner: Spinner = new Spinner();

  modalView: ModalView = new ModalView();

  constructor() {
    makeAutoObservable(this);
  }
}

class Spinner {
  spinnerShow: boolean = false;

  options: SpinnerOptions | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  show(options?: SpinnerOptions) {
    this.options = options;
    this.spinnerShow = true;
  }

  close() {
    this.spinnerShow = false;
    this.options = undefined;
  }
}

class Confirm {
  confirmShow: boolean = false;

  options: ConfirmOptions | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  show(options: ConfirmOptions) {
    this.options = options;
    this.confirmShow = true;
  }

  cancel() {
    if (typeof this.options?.onCancel !== 'undefined') {
      this.options?.onCancel();
    }

    this.confirmShow = false;
    // 모달이 사라지기전에 데이터가 사라져 전환이 어색해지므로 setTimeout으로 호출
    setTimeout(() => {
      this.options = undefined;
    }, 500);
  }

  close() {
    this.confirmShow = false;
    // 모달이 사라지기전에 데이터가 사라져 전환이 어색해지므로 setTimeout으로 호출
    setTimeout(() => {
      if (typeof this.options?.onClose !== 'undefined') {
        this.options?.onClose();
      }
      this.options = undefined;
    }, 500);
  }

  confirm() {
    this.confirmShow = false;
    // 모달이 사라지기전에 데이터가 사라져 전환이 어색해지므로 setTimeout으로 호출
    setTimeout(() => {
      if (typeof this.options?.onConfirm !== 'undefined') {
        this.options?.onConfirm();
      }
      this.options = undefined;
    }, 500);
  }
}

class ModalView {
  isShow: boolean = false;

  options: ModalViewOptions | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  show(options: ModalViewOptions) {
    this.options = options;
    this.isShow = true;
  }

  close() {
    this.options = undefined;
    this.isShow = false;
  }
}

export default UIStore;
