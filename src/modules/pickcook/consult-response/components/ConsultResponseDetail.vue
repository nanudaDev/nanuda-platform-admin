<template>
  <section v-if="consultResponseDto">
    <SectionTitle title="상담 신청" divider>
      <template v-slot:rightArea>
        <router-link to="/pickcook/consult-response" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row v-on:keyup.enter="updateConsultResponse()">
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="consultResponseDto">
              <!-- <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button> -->
              <!-- <b-button
                variant="primary"
                @click="updateNanudaUser()"
                v-b-modal.nanuda_user
                >수정하기</b-button
              > -->
            </div>
            <div v-else>
              <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="consultResponseDto">
              <ul class="u-list">
                <li v-if="consultResponseDto && consultResponseDto.name">
                  사용자명 : {{ consultResponseDto.name }}
                </li>
                <li v-if="consultResponseDto.phone">
                  휴대폰 번호 :
                  <span>{{ consultResponseDto.phone | phoneTransformer }}</span>
                </li>
                <li
                  v-if="
                    consultResponseDto.proforma &&
                      consultResponseDto.proforma.hdong
                  "
                >
                  운영/희망 주소:
                  {{ consultResponseDto.proforma.hdong.sidoName }}
                  {{ consultResponseDto.proforma.hdong.guName }}
                  {{ consultResponseDto.proforma.hdong.hdongName }}
                </li>
              </ul>
              <!-- 지도 노출 -->
              <!-- <div id="map" style="width:100%; height:300px"></div> -->
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="6" class="my-3">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <!-- <b-button
                v-if="!consultResponseDto.adminId"
                variant="info"
                @click="assignYourselfAdmin()"
                >본인으로 정하기</b-button
              > -->
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin_list
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="consultResponseDto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    {{ consultResponseDto.admin.no }}
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    {{ consultResponseDto.admin.name }}
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  {{ consultResponseDto.admin.phone | phoneTransformer }}
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="12" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div>
              <b-button variant="primary" @click="updateConsultResponse()">
                수정하기
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <b-row>
              <b-col lg="6">
                <ul class="u-list">
                  <li
                    v-if="
                      consultResponseDto.fnbOwnerCodeStatus &&
                        consultResponseDto.fnbOwnerCodeStatus.comment
                    "
                  >
                    창업자 유형 :
                    {{ consultResponseDto.fnbOwnerCodeStatus.comment }}
                  </li>
                </ul>
                <div v-if="consultResponseDto.proforma" class="mt-2">
                  <div
                    v-for="question in consultResponseDto.proforma.questions"
                    :key="question.id"
                    class="card border p-3 mt-2"
                  >
                    <p>Q. {{ question.question }}</p>
                    <p class="mt-2 text-primary">
                      A.
                      <span v-for="given in question.givens" :key="given.id">
                        {{ given.givenDetails.displayName }}
                      </span>
                    </p>
                  </div>
                </div>
              </b-col>
              <b-col lg="6">
                <div class="my-2">
                  <b-form-group label="신청상태">
                    <b-form-select
                      class="custom-select"
                      v-model="consultResponseUpdateDto.consultStatus"
                    >
                      <b-select-option
                        v-for="status in brandConsultStatus"
                        :key="status.key"
                        :value="status.value"
                        >{{ status.comment }}</b-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                  <p class="text-right mt-1" v-if="consultResponseDto.updated">
                    ({{ consultResponseDto.updated | dateTransformer }})
                  </p>
                </div>
                <div class="my-2">
                  <b-form-group
                    label="미팅 예약 코드"
                    v-if="consultResponseDto.reservationCode"
                  >
                    <b-form-input
                      v-model="consultResponseDto.reservationCode"
                      disabled
                    >
                    </b-form-input>
                  </b-form-group>
                  <template
                    v-if="
                      consultResponseDto.reservation &&
                        consultResponseDto.reservation.isCancelYn !== 'Y'
                    "
                  >
                    <b-form-group label="미팅 예약 날짜">
                      <b-form-input
                        :value="
                          ` ${consultResponseDto.reservation.reservationDate.substr(
                            0,
                            10,
                          )}  ${consultResponseDto.reservation.reservationTime}`
                        "
                        disabled
                      ></b-form-input>
                    </b-form-group>
                    <div class="mt-2 text-right">
                      <!-- <b-button variant="info" v-b-modal.update_reservation>
                      변경
                    </b-button> -->
                      <b-button variant="danger" v-b-modal.cancel_reservation>
                        취소
                      </b-button>
                    </div>
                  </template>
                </div>
                <div class="my-2">
                  <label for="productConsultEtc">비고 내용</label>
                  <b-form-textarea
                    id="productConsultEtc"
                    v-model="consultResponseUpdateDto.description"
                    placeholder="내용 입력해주세요"
                    rows="10"
                    max-rows="20"
                    style="height:400px"
                  ></b-form-textarea>
                </div>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="12" class="my-3">
        <BaseCard title="분석 결과 정보" v-if="consultResponseDto.proforma">
          <template v-slot:head>
            <!-- <b-button variant="primary" @click="updateConsultResponse()">
              수정하기
            </b-button> -->
          </template>
          <template v-slot:body>
            <b-row>
              <b-col
                cols="12"
                md="6"
                class="my-5"
                v-if="
                  consultResponseDto.proforma.graphData.newFnbOwnerPieChartData
                "
              >
                <div
                  class="title text-center mb-4"
                  v-if="
                    consultResponseDto.proforma &&
                      consultResponseDto.proforma.hdong
                  "
                >
                  <h4>
                    현재
                    <strong class="text-primary">
                      {{ consultResponseDto.proforma.hdong.hdongName }}</strong
                    >
                    에서
                    <strong class="text-primary">
                      {{
                        consultResponseDto.proforma.graphData
                          .newFnbOwnerPieChartData.labels[0]
                      }}</strong
                    >
                    매출이 가장 높습니다
                  </h4>
                </div>
                <div class="border bg-light p-4">
                  <FoodCategoryRatioChart
                    :chartData="
                      consultResponseDto.proforma.graphData
                        .newFnbOwnerPieChartData
                    "
                  />
                </div>
              </b-col>
              <b-col
                cols="12"
                md="6"
                class="my-5"
                v-if="
                  consultResponseDto.proforma.graphData.curFnbOwnerLineChartData
                "
              >
                <div class="title text-center mb-4">
                  <h4>
                    <strong
                      class="text-primary"
                      v-if="
                        consultResponseDto.proforma &&
                          consultResponseDto.proforma.hdong
                      "
                    >
                      {{ consultResponseDto.proforma.hdong.hdongName }}</strong
                    >
                    매출 현황
                  </h4>
                </div>

                <div class="border bg-light p-4">
                  <ResultRevenueChart
                    :chartData="
                      consultResponseDto.proforma.graphData
                        .curFnbOwnerLineChartData
                    "
                  />
                </div>
              </b-col>
              <b-col
                cols="12"
                md="6"
                class="my-5"
                v-if="
                  consultResponseDto.proforma.graphData.timeGraphChoseByCategory
                "
              >
                <div
                  class="title text-center mb-4"
                  v-if="
                    consultResponseDto.proforma.selectedKbMediumCategoryName
                  "
                >
                  <h4>
                    <strong class="text-primary">{{
                      consultResponseDto.proforma.selectedKbMediumCategoryName
                    }}</strong>
                    시간대별 매출 추이
                  </h4>
                </div>
                <div class="border bg-light p-4">
                  <TimeRevenueChart
                    :chartData="
                      consultResponseDto.proforma.graphData
                        .timeGraphChoseByCategory
                    "
                  />
                </div>
              </b-col>
              <b-col
                cols="12"
                md="6"
                class="my-5"
                v-if="
                  consultResponseDto.proforma.graphData
                    .genderGraphChosenByCategory
                "
              >
                <div class="title text-center mb-4">
                  <h4>
                    <strong class="text-primary">남/녀</strong>
                    시간대별 매출 추이
                  </h4>
                </div>
                <div class="border bg-light p-4">
                  <GenderRevenueChart
                    :chartData="
                      consultResponseDto.proforma.graphData
                        .genderGraphChosenByCategory
                    "
                  />
                </div>
              </b-col>
              <b-col
                cols="12"
                md="6"
                class="my-5"
                v-if="locationDetailInfo.length > 0"
              >
                <h4 class="title text-center mb-4">
                  메뉴별 매장/배달 소비 현황
                </h4>
                <div class="border bg-light p-4">
                  <div
                    class="complete-time-box"
                    v-for="(info, index) in locationDetailInfo"
                    :key="index"
                  >
                    <template
                      v-if="info.mediumCategoryName == selectedFoodCategory"
                    >
                      <div class="row no-gutters">
                        <div class="text-center col-6">
                          <div class="label-box">
                            매장 식사 비중
                          </div>
                          <div class="cont-box">
                            <div
                              class="percent-box offline-ratio"
                              :style="
                                `width: ${
                                  !info.deliveryRatio ? 100 : info.offlineRatio
                                }%`
                              "
                            ></div>
                            <div class="txt-box">
                              <span
                                >{{
                                  !info.deliveryRatio ? 100 : info.offlineRatio
                                }}%</span
                              >
                            </div>
                          </div>
                        </div>
                        <div class="text-center col-6">
                          <div class="label-box">
                            배달 주문 비중
                          </div>
                          <div class="cont-box">
                            <div
                              class="percent-box delivery-ratio"
                              :style="
                                `width: ${
                                  !info.deliveryRatio ? 0 : info.deliveryRatio
                                }%`
                              "
                            ></div>
                            <div class="txt-box">
                              <span
                                >{{
                                  !info.deliveryRatio ? 0 : info.deliveryRatio
                                }}%</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="best-food-category mt-4">
                  <div class="row gutter-sm">
                    <div
                      class="col-4 col-sm-3 mb-3"
                      v-for="info in locationDetailInfo"
                      :key="info.mediumCategoryName"
                    >
                      <b-btn
                        size="sm"
                        :variant="
                          info.mediumCategoryName === selectedFoodCategory
                            ? 'primary'
                            : 'light'
                        "
                        pill
                        block
                        @click="getCategory(info.mediumCategoryName)"
                      >
                        {{ info.mediumCategoryName }}
                      </b-btn>
                    </div>
                  </div>
                </div>
              </b-col>
              <b-col cols="12">
                <div class="bg-light border p-4 my-5">
                  <h4>메뉴 전략</h4>
                  <p class="mt-4">
                    현재 위치에서는 <br />
                    <span
                      v-for="resonse in consultResponseDto.proforma.graphData
                        .responses"
                      :key="resonse.operationTime"
                      class="d-block"
                    >
                      {{ resonse.koreanPrefSentence }}
                      <strong class="text-primary">{{
                        resonse.modifiedSufSentence.replace('커피/음료', '카페')
                      }}</strong>
                    </span>
                    메뉴로 도입하시면
                    <strong>낮은 위험으로 매출을 상승시킬 수 있습니다</strong>
                  </p>
                </div>
                <div class="bg-light border p-4 my-5">
                  <h4>운영전략</h4>
                  <p class="mt-4">
                    {{
                      consultResponseDto.proforma.graphData
                        .operationSentenceResponse
                    }}
                  </p>
                </div>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <!-- <b-modal
      v-if="consultResponseDto || consultResponseDto.nonUserName"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="
        consultResponseDto
          ? `${consultResponseDto.name} 사용자에게 문자하기`
          : `${consultResponseDto.nonUserName} (비회원) 사용자에게 문자하기`
      "
      @ok="sendMessage()"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          <template v-if="consultResponseDto">
            {{ consultResponseDto.phone | phoneTransformer }}
          </template>
          <template v-else-if="consultResponseDto.nonUserPhone">
            {{ consultResponseDto.nonUserPhone | phoneTransformer }}
          </template>
        </b>
      </p>
      <b-form-input
        id="title"
        placeholder="제목"
        class="mb-2"
        v-model="adminSendMessageDto.title"
      ></b-form-input>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
        v-model="adminSendMessageDto.message"
      ></b-form-textarea>
    </b-modal> -->
    <!-- 관리자 수정 모달 -->
    <b-modal
      id="admin_list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateConsultResponse()"
    >
      <table class="table table-sm tabl-bordered text-center">
        <thead>
          <tr>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="admin in adminList" :key="admin.no">
            <td>{{ admin.name }}</td>
            <td>{{ admin.phone | phoneTransformer }}</td>
            <td class="text-center">
              <button class="btn btn-primary" @click="selectAdmin(admin)">
                선택
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="selectedAdmin.name"
        class="py-2 px-4 rounded"
        style="background-color:#f1f1f1"
      >
        선택한 관리자 :
        <b>{{ selectedAdmin.name }}</b>
      </div>
      <b-pagination
        v-model="paginationAdmin.page"
        v-if="adminTotalCount"
        pills
        :total-rows="adminTotalCount"
        :per-page="paginationAdmin.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal>
    <!-- 사용자 정보 수정 -->
    <!-- <b-modal
      id="nanuda_user"
      title="사용자 정보 수정"
      @ok="updateConsultResponse()"
    >
      <b-form-row>
        <b-col cols="12" class="mb-3">
          <b-form-group label="사용자 성별">
            <b-form-radio
              v-model="productConsultUpdateDto.gender"
              v-for="gender in genderSelect"
              :key="gender.no"
              :value="gender.key"
              name="gender"
              >{{ gender.value }}</b-form-radio
            >
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal> -->
    <!-- 예약 변경 모달 -->
    <!-- <b-modal
      id="update_reservation"
      title="미팅 예약 변경"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <div class="mt-2 text-right">
          <b-button variant="primary" @click="updateReservation()"
            >예약변경</b-button
          >
        </div>
      </div>
    </b-modal> -->
    <!-- 예약 취소 모달 -->
    <b-modal
      id="cancel_reservation"
      title="미팅 예약 취소"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 취소하시겠습니까?</b>
        </p>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="cancelReservation()"
            >예약취소</b-button
          >
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import {
  AdminDto,
  AdminListDto,
  AdminSendMessageDto,
  ConsultResponseDto,
  ConsultResponseUpdateDto,
  ReservationCheckDto,
} from '@/dto';
import {
  BEST_FOOD_CATEGORY,
  BRAND_CONSULT,
  CONST_BEST_FOOD_CATEGORY,
} from '@/services/shared';
import { Component, Vue } from 'vue-property-decorator';
import { getStatusColor } from '@/core/utils/status-color.util';
import SmsService from '@//services/sms.service';
import toast from '../../../../../resources/assets/js/services/toast.js';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';
import { CONST_YN, Pagination, YN } from '@/common';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import ConsultResponseService from '@/services/pickcook/consult-response.service';
import CommonCodeService from '@/services/pickcook/common-code.service';
import ReservationService from '@/services/pickcook/reservation.service';
import FoodCategoryRatioChart from '@/modules/pickcook/consult-response/add-on/FoodCategoryRatioChart.vue';
import TimeRevenueChart from '@/modules/pickcook/consult-response/add-on/TimeRevenueChart.vue';
import GenderRevenueChart from '@/modules/pickcook/consult-response/add-on/GenderRevenueChart.vue';
import ResultRevenueChart from '@/modules/pickcook/consult-response/add-on/ResultRevenueChart.vue';

