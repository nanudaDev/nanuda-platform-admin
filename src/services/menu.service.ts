import { BaseService } from '@/core';
import { MenuListDto, MenuDto, MenuCreateDto, MenuUpdateDto } from '@/dto';
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

  update(id, body: MenuUpdateDto) {
    return super.patch<MenuDto>(`admin/menu/${id}`, body);
  }

  // TODO: UPDATE
}

export default new MenuService();
