export enum RESERVATION_DELETE_REASON {
  NOT_AVAILABLE_DATE = '가용한 일정이 없어서',
  NOT_INTERESTED = '서비스에 흥미를 잃어서',
  BURDENSOME_TO_VISIT = '직접 방문하는게 부담스러워서',
  USE_OHTER_SERVICE = '다른 서비스를 이용하게 되서',
}

export const CONST_RESERVATION_DELETE_REASON = Object.values(
  RESERVATION_DELETE_REASON,
);
