import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyDistrictDto,
  CompanyDistrictListDto,
  CompanyDistrictUpdateRefusalDto,
  CompanyDistrictUpdateDto,
} from '@/dto';

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
}
export default new CompanyDistrictService();
