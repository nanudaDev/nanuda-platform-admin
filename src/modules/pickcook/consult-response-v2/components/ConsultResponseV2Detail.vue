<template>
  <section v-if="consultResponseV2Dto">
    <SectionTitle title="상담 신청" divider>
      <template v-slot:rightArea>
        <router-link
          to="/pickcook/consult-response-v2"
          class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row v-on:keyup.enter="updateConsultResponse()">
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div v-if="consultResponseV2Dto">
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
            <div v-if="consultResponseV2Dto">
              <ul class="u-list">
                <li v-if="consultResponseV2Dto && consultResponseV2Dto.name">
                  사용자명 : {{ consultResponseV2Dto.name }}
                </li>
                <li v-if="consultResponseV2Dto.phone">
                  휴대폰 번호 :
                  <span>{{
                    consultResponseV2Dto.phone | phoneTransformer
                  }}</span>
                </li>
                <li
                  v-if="
                    consultResponseV2Dto.proformaConsultResult &&
                      consultResponseV2Dto.proformaConsultResult.hdong
                  "
                >
                  운영/희망 주소:
                  {{
                    consultResponseV2Dto.proformaConsultResult.hdong.sidoName
                  }}
                  {{ consultResponseV2Dto.proformaConsultResult.hdong.guName }}
                  {{
                    consultResponseV2Dto.proformaConsultResult.hdong.hdongName
                  }}
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
              <b-button
                v-if="!consultResponseV2Dto.adminId"
                variant="info"
                @click="assignYourselfAdmin()"
                >본인으로 정하기</b-button
              >
              <b-button
                variant="primary"
                @click="findAdmin()"
                v-b-modal.admin_list
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="consultResponseV2Dto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    {{ consultResponseV2Dto.admin.no }}
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    {{ consultResponseV2Dto.admin.name }}
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  {{ consultResponseV2Dto.admin.phone | phoneTransformer }}
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
              <b-col lg="6" v-if="consultResponseV2Dto.proformaConsultResult">
                <div class="mt-2">
                  <div
                    class="card border p-3 mt-2"
                    v-if="
                      consultResponseV2Dto.proformaConsultResult.fnbOwnerStatus
                    "
                  >
                    <p>Q. 창업자 유형</p>
                    <p class="mt-2 text-primary">
                      A.
                      {{
                        consultResponseV2Dto.proformaConsultResult
                          .fnbOwnerStatus | enumTransformer
                      }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="consultResponseV2Dto.proformaConsultResult"
                  class="mt-2"
                >
                  <div
                    v-for="question in consultResponseV2Dto
                      .proformaConsultResult.questions"
                    :key="question.id"
                    class="card border p-3 mt-2"
                  >
                    <p>Q. {{ question.question }}</p>
                    <p class="mt-2 text-primary">
                      A.
                      <span v-for="given in question.givens" :key="given.id">
                        {{ given.given }}
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
                      <b-form-select-option
                        v-for="status in brandConsultStatus"
                        :key="status.key"
                        :value="status.value"
                        >{{ status.comment }}</b-form-select-option
                      >
                    </b-form-select>
                  </b-form-group>
                  <p
                    class="text-right mt-1"
                    v-if="consultResponseV2Dto.updated"
                  >
                    ({{ consultResponseV2Dto.updated | dateTransformer }})
                  </p>
                </div>
                <!-- <div class="my-2">
                  <b-form-group
                    label="
                      미팅 예약 코드
                    "
                    v-if="consultResponseV2Dto.reservationCode"
                  >
                    <b-form-input
                      v-model="consultResponseV2Dto.reservationCode"
                      disabled
                    >
                    </b-form-input>
                  </b-form-group>
                  <template v-if="consultResponseV2Dto.reservation">
                    <template
                      v-if="consultResponseV2Dto.reservation.isCancelYn !== 'Y'"
                    >
                      <b-form-row>
                        <b-col cols="6">
                          <b-form-group label="미팅 예약 날짜">
                            <b-form-datepicker
                              v-model="reservationUpdateDto.reservationDate"
                              @input="getReservationTimes($event)"
                            >
                            </b-form-datepicker>
                          </b-form-group>
                        </b-col>
                        <b-col cols="6">
                          <b-form-group label="미팅 예약 시간">
                            <b-form-select
                              v-model="reservationUpdateDto.reservationTime"
                            >
                              <b-form-select-option
                                :key="index"
                                :value="time.value"
                                v-for="(time, index) in reservationTimes"
                                :disabled="!time.available"
                              >
                                {{ time.value }}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                      </b-form-row>
                      <div class="mt-2 text-right">
                        <b-button variant="info" @click="updateReservation()">
                          예약 변경
                        </b-button>
                        <b-button variant="danger" v-b-modal.cancel_reservation>
                          예약 취소
                        </b-button>
                      </div>
                    </template>
                    <template v-else>
                      <p class="red-text">
                        <b-badge variant="danger">취소</b-badge>
                        <template
                          v-if="consultResponseV2Dto.reservation.deleteReasonEtc"
                        >
                          {{ consultResponseV2Dto.reservation.deleteReasonEtc }}
                        </template>
                        <template v-else>
                          {{ consultResponseV2Dto.reservation.deleteReason }}
                        </template>
                      </p>
                    </template>
                  </template>
                  <template v-else>
                    <b-form-row>
                      <b-col cols="6">
                        <b-form-group label="미팅 예약 날짜">
                          <b-form-datepicker
                            v-model="reservationCreateDto.reservationDate"
                            @input="getReservationTimes($event)"
                          >
                          </b-form-datepicker>
                        </b-form-group>
                      </b-col>
                      <b-col cols="6">
                        <b-form-group label="미팅 예약 시간">
                          <b-form-select
                            v-model="reservationCreateDto.reservationTime"
                          >
                            <b-form-select-option
                              :key="index"
                              :value="time.value"
                              v-for="(time, index) in reservationTimes"
                              :disabled="!time.available"
                            >
                              {{ time.value }}
                            </b-form-select-option>
                          </b-form-select>
                        </b-form-group>
                      </b-col>
                    </b-form-row>
                    <div class="mt-2 text-right">
                      <b-button variant="primary" @click="createReservation()">
                        예약 추가
                      </b-button>
                    </div>
                  </template>
                </div> -->
                <div class="my-4">
                  <label for="productConsultEtc">비고 내용</label>
                  <b-form-textarea
                    id="productConsultEtc"
                    v-model="consultResponseUpdateDto.description"
                    placeholder="내용 입력해주세요"
                    rows="10"
                    max-rows="20"
                    style="height:240px"
                  ></b-form-textarea>
                </div>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="12" class="my-3">
        <BaseCard title="분석 결과 정보" v-if="consultResponseV2Dto" no-body>
          <template v-slot:head>
            <!-- <b-button variant="primary" @click="updateConsultResponse()">
              수정하기
            </b-button> -->
          </template>
          <div
            class="bg-light p-3 px-4 border-top"
            v-if="consultResponseV2Dto.proformaConsultResult"
          >
            <div class="rank-item">
              <b-row class="gutter-sm">
                <b-col
                  cols="12"
                  lg="4"
                  v-for="(item, index) in consultResponseV2Dto
                    .proformaConsultResult.rankDataWCScore"
                  :key="index"
                >
                  <div class="my-2">
                    <div
                      class="card shadow flex-row d-lg-block"
                      v-b-toggle="toggleId(index)"
                    >
                      <div class="card-img-left" v-if="item.sSmallCategoryCode">
                        <b-img-lazy
                          :src="
                            `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${item.sSmallCategoryCode}.jpg`
                          "
                          alt=""
                        />
                      </div>
                      <div class="card-body">
                        <div class="card-badge">
                          <b-badge pill variant="primary" v-if="index === 0"
                            >최고적합률</b-badge
                          >
                          <b-badge pill variant="info" v-if="index === 1"
                            >적합률높음</b-badge
                          >
                          <b-badge pill variant="warning" v-if="index === 2"
                            >적합률보통</b-badge
                          >
                          <b-badge pill variant="secondary">{{
                            item.mediumCategoryName
                          }}</b-badge>
                          <b-badge pill variant="dark">{{
                            item.pickcookSmallCategoryInfo.pkSmallCategoryName
                          }}</b-badge>
                        </div>
                        <h4 class="card-title">
                          {{ item.pickcookSmallCategoryInfo.pkMenuName }}
                        </h4>
                        <p class="card-text">
                          <b-icon icon="graph-up"></b-icon>
                          <span class="mx-1"
                            >추천지수
                            <strong
                              >{{
                                Math.round(item.appliedFitnessScore)
                              }}%</strong
                            ></span
                          >
                        </p>
                        <span class="btn-toggle">
                          <span class="txt-tiny">더 보기</span>
                          <span class="icon-toggle-arrow">
                            <b-icon icon="chevron-down"></b-icon>
                          </span>
                        </span>
                      </div>
                    </div>
                    <b-collapse class="card-collapse" :id="`item0${index}`">
                      <div class="card-desc">
                        <p class="txt-tiny">
                          빅데이터 상권지수({{ item.bigDataLocationScore }}%)와
                          조리경험 ({{ item.cookingExperienceScore }}%),
                          운영경험({{ item.operationExperienceScore }}%),
                          창업자금({{ item.initialCostScore }}%)을 종합하였을때
                          <strong class="text-primary txt-bold">
                            <template v-if="index === 0">
                              가장
                            </template>
                            추천하는 아이템</strong
                          >
                          입니다.
                        </p>
                      </div>
                    </b-collapse>
                  </div>
                </b-col>
              </b-row>
            </div>
            <div class="mt-4">
              <b-row class="gutter-sm">
                <b-col cols="12" lg="6" class="my-3">
                  <section class="article-section section02 pt-0">
                    <div>
                      <header class="section-header">
                        <h6>
                          {{
                            consultResponseV2Dto.proformaConsultResult.hdong
                              .hdongName
                          }}의 고객들은 <br />
                          <template
                            v-if="
                              consultResponseV2Dto.proformaConsultResult
                                .deliveryRatioData.deliveryRatio > 30
                            "
                          >
                            <strong class="text-primary"
                              >배달로 더 많이 이용하고 있어요!</strong
                            >
                          </template>
                          <template
                            v-else-if="
                              consultResponseV2Dto.proformaConsultResult
                                .deliveryRatioData.deliveryRatio < 30
                            "
                          >
                            <strong class="text-primary"
                              >매장을 더 많이 이용하고 있어요!</strong
                            >
                          </template>
                          <template v-else>
                            <strong
                              >매장과 배달을 비슷하게 이용하고 있어요!</strong
                            >
                          </template>
                        </h6>
                      </header>
                      <div class="section-content mt-2">
                        <div class="card p-3 shadow">
                          <div>
                            <div
                              class="chart-container chart-horizontal-stacked"
                            >
                              <div class="chart-bars">
                                <div
                                  class="chart-bar chart-bar-restaurant"
                                  :style="{
                                    width:
                                      consultResponseV2Dto.proformaConsultResult
                                        .deliveryRatioData.restaurantRatio +
                                      '%',
                                  }"
                                >
                                  <span class="bar-label">매장</span>
                                  <div class="bar-stack">
                                    <span class="bar-percent"
                                      >{{
                                        consultResponseV2Dto
                                          .proformaConsultResult
                                          .deliveryRatioData.restaurantRatio
                                      }}%</span
                                    >
                                  </div>
                                </div>
                                <div
                                  class="chart-bar chart-bar-delivery"
                                  :style="{
                                    width:
                                      consultResponseV2Dto.proformaConsultResult
                                        .deliveryRatioData.deliveryRatio + '%',
                                  }"
                                >
                                  <span class="bar-label">배달</span>
                                  <div class="bar-stack">
                                    <span class="bar-percent"
                                      >{{
                                        consultResponseV2Dto
                                          .proformaConsultResult
                                          .deliveryRatioData.deliveryRatio
                                      }}%</span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="txt-box mt-3">
                              <p class="info-tip txt-tiny">
                                <span class="icon-tip">TIP</span>
                                <span>
                                  <template
                                    v-if="
                                      consultResponseV2Dto.proformaConsultResult
                                        .fnbOwnerStatus === 'NEW_FNB_OWNER'
                                    "
                                  >
                                    창업 아이템으로
                                    <strong class="text-primary">
                                      <template
                                        v-if="
                                          consultResponseV2Dto
                                            .proformaConsultResult
                                            .deliveryRatioData.deliveryRatio >
                                            30
                                        "
                                      >
                                        위험이 낮은 공유주방
                                      </template>
                                      <template
                                        v-else-if="
                                          consultResponseV2Dto
                                            .proformaConsultResult
                                            .deliveryRatioData.deliveryRatio <
                                            30
                                        "
                                      >
                                        매장이 있는 공유주방
                                      </template>
                                      <template v-else>
                                        유동인구가 많은 상가에서
                                      </template>
                                    </strong>
                                    창업을 추천드립니다.
                                  </template>
                                  <template v-else>
                                    창업 아이템을
                                    <strong class="text-primary">
                                      <template
                                        v-if="
                                          consultResponseV2Dto
                                            .proformaConsultResult
                                            .deliveryRatioData.deliveryRatio >
                                            30
                                        "
                                      >
                                        배달 판매하여
                                      </template>
                                      <template
                                        v-else-if="
                                          consultResponseV2Dto
                                            .proformaConsultResult
                                            .deliveryRatioData.deliveryRatio <
                                            30
                                        "
                                      >
                                        매장에 추가하여
                                      </template>
                                      <template v-else>
                                        배달 또는 메뉴 추가로
                                      </template>
                                    </strong>
                                    매출을 올릴 수 있습니다.
                                  </template>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </b-col>
                <b-col cols="12" lg="6" class="my-3">
                  <template
                    v-if="
                      consultResponseV2Dto.proformaConsultResult
                        .fnbOwnerStatus === 'NEW_FNB_OWNER'
                    "
                  >
                    <!-- 신규 창업자 -->
                    <section class="article-section section03 pt-0">
                      <div>
                        <header class="section-header">
                          <h6>
                            추천 아이템은
                            <br />
                            <strong class="text-primary"
                              >전 분기보다 매출이 올라가고 있어요!</strong
                            >
                          </h6>
                        </header>
                        <div class="section-content mt-2">
                          <div class="card p-5 shadow">
                            <div>
                              <div class="chart-container chart-vertical-arrow">
                                <div class="chart-bars">
                                  <div
                                    class="chart-bar "
                                    :class="{
                                      'bar-rank-max':
                                        maxRevenue ===
                                        Math.abs(
                                          item.estimatedIncreasedRevenuePercentage,
                                        ),
                                      'bar-rank-min':
                                        minRevenue ===
                                        Math.abs(
                                          item.estimatedIncreasedRevenuePercentage,
                                        ),
                                    }"
                                    v-for="(item, index) in consultResponseV2Dto
                                      .proformaConsultResult.rankDataWCScore"
                                    :key="index"
                                    :style="{
                                      height:
                                        (Math.abs(
                                          item.estimatedIncreasedRevenuePercentage,
                                        ) /
                                          maxRevenue) *
                                          100 +
                                        '%',
                                    }"
                                  >
                                    <div class="bar-stack">
                                      <span class="bar-percent"
                                        >+{{
                                          Math.abs(
                                            item.estimatedIncreasedRevenuePercentage,
                                          ).toFixed(0)
                                        }}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div class="chart-labels">
                                  <span
                                    class="chart-label"
                                    v-for="(item, index) in consultResponseV2Dto
                                      .proformaConsultResult.rankDataWCScore"
                                    :key="index"
                                  >
                                    {{
                                      item.pickcookSmallCategoryInfo.pkMenuName
                                    }}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </template>
                  <template v-else>
                    <!-- 기창업자 -->
                    <section class="article-section section03 pt-0">
                      <div>
                        <header class="section-header">
                          <h6>
                            추천 아이템으로 <br />
                            <strong class="text-primary"
                              >추가 매출을 올릴 수 있어요!</strong
                            >
                          </h6>
                        </header>
                        <div class="section-content mt-2">
                          <div class="card p-3 shadow">
                            <p>
                              월 예상 최소 매출액
                            </p>
                            <div class="odometer-container my-1">
                              <div class="odometer-box">
                                <span class="odometer-count text-primary">
                                  {{ maxRevenueValue }}
                                </span>
                                <span class="odometer-unit">원</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </template>
                </b-col>
              </b-row>
            </div>
          </div>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <!-- <b-modal
      v-if="consultResponseV2Dto || consultResponseV2Dto.nonUserName"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="
        consultResponseV2Dto
          ? `${consultResponseV2Dto.name} 사용자에게 문자하기`
          : `${consultResponseV2Dto.nonUserName} (비회원) 사용자에게 문자하기`
      "
      @ok="sendMessage()"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          <template v-if="consultResponseV2Dto">
            {{ consultResponseV2Dto.phone | phoneTransformer }}
          </template>
          <template v-else-if="consultResponseV2Dto.nonUserPhone">
            {{ consultResponseV2Dto.nonUserPhone | phoneTransformer }}
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
      <div class="text-center mb-2">
        <p>
          <b>정말로 취소하시겠습니까?</b>
        </p>
      </div>
      <div class="mt-3">
        <b-form-group
          v-for="(reason, index) in reservationDeleteReasons"
          :key="index"
        >
          <b-form-radio
            v-model="reservationDeleteReasonDto.deleteReason"
            :value="reason"
            name="delete_reason"
            @input="onSelectDeleteReason($event)"
          >
            {{ reason }}
          </b-form-radio>
        </b-form-group>
        <b-form-group>
          <b-form-input
            v-model="reservationDeleteReasonDto.deleteReasonEtc"
            :disabled="reservationDeleteReasonDto.deleteReason !== '기타'"
            @input="onSelectOtherReason($event)"
            class="mt-2"
          >
          </b-form-input>
        </b-form-group>
      </div>
      <div class="mt-2 text-right">
        <b-button
          variant="danger"
          @click="cancelReservation()"
          :disabled="!deleteReasonText.length"
          >예약취소</b-button
        >
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
  ConsultResponseV2Dto,
  ConsultResponseV2UpdateDto,
  ReservationCheckTimeDto,
  ReservationCreateDto,
  ReservationDeleteReasonDto,
  ReservationUpdateDto,
} from '@/dto';
import {
  BEST_FOOD_CATEGORY,
  BRAND_CONSULT,
  CONST_BEST_FOOD_CATEGORY,
  CONST_RESERVATION_DELETE_REASON,
  CONST_RESERVATION_HOURS,
  RESERVATION_DELETE_REASON,
  RESERVATION_HOURS,
  RESERVATION_HOURS_JSON,
} from '@/services/shared';
import { Component, Vue } from 'vue-property-decorator';
import { getStatusColor } from '@/core/utils/status-color.util';
import SmsService from '@//services/sms.service';
import toast from '../../../../../resources/assets/js/services/toast.js';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';
import { CONST_YN, Pagination, YN } from '@/common';
import { PickcookCodeManagementDto } from '@/services/init/dto';
import ConsultResponseV2Service from '@/services/pickcook/consult-response-v2.service';
import CommonCodeService from '@/services/pickcook/common-code.service';
import ReservationService from '@/services/pickcook/reservation.service';

