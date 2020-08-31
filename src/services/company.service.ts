import { BaseService } from '@/core';
import { Pagination } from '@/common';
import {
  CompanyDto,
  CompanyListDto,
  CompanyUpdateDto,
  CompanyUpdateRefusalDto,
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
    return super.get<CompanyDto[]>('admin/company/select-option');
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
}
export default new CompanyService();
