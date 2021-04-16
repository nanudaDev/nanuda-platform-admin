<template>
  <section>
    <div class="title pb-2 mb-2">
      <h3>키오스크 매출</h3>
    </div>
    <div class="divider"></div>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" lg="2">
          <b-form-group label="PAYMENT ID">
            <b-form-input v-model="paymentListSearchDto.paymentListNo" />
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="2">
          <b-form-group label="매장 ID">
            <b-form-input v-model="paymentListSearchDto.nanudaNo" />
          </b-form-group>
        </b-col>
        <b-col cols="12" lg="2">
          <b-form-group label="관리명">
            <b-form-input
              v-model="paymentListSearchDto.nanudaKitchenMasterName"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="시작 날짜">
            <b-form-datepicker
              id="started"
              v-model="paymentListSearchDto.started"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="6" lg="3">
          <b-form-group label="종료 날짜">
            <b-form-datepicker
              id="ended"
              v-model="paymentListSearchDto.ended"
              :disabled="paymentListSearchDto.started ? false : true"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-row align-h="center">
        <div>
          <b-button variant="secondary" @click="clearOut()">초기화</b-button>
          <b-button variant="primary" @click="search()">검색</b-button>
        </div>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ paymentTotalCount }}</strong>
        </h5>
      </div>
      <div v-if="totalRevenue" class="text-right">
        <div class="d-flex align-items-end">
          <span class="mr-1">설정 값 기준 매출 : </span>
          <h4>{{ totalRevenue | currencyTransformer }}</h4>
        </div>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm table-nowrap text-center"
          v-if="paymentTotalCount"
        >
          <thead>
            <tr>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: paymentListSearchDto.paymentListNo,
                }"
              >
                PAYMENT ID
              </th>
              <th scope="col">매장 ID</th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: paymentListSearchDto.shopName,
                }"
              >
                매장명
              </th>
              <th
                scope="col"
                v-bind:class="{
                  highlighted: paymentListSearchDto.nanudaKitchenMasterName,
                }"
              >
                관리명
              </th>
              <th
                scope="col"
                v-bind:class="{ highlighted: paymentListSearchDto.totalAmount }"
              >
                총 매출액
              </th>
              <th scope="col">등록일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="paymentList in paymentList"
              :key="paymentList.paymentListNo"
              @click="
                $router.push({
                  name: 'PaymentListDetail',
                  params: {
                    id: paymentList.paymentListNo,
                  },
                })
              "
              style="cursor:pointer"
            >
              <td scope="row">{{ paymentList.paymentListNo }}</td>
              <td>
                <span v-if="paymentList.nanudaKitchenMaster">{{
                  paymentList.nanudaKitchenMaster.nanudaNo
                }}</span
                ><span v-else class="red-text">미정</span>
              </td>
              <td>
                <template v-if="paymentList.shopName">
                  {{ paymentList.shopName }}
                </template>
              </td>
              <td>
                <span v-if="paymentList.nanudaKitchenMaster">{{
                  paymentList.nanudaKitchenMaster.nanudaName
                }}</span
                ><span v-else class="red-text">미정</span>
              </td>
              <td>{{ paymentList.totalAmount | currencyTransformer }}</td>
              <td>{{ paymentList.createdAt | dateTransformer }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="paymentTotalCount"
        pills
        :total-rows="paymentTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="loading-spinner">
        <div class="half-circle-spinner">
          <div class="circle circle-1"></div>
          <div class="circle circle-2"></div>
        </div>
      </div>
    </template>
  </section>
</template>
<script lang="ts">
import { Pagination } from '@/common';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';
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
  private paymentTotalCount = null;
  private paymentList: PaymentListDto[] = [];
  private dataLoading = true;
  private totalRevenue = null;

  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.paymentListSearchDto = new PaymentListSearchDto();
      this.findAll();
    }
    this.totalRevenue = null;
  }

  paginateSearch() {
    this.findAll(true);
  }

  search() {
    this.findAll(true, true);
  }

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.paymentListSearchDto, this.pagination);
    }
    PaymentListService.findAll(
      this.paymentListSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.paymentList = res.data.items;
        this.paymentTotalCount = res.data.totalCount;
        this.dataLoading = false;
      }
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
    this.paymentListSearchDto.started = new Date().toISOString().substr(0, 10);

    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.paymentListSearchDto = query;
      if (!isNaN(+query.limit) && !isNaN(+query.page)) {
        this.pagination.limit = +query.limit;
        this.pagination.page = +query.page;
      } else {
        this.pagination = new Pagination();
      }
      this.paginateSearch();
    } else {
      this.findAll();
    }
  }
}
</script>
