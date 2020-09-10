<template>
  <section></section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { PaymentListDto } from '../../../dto';
import PaymentListService from '../../../services/payment-list.service';

@Component({
  name: 'PaymentListDetail',
})
export default class PaymentListDetail extends BaseComponent {
  private paymentList = new PaymentListDto();

  findOne(id) {
    PaymentListService.findOne(id).subscribe(res => {
      this.paymentList = res.data;
    });
  }

  created() {
    this.findOne(this.$route.params.id);
  }
}
</script>