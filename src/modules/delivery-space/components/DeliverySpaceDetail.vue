<template>
  <section>
    <SectionTitle :title="`${deliverySpaceDto.typeName} - 타입 정보`" divider>
      <template v-slot:rightArea>
        <router-link class="btn btn-secondary" to="/company/delivery-space">목록보기</router-link>
      </template>
    </SectionTitle>
    <b-row>
      <b-col cols="12" md="4">
        <b-carousel
          v-if="deliverySpaceDto.images && deliverySpaceDto.images.length > 0"
          :interval="3000"
          controls
          indicators
          img-width="500"
          img-height="480"
        >
          <b-carousel-slide
            v-for="image in deliverySpaceDto.images"
            :key="image.originalFilename"
            :img-src="image.endpoint"
          ></b-carousel-slide>
        </b-carousel>
        <b-img-lazy
          v-else
          :src="require('@/assets/images/general/common/img_placeholder.jpg')"
          rounded
          style="max-width:100%"
        />
      </b-col>
      <b-col cols="12" md="8">
        <div v-if="deliverySpaceDto && deliverySpaceDto.companyDistrict">
          <h4
            v-if="deliverySpaceDto.typeName"
            class="mb-3"
          >[{{ deliverySpaceDto.no }}] {{ deliverySpaceDto.typeName }}</h4>
          <ul class="u-list">
            <li
              v-if="deliverySpaceDto.companyDistrict.company.nameKr"
            >업체명 : {{ deliverySpaceDto.companyDistrict.company.nameKr }}</li>
            <li
              v-if="deliverySpaceDto.companyDistrict.company.nameKr"
            >지점명 : {{ deliverySpaceDto.companyDistrict.nameKr }}</li>
            <li v-if="deliverySpaceDto.buildingName">건물명 : {{ deliverySpaceDto.buildingName }}</li>
            <li v-if="deliverySpaceDto.size">평수 : {{ deliverySpaceDto.size }} 평</li>
            <li v-if="deliverySpaceDto.deposit">보증금 : {{ deliverySpaceDto.deposit }} 만원</li>
            <li
              v-if="deliverySpaceDto.monthlyRentFee"
            >월 임대료 : {{ deliverySpaceDto.monthlyRentFee }} 만원</li>
            <li
              v-if="deliverySpaceDto.monthlyUtilityFee"
            >월 관리비 : {{ deliverySpaceDto.monthlyUtilityFee }} 만원</li>
            <li
              v-if="
                deliverySpaceDto.deliverySpaceOptions &&
                  deliverySpaceDto.deliverySpaceOptions.length > 0
              "
            >
              공간 옵션 :
              <b-badge
                variant="success"
                v-for="option in deliverySpaceDto.deliverySpaceOptions"
                :key="option.no"
                class="m-1"
              >{{ option.deliverySpaceOptionName }}</b-badge>
            </li>
            <li
              v-if="
                deliverySpaceDto.amenities &&
                  deliverySpaceDto.amenities.length > 0
              "
            >
              주방 시설 :
              <b-badge
                variant="info"
                v-for="amenity in deliverySpaceDto.amenities"
                :key="amenity.no"
                class="m-1"
              >{{ amenity.amenityName }}</b-badge>
            </li>
          </ul>
          <div v-if="deliverySpaceDto.brands && deliverySpaceDto.brands.length > 0">
            창업 가능 브랜드
            <div class="mt-2">
              <router-link
                :to="{
                  name: 'BrandDetail',
                  params: {
                    id: brand.no,
                  },
                }"
                v-for="brand in deliverySpaceDto.brands"
                :key="brand.logo[0].no"
                class="d-inline-block border m-1"
              >
                <b-img-lazy
                  :src="brand.logo[0].endpoint"
                  :alt="brand.logo[0].nameKr"
                  style="max-height:40px"
                ></b-img-lazy>
              </router-link>
            </div>
          </div>
          <div v-if="deliverySpaceDto.quantity" class="border bg-light rounded p-3 mt-3">
            남은 공실 갯수 :
            <b
              :class="[
                deliverySpaceDto.remainingCount > 0
                  ? 'text-success'
                  : 'text-danger',
              ]"
            >{{ deliverySpaceDto.remainingCount }}</b>
            /
            {{ deliverySpaceDto.quantity }}
          </div>
        </div>
        <div class="text-right mt-4">
          <b-button
            variant="primary"
            v-b-modal.update_delivery_space
            @click="showUpdateModal()"
          >수정하기</b-button>
        </div>
      </b-col>
      <b-col>
        <DeliverySpaceDetailContractList />
      </b-col>
    </b-row>
    <DeliverySpaceUpdate :deliverySpaceDto="deliverySpaceDto" />
  </section>
</template>
<script lang="ts">
import BaseCard from '../../_components/BaseCard.vue';
import BaseComponent from '@/core/base.component';
import { Prop, Vue, Component } from 'vue-property-decorator';
import { DeliverySpaceDto, DeliverySpaceListDto } from '../../../dto';
import AmenityService from '../../../services/amenity.service';
import DeliverySpaceService from '../../../services/delivery-space.service';
import { Pagination } from '@/common';

import DeliverySpaceUpdate from './DeliverySpaceUpdate.vue';
import DeliverySpaceDetailContractList from './DeliverySpaceDetailContractList.vue';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'DeliverySpaceDetail',
  components: {
    BaseCard,
    DeliverySpaceDetailContractList,
    DeliverySpaceUpdate,
  },
})
export default class DeliverySpaceList extends BaseComponent {
  private deliverySpaceDto = new DeliverySpaceDto();

  // 타입 상세 보기
  findOne(id) {
    DeliverySpaceService.findOne(id).subscribe(res => {
      if (res) {
        this.deliverySpaceDto = res.data;
        this.$root.$emit('find_contract_list', id);
      }
    });
  }

  showUpdateModal() {
    this.$root.$emit('update_delivery_space', this.deliverySpaceDto);
    this.findOne(this.$route.params.id);
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }

  mounted() {
    const id = this.$route.params.id;
    this.$root.$on('find_delivery_space', () => {
      this.findOne(id);
    });
    this.$root.$on('clearout_updatedto', () => {
      this.findOne(id);
    });
  }
}
</script>
