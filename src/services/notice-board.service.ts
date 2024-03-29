import { BaseService } from '@/core';
import { NoticeBoardDto, NoticeBoardListDto } from '@/dto';
import { Pagination } from '@/common';

class NoticeBoardService extends BaseService {
  constructor() {
    super();
  }

  /**
   * create notice board
   * @param noticeBoardCreateDto
   */
  create(noticeBoardCreateDto: NoticeBoardDto) {
    return super.post<NoticeBoardDto>(
      'admin/notice-board',
      noticeBoardCreateDto,
    );
  }

  /**
   * find all
   * @param noticeBoardListDto
   * @param pagination
   */
  findAll(noticeBoardListDto: NoticeBoardListDto, pagination: Pagination) {
    return super.paginate<NoticeBoardDto>(
      'admin/notice-board',
      noticeBoardListDto,
      pagination,
    );
  }

  /**
   *
   * @param noticeBoardNo
   */
  findOne(noticeBoardNo: string) {
    return super.get<NoticeBoardDto>(`admin/notice-board/${noticeBoardNo}`);
  }

  /**
   * udpaet one for notice board
   * @param noticeBoardNo
   */
  update(noticeBoardNo: string, noticeBoardUpdateDto: NoticeBoardDto) {
    return super.patch<NoticeBoardDto>(
      `admin/notice-board/${noticeBoardNo}`,
      noticeBoardUpdateDto,
    );
  }

  /**
   * delete one for notice board
   * @param noticeBoardNo
   */
  deleteOne(noticeBoardNo: string) {
    return super.delete<any>(`admin/notice-board/${noticeBoardNo}`);
  }
}

export default new NoticeBoardService();
