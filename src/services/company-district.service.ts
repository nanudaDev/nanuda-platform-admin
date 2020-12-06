import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyDistrictDto,
  CompanyDistrictListDto,
  CompanyDistrictUpdateRefusalDto,
  CompanyDistrictUpdateDto,
} from '@/dto';
import { CompanyDistrictMapUpdateDto } from '@/dto/company-district/company-district-map-update.dto';
import { CompanyDistrictPromotionDto } from '@/dto/company-district-promotion';

class CompanyDistrictService extends BaseService {
  /**
   *
   * @param filter
   * @param paginate
  
   */
  findAll(filter: CompanyDistrictListDto, paginate?: Pagination) {
    return super.paginate<CompanyDistrictDto>(
      `admin/company-district`,
      filter,
      paginate,
    );
  }

  /**
   *
   * @param companyNo
   */
  findOne(companyDistrictNo) {
    return super.get<CompanyDistrictDto>(
      `admin/company-district/${companyDistrictNo}`,
    );
  }

  /**
   *
   * @param companyDistrictNo
   * @param param
   * @param companyDistrictUpdateRefusalDto
   */
  updateCompanyDistrictStatus(
    companyDistrictNo,
    param: string,
    companyDistrictUpdateRefusalDto?: CompanyDistrictUpdateRefusalDto,
  ) {
    return super.patch<CompanyDistrictDto>(
      `admin/company-district/${companyDistrictNo}/${param}`,
      companyDistrictUpdateRefusalDto,
    );
  }

  /**
   *
   * @param companyDistrictNo
   * @param companyDistrictUpdateDto
   */
  update(
    companyDistrictNo: string,
    companyDistrictUpdateDto: CompanyDistrictUpdateDto,
  ) {
    return super.patch<CompanyDistrictDto>(
      `admin/company-district/${companyDistrictNo}`,
      companyDistrictUpdateDto,
    );
  }

  /**
   *
   * @param companyDistrict
   */
  createCompanyDistrict(companyDistrict: CompanyDistrictDto) {
    return super.post<CompanyDistrictDto>(
      'admin/company-district',
      companyDistrict,
    );
  }

  /**
   *
   * @param companyDistrict
   */
  findForSelect(companyDistrict: CompanyDistrictDto) {
    return super.get<CompanyDistrictDto[]>(
      'admin/company-district',
      companyDistrict,
    );
  }

  findForSelectOption(companyDistrictDto: CompanyDistrictDto) {
    return super.get<CompanyDistrictDto[]>(
      'admin/company-district/find-for-select',
      companyDistrictDto,
    );
  }

  /**
   * find all with no where clause
   */
  findAllForSelect() {
    return super.get<CompanyDistrictDto[]>(
      'admin/company-district/find-all-for-select',
    );
  }

  /**
   *
   * @param companyDistrictNo
   * @param companyDistrictMapUpdateDto
   */
  updateMap(
    companyDistrictNo,
    companyDistrictMapUpdateDto: CompanyDistrictMapUpdateDto,
  ) {
    return super.patch<CompanyDistrictMapUpdateDto>(
      `admin/company-district/${companyDistrictNo}/lat-lon`,
      companyDistrictMapUpdateDto,
    );
  }

  /**
   *
   * @param companyDistrictNo
   */
  deleteOne(companyDistrictNo) {
    return super.delete<CompanyDistrictDto>(
      `admin/company-district/${companyDistrictNo}`,
    );
  }

  /**
   * find ongoing promotions for district
   * @param companyDistrictNo
   * @param pagination
   */
  findOngoingPromotions(companyDistrictNo, pagination: Pagination) {
    return super.paginate<CompanyDistrictPromotionDto>(
      `admin/company-district/${companyDistrictNo}/ongoing-promotions`,
      null,
      pagination,
    );
  }

  /**
   * find expired promotions for district
   * @param companyDistrictNo
   * @param pagination
   */
  findExpiredPromotions(companyDistrictNo, pagination: Pagination) {
    return super.paginate<CompanyDistrictPromotionDto>(
      `admin/company-district/${companyDistrictNo}/expired-promotions`,
      null,
      pagination,
    );
  }
}
export default new CompanyDistrictService();
