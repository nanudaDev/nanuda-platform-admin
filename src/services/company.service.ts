import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyDto,
  CompanyListDto,
  CompanyUpdateDto,
  CompanyUpdateRefusalDto,
  CompanyDistrictPromotionDto,
} from '@/dto';

class CompanyService extends BaseService {
  /**
   *
   * @param filter
   * @param paginate
   */
  findAll(filter?: CompanyListDto, paginate?: Pagination) {
    return super.paginate<CompanyDto>('admin/company', filter, paginate);
  }
  /**
   *
   * @param companyNo
   */
  findOne(companyNo) {
    return super.get<CompanyDto>(`admin/company/${companyNo}`);
  }

  findForSelect() {
    return super.get<CompanyDto[]>('admin/company/find-for-select');
  }

  findAllForSelect() {
    return super.get<CompanyDto[]>('admin/company/find-all-for-select');
  }

  update(companyNo, companyUpdateDto: CompanyUpdateDto) {
    return super.patch(`admin/company/${companyNo}`, companyUpdateDto);
  }

  /**
   *
   * @param companyNo
   * @param param
   * @param companyUpdateRefusalDto
   */
  updateCompanyStatus(
    companyNo,
    param: string,
    companyUpdateRefusalDto?: CompanyUpdateRefusalDto,
  ) {
    return super.patch(
      `admin/company/${companyNo}/${param}`,
      companyUpdateRefusalDto,
    );
  }

  /**
   *
   * @param company
   */
  createCompany(company: CompanyDto) {
    return super.post<CompanyDto>('admin/company', company);
  }

  /**
   *
   * @param companyNo
   */
  deleteCompany(companyNo: string) {
    return super.delete<CompanyDto>(`admin/company/${companyNo}`);
  }

  /**
   * find ongoing promotions for company
   * @param companyNo
   * @param paginate
   */
  async findOngoingPromotions(companyNo, paginate: Pagination) {
    return super.paginate<CompanyDistrictPromotionDto>(
      `admin/company/${companyNo}/ongoing-promotions`,
      null,
      paginate,
    );
  }

  /**
   * find expired promotions for company
   * @param companyNo
   * @param paginate
   */
  async findExpiredPromotions(companyNo, paginate: Pagination) {
    return super.paginate<CompanyDistrictPromotionDto>(
      `admin/company/${companyNo}/expired-promotions`,
      null,
      paginate,
    );
  }
}

export default new CompanyService();
