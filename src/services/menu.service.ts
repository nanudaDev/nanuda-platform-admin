import { BaseService } from '@/core';
import { MenuListDto, MenuDto, MenuCreateDto } from '@/dto';
import { Pagination } from '@/common';

class MenuService extends BaseService {
  constructor() {
    super();
  }

  /**
   * find all for admin
   * @param filter
   * @param pagination
   */
  findAll(filter?: MenuListDto, pagination?: Pagination) {
    return super.paginate<MenuDto>('admin/menu', filter, pagination);
  }

  findOne(id) {
    return super.get<MenuDto>(`admin/menu/${id}`);
  }

  create(body: MenuCreateDto) {
    return super.post<MenuDto>('admin/menu', body);
  }

  // TODO: UPDATE
}

export default new MenuService();
