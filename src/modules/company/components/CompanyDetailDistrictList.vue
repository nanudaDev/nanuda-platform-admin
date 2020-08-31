<template>
  <div v-if="companyDistrictListCount > 0" class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            NO
          </th>
          <th scope="col">
            NAME
          </th>
          <th scope="col">
            ADDRESS
          </th>
          <th scope="col">
            STATUS
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="district in companyDistrictList"
          :key="district.no"
          @click="findOne(district.no)"
          style="cursor:pointer"
        >
          <th scope="row">
            {{ district.no }}
          </th>
          <td>
            {{ district.nameKr }}
          </td>
          <td>{{ district.address }}</td>
          <td>
            <b-badge
              :variant="getStatusColor(district.companyDistrictStatus)"
              class="badge-pill p-2 mr-2"
            >
              {{ district.companyDistrictStatus | enumTransformer }}
            </b-badge>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="pagination.page"
      v-if="companyDistrictListCount"
      pills
      :total-rows="companyDistrictListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </div>
  <div v-else class="empty-data">
    지점 없음
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyDistrictListDto, CompanyDistrictDto } from '../../../dto';
import CompanyDistrictService from '../../../services/company-district.service';
import { Pagination } from '@/common';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'CompanyDetailDistrictList',
})
export default class CompanyDetailDistrictList extends BaseComponent {
  private pagination = new Pagination();
  private companyDistrictListDto = new CompanyDistrictListDto();
  private companyDistrictList: CompanyDistrictDto[] = [];
  private companyDistrictListCount = 0;

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;

    this.companyDistrictListDto.companyNo = parseInt(this.$route.params.id);

    CompanyDistrictService.findAll(
      this.companyDistrictListDto,
      this.pagination,
    ).subscribe(res => {
      this.companyDistrictList = res.data.items;
      this.companyDistrictListCount = res.data.totalCount;
    });
  }

  findOne(districtNo) {
    this.$router.push(`/company/company-district/${districtNo}`);
  }

  paginateSearch() {
    this.search(true);
  }

  created() {
    this.search();
  }
}
</script>
