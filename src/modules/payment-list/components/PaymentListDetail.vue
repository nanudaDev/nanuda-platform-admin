<template>
  <section v-if="paymentList">
    <SectionTitle :title="`${paymentList.shopName} - 매출 정보`" divider>
      <template v-slot:rightArea>
        <router-link to="/kiosk-payment" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col md="6">
        <BaseCard title="매출 정보">
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li>ID: {{ paymentList.paymentListNo }}</li>
                <li>매장명: {{ paymentList.shopName }}</li>
                <li>
                  관리명: {{ paymentList.nanudaKitchenMaster.nanudaName }}
                </li>
              </ul>
              <div
                class="bg-light border text-right p-3 mt-3"
                v-if="paymentList.amount"
              >
                <div>
                  <b-row
                    no-gutters
                    align-h="between"
                    align-v="center"
                    class="mb-2"
                  >
                    <span>AMOUNT</span>
                    <p>{{ paymentList.amount | currencyTransformer }}</p>
                  </b-row>
                  <b-row
                    no-gutters
                    align-h="between"
                    align-v="center"
                    class="mb-2"
                  >
                    <span>SURTAX</span>
                    <p>{{ paymentList.surTax | currencyTransformer }}</p>
                  </b-row>
                </div>
                <div class="pt-2 border-top">
                  <b-row no-gutters align-h="between" align-v="end">
                    <span>TOTAL</span>
                    <h4>
                      <b>{{ paymentList.totalAmount | currencyTransformer }}</b>
                    </h4>
                  </b-row>
                </div>
              </div>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
  </section>
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
