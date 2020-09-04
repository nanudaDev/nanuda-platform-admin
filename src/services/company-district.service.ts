import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyDistrictDto,
  CompanyDistrictListDto,
  CompanyDistrictUpdateRefusalDto,
  CompanyDistrictUpdateDto,
} from '@/dto';
import { CompanyDistrictMapUpdateDto } from '@/dto/company-district/company-district-map-update.dto';

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
}
export default new CompanyDistrictService();
