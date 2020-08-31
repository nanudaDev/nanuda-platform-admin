<template>
  <section>
    <div v-if="deliverySpaceListCount">
      <b-row no-gutters>
        <b-col
          cols="6"
          md="6"
          lg="4"
          v-for="type in deliverySpaceList"
          :key="type.no"
          class="px-1 mb-2"
        >
          <div class="card" style="height:100%">
            <b-row no-gutters align-h="start" align-v="start">
              <b-col cols="12" lg="12" class="p-2">
                <b-img-lazy
                  v-if="
                    type.images &&
                      type.images[0] &&
                      type.images[0].endpoint.includes('storage')
                  "
                  :src="type.images[0].endpoint"
                  :alt="type.images[0].originalFilename"
                  :onerror="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  rounded
                  style="max-width:100%"
                />
                <b-img-lazy
                  v-else
                  :src="
                    require('@/assets/images/general/common/img_placeholder.jpg')
                  "
                  rounded
                  style="max-width:100%"
                />
                <div class="text-center mt-2">
                  <b-btn-group align-h="center" align-v="center">
                    <router-link
                      :to="{
                        name: 'DeliverySpaceDetail',
                        params: {
                          id: type.no,
                        },
                      }"
                      class="btn btn-outline-info btn-sm"
                      >상세보기</router-link
                    >
                    <b-button
                      variant="outline-secondary"
                      size="sm"
                      v-b-modal.view_type_detail
                      @click="findOne(type.no)"
                      >미리보기</b-button
                    >
                  </b-btn-group>
                </div>
              </b-col>
              <b-col cols="12" lg="12" class="p-2">
                <h5 v-if="type.typeName">{{ type.typeName }}</h5>
                <ul class="u-list">
                  <!-- <li v-if="type.buildingName">타입 ID : {{ type.no }}</li> -->
                  <!-- <li v-if="type.buildingName">
                    건물명 : {{ type.buildingName }}
                  </li> -->
                  <li v-if="type.size">평수 : {{ type.size }} 평</li>
                  <li v-if="type.deposit">보증금 : {{ type.deposit }} 만원</li>
                  <li v-if="type.monthlyRentFee">
                    월 임대료 : {{ type.monthlyRentFee }} 만원
                  </li>
                  <li v-if="type.monthlyUtilityFee">
                    월 관리비 : {{ type.monthlyUtilityFee }} 만원
                  </li>
                  <li v-if="type.quantity && type.contracts">
                    남은 공실 갯수 :
                    <b>
                      <span
                        :class="[
                          type.quantity - type.contracts.length > 0
                            ? 'text-success'
                            : 'text-danger',
                        ]"
                        >{{ type.quantity - type.contracts.length }}</span
                      >
                      /
                      {{ type.quantity }}
                    </b>
                  </li>
                  <!-- <li v-if="type.deliverySpaceOptions.length > 0">
                    공간 옵션 :
                    <b-badge
                      variant="success"
                      v-for="option in type.deliverySpaceOptions"
                      :key="option.no"
                      class="m-1"
                      >{{ option.deliverySpaceOptionName }}</b-badge
                    >
                  </li>
                  <li v-if="type.amenities.length > 0">
                    주방 시설 :
                    <b-badge
                      variant="info"
                      v-for="amenity in type.amenities"
                      :key="amenity.no"
                      class="m-1"
                      >{{ amenity.amenityName }}</b-badge
                    >
                  </li> -->
                </ul>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>

      <b-pagination
        v-model="pagination.page"
        v-if="deliverySpaceListCount"
        pills
        :total-rows="deliverySpaceListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
    <div v-else class="empty-data">타입 정보 없음</div>
    <b-modal
      id="view_type_detail"
      size="xl"
      hide-footer
      :title="`${deliverySpaceDto.typeName} 타입 상세 보기`"
    >
      <b-row>
        <b-col cols="12" md="4">
          <b-carousel
            v-if="deliverySpaceDto.images && deliverySpaceDto.images.length > 0"
            :interval="3000"
            controls
            indicators
            background="white"
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
          <h4 v-if="deliverySpaceDto.typeName" class="mb-3">
            [{{ deliverySpaceDto.no }}] {{ deliverySpaceDto.typeName }}
          </h4>
          <ul class="u-list">
            <li v-if="deliverySpaceDto.buildingName">
              건물명 : {{ deliverySpaceDto.buildingName }}
            </li>
            <li v-if="deliverySpaceDto.size">
              평수 : {{ deliverySpaceDto.size }} 평
            </li>
            <li v-if="deliverySpaceDto.deposit">
              보증금 : {{ deliverySpaceDto.deposit }} 만원
            </li>
            <li v-if="deliverySpaceDto.monthlyRentFee">
              월 임대료 : {{ deliverySpaceDto.monthlyRentFee }} 만원
            </li>
            <li v-if="deliverySpaceDto.monthlyUtilityFee">
              월 관리비 : {{ deliverySpaceDto.monthlyUtilityFee }} 만원
            </li>
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
                >{{ option.deliverySpaceOptionName }}</b-badge
              >
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
                >{{ amenity.amenityName }}</b-badge
              >
            </li>
          </ul>
          <div
            v-if="deliverySpaceDto.quantity"
            class="border bg-light rounded p-3 mt-3"
          >
            남은 공실 갯수 :
            <b
              :class="[
                deliverySpaceDto.remainingCount > 0
                  ? 'text-success'
                  : 'text-danger',
              ]"
              >{{ deliverySpaceDto.remainingCount }}</b
            >
            /
            {{ deliverySpaceDto.quantity }}
          </div>
        </b-col>
        <b-col>
          <DeliverySpaceDetailContractList />
        </b-col>
      </b-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseCard from '../../_components/BaseCard.vue';
import BaseComponent from '@/core/base.component';
import { Prop, Vue, Component } from 'vue-property-decorator';
import { DeliverySpaceDto, DeliverySpaceListDto } from '../../../dto';
import AmenityService from '../../../services/amenity.service';
import DeliverSpaceService from '../../../services/delivery-space.service';
import { Pagination } from '@/common';

import DeliverySpaceDetailContractList from '../../delivery-space/components/DeliverySpaceDetailContractList.vue';

@Component({
  name: 'DeliverySpaceList',
  components: {
    BaseCard,
    DeliverySpaceDetailContractList,
  },
})
export default class DeliverySpaceList extends BaseComponent {
  private deliverySpaceList: DeliverySpaceDto[] = Array<DeliverySpaceDto>();
  private deliverySpaceListDto = new DeliverySpaceListDto();
  private deliverySpaceDto = new DeliverySpaceDto();
  private deliverySpaceListCount = 0;
  private pagination = new Pagination();

  private prevNo = null;
  private nextNo = null;

  // 타입 공간 리스트
  findAll(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 6;
    this.deliverySpaceListDto.companyDistrictNo = parseInt(
      this.$route.params.id,
    );

    DeliverSpaceService.findAll(
      this.deliverySpaceListDto,
      this.pagination,
    ).subscribe(res => {
      this.deliverySpaceList = res.data.items;
      this.deliverySpaceListCount = res.data.totalCount;
    });
  }

  // 타입 상세 보기
  findOne(typeNo: number) {
    DeliverSpaceService.findOne(typeNo).subscribe(res => {
      if (res) {
        this.deliverySpaceDto = res.data;
        this.$root.$emit('find_contract_list', typeNo);
      }
    });
  }

  paginateSearch() {
    this.findAll(true);
  }

  created() {
    this.findAll();
  }

  mounted() {
    this.$root.$on('delivery_space_create', () => {
      this.findAll(false);
    });
  }
}
</script>