@Component({
  name: 'ConsultResponseDetail',
  components: {
    FoodCategoryRatioChart,
    TimeRevenueChart,
    GenderRevenueChart,
    ResultRevenueChart,
  },
})
export default class ConsultResponseDetail extends BaseComponent {
  private consultResponseDto = new ConsultResponseDto();
  private consultResponseUpdateDto = new ConsultResponseUpdateDto();
  private adminSendMessageDto = new AdminSendMessageDto();
  private brandConsultStatus: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();
  private locationDetailInfo: any = [];
  private selectedFoodCategory = '';
  private bestFoodCategory: BEST_FOOD_CATEGORY[] = [
    ...CONST_BEST_FOOD_CATEGORY,
  ];

  private reservationCheckDto = new ReservationCheckDto();

  private adminList: AdminDto[] = [];
  private adminSearchDto = new AdminListDto();
  private adminTotalCount = null;
  private paginationAdmin = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);

  // get status color
  getStatusColor(status: BRAND_CONSULT) {
    return getStatusColor(status);
  }

  // get common codes
  getCommonCodes() {
    this.codeManagementDto.category = 'BRAND_CONSULT';
    CommonCodeService.findAll(
      this.codeManagementDto,
      this.paginationCode,
    ).subscribe(res => {
      this.brandConsultStatus = res.data.items;
    });
  }

  // get location info detail
  getLocationInfoDetail() {
    if (this.consultResponseDto.proforma.hdong) {
      ConsultResponseService.getLocationInfoDetail(
        this.consultResponseDto.proforma.hdong.hdongCode,
      ).subscribe(res => {
        let filterArray = [...Object.values(res.data)];
        filterArray = filterArray.filter((arr: any) => {
          for (const filter of this.bestFoodCategory) {
            if (arr.mediumCategoryName.includes(filter)) {
              return true;
            }
          }
        });

        this.selectedFoodCategory = filterArray[0].mediumCategoryName;
        this.locationDetailInfo = filterArray.splice(0, 5);

        // console.log('this.locationDetailInfo', this.locationDetailInfo);
      });
    }
  }

  // get cateogry
  getCategory(category: string) {
    this.selectedFoodCategory = category;
  }

  findAdmin(isPagination: boolean) {
    if (!isPagination) {
      this.paginationAdmin.page = 1;
    }
    this.paginationAdmin.limit = 5;
    AdminService.findAll(this.adminSearchDto, this.paginationAdmin).subscribe(
      res => {
        this.adminList = res.data.items;
        this.adminTotalCount = res.data.totalCount;
      },
    );
  }

  selectAdmin(admin: AdminDto) {
    this.selectedAdmin = admin;
  }

  cancelSelection() {
    this.selectedAdmin = new AdminDto(BaseUser);
  }

  paginateSearch() {
    this.findAdmin(true);
  }

  // 담당자 본인으로 정하기
  assignYourselfAdmin() {
    ConsultResponseService.assignAdmin(this.consultResponseDto.id).subscribe(
      res => {
        this.findOne(this.consultResponseDto.id);
      },
    );
  }

  // 지도 가져오기
  // setMap(district: consultResponseDto) {
  //   const mapContainer = document.getElementById('map'),
  //     mapOption = {
  //       center: new window.kakao.maps.LatLng(district.lat, district.lon),
  //       level: 5,
  //       maxLevel: 6,
  //       minLevel: 3,
  //       mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
  //     };

  //   const map = new window.kakao.maps.Map(mapContainer, mapOption);
  //   const content = `<span class="badge badge-primary" style="font-size:21px;border-radius: 100px;opacity: 82%">${district.deliverySpaces.length}</span>`;
  //   const markerPosition = new window.kakao.maps.LatLng(
  //     district.lat,
  //     district.lon,
  //   );

  //   const customOverlay = new window.kakao.maps.CustomOverlay({
  //     position: markerPosition,
  //     content: content,
  //     // image: markerImage,
  //   });

  //   const circle = new window.kakao.maps.Circle({
  //     map: map,
  //     center: new window.kakao.maps.LatLng(district.lat, district.lon),
  //     strokeWeight: 2,
  //     strokeColor: '#FF00FF',
  //     strokeOpacity: 0.8,
  //     strokeStyle: 'dashed',
  //     fillColor: '#00EEEE',
  //     fillOpacity: 0.5,
  //   });
  //   circle.setRadius(1000);
  //   circle.setMap(map);
  //   customOverlay.setMap(map);
  // }

  findOne(id) {
    ConsultResponseService.findOne(id).subscribe(res => {
      if (res) {
        this.consultResponseDto = res.data;
        this.getLocationInfoDetail();
        this.consultResponseUpdateDto.consultStatus = this.consultResponseDto.consultStatus;
        this.consultResponseUpdateDto.description = this.consultResponseDto.description;
      }
    });
  }

  // update consult response
  updateConsultResponse() {
    if (this.selectedAdmin) {
      this.consultResponseUpdateDto.adminId = this.selectedAdmin.no;
    }
    ConsultResponseService.update(
      this.$route.params.id,
      this.consultResponseUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  // cancel reseration
  cancelReservation() {
    this.reservationCheckDto.phone = this.consultResponseDto.reservation.phone;
    this.reservationCheckDto.reservationCode = this.consultResponseDto.reservation.reservationCode;
    console.log(this.reservationCheckDto);
    ReservationService.deleteOne(
      this.consultResponseDto.reservation.id,
      this.reservationCheckDto,
    ).subscribe(res => {
      if (res) {
        toast.success('취소완료');
        this.$bvModal.hide('cancel_reservation');
        this.findOne(this.$route.params.id);
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
    this.getCommonCodes();
  }
}
</script>
<style lang="scss" scoped>
.complete-time-box {
  .row {
    > div {
      + div {
        border-left: 1px solid #004d8a;
      }
      .label-box {
        padding: 1em 0;
        font-size: 0.875em;
        color: #020202;
        text-align: center;
        border-bottom: 1px solid #004d8a;
        background-color: #f9f9f9;
      }
      .cont-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        height: 5.875em;
        line-height: 1.5;
        p {
          padding: 0.5em;
          font-size: 0.875em;
        }
      }
      .txt-box {
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        span {
          background: rgba(255, 255, 255, 0.95);
          padding: 0.25em 0.5em;
          border-radius: 10em;
          color: #000000;
          font-weight: 600;
        }
      }
      .percent-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 0;
        height: 100%;
        transition-duration: 1s;

        &.offline-ratio {
          background: rgb(167, 189, 211);
          background: linear-gradient(
            90deg,
            rgba(167, 189, 211, 1) 0%,
            rgba(28, 77, 134, 1) 35%
          );
          margin-left: auto;
        }
        &.delivery-ratio {
          background: rgb(221, 176, 40);
          background: linear-gradient(
            90deg,
            rgba(221, 176, 40, 1) 0%,
            rgba(232, 215, 145, 1) 35%
          );
          margin-right: auto;
        }
      }
    }
  }
}
</style>
