<template>
  <section>
    <SectionTitle title="배달형 상담 신청" divider>
      <template v-slot:rightArea>
        <router-link
          to="/delivery-founder-consult"
          class="btn btn-secondary text-center"
          >목록으로</router-link
        >
        <b-button
          variant="primary"
          @click="updateFounderConsult()"
          v-if="!statusDistComplete"
          >수정하기</b-button
        >
      </template>
    </SectionTitle>
    <div id="map" style="width:100%; height:420px"></div>
    <b-row align-h="start" align-v="stretch">
      <b-col md="4" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
              <!-- <b-button
                variant="primary"
                @click="updateNanudaUser()"
                v-b-modal.nanuda_user
                v-if="
                  deliveryFounderConsultDto.nanudaUser && !statusDistComplete
                "
                >수정하기</b-button
              > -->
            </div>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsultDto.nanudaUser">
              <ul>
                <li>
                  사용자 ID :
                  <b>{{ deliveryFounderConsultDto.nanudaUser.no }}</b>
                </li>
                <li>
                  사용자명 :
                  <b>{{ deliveryFounderConsultDto.nanudaUser.name }}</b>
                </li>
                <li>
                  휴대폰 번호 :
                  <span>
                    <b>
                      {{
                        deliveryFounderConsultDto.nanudaUser.phone
                          | phoneTransformer
                      }}
                    </b>
                  </span>
                </li>
                <li v-if="deliveryFounderConsultDto.nanudaUser">
                  <label for="">성별</label>
                  <b-form-radio
                    v-model="deliveryFounderConsultDto.nanudaUser.gender"
                    v-for="gender in genderSelect"
                    :key="gender.no"
                    :value="gender.key"
                    name="gender"
                    :disabled="statusDistComplete"
                    >{{ gender.value }}</b-form-radio
                  >
                </li>
                <li
                  v-if="deliveryFounderConsultDto.nanudaUser.remainVisitCount"
                >
                  남은 공간 신청 횟수 :
                  <b>
                    {{ deliveryFounderConsultDto.nanudaUser.remainVisitCount }}
                  </b>
                </li>
                <li v-if="deliveryFounderConsultDto.nanudaUser.lastLoginAt">
                  마지막 로그인 날짜:
                  <b>
                    {{
                      deliveryFounderConsultDto.nanudaUser.lastLoginAt
                        | dateTransformer
                    }}
                  </b>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">사용자 없음</div>
            <!-- <b-alert
              show
              variant="danger"
              v-if="!deliveryFounderConsultDto.nanudaUser.genderInfo"
              class="mt-3"
              >성별 미입력 상태</b-alert
            > -->
          </template>
        </BaseCard>
      </b-col>
      <b-col md="4" class="my-3">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                v-if="!deliveryFounderConsultDto.spaceConsultManager"
                variant="outline-info"
                @click="assignYourselfAdmin()"
                >본인으로 정하기</b-button
              >
              <b-button
                variant="outline-primary"
                @click="findAdmin()"
                v-b-modal.admin_list
                >담당자 변경</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsultDto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    <b>{{ deliveryFounderConsultDto.admin.no }}</b>
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    <b>{{ deliveryFounderConsultDto.admin.name }}</b>
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  <b>{{
                    deliveryFounderConsultDto.admin.phone | phoneTransformer
                  }}</b>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="4" class="my-3">
        <BaseCard title="업체 정보">
          <template v-slot:body>
            <div v-if="deliveryFounderConsultDto.deliverySpace">
              <ul>
                <li>
                  업체명 :
                  <router-link
                    :to="{
                      name: 'CompanyDetail',
                      params: {
                        id:
                          deliveryFounderConsultDto.deliverySpace
                            .companyDistrict.company.no,
                      },
                    }"
                  >
                    <b>
                      {{
                        deliveryFounderConsultDto.deliverySpace.companyDistrict
                          .company.nameKr
                      }}
                    </b>
                  </router-link>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.companyDistrict
                      .company.phone
                  "
                >
                  전화번호 :
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.companyDistrict
                        .company.phone
                    }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.companyDistrict
                      .company.email
                  "
                >
                  이메일 :
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.companyDistrict
                        .company.email
                    }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.companyDistrict
                      .nameKr
                  "
                >
                  지점명 :
                  <router-link
                    :to="{
                      name: 'CompanyDistrictDetail',
                      params: {
                        id:
                          deliveryFounderConsultDto.deliverySpace
                            .companyDistrict.no,
                      },
                    }"
                  >
                    <b>
                      {{
                        deliveryFounderConsultDto.deliverySpace.companyDistrict
                          .nameKr
                      }}
                    </b>
                  </router-link>
                </li>
                <li>
                  지점 주소 :
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.companyDistrict
                        .address
                    }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.companyDistrict
                      .hCode
                  "
                >
                  행정동 코드:
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.companyDistrict
                        .hCode
                    }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.companyDistrict
                      .bCode
                  "
                >
                  법정동 코드:
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.companyDistrict
                        .bCode
                    }}
                  </b>
                </li>
                <li>
                  승인 상태 :
                  <b-badge
                    :variant="
                      getStatusColor(
                        deliveryFounderConsultDto.deliverySpace.companyDistrict
                          .companyDistrictStatus,
                      )
                    "
                    class="badge-pill p-2 mr-2"
                  >
                    {{
                      deliveryFounderConsultDto.deliverySpace.companyDistrict
                        .companyDistrictStatus | enumTransformer
                    }}
                  </b-badge>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">업체 정보 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="4" class="my-3">
        <BaseCard title="타입 정보">
          <template v-slot:head>
            <div>
              <b-button
                variant="success"
                @click="sendVicinityInfo()"
                :disabled="!isSeoul"
              >
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">상권 문자</span></b-button
              >
              <router-link
                v-if="deliveryFounderConsultDto.deliverySpace"
                variant="outline-info"
                :to="{
                  name: 'DeliverySpaceDetail',
                  params: {
                    id: deliveryFounderConsultDto.deliverySpace.no,
                  },
                }"
                class="btn btn-outline-info"
                >상세보기</router-link
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="deliveryFounderConsultDto.deliverySpace">
              <ul>
                <li v-if="deliveryFounderConsultDto.deliverySpace.no">
                  타입 ID :
                  <b>{{ deliveryFounderConsultDto.deliverySpace.no }}</b>
                </li>
                <li v-if="deliveryFounderConsultDto.deliverySpace.typeName">
                  타입명 :
                  <b>{{ deliveryFounderConsultDto.deliverySpace.typeName }}</b>
                </li>

                <li v-if="deliveryFounderConsultDto.deliverySpace.deposit">
                  보증금 :
                  <b
                    >{{
                      deliveryFounderConsultDto.deliverySpace.deposit
                    }}
                    만원</b
                  >
                </li>
                <li
                  v-if="deliveryFounderConsultDto.deliverySpace.monthlyRentFee"
                >
                  월 임대료 :
                  <b>
                    {{ deliveryFounderConsultDto.deliverySpace.monthlyRentFee }}
                    만원
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.monthlyUtilityFee
                  "
                >
                  월 관리비 :
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.monthlyUtilityFee
                    }}
                    만원
                  </b>
                </li>
                <li v-if="deliveryFounderConsultDto.deliverySpace.size">
                  평수 :
                  <b>
                    {{ deliveryFounderConsultDto.deliverySpace.size }}
                    평
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace &&
                      deliveryFounderConsultDto.deliverySpace.contracts
                  "
                >
                  공실 수:
                  <b>
                    {{
                      deliveryFounderConsultDto.deliverySpace.quantity -
                        deliveryFounderConsultDto.deliverySpace.contracts
                          .length
                    }}/{{ deliveryFounderConsultDto.deliverySpace.quantity }}
                  </b>
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace.amenities.length > 0
                  "
                >
                  주방시설 :
                  <b-badge
                    variant="info"
                    v-for="amenity in deliveryFounderConsultDto.deliverySpace
                      .amenities"
                    :key="amenity.no"
                    class="m-1"
                    >{{ amenity.amenityName }}</b-badge
                  >
                </li>
                <li
                  v-if="
                    deliveryFounderConsultDto.deliverySpace &&
                      deliveryFounderConsultDto.deliverySpace
                        .deliverySpaceOptions.length > 0
                  "
                >
                  공간옵션 :
                  <b-badge
                    variant="info"
                    v-for="option in deliveryFounderConsultDto.deliverySpace
                      .deliverySpaceOptions"
                    :key="option.no"
                    class="m-1"
                    >{{ option.deliverySpaceOptionName }}</b-badge
                  >
                </li>
                <li v-if="deliveryFounderConsultDto.deliverySpace.desc">
                  공간설명 :
                  <b>
                    {{ deliveryFounderConsultDto.deliverySpace.desc }}
                    평
                  </b>
                </li>
              </ul>
              <b-carousel
                v-if="
                  deliveryFounderConsultDto.deliverySpace.images &&
                    deliveryFounderConsultDto.deliverySpace.images.length > 0
                "
                :interval="3000"
                controls
                indicators
                background="white"
                img-width="500"
                img-height="480"
                class="mt-4"
              >
                <b-carousel-slide
                  v-for="image in deliveryFounderConsultDto.deliverySpace
                    .images"
                  :key="image.key"
                  :img-src="image.endpoint"
                ></b-carousel-slide>
              </b-carousel>
              <div class="text-right mt-4">
                <a
                  :href="
                    `${homepageSiteUrl}/delivery-kitchen/${deliveryFounderConsultDto.deliverySpace.no}`
                  "
                  target="_blank"
                  class="btn btn-outline-info"
                  >홈페이지 화면 보기</a
                >
              </div>
            </div>
            <div v-else class="empty-data">공간 정보 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="8" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div v-if="deliveryFounderConsultDto.createdAt">
              <b-button
                variant="danger"
                @click="updateConsultInfo()"
                v-b-modal.reverse-read
                v-if="deliveryFounderConsultDto.viewCount === 'Y'"
                >미열람 처리</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div
              v-if="
                deliveryFounderConsultDto &&
                  deliveryFounderConsultDto.codeManagement
              "
            >
              <b-row>
                <div class="col-12 col-md-6">
                  <ul>
                    <li>
                      상담 신청일 :
                      <b>{{
                        deliveryFounderConsultDto.createdAt | dateTransformer
                      }}</b>
                    </li>
                    <li>
                      통화 가능 시간 :
                      <b>{{ deliveryFounderConsultDto.availableTime.value }}</b>
                    </li>
                    <li>
                      공간 소유 유무 :
                      <b-badge
                        :variant="
                          deliveryFounderConsultDto.spaceOwnYn === 'Y'
                            ? 'success'
                            : 'danger'
                        "
                        >{{ deliveryFounderConsultDto.spaceOwnYn }}</b-badge
                      >
                    </li>
                    <li v-if="deliveryFounderConsultDto.changUpExpYn">
                      창업 경험 유무 :
                      <b-badge
                        :variant="
                          deliveryFounderConsultDto.changUpExpYn === 'Y'
                            ? 'success'
                            : 'danger'
                        "
                      >
                        {{
                          deliveryFounderConsultDto.changUpExpYn
                            | enumTransformer
                        }}
                      </b-badge>
                    </li>
                    <li>
                      <label for="hope_food_category">희망 업종</label>
                      <template>
                        <b-form-input
                          list="food-category-list"
                          id="hope_food_category"
                          v-model="deliveryFounderConsultDto.hopeFoodCategory"
                          :disabled="statusDistComplete"
                        ></b-form-input>
                        <datalist id="food-category-list">
                          <option
                            v-for="category in foodCategorySelect"
                            :key="category.code"
                            :value="category.nameKr"
                            >{{ category.nameKr }}</option
                          >
                        </datalist>
                      </template>
                    </li>
                    <li>
                      <label>신청 상태</label>
                      <b-form-select
                        class="custom-select"
                        v-model="deliveryFounderConsultDto.status"
                        :disabled="statusDistComplete"
                      >
                        <b-select-option value selected>전체</b-select-option>
                        <b-select-option
                          v-for="status in deliveryFounderConsultStatusSelect"
                          :key="status.no"
                          :value="status.key"
                          >{{ status.value }}</b-select-option
                        >
                      </b-form-select>
                      <p
                        class="text-right mt-1"
                        v-if="deliveryFounderConsultDto.updatedAt"
                      >
                        ({{
                          deliveryFounderConsultDto.updatedAt | dateTransformer
                        }})
                      </p>
                      <b-alert
                        variant="danger"
                        show
                        v-if="
                          deliveryFounderConsultDto.status === 'F_DIST_COMPLETE'
                        "
                        class="my-4"
                      >
                        상태값을 전달완료로 변경할 경우 더이상 수정이
                        불가능합니다
                      </b-alert>
                    </li>
                    <li>
                      <label for="space_consult_etc">비고 내용</label>
                      <b-form-textarea
                        id="space_consult_etc"
                        style="height:100px;"
                        v-model="deliveryFounderConsultDto.spaceConsultEtc"
                        :disabled="statusDistComplete"
                      ></b-form-textarea>
                    </li>
                  </ul>
                </div>
                <div class="col-12 col-md-6">
                  <ul>
                    <li v-if="elapsedTime">
                      전달 완료일 :
                      <b
                        >{{
                          deliveryFounderConsultDto.deliveredAt
                            | dateTransformer
                        }}
                        ({{ elapsedTime }} 경과)</b
                      >
                    </li>
                    <li>
                      열람 상태 :
                      <b-badge
                        :variant="
                          deliveryFounderConsultDto.viewCount === 'Y'
                            ? 'success'
                            : 'danger'
                        "
                        >{{
                          deliveryFounderConsultDto.viewCount | enumTransformer
                        }}</b-badge
                      >
                    </li>
                    <li v-if="deliveryFounderConsultDto.openedAt">
                      열람 시간 :
                      <b>{{
                        deliveryFounderConsultDto.openedAt | dateTransformer
                      }}</b>
                    </li>
                    <li v-if="deliveryFounderConsultDto.companyUser">
                      열람 사용자 :
                      <b>{{ deliveryFounderConsultDto.companyUser.name }}</b>
                    </li>
                    <li
                      v-if="deliveryFounderConsultDto.companyDecisionStatusCode"
                    >
                      업체 지정 상태 :
                      <b-badge
                        :variant="
                          getStatusColor(
                            deliveryFounderConsultDto.companyDecisionStatus,
                          )
                        "
                        class="badge-pill p-2 mr-2"
                      >
                        {{
                          deliveryFounderConsultDto.companyDecisionStatusCode
                            .value
                        }}
                      </b-badge>
                    </li>
                    <!-- <li
                    v-if="
                      deliveryFounderConsultManagements &&
                        deliveryFounderConsultManagements.memo
                    "
                  >
                    업체 메모
                    <div class="mt-2">
                      <div class="bg-light border rounded p-3">
                        <b-row no-gutters align-h="between" align-v="end">
                          <div
                            v-if="deliveryFounderConsultManagements.companyUser"
                          >
                            <span>
                              <strong class="user-name">
                                {{
                                  deliveryFounderConsultManagements.companyUser
                                    .name
                                }}
                              </strong>
                            </span>
                          </div>
                          <div>
                            <span>
                              {{
                                deliveryFounderConsultManagements.createdAt
                                  | dateTransformer
                              }}
                            </span>
                          </div>
                        </b-row>
                        <div
                          class="mt-2 pt-1 border-top"
                          v-if="deliveryFounderConsultManagements.memo"
                        >
                          {{ deliveryFounderConsultManagements.memo }}
                        </div>
                      </div>
                    </div>
                    <div class="mt-2 text-right">
                      <b-button
                        variant="outline-info"
                        size="sm"
                        v-b-modal.managemnt_history
                        >메모 이력 보기</b-button
                      >
                    </div>
                  </li> -->
                  </ul>
                </div>
                <div></div>
              </b-row>
            </div>
            <div v-else class="empty-data">상담 내역 없음</div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- for the text message -->
    <b-modal id="managemnt_history" title="업체 메모 이력" hide-footer>
      <div>
        <FounderConsultManagementHistory />
      </div>
    </b-modal>
    <div class="text-right pb-4">
      <router-link
        to="/delivery-founder-consult"
        class="btn btn-secondary text-center"
        >목록으로</router-link
      >
      <b-button
        variant="primary"
        @click="updateFounderConsult()"
        v-if="!statusDistComplete"
        >수정하기</b-button
      >
    </div>
    <!-- 사용자 정보 수정 모달 
    <b-modal
      id="nanuda_user"
      title="사용자정보 수정"
      @ok="updateFounderConsult()"
      v-if="deliveryFounderConsultDto.nanudaUser"
    >
      <div class="form-row">
        <div class="mb-3">
          <b-form-group label="사용자 성별">
            <b-form-radio
              v-model="deliveryFounderConsultUpdateDto.gender"
              v-for="gender in genderSelect"
              :key="gender.no"
              :value="gender.key"
              name="gender"
              >{{ gender.value }}</b-form-radio
            >
          </b-form-group>
        </div>
      </div>
    </b-modal>
    -->
    <!-- 상담 내용 수정 모달 
    <b-modal
      id="consult_info"
      title="상담 내용 수정"
      @ok="updateFounderConsult()"
    >
      <div class="form-row">
        <div class="col-12 mb-3">
          <label>신청 상태</label>
          <b-form-select
            class="custom-select"
            v-model="deliveryFounderConsultUpdateDto.status"
          >
            <b-select-option value selected>전체</b-select-option>
            <b-select-option
              v-for="status in deliveryFounderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</b-select-option
            >
          </b-form-select>
        </div>
        <div class="col-12 mb-3">
          <label for="changup_exp_yn">창업 경험 유무</label>
          <b-form-radio
            v-model="deliveryFounderConsultUpdateDto.changUpExpYn"
            v-for="yn in delYn"
            :key="yn"
            :value="yn"
            name="changup_exp_yn"
            :id="`changup_exp_yn_${yn}`"
            >{{ yn | enumTransformer }}</b-form-radio
          >
        </div>
        <div class="col-12 mb-3">
          <label for="hope_food_category">희망 업종</label>
          <template>
            <b-form-input
              list="food-category-list"
              id="hope_food_category"
              v-model="deliveryFounderConsultUpdateDto.hopeFoodCategory"
            ></b-form-input>
            <datalist id="food-category-list">
              <option
                v-for="category in foodCategorySelect"
                :key="category.code"
                :value="category.nameKr"
                >{{ category.nameKr }}</option
              >
            </datalist>
          </template>
        </div>
        <div class="col-12 mb-3">
          <label for="space_consult_etc">비고 내용</label>
          <b-form-textarea
            id="space_consult_etc"
            style="height:100px;"
            v-model="deliveryFounderConsultUpdateDto.spaceConsultEtc"
          ></b-form-textarea>
        </div>
      </div>
    </b-modal>
    -->
    <!-- 문자 전송 모달 -->
    <b-modal
      v-if="deliveryFounderConsultDto.nanudaUser"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      :title="
        `${deliveryFounderConsultDto.nanudaUser.name} 사용자에게 문자하기`
      "
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">{{
          deliveryFounderConsultDto.nanudaUser.phone | phoneTransformer
        }}</b>
      </p>
      <b-form-input
        placeholder="제목을 입력해주세요"
        id="title"
        v-model="adminSendMessageDto.title"
        class="mb-2"
      ></b-form-input>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
        v-model="adminSendMessageDto.message"
      ></b-form-textarea>
    </b-modal>

    <!-- 열람 상태 미열람 모달 -->
    <b-modal
      id="reverse-read"
      title="상담 미열람 처리"
      header-bg-variant="danger"
      header-text-variant="light"
      ok-title="미열람 처리하기"
      cancel-title="취소"
      ok-variant="danger"
      @ok="reverseReadStatus()"
    >
      <b-container>
        <p class="text-center">
          <b>미열람 처리하시겠습니까?</b>
        </p>
      </b-container>
    </b-modal>
    <!-- 관리자 수정 모달 -->
    <b-modal
      id="admin_list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateFounderConsult()"
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
        v-model="pagination.page"
        v-if="adminListCount"
        pills
        :total-rows="adminListCount"
        :per-page="pagination.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CodeManagementDto } from '../../../services/init/dto';
