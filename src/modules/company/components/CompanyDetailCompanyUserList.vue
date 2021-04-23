<template>
  <div v-if="companyUserListCount">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">이름</th>
            <th scope="col">휴대폰번호</th>
            <th scope="col">이메일</th>
            <th scope="col">승인상태</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="companyUser in companyUserList"
            :key="companyUser.no"
            @click="findOne(companyUser.no)"
            style="cursor:pointer"
          >
            <th scope="row">{{ companyUser.no }}</th>
            <td>
              <strong
                class="text-danger"
                v-if="companyUser.authCode === 'ADMIN_COMPANY_USER'"
                >M</strong
              >
              {{ companyUser.name }}
            </td>
            <td>{{ companyUser.phone }}</td>
            <td>{{ companyUser.email }}</td>
            <td>
              <b-badge
                :variant="getStatusColor(companyUser.companyUserStatus)"
                class="badge-pill p-2 mr-2"
                >{{ companyUser.companyUserStatus | enumTransformer }}</b-badge
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="companyUserListCount"
      pills
      :total-rows="companyUserListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </div>
  <div v-else class="empty-data">사용자 없음</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CompanyUserListDto, CompanyUserDto } from '../../../dto';
import CompanyUserService from '../../../services/company-user.service';
import { Pagination } from '@/common';
import {
  COMPANY_USER,
  CONST_COMPANY_USER,
  APPROVAL_STATUS,
} from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'CompanyDetailCompanyUserList',
})
export default class CompanyDetailCompanyUserList extends BaseComponent {
  private pagination = new Pagination();
  private companyUserListDto = new CompanyUserListDto();
  private companyUserList: CompanyUserDto[] = [];
  private companyUserListCount = 0;
  private companyUserAdminRole: COMPANY_USER[] = [...CONST_COMPANY_USER];

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;

    this.companyUserListDto.companyNo = parseInt(this.$route.params.id);
    CompanyUserService.findAll(
      this.companyUserListDto,
      this.pagination,
    ).subscribe(res => {
      this.companyUserList = res.data.items;
      this.companyUserListCount = res.data.totalCount;
    });
  }

  findOne(companyUserNo) {
    this.$router.push(`/company/company-user/${companyUserNo}`);
  }

  paginateSearch() {
    this.search(true);
  }

  created() {
    this.search();
  }
}
</script>
