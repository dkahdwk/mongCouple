// 이메일 정규식 체크
export const isEmailRegex = (value: string) => {
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  return regEmail.test(value);
};

// 숫자만 입력하게 한다. (TextInput 숫자만 입력할때 유용)
export const onlyNumber = (value: string) => {
  return value.replace(/[^0-9]/g, '').trim();
};

// m or km 단위로 반환
export const distanceToMeter = (distance: number | undefined) => {
  if (typeof distance === 'undefined') {
    return;
  }

  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)}km`;
  }
  return `${distance}m`;
};

export const onlyDotAndNumber = (value: string) => {
  return value.replace(/[^-.0-9]/g, '').trim();
};

/**
 * @param value 입력값
 * @param decimalLength 소수점 자리수
 * */
export const toLimitDecimalPoint = (value: string, decimalLength: number) => {
  if (
    value.split('.').length - 1 < 2 &&
    (value.split('.')?.[1]?.length < decimalLength + 1 ||
      typeof value.split('.')?.[1] === 'undefined')
  ) {
    return true;
  }
};

// 숫자에 천단위로 콤마를 입력시킨다. (TextInput 가격 입력할때 유용)
export const commaToNumber = (value: string | number | undefined) => {
  if (typeof value === 'undefined') {
    return '';
  } else if (typeof value === 'number') {
    const formatted = String(value);
    return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else if (typeof value === 'string') {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return '';
  }
};

// 휴대폰 자동 입력폼
export const phoneInputFormat = (value: string | number | undefined) => {
  if (typeof value === 'undefined') return '';
  if (typeof value === 'number') {
    return String(value).replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  } else {
    if (value?.length !== 11) {
      return value?.replace(/-/g, '');
    }
    return value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }
};

// 휴대폰 정규식 확인
export const phoneRegex = (value: string) => {
  return /(^010?)-?([0-9]{3,4})-?([0-9]{4})$/.test(value);
};

// 영문 or 숫자 or 특수문자 중에서 2개이상 사용하는지 확인
export const passwordRegex = (text: string) => {
  const regex =
    /^(?=.*[A-Za-z])(?=.*\d|.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])|(?=.*\d)(?=.*[A-Za-z]|.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])|(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[A-Za-z]|.*\d).{8,}$/;

  return regex.test(text);
};

// 한국어인지 정규식 체크
export const isKoreanRegex = (value: string) => {
  const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

  if (value === '') return true;
  return koreanRegex.test(value);
};

// 문자 완성됐는지
export const isNameRegex = (value: string) => {
  const nameRegex = /(^[A-Z|a-z|가-힣\s]{2,50}$)/;

  if (value === '') return true;
  return nameRegex.test(value);
};

// 영어인지 정규식 체크
export const isEnglishRegex = (value: string) => {
  const englishRegex = /[a-zA-Z]/;

  if (value === '') return true;
  return englishRegex.test(value);
};

// 숫자와 특수문자를 포함하는지 체크
export const alphanumericRegex = (value: string) => {
  const alphanumericRegex = /[\d~`!@#$%^&*()\-_=+[\]{}|\\;:'",<.>/?]+/;

  if (value === '') return false;
  return alphanumericRegex.test(value);
};

// 소수점 첫 번째 자리까지 허용할 경우 최대 4글자
export const isOneDecimalPlaceFourLengthRegex = (value: string) => {
  // 소수점 첫 번째 자리까지 허용할 경우 최대 4글자
  const regex = /^\d{0,4}(\.\d{0,1})?$/;
  return regex.test(value);
};

// 이메일 도메인 정규식 체크
export const checkEmailDomain = (value: string) => {
  const charactersToCheck = ['.com', '.co.kr', '.net'];

  for (let i = 0; i < charactersToCheck.length; i += 1) {
    if (value.includes(charactersToCheck[i])) {
      return true;
    }
  }

  return false;
};

/**
 * @description 글자에 길이 제한 걸어서 ...처리
 *
 * @param value (string) 처리할 텍스트
 * @param maxLength (number) 길이 제한
 * @returns
 */
export const truncateString = (value: string, maxLength: number) => {
  if (value?.length > maxLength) {
    return `${value?.substring(0, maxLength)}...`;
  } else {
    return value;
  }
};

/** value가 한글기준 자음+모음이 형성되어있는지 구분 */
export const isKoreanConsonantVowel = (value: string) => {
  const regex = /([^가-힣\x20])/i;

  return !regex?.test(value?.trim()) === true;
};

/** value가 한글기준 자음+모음+숫자가 형성되어있는지 구분 */
export const isKoreanConsonantVowelAndNumber = (value: string) => {
  const regex = /([^가-힣\x20])\/\d/i;

  return !regex?.test(value?.trim()) === true;
};
