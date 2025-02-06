/*
 * react-hook-form에 쓰이는 공용 스키마 값 관리
 */
import { isEmailRegex, isNameRegex, phoneRegex } from 'utils/textHelper';
import * as yup from 'yup';

type UserSchemaField = 'phoneNumber' | 'name' | 'email';

/**
 * @description [프로필 정보] 스키마
 * name: 문자가 완성됐는지 정규식 확인
 * email: 이메일 정규식 확인
 * phoneNumber: 휴대폰 정규식 확인
 */
export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, '이름은 두 글자 이상 입력해주세요.')
    .test('username-valid', '문자를 완성해주세요', (value) => {
      if (value) {
        return isNameRegex(value);
      }
    }),
  email: yup.string().test('email-valid', '올바른 이메일 형식을 입력해주세요.', (value) => {
    if (value) {
      return isEmailRegex(value);
    }
  }),
  phoneNumber: yup
    .string()
    .length(13, '올바른 휴대폰 번호를 입력해주세요.')
    .test('phoneNumber-valid', '올바른 휴대폰 번호를 입력해주세요.', (value) => {
      if (value) {
        return phoneRegex(value);
      }
    }),
});

/**
 * @description 유저 스키마에서 특정 필드만 선택
 * 예시: profileSchema.pick(['name', 'email', 'phoneNumber']);
 *
 * @param profileField - ['phoneNumber' | 'email' | 'name']
 */
export const userPickSchema = (profileField: UserSchemaField[]) => {
  return userSchema.pick(profileField);
};
