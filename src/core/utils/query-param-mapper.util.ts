import { Pagination } from '@/common';
import router from '@/router';

// type check to DTO
export const QueryParamMapper = (dto: any) => {
  console.log(dto);
  return Object.keys(dto)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(dto[k]))
    .join('&');
};

export const ReverseQueryParamMapper = (search?: string) => {
  if (!search) {
    return;
  } else {
    return Object.fromEntries(new URLSearchParams(search));
  }
};

export const RouterQueryParamMapper = (
  saerchDto: any,
  pagination: Pagination,
) => {
  let searchPramsDto: any = {};
  searchPramsDto = Object.assign(saerchDto, pagination);
  return router
    .push({
      query: searchPramsDto,
    })
    .catch(() => {
      //
    });
};

export const ClearOutQueryParamMapper = () => {
  return router.push({ query: null }).catch(() => {
    //
  });
};
