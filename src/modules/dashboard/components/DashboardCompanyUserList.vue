<template>
  <div v-if="!dataLoading" class="table-responsive">
    <table class="table table-hover table-nowrap" v-if="companyUserListCount">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">NAME</th>
          <th scope="col">COMPANY</th>
          <th scope="col">PHONE</th>
          <th scope="col">STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="companyUser in companyUserDto"
          :key="companyUser.no"
          @click="findOne(companyUser.no)"
          style="cursor:pointer"
        >
          <th scope="row">
            {{ companyUser.no }}
          </th>
          <td>
            {{ companyUser.name }}
          </td>
          <td>
            {{ companyUser.company.nameKr }}
          </td>
          <td>{{ companyUser.phone | phoneTransformer }}</td>

          <td>
            <b-badge
              :variant="getStatusColor(companyUser.codeManagement.key)"
              class="badge-pill p-2 mr-2"
              >{{ companyUser.codeManagement.value }}</b-badge
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
import CompanyUserService from '../../../services/company-user.service';
import CompanyService from '../../../services/company.service';
import {
  CompanyUserListDto,
  CompanyUserDto,
  CompanyDto,
  CompanyListDto,
} from '../../../dto';
import { Pagination } from '../../../common';
import { APPROVAL_STATUS } from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'DashboardCompanyUserList',
})
export default class DashboardCompanyUserList extends BaseComponent {
  private companyUserDto: CompanyUserDto[] = [];
  private pagination = new Pagination();
  private companyUserListDto = new CompanyUserListDto();
  private companyUserListCount = null;
  private dataLoading = false;

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  // TODO: 등록 승인 요청, 수정 승인 요청 건 둘다 노출 필요
  getUserWithUpdateStatus() {
    this.dataLoading = true;
    this.pagination.limit = 2;
    this.companyUserListDto.companyUserStatus = APPROVAL_STATUS.UPDATE_APPROVAL;
    CompanyUserService.findAll(
      this.companyUserListDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      const data = res.data;
      this.companyUserDto = data.items;
      this.companyUserListCount = data.totalCount;
    });
  }

  findOne(companyUserNo) {
    this.$router.push(`/company/company-user/${companyUserNo}`);
  }

  created() {
    this.getUserWithUpdateStatus();
  }
}
</script>
