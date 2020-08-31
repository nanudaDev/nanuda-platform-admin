<template>
  <div v-if="!dataLoading" class="table-responsive">
    <table class="table table-hover table-nowrap" v-if="companyListCount">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">CEO</th>
          <th scope="col">PHONE</th>
          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="company in companyDto"
          :key="company.no"
          @click="findOne(company.no)"
          style="cursor:pointer"
        >
          <th scope="row">
            {{ company.no }}
          </th>
          <td>
            {{ company.nameKr }}
          </td>
          <td>{{ company.ceoKr }}</td>
          <td>{{ company.phone | phoneTransformer }}</td>
          <td>
            <b-badge
              :variant="getStatusColor(company.codeManagement.key)"
              class="badge-pill p-2 mr-2"
              >{{ company.codeManagement.value }}</b-badge
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="empty-data" v-else>승인 수정 요청 내역 없음</div>
  </div>
  <div class="half-circle-spinner my-5" v-else>
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import CompanyService from '../../../services/company.service';
import { CompanyDto, CompanyListDto } from '../../../dto';
import { Pagination } from '../../../common';
import { APPROVAL_STATUS } from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'DashboardCompanyList',
})
export default class DashboardCompanyList extends BaseComponent {
  private pagination = new Pagination();
  private companyListDto = new CompanyListDto();
  private companyListCount = null;
  private companyDto: CompanyDto[] = [];
  private dataLoading = false;

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  getCompanyUpdateStatusList() {
    this.dataLoading = true;
    this.pagination.limit = 2;
    this.companyListDto.companyStatus = APPROVAL_STATUS.UPDATE_APPROVAL;
    CompanyService.findAll(this.companyListDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.companyDto = res.data.items;
        this.companyListCount = res.data.totalCount;
      },
    );
  }

  findOne(companyNo) {
    this.$router.push(`/company/${companyNo}`);
  }

  mounted() {
    this.getCompanyUpdateStatusList();
  }
}
</script>
