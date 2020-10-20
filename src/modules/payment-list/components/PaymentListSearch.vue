<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>키오스크 매출 정보</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <div class="form-row">
        <div class="col-6 col-md-1 mb-3">
          <label>PAYMENT ID</label>
          <input
            type="text"
            class="form-control"
            v-model="paymentListSearchDto.paymentListNo"
          />
        </div>
        <div class="col-6 col-md-2 mb-3">
          <label>BRANCH(ex: 선릉점)</label>
          <input
            type="text"
            class="form-control"
            v-model="paymentListSearchDto.nanudaKitchenMasterName"
          />
        </div>
        <!-- <div class="col-6 col-md-2 mb-3">
          <label>TOTAL AMOUNT</label>
          <input type="text" class="form-control" v-model="paymentListSearchDto.totalAmount" />
        </div>-->
        <div class="col-6 col-md-2 mb-3">
          <label>MENU NAME</label>
          <input
            type="text"
            class="form-control"
            v-model="paymentListSearchDto.nanudaKitchenMenuName"
          />
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div>
            <label for="started">시작 날짜</label>
            <b-form-datepicker
              id="started"
              v-model="paymentListSearchDto.started"
            ></b-form-datepicker>
          </div>
        </div>
        <div class="col-6 col-md-3 mb-3">
          <div>
            <label for="ended">종료 날짜</label>
            <b-form-datepicker
              id="ended"
              v-model="paymentListSearchDto.ended"
              :disabled="paymentListSearchDto.started ? false : true"
            ></b-form-datepicker>
          </div>
        </div>
      </div>
      <div class="text-center">
        <div class="btn-group mb-4">
          <button class="btn btn-primary" @click="clearOut()">초기화</button>
          <button class="btn btn-success" @click="search()">검색</button>
        </div>
      </div>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ paymentListCount }}</strong>
        </h5>
      </div>
      <div v-if="totalRevenue">
        설정 값 기준 매출:
        <b>{{ totalRevenue | currencyTransformer }}</b>
      </div>
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table
        class="table table-hover table-sm table-nowrap text-center"
        v-if="paymentListCount"
      >
        <colgroup>
          <col width="40" />
          <col width="100" />
          <col width="100" />
          <col width="200" />
          <col width="100" />
          <col width="150" />
          <col width="100" />
        </colgroup>
        <thead>
          <tr>
            <th
              scope="col"
              v-bind:class="{ highlighted: paymentListSearchDto.paymentListNo }"
            >
              PAYMENT ID
            </th>
            <th scope="col">KITCHEN NO</th>
            <th
              scope="col"
              v-bind:class="{
                highlighted: paymentListSearchDto.nanudaKitchenMasterName,
              }"
            >
              BRANCH
            </th>
            <th
              scope="col"
              v-bind:class="{ highlighted: paymentListSearchDto.totalAmount }"
            >
              TOTAL AMOUNT
            </th>
            <th scope="col">CREATED</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="paymentList in paymentLists"
            :key="paymentList.paymentListNo"
            @click="findOne(paymentList.paymentListNo)"
          >
            <td scope="row">{{ paymentList.paymentListNo }}</td>
            <td>
              <span v-if="paymentList.nanudaKitchenMaster">{{
                paymentList.nanudaKitchenMaster.nanudaNo
              }}</span
              ><span v-else class="red-text">미정</span>
            </td>
            <td>
              <span v-if="paymentList.nanudaKitchenMaster">{{
                paymentList.nanudaKitchenMaster.nanudaName
              }}</span
              ><span v-else class="red-text">미정</span>
            </td>
            <td>{{ paymentList.totalAmount | currencyTransformer }}</td>
            <td>{{ paymentList.createdAt | dateTransformer }}</td>
            <td>
              <router-link
                v-if="paymentList.paymentListNo"
                class="btn btn-sm btn-secondary"
                :to="{
                  name: 'PaymentListDetail',
                  params: {
                    id: paymentList.paymentListNo,
                  },
                }"
                >상세보기</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="paymentListCount"
      pills
      :total-rows="paymentListCount"
      :per-page="pagination.limit"
      @input="paginateSearch"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Pagination } from '@/common';
import { ReverseQueryParamMapper } from '@/core';
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
  private paymentListCount = null;
  private paymentLists: PaymentListDto[] = [];
  private dataLoading = true;
  private totalRevenue = null;

  clearOut() {
    this.paymentListSearchDto = new PaymentListSearchDto();
    this.pagination.page = 1;
    this.totalRevenue = null;
    this.search();
  }

  paginateSearch() {
    this.search(true);
  }

  findOne(paymentListNo) {
    this.$router.push(`/kiosk-payment/${paymentListNo}`);
  }

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    PaymentListService.findAll(
      this.paymentListSearchDto,
      this.pagination,
    ).subscribe(res => {
      this.paymentLists = res.data.items;
      this.paymentListCount = res.data.totalCount;
      this.dataLoading = false;
      this.$router.push({
        query: Object.assign(this.paymentListSearchDto),
      });
      this.findRevenue();
    });
  }

  findRevenue() {
    this.totalRevenue = null;
    const newPaymentListSearchDto = new PaymentListSearchDto();
    newPaymentListSearchDto.started = this.paymentListSearchDto.started;
    newPaymentListSearchDto.nanudaKitchenMasterName = this.paymentListSearchDto.nanudaKitchenMasterName;
    newPaymentListSearchDto.totalAmount = this.paymentListSearchDto.totalAmount;
    newPaymentListSearchDto.nanudaKitchenMenuName = this.paymentListSearchDto.nanudaKitchenMenuName;
    if (newPaymentListSearchDto.started) {
      PaymentListService.findRevenue(newPaymentListSearchDto).subscribe(res => {
        this.totalRevenue = res.data.sum;
      });
    }
  }

  created() {
    this.paymentListSearchDto.started = new Date();
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.paymentListSearchDto = query;
    }
    this.search(false);
  }
}
</script>
