<template>
  <div v-if="founderConsultManagementHistoryListCount">
    <div class="history-list">
      <div
        class="bg-light border rounded pt-2 pb-3 px-3 mb-2"
        v-for="history in founderConsultManagementHistoryList"
        :key="history.no"
      >
        <b-row no-gutters align-h="between" align-v="end">
          <div v-if="history.companyUser">
            <span>
              <strong class="user-name">{{ history.companyUser.name }}</strong>
              <span class="user-email">({{ history.companyUser.email }})</span>
            </span>
          </div>
          <div>
            <span class="date">{{ history.createdAt | dateTransformer }}</span>
          </div>
        </b-row>
        <div class="memo">
          {{ history.memo }}
        </div>
      </div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="founderConsultManagementHistoryListCount"
      pills
      :total-rows="founderConsultManagementHistoryListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import BaseComponent from '../../../core/base.component';
import {
  FounderConsultManagementDto,
  FounderConsultManagementListDto,
} from '../../../dto';
import FounderConsultManagementService from '../../../services/founder-consult-management.service';
import { Pagination } from '../../../common';
@Component({
  name: 'FounderConsultManagementHistory',
})
export default class FounderConsultManagementHistory extends BaseComponent {
  private founderConsultManagementHistoryList: FounderConsultManagementDto[] = [];
  private founderConsultManagementHistoryListDto = new FounderConsultManagementListDto();
  private founderConsultManagementHistoryListCount = 0;
  private pagination = new Pagination();

  findHistory(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;
    const fondConsultNo = this.$route.params.id;
    FounderConsultManagementService.findAll(
      fondConsultNo,
      this.founderConsultManagementHistoryListDto,
      this.pagination,
    ).subscribe(res => {
      this.founderConsultManagementHistoryList = res.data.items;
      this.founderConsultManagementHistoryListCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.findHistory(true);
  }

  created() {
    this.findHistory();
  }
}
</script>
<style lang="scss">
.history-list {
  .user-name {
    font-size: 0.75rem;
  }
  .user-email {
    font-size: 0.75rem;
  }
  .date {
    font-size: 0.75rem;
  }

  .memo {
    margin-top: 0.5rem;
    padding-top: 0.25rem;
    border-top: 1px solid #dee2e6;
  }
}
</style>