@Component({
  name: 'ConsultResponseDetail',
})
export default class ConsultResponseDetail extends BaseComponent {
  private consultResponseV2Dto = new ConsultResponseV2Dto();
  private consultResponseUpdateDto = new ConsultResponseV2UpdateDto();
  private adminSendMessageDto = new AdminSendMessageDto();
  private brandConsultStatus: PickcookCodeManagementDto[] = [];
  private codeManagementDto = new PickcookCodeManagementDto();
  private paginationCode = new Pagination();
  private locationDetailInfo: any = [];
  private selectedFoodCategory = '';
  private bestFoodCategory: BEST_FOOD_CATEGORY[] = [
    ...CONST_BEST_FOOD_CATEGORY,
  ];

  private reservationCreateDto = new ReservationCreateDto();
  private reservationUpdateDto = new ReservationUpdateDto();
  private reservationDeleteReasonDto = new ReservationDeleteReasonDto();
  private reservationCheckTimeDto = new ReservationCheckTimeDto();
  private reservationTimes: any[] = [];
  private reservationDeleteReasons: RESERVATION_DELETE_REASON[] = [
    ...CONST_RESERVATION_DELETE_REASON,
  ];
  private selectDeleteReason = '';
  private otherDeleteReason = '';
  private deleteReasonText = '';