import {
  GENDER,
  CONST_GENDER,
  APPROVAL_STATUS,
  B2B_FOUNDER_CONSULT,
} from '../../../services/shared';
import CodeManagementService from '../../../services/code-management.service';
import FounderConsultService from '../../../services/founder-consult.service';
import DeliveryFounderConsultService from '../../../services/delivery-founder-consult.service';
import AdminService from '../../../services/admin.service';
import FoodCategoryService from '../../../services/food-category.service';
import FounderConsultManagementService from '../../../services/founder-consult-management.service';
import {
  AdminDto,
  AdminListDto,
  DeliveryFounderConsultDto,
  DeliveryFounderConsultUpdateDto,
  FounderConsultManagementDto,
  AdminSendMessageDto,
  CompanyDistrictDto,
} from '../../../dto';
import {
  FoodCategoryDto,
  FoodCategoryListDto,
} from '../../../dto/food-category';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import FounderConsultManagementHistory from './FounderConsultManagementHistory.vue';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
} from '../../../services/shared';
import SmsService from '../../../services/sms.service';
import { getStatusColor } from '../../../core/utils/status-color.util';
import {
  ProductionEnvironment,
  DevelopmentEnvironment,
  EnvironmentType,
  Environment,
} from '../../../../environments';

let env = new Environment();
if (process.env.NODE_ENV === EnvironmentType.development) {
  env = DevelopmentEnvironment;
}
if (process.env.NODE_ENV === EnvironmentType.production) {
  env = ProductionEnvironment;
}

