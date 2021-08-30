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

//페이지네이션 객체를 url에 있는 query와 업데이트 시킴
export function addHashToLocation(pagination) {
  let queries = '';
  for (const [key, value] of Object.entries(pagination)) {
    const query = key.concat('=', value as string);
    queries = queries + '&' + query;
  }
  queries = queries.substring(1, queries.length);
  history.replaceState({}, null, window.location.pathname + '?' + queries);
}
