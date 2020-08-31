<template>
  <div v-if="!dataLoading" class="table-responsive">
    <table
      class="table table-hover table-md table-nowrap text-center"
      v-if="founderConsultListCount"
    >
      <thead>
        <tr>
          <th scope="col">공간ID</th>
          <th scope="col">사용자명</th>
          <th scope="col">휴대폰 번호</th>
          <th scope="col">공간 주소</th>
          <th scope="col">희망상담시간</th>
          <th scope="col">등록일</th>
          <th scope="col">상태</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="founderConsult in founderConsultList"
          :key="founderConsult.no"
          @click="findOne(founderConsult.no)"
          style="cursor:pointer"
        >
          <td>{{ founderConsult.spaceNo }}</td>
          <td>{{ founderConsult.nanudaUser.name }}</td>
          <td>{{ founderConsult.nanudaUser.phone | phoneTransformer }}</td>
          <td>
            {{ founderConsult.space.address }}
            {{ founderConsult.space.detailAddress }}
          </td>

          <td>
            <div v-if="founderConsult.availableTime">
              {{ founderConsult.availableTime.value }}
            </div>
          </td>
          <td>{{ founderConsult.createdAt | dateTransformer }}</td>
          <td>
            <b-badge
              :variant="getStatusColor(founderConsult.codeManagement.key)"
              class="badge-pill p-2 mr-2"
              >{{ founderConsult.codeManagement.value }}</b-badge
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="empty-data border" v-else>상담 신청 내역 없음</div>
  </div>
  <div class="half-circle-spinner mt-5" v-else>
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import FounderConsultService from '../../../services/founder-consult.service';
import { Pagination, PaginatedResponse } from '../../../common';
import {
  FounderConsultListDto,
  FounderConsultDto,
} from '../../../dto/founder-consult';
import { SPACE_TYPE } from '@/services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'DashboardFounderConsultList',
})
export default class DashboardFounderConsultList extends BaseComponent {
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultListCount = null;
  private pagination = new Pagination();
  private founderConsultListDto = new FounderConsultListDto();
  private dataLoading = false;

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  //TODO:  need to refactor base service
  getDashboardList() {
    this.dataLoading = true;
    this.pagination.limit = 5;
    this.founderConsultListDto.spaceTypeNo = SPACE_TYPE.SPACE_SHARE;
    FounderConsultService.findAll(
      this.founderConsultListDto,
      this.pagination,
    ).subscribe(res => {
      this.dataLoading = false;
      this.founderConsultList = res.data.items;
      this.founderConsultListCount = res.data.totalCount;
    });
  }

  findOne(consolutNo) {
    this.$router.push(`/founder-consult/${consolutNo}`);
  }

  mounted() {
    this.getDashboardList();
  }
}
</script>
