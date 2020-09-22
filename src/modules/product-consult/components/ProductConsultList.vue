<template>
  <section></section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { ProductConsultDto, ProductConsultListDto } from '../../../dto';
import ProductConsultService from '../../../services/product-consult.service';
import { OrderByValue, Pagination } from '@/common';
import { QueryParamMapper, ReverseQueryParamMapper } from '@/core';
import { PRODUCT_CONSULT } from '@/services/shared';
import router from '@/router';

@Component({
  name: 'ProductConsultList',
})
export default class ProductConsultList extends BaseComponent {
  private productConsultListDto = new ProductConsultListDto();
  private pagination = new Pagination();
  private productConsulTotalCount = null;
  private productConsultLists: ProductConsultDto[] = [];
  private dataLoading = true;

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    ProductConsultService.findAll(
      this.productConsultListDto,
      this.pagination,
    ).subscribe(res => {
      this.productConsultLists = res.data.items;
      this.productConsulTotalCount = res.data.totalCount;
      this.dataLoading = false;
      this.$router.push({
        query: Object.assign(this.productConsultListDto),
      });
    });
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.productConsultListDto = query;
    }
    console.log(this.productConsultListDto);
    this.search();
  }
}
</script>