@Component({
  name: 'DeliveryFounderConsultDetail',
  components: {
    BaseCard,
    FounderConsultManagementHistory,
  },
})
export default class FounderConsultDetail extends BaseComponent {
  /* global kakao */

  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private adminListCount = 0;
  private availableTimesSelect: CodeManagementDto[] = [];
  private delYn: YN[] = [...CONST_YN];
  private deliveryFounderConsultDto = new DeliveryFounderConsultDto();
  private deliveryFounderConsultUpdateDto = new DeliveryFounderConsultUpdateDto();
  private deliveryFounderConsultStatusSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];
  private foodCategorySelect: FoodCategoryDto[] = [];
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private deliveryFounderConsultManagements: FounderConsultManagementDto[] = [];
  private elapsedTime = null;
  private deliveredTime = new Date();
  private createdTime = new Date();
  private statusDistComplete = false;
  private adminSendMessageDto = new AdminSendMessageDto();
  private homepageSiteUrl = env.homepageSiteUrl;
  private dataLoading = false;
  private isSeoul = false;

  // get status color
  getStatusColor(
    status: APPROVAL_STATUS | B2B_FOUNDER_CONSULT | FOUNDER_CONSULT,
  ) {
    return getStatusColor(status);
  }

  // 사용자 정보 수정
  // updateNanudaUser() {
  //   if (this.deliveryFounderConsultDto.nanudaUser.gender) {
  //     this.deliveryFounderConsultUpdateDto.gender = this.deliveryFounderConsultDto.nanudaUser.gender;
  //   }
  //   this.getGender();
  // }

  // 상담 내용 수정
  // updateConsultInfo() {
  //   this.deliveryFounderConsultUpdateDto = this.deliveryFounderConsult;
  //   this.getFounderConsultCodes();
  //   this.getAvailableTimes();
  //   this.getFoodCategories();
  //   this.getGender();
  // }

  reverseReadStatus() {
    DeliveryFounderConsultService.reverseReadStatus(
      this.$route.params.id,
    ).subscribe(res => {
      this.findOne(this.$route.params.id);
    });
  }

  // send message to user
  sendMessage() {
    this.adminSendMessageDto.phone = this.deliveryFounderConsultDto.nanudaUser.phone;
    SmsService.sendMessage(this.adminSendMessageDto).subscribe(res => {
      if (res) {
        this.adminSendMessageDto = new AdminSendMessageDto();
        toast.success('문자가 발송 되었습니다.');
      } else {
        return;
      }
    });
  }

  sendVicinityInfo() {
    this.dataLoading = true;
    DeliveryFounderConsultService.sendVicinityMessage(
      this.$route.params.id,
    ).subscribe(res => {
      this.dataLoading = false;
      toast.success('문자가 발송 되었습니다.');
    });
  }

  // 담당자 본인으로 정하기
  assignYourselfAdmin() {
    DeliveryFounderConsultService.assignAdmin(
      this.deliveryFounderConsultDto.no,
    ).subscribe(res => {
      this.findOne(this.deliveryFounderConsultDto.no);
    });
  }

  // 성별
  getGender() {
    CodeManagementService.findGender().subscribe(res => {
      this.genderSelect = res.data;
    });
  }

  // 희망 상담 시간
  getAvailableTimes() {
    CodeManagementService.findAvailableTimes().subscribe(res => {
      this.availableTimesSelect = res.data;
    });
  }

  // 신청 상태 코드
  getFounderConsultCodes() {
    CodeManagementService.findCodesFounderConsult().subscribe(res => {
      this.deliveryFounderConsultStatusSelect = res.data;
    });
  }

  findOne(id) {
    // find founder consult detail
    DeliveryFounderConsultService.findOne(id).subscribe(res => {
      this.deliveryFounderConsultDto = res.data;
      this.setMap(res.data);
      this.deliveredTime = res.data.deliveredAt;
      if (this.deliveredTime) {
        this.createdTime = new Date(res.data.createdAt);
        this.deliveredTime = new Date(res.data.deliveredAt);
        this.getElapsedTime(this.createdTime, this.deliveredTime);
      }
      if (this.deliveryFounderConsultDto.status === 'F_DIST_COMPLETE') {
        this.statusDistComplete = true;
      }
      const withInSeoul = this.deliveryFounderConsultDto.deliverySpace.companyDistrict.hCode.slice(
        0,
        2,
      );
      if (withInSeoul === '11') {
        this.isSeoul = true;
      }
    });
  }

  // 경과 시간
  getElapsedTime(startTime, endTime) {
    const timeDiff = Math.abs(
      (this.deliveredTime as any) - (this.createdTime as any),
    );
    const inMinutes = 60 * 1000;
    const inHours = 36e5;

    if (timeDiff > inHours) {
      this.elapsedTime = Math.ceil(timeDiff / inHours) + '시간';
    } else {
      this.elapsedTime = Math.ceil((timeDiff % inHours) / inMinutes) + '분';
    }
  }

  paginateSearch() {
    this.findAdmin(true);
  }

  selectAdmin(admin: AdminDto) {
    this.selectedAdmin = admin;
  }

  cancelSelection() {
    this.selectedAdmin = new AdminDto(BaseUser);
  }

  findAdmin(isPagination: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.pagination.limit = 5;
    AdminService.findAll(this.adminListDto, this.pagination).subscribe(res => {
      this.adminList = res.data.items;
      this.adminListCount = res.data.totalCount;
    });
  }

  // 음식 업종
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  // update for delivery founder consulut
  updateFounderConsult() {
    if (this.selectedAdmin) {
      this.deliveryFounderConsultDto.spaceConsultManager = this.selectedAdmin.no;
    }

    if (this.deliveryFounderConsultDto.nanudaUser.gender) {
      this.deliveryFounderConsultDto.gender = this.deliveryFounderConsultDto.nanudaUser.gender;
    }

    DeliveryFounderConsultService.update(
      this.deliveryFounderConsultDto.no,
      this.deliveryFounderConsultDto,
    ).subscribe(res => {
      this.cancelSelection();
      // this.deliveryFounderConsultDto = new DeliveryFounderConsultUpdateDto();
      this.findOne(this.$route.params.id);
      toast.success('수정완료');
    });
  }

  // 지도 가져오기
  setMap(deliveryFounderConsult: DeliveryFounderConsultDto) {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new window.kakao.maps.LatLng(
          deliveryFounderConsult.deliverySpace.companyDistrict.lat,
          deliveryFounderConsult.deliverySpace.companyDistrict.lon,
        ),
        level: 5,
        maxLevel: 6,
        minLevel: 3,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const content = `<span class="badge badge-primary" style="font-size:21px;border-radius: 100px;opacity: 82%">Here</span>`;
    const markerPosition = new window.kakao.maps.LatLng(
      deliveryFounderConsult.deliverySpace.companyDistrict.lat,
      deliveryFounderConsult.deliverySpace.companyDistrict.lon,
    );

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      // image: markerImage,
    });

    const circle = new window.kakao.maps.Circle({
      map: map,
      center: new window.kakao.maps.LatLng(
        deliveryFounderConsult.deliverySpace.companyDistrict.lat,
        deliveryFounderConsult.deliverySpace.companyDistrict.lon,
      ),
      strokeWeight: 2,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
      fillColor: '#00EEEE',
      fillOpacity: 0.5,
    });
    circle.setRadius(1000);
    circle.setMap(map);
    customOverlay.setMap(map);
  }

  created() {
    this.getGender();
    this.getFoodCategories();
    this.getFounderConsultCodes();
    // this.getFounderConsultManagements(founderConsultId);
  }

  mounted() {
    this.findOne(this.$route.params.id);
  }
}
</script>
