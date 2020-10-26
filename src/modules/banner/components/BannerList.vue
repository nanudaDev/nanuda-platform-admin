<template>
  <section>
    <SectionTitle title="배너 관리" divider></SectionTitle>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import BannerService from '@/services/banner.service';
import { BannerDto } from '@/dto';
import { CONST_YN, Pagination, YN } from '@/common';

@Component
export default class BannerList extends BaseComponent {
  private bannerListDto: BannerDto[] = [];
  private bannerSearchDto = new BannerDto();
  private pagination = new Pagination();
  private dataLoading = true;
  private bannerTotalCount = null;
  private ynSelect: YN[] = [...CONST_YN];

  search(isPagination: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    BannerService.findAll(this.bannerSearchDto, this.pagination).subscribe(
      res => {
        this.dataLoading = false;
        this.bannerListDto = res.data.items;
        this.bannerTotalCount = res.data.totalCount;
      },
    );
  }
}
</script>
