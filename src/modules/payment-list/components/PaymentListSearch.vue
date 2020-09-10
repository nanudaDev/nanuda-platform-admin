<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>키오스크 매출 정보</h3>
    </div>
    <div class="divider"></div>
  </section>
</template>
<script lang="ts">
import { Pagination } from '@/common';
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { PaymentListSearchDto, PaymentListDto } from '../../../dto';
import PaymentListService from '../../../services/payment-list.service';

@Component({
  name: 'PaymentListSearch',
})
export default class PaymentListSearch extends BaseComponent {
  private paymentListSearchDto = new PaymentListSearchDto();
  private pagination = new Pagination();
}
</script>