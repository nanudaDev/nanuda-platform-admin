import { BaseService } from '@/core';
import { AmenityDto, AmenityListDto } from '@/dto';
import { Pagination } from '@/common';

class AmenityService extends BaseService {
  /**
   *
   * @param filter
   * @param pagination
   */
  findAll(filter: AmenityListDto, pagination?: Pagination) {
    return super.paginate<AmenityDto>('admin/amenity', filter, pagination);
  }
  /**
   *
   * @param amenityType
   */
  findAmenities(amenityType: string) {
    return super.get<AmenityDto[]>(`admin/amenity/${amenityType}`);
  }

  /**
   *
   * @param amenity
   */
  create(amenity: AmenityDto) {
    return super.post<AmenityDto>(`admin/amenity`, amenity);
  }

  /**
   *
   * @param aminityNo
   * @param amenityDto
   */
  update(aminityNo, amenityDto: AmenityDto) {
    return super.patch<AmenityDto>(`admin/amenity/${aminityNo}`, amenityDto);
  }

  /**
   *
   * @param id
   */
  deleteOne(id) {
    return super.delete<AmenityDto>(`admin/amenity/${id}`);
  }
}

export default new AmenityService();
