<template>
  <div class="mt-4">
    <div v-if="!dataLoading && deliveryFounderConsultContractListCount">
      <div class="table-top mb-3">
        <div class="title">
          <h4>
            계약 리스트
          </h4>
        </div>
        <div class="total-count">
          <span>TOTAL</span>
          <strong class="text-primary">{{
            deliveryFounderConsultContractListCount
          }}</strong>
        </div>
      </div>
      <div class="divider"></div>
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">계약 신청서 번호</th>
            <th scope="col">계약자 이름</th>
            <th scope="col">계약자 전화번호</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="contract in deliveryFounderConsultContractList"
            :key="contract.no"
          >
            <th scope="row">
              {{ contract.no }}
            </th>
            <td>
              <router-link
                :to="{
                  name: 'DeliveryFounderConsultDetail',
                  params: {
                    id: contract.deliveryFounderConsultNo,
                  },
                }"
              >
                {{ contract.deliveryFounderConsultNo }}
              </router-link>
            </td>
            <td>
              {{ contract.nanudaUser.name }}
            </td>
            <td>
              {{ contract.nanudaUser.phone | phoneTransformer }}
            </td>
            <td>
              <b-button
                variant="danger"
                size="sm"
                v-b-modal.delete_contarct
                @click="selectContract(contract)"
              >
                삭제
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-pagination
        v-model="pagination.page"
        v-if="deliveryFounderConsultContractListCount"
        pills
        :total-rows="deliveryFounderConsultContractListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <b-modal
      id="delete_contarct"
      title="계약 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>아래 문구를 입력해주세요.</b>
        </p>
        <div class="mt-3">
          <input
            type="text"
            placeholder="정말로 삭제하시겠습니까?"
            name="delete_contract_msg"
            class="form-control"
            id="delete_contract_msg"
            v-model="deleteConfirmMsg"
          />
        </div>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteContract()">삭제</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import {
  DeliveryFounderConsultContractDto,
  DeliveryFounderConsultContractListDto,
  DeliveryFounderConsultUpdateDto,
} from '../../../dto';
import DeliveryFounderConsultContractService from '../../../services/delivery-founder-consult-contarct.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { Pagination } from '@/common';

@Component({
  name: 'DeliverySpaceDetailContractList',
})
export default class DeliverySpaceDetailContractList extends BaseComponent {
  private deliveryFounderConsultContractList: DeliveryFounderConsultContractDto[] = [];
  private deliveryFounderConsultContractListCount = 0;
  private deliveryFounderConsultContractSearchDto = new DeliveryFounderConsultContractListDto();
  private deliveryFounderConsultContractDto = new DeliveryFounderConsultContractDto();
  private deleteConfirmMsg = '';
  private selectedContract = new DeliveryFounderConsultContractDto();
  private pagination = new Pagination();
  private dataLoading = false;

  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;

    DeliveryFounderConsultContractService.findAll(
      this.deliveryFounderConsultContractSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.deliveryFounderConsultContractList = res.data.items;
        this.deliveryFounderConsultContractListCount = res.data.totalCount;
      }
    });
  }

  // 계약 삭제
  selectContract(contract: DeliveryFounderConsultContractDto) {
    this.selectedContract = contract;
  }

  deleteContract() {
    if (this.deleteConfirmMsg === '정말로 삭제하시겠습니까?') {
      const contractNo = this.selectedContract.no;
      DeliveryFounderConsultContractService.deleteContract(
        contractNo,
      ).subscribe(res => {
        if (res) {
          toast.success('삭제완료');
          this.$bvModal.hide('delete_contarct');
          this.search();
        }
      });
    }
  }

  paginateSearch() {
    this.search(true);
  }

  mounted() {
    this.$root.$on('find_contract_list', typeNo => {
      this.deliveryFounderConsultContractSearchDto.deliverySpaceNo = typeNo;
      this.search();
    });
  }
}
</script>
