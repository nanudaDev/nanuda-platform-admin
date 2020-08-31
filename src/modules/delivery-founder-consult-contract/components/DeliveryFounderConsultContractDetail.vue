<template>
  <section>
    <div
      v-if="deliveryFounderConsultContractDto"
      class="d-flex justify-content-between align-items-end mb-2"
    >
      <h3 v-if="deliveryFounderConsultContractDto.deliverySpace" class="mb-0">
        {{ deliveryFounderConsultContractDto.deliverySpace.typeName }} - 계약
        정보
      </h3>
      <router-link
        to="/delivery-founder-consult-contract"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
    </div>
    <b-row>
      <b-col md="6" class="my-3">
        <BaseCard title="계약자 정보">
          <template v-slot:body>
            <div v-if="deliveryFounderConsultContractDto.nanudaUser">
              <ul class="u-list">
                <li>
                  계약자명 :
                  {{ deliveryFounderConsultContractDto.nanudaUser.name }}
                </li>
                <li>
                  계약자 성별 :
                  {{
                    deliveryFounderConsultContractDto.nanudaUser.gender
                      | enumTransformer
                  }}
                </li>
                <li>
                  휴대폰 번호 :
                  <b>
                    {{
                      deliveryFounderConsultContractDto.nanudaUser.phone
                        | phoneTransformer
                    }}
                  </b>
                  <b-button
                    size="sm"
                    variant="info"
                    pill
                    v-b-modal.send_message
                    class="mx-2 p-1"
                  >
                    <b-icon icon="envelope"></b-icon>
                    <span class="d-none">문자전송</span>
                  </b-button>
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="6" class="my-3">
        <BaseCard title="계약 공간 정보">
          <template v-slot:head>
            <span v-if="deliveryFounderConsultContractDto.createdAt">
              계약일 -
              {{
                deliveryFounderConsultContractDto.createdAt | dateTransformer
              }}
            </span>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsultContractDto.deliverySpace">
              <ul class="u-list">
                <li
                  v-if="
                    deliveryFounderConsultContractDto.deliverySpace.typeName
                  "
                >
                  공간 타입 :
                  {{ deliveryFounderConsultContractDto.deliverySpace.typeName }}
                </li>
                <li
                  v-if="
                    deliveryFounderConsultContractDto.deliverySpace.buildingName
                  "
                >
                  건물명 :
                  {{
                    deliveryFounderConsultContractDto.deliverySpace.buildingName
                  }}
                </li>
                <li v-if="deliveryFounderConsultContractDto.deliverySpace.size">
                  평수 :
                  {{ deliveryFounderConsultContractDto.deliverySpace.size }} 평
                </li>
                <li
                  v-if="deliveryFounderConsultContractDto.deliverySpace.deposit"
                >
                  보증금 :
                  {{ deliveryFounderConsultContractDto.deliverySpace.deposit }}
                  만원
                </li>
                <li
                  v-if="
                    deliveryFounderConsultContractDto.deliverySpace
                      .monthlyRentFee
                  "
                >
                  월 임대로 :
                  {{
                    deliveryFounderConsultContractDto.deliverySpace
                      .monthlyRentFee
                  }}
                  만원
                </li>
                <li>
                  월 관리비 :
                  {{
                    deliveryFounderConsultContractDto.deliverySpace
                      .monthlyUtilityFee
                  }}
                  만원
                </li>
              </ul>
              <b-btn-group class="mt-2">
                <router-link
                  :to="{
                    name: 'DeliveryFounderConsultDetail',
                    params: {
                      id:
                        deliveryFounderConsultContractDto.deliveryFounderConsultNo,
                    },
                  }"
                  class="btn btn-outline-info"
                >
                  상담 신청 내용 보기
                </router-link>
                <router-link
                  :to="{
                    name: 'DeliverySpaceDetail',
                    params: {
                      id: deliveryFounderConsultContractDto.deliverySpaceNo,
                    },
                  }"
                  class="btn btn-outline-info"
                >
                  계약 공간 상세 보기
                </router-link>
              </b-btn-group>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 -->
    <b-modal
      v-if="deliveryFounderConsultContractDto.nanudaUser"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="
        `${deliveryFounderConsultContractDto.nanudaUser.name} 사용자에게 문자하기`
      "
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">{{
          deliveryFounderConsultContractDto.nanudaUser.phone | phoneTransformer
        }}</b>
      </p>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { DeliveryFounderConsultContractDto } from '@/dto';
import Component from 'vue-class-component';
import BaseCard from '../../_components/BaseCard.vue';

import DeliveryFounderConsultContractService from '../../../services/delivery-founder-consult-contarct.service';

@Component({
  name: 'DeliveryFounderConsultContractDetail',
  components: {
    BaseCard,
  },
})
export default class DeliveryFounderConsultContractDetail extends BaseComponent {
  private deliveryFounderConsultContractDto = new DeliveryFounderConsultContractDto();

  findOne() {
    DeliveryFounderConsultContractService.findOne(
      this.$route.params.id,
    ).subscribe(res => {
      if (res) {
        this.deliveryFounderConsultContractDto = res.data;
      }
    });
  }
  created() {
    this.findOne();
  }
}
</script>