  private adminList: AdminDto[] = [];
  private adminSearchDto = new AdminListDto();
  private adminTotalCount = null;
  private paginationAdmin = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);

  private configOptions: any = {
    format: 'YYYY-MM-DD hh:mm A',
    icons: {
      time: 'far fa-clock',
      date: 'far fa-calendar',
      up: 'fas fa-arrow-up',
      down: 'fas fa-arrow-down',
      previous: 'fas fa-chevron-left',
      next: 'fas fa-chevron-right',
      today: 'fas fa-calendar-check',
      clear: 'far fa-trash-alt',
      close: 'far fa-times-circle',
    },
  };

  toggleId(index: number) {
    return 'item0' + index;
  }

  // get max revenue value
  get maxRevenueValue() {
    const arr = this.consultResponseV2Dto.proformaConsultResult.rankDataWCScore.map(
      e => {
        return Math.abs(e.estimatedHighestRevenue);
      },
    );
    return Math.max(...arr);
  }

  // get max revenue
  get maxRevenue() {
    const arr = this.consultResponseV2Dto.proformaConsultResult.rankDataWCScore.map(
      e => {
        return Math.abs(e.estimatedIncreasedRevenuePercentage);
      },
    );
    return Math.max(...arr);
  }

  // get min revenue
  get minRevenue() {
    const arr = this.consultResponseV2Dto.proformaConsultResult.rankDataWCScore.map(
      e => {
        return Math.abs(e.estimatedIncreasedRevenuePercentage);
      },
    );
    return Math.min(...arr);
  }

  // get reservation time
  getReservationTimes(date: string) {
    this.reservationCheckTimeDto.reservationDate = date;
    ReservationService.getAvailableTimes(
      this.reservationCheckTimeDto,
    ).subscribe(res => {
      if (res) {
        this.reservationTimes = res.data;
      }
    });
  }

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
    if (this.consultResponseV2Dto.proformaConsultResult.hdong) {
      ConsultResponseV2Service.getLocationInfoDetail(
        this.consultResponseV2Dto.proformaConsultResult.hdong.hdongCode,
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
    ConsultResponseV2Service.assignAdmin(
      this.consultResponseV2Dto.id,
    ).subscribe(res => {
      this.findOne(this.consultResponseV2Dto.id);
    });
  }

  // 지도 가져오기
  // setMap(district: consultResponseV2Dto) {
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
    ConsultResponseV2Service.findOne(id).subscribe(res => {
      if (res) {
        this.consultResponseV2Dto = res.data;
        // this.getLocationInfoDetail();
        this.consultResponseUpdateDto.consultStatus = this.consultResponseV2Dto.consultStatus;
        this.consultResponseUpdateDto.description = this.consultResponseV2Dto.description;
        // if (
        //   this.consultResponseV2Dto.reservation &&
        //   this.consultResponseV2Dto.reservation.isCancelYn !== 'Y'
        // ) {
        //   this.reservationUpdateDto.reservationDate = this.consultResponseV2Dto.reservation.formatReservationDate;
        //   this.reservationUpdateDto.reservationTime = this.consultResponseV2Dto.reservation.reservationTime;
        //   this.getReservationTimes(
        //     this.consultResponseV2Dto.reservation.reservationDate
        //       .toString()
        //       .slice(0, 10),
        //   );
        // }
      }
    });
  }

  // update consult response
  updateConsultResponse() {
    if (this.selectedAdmin) {
      this.consultResponseUpdateDto.adminId = this.selectedAdmin.no;
    }
    ConsultResponseV2Service.update(
      this.$route.params.id,
      this.consultResponseUpdateDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  // create reservation
  createReservation() {
    this.reservationCreateDto.consultId = this.consultResponseV2Dto.id;
    this.reservationCreateDto.reservationCode = this.consultResponseV2Dto.reservationCode;
    ReservationService.create(this.reservationCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  // update reservation
  // updateReservation() {
  //   ReservationService.update(
  //     this.consultResponseV2Dto.reservation.id,
  //     this.reservationUpdateDto,
  //   ).subscribe(res => {
  //     if (res) {
  //       toast.success('변경완료');
  //       this.findOne(this.$route.params.id);
  //     }
  //   });
  // }

  onSelectDeleteReason(value) {
    if (value !== RESERVATION_DELETE_REASON.ETC) {
      this.deleteReasonText = value;
      this.reservationDeleteReasonDto.deleteReasonEtc = '';
    } else {
      this.deleteReasonText = '';
    }
  }

  onSelectOtherReason(value) {
    this.deleteReasonText = value;
  }

  // cancel reservation
  // cancelReservation() {
  //   ReservationService.deleteOne(
  //     this.consultResponseV2Dto.reservation.id,
  //     this.reservationDeleteReasonDto,
  //   ).subscribe(res => {
  //     if (res) {
  //       toast.success('취소완료');
  //       this.$bvModal.hide('cancel_reservation');
  //       this.findOne(this.$route.params.id);
  //     }
  //   });
  // }

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

.rank-item {
  font-size: 12px;
  .card {
    position: relative;
    border-radius: 1.5em;
    padding: 1.25em 1.5em;
    z-index: 1;
    .card-img-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5.625em;
      height: 5.625em;
      background-color: #f5f5f5;
      border-radius: 1em;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .card-body {
      position: relative;
      width: calc(100% - 4.75em);
      padding: 0;
      margin-left: 1.25em;
      .card-badge {
        margin-bottom: 0.4em;
        font-size: 1.2em;
        line-height: 1;
        .badge {
          margin-bottom: 0.4em;
          + .badge {
            margin-left: 0.4em;
          }
        }
      }
      .card-title {
        font-size: 1.75em;
        font-weight: 600;
        line-height: 1;
        color: #707070;
        margin-bottom: 1em;
      }
      .card-text {
        font-size: 0.75em;
        font-weight: 400;
        line-height: 1;
        strong {
          font-weight: 600;
          font-family: 'YoonGothic', sans-serif;
        }
      }
      .btn-toggle {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        color: #b1b1b1;
        line-height: 1;
        font-size: 0.75em;
        .icon-toggle-arrow {
          margin-left: 0.25em;
        }
      }
    }
  }
  .card-collapse {
    position: relative;
    top: -1.25em;
    .card-desc {
      position: relative;
      background-color: #fff;
      border-bottom-left-radius: 1.5em;
      border-bottom-right-radius: 1.5em;
      overflow: hidden;
      padding: 2.5em 1.5em 1.25em;
      min-height: 7em;
    }
  }
  @media screen and (min-width: 992px) {
    .card {
      .card-img-left {
        width: auto;
        height: 10em;
      }
      .card-body {
        width: auto;
        margin: 1em 0 0;
      }
    }
  }
}

// chart
.chart-container {
  position: relative;

  &.chart-horizontal-stacked {
    .chart-bars {
      display: flex;
      // flex-wrap: wrap;
      width: 100%;
    }
    .chart-bar {
      position: relative;
      width: 50%;
      min-width: 10%;
      &.chart-bar-restaurant {
        .bar-label {
          text-align: left;
        }
        .bar-stack {
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          text-align: left;
          padding-right: 0.5em;
          &:before {
            left: 0;
            background-color: navy;
          }
        }
      }
      &.chart-bar-delivery {
        .bar-label {
          text-align: right;
        }
        .bar-stack {
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          text-align: right;
          padding-left: 0.5em;
          &:before {
            background-color: skyblue;
            right: 0;
          }
        }
      }
      .bar-label {
        display: block;
        font-weight: 600;
        color: #707070;
        margin-bottom: 0.5em;
        white-space: nowrap;
      }
      .bar-stack {
        position: relative;
        height: 3em;
        line-height: 3em;
        padding: 0em 1em;
        overflow: hidden;
        &:before {
          display: block;
          position: absolute;
          top: 0;
          content: '';
          width: 100%;
          height: 100%;
          transition: width 1s ease 0.5s;
        }
      }
      .bar-percent {
        position: relative;
        z-index: 2;
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        white-space: nowrap;
      }
    }
  }

  &.chart-vertical-arrow {
    margin: 0 auto;
    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px solid #dcdcdc;
      height: 7em;
    }
    .chart-bar {
      position: relative;
      width: 1em;
      margin: 0 auto;

      &.bar-rank-max {
        .bar-stack {
          background-color: navy;
          border-color: navy;
          .bar-percent {
            color: navy;
          }
        }
      }
      &.bar-rank-min {
        .bar-stack {
          background-color: skyblue;
          border-color: skyblue;
          .bar-percent {
            color: skyblue;
          }
        }
      }

      .bar-stack {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: 3em;
        width: 100%;
        height: calc(100% - 3em);
        background-color: blue;
        border-color: blue;
        transition: height 1s ease 0.5s;
        &:before {
          position: absolute;
          left: 50%;
          top: -2em;
          display: block;
          content: '';
          width: 0px;
          height: 0px;
          border-width: 1em;
          border-style: solid;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: inherit;
          margin-left: -1em;
        }
        .bar-percent {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 100%;
          margin-bottom: 1em;
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1;
          color: inherit;
          color: blue;
        }
      }
    }
    .chart-labels {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      margin-top: 0.5em;
      .chart-label {
        flex: 1;
        text-align: center;
        font-size: 1rem;
      }
    }
  }
}

// odometer
.odometer-container {
  text-align: center;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  .odometer-box {
    display: inline-flex;
    align-items: baseline;
    .odometer-count {
      font-size: 3rem;
      font-weight: 600;
      line-height: 1;
    }
    .odometer-unit {
      font-size: 1.8rem;
      color: #707070;
      margin-left: 0.5em;
    }
  }
}
</style>
