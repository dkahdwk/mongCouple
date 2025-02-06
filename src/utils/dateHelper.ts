import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';

/**
 * 날짜(string)을 Date로 변환 후 원하는 형태로 format
 * @param date ex) '20180311' 혹은 Date 타입
 * @param formatDate ex) 'yyyy년 MM월 dd일' or 'HH시 mm분' or 'yyyy년 MM월 dd일 (eee) a h시 mm분'
 * @returns
 */
export const formatDate = (date: string | Date, formatDate: string): string => {
  try {
    if (typeof date === 'string') {
      return format(parseISO(date), formatDate, { locale: ko });
    } else {
      return format(date, formatDate, { locale: ko });
    }
  } catch (error) {
    // 서버 날짜데이터 형식이 올바르지 않을 경우 빈문자열 return
    return '';
  }
};
