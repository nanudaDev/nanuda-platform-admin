<template>
  <section>
    <div v-if="paymentList && !dataLoading">
      <SectionTitle :title="`${paymentList.shopName} - 결제 정보`" divider>
        <template v-slot:rightArea>
          <router-link to="/kiosk-payment" class="btn btn-secondary">목록으로</router-link>
        </template>
      </SectionTitle>
      <b-row>
        <b-col md="6">
          <BaseCard title="결제 내역">
            <template v-slot:body>
              <div>
                <ul class="u-list">
                  <li>PAYMENT ID: {{ paymentList.paymentListNo }}</li>
                  <li>매장명: {{ paymentList.shopName }}</li>
                  <li
                    v-if="paymentList.nanudaKitchenMaster"
                  >관리명: {{ paymentList.nanudaKitchenMaster.nanudaName }}</li>
                </ul>
                <div class="border-top">
                  <ul class="u-list">
                    <li>CARD ISSUER: {{ paymentList.issuerName }}</li>
                  </ul>
                </div>
                <div class="bg-light border text-right p-3 mt-3" v-if="paymentList.amount">
                  <div>
                    <b-row no-gutters align-h="between" align-v="center" class="mb-2">
                      <span>MENU</span>
                      <p>{{ paymentList.kioskOrderList.menuName }}</p>
                    </b-row>
                    <b-row no-gutters align-h="between" align-v="center" class="mb-2">
                      <span>QTY</span>
                      <p>{{ paymentList.kioskOrderList.menuCount }}</p>
                    </b-row>
                    <b-row no-gutters align-h="between" align-v="center" class="mb-2">
                      <span>AMOUNT</span>
                      <p>{{ paymentList.amount | currencyTransformer }}</p>
                    </b-row>
                    <b-row no-gutters align-h="between" align-v="center" class="mb-2">
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
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
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
  private dataLoading = true;

  findOne(id) {
    this.dataLoading;
    PaymentListService.findOne(id).subscribe(res => {
      this.paymentList = res.data;
      this.dataLoading = false;
    });
  }

  created() {
    this.findOne(this.$route.params.id);
  }
}
</script>
