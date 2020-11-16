<template>
  <section>
    <SectionTitle title="식당형 상담 신청" divider>
      <template v-slot:rightArea>
        <router-link to="/founder-consult" class="btn btn-secondary text-center"
          >목록으로</router-link
        >
        <b-button variant="primary" @click="updateFounderConsult()"
          >수정하기</b-button
        >
      </template>
    </SectionTitle>
    <div id="map" style="width:100%; height:420px"></div>
    <b-row align-h="start" align-v="stretch">
      <b-col md="6" class="my-3" v-if="founderConsultDto.nanudaUser">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <div v-if="founderConsultDto.nanudaUser">
              <ul>
                <li>
                  사용자 ID :
                  <b>{{ founderConsultDto.nanudaUser.no }}</b>
                </li>
                <li>
                  사용자명 :
                  <b>{{ founderConsultDto.nanudaUser.name }}</b>
                </li>
                <li>
                  휴대폰 번호 :
                  <span>
                    <b>
                      {{
                        founderConsultDto.nanudaUser.phone | phoneTransformer
                      }}
                    </b>
                  </span>
                </li>
                <li
                  v-if="
                    founderConsultDto.nanudaUser &&
                      founderConsultDto.nanudaUser.genderInfo
                  "
                >
                  <label for="">성별</label>
                  <b-form-radio
                    v-model="founderConsultDto.nanudaUser.gender"
                    v-for="gender in genderSelect"
                    :key="gender.no"
                    :value="gender.key"
                    name="gender"
                    :disabled="statusDistComplete"
                    >{{ gender.value }}</b-form-radio
                  >
                </li>
                <li v-if="founderConsultDto.nanudaUser.remainVisitCount">
                  남은 공간 신청 횟수 :
                  <b>{{ founderConsultDto.nanudaUser.remainVisitCount }}</b>
                </li>
                <li v-if="founderConsultDto.nanudaUser.lastLoginAt">
                  마지막 로그인 날짜:
                  <b>
                    {{
                      founderConsultDto.nanudaUser.lastLoginAt | dateTransformer
                    }}
                  </b>
                </li>
              </ul>
            </div>
            <div v-else>사용자 없음</div>
            <b-alert
              show
              variant="danger"
              v-if="!founderConsultDto.nanudaUser.genderInfo"
              class="mt-3"
              >성별 미입력 상태</b-alert
            >
          </template>
        </BaseCard>
      </b-col>
      <b-col md="6" class="my-3">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                v-if="!founderConsultDto.spaceConsultManager"
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
            <div v-if="founderConsultDto.admin">
              <ul>
                <li>
                  관리자 ID :
                  <span>
                    <b>{{ founderConsultDto.admin.no }}</b>
                  </span>
                </li>
                <li>
                  관리자명 :
                  <span>
                    <b>{{ founderConsultDto.admin.name }}</b>
                  </span>
                </li>
                <li>
                  휴대폰 번호 :
                  <b>{{ founderConsultDto.admin.phone | phoneTransformer }}</b>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="6" class="my-3">
        <BaseCard title="공간 정보">
          <template v-slot:body>
            <div v-if="founderConsultDto.space">
              <ul>
                <li>
                  공간번호 :
                  <b>{{ founderConsultDto.space.no }}</b>
                </li>
                <li>
                  공간 타입 :
                  <b>{{ founderConsultDto.space.spaceType.displayName }}</b>
                </li>
                <li v-if="founderConsultDto.space.name">
                  공간이름 :
                  <b>{{ founderConsultDto.space.name }}</b>
                </li>
                <li v-if="founderConsultDto.space.address">
                  공간주소 :
                  <b>{{ founderConsultDto.space.address }}</b>
                </li>
                <li v-if="founderConsultDto.space.deposit">
                  보증금 :
                  <b>{{ founderConsultDto.space.deposit }} 만원</b>
                </li>
                <li v-if="founderConsultDto.space.rentalFee">
                  월 임대료 :
                  <b>{{ founderConsultDto.space.rentalFee }} 만원</b>
                </li>
                <li v-if="founderConsultDto.space.amenities.length > 0">
                  공통시설 :
                  <b-badge
                    variant="info"
                    v-for="amenity in founderConsultDto.space.amenities"
                    :key="amenity.no"
                    class="m-1"
                    >{{ amenity.amenityName }}</b-badge
                  >
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">공간 정보 없음</div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="6" class="my-3">
        <BaseCard title="상담 상세 정보">
          <template v-slot:head>
            <div v-if="founderConsultDto.createdAt">
              <!-- <b-button
                variant="danger"
                @click="updateConsultInfo()"
                v-b-modal.reverse-read
                v-if="founderConsultDto.viewCount === 'Y'"
                >미열람 처리</b-button
              >-->
            </div>
          </template>
          <template v-slot:body>
            <div v-if="founderConsultDto && founderConsultDto.codeManagement">
              <b-row no-gutters>
                <ul class="col-12 col-md-6">
                  <li>
                    상담 신청일 :
                    <b>{{ founderConsultDto.createdAt | dateTransformer }}</b>
                  </li>
                  <li>
                    통화 가능 시간 :
                    <b>{{ founderConsultDto.availableTime.value }}</b>
                  </li>
                  <li v-if="founderConsultDto.changUpExpYn">
                    창업 경험 유무 :
                    <b-badge
                      :variant="
                        founderConsultDto.changUpExpYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                      >{{
                        founderConsultDto.changUpExpYn | enumTransformer
                      }}</b-badge
                    >
                  </li>
                  <li>
                    <label for="hope_food_category">희망 업종</label>
                    <template>
                      <b-form-input
                        list="food-category-list"
                        id="hope_food_category"
                        v-model="founderConsultDto.hopeFoodCategory"
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
                    <select
                      class="custom-select"
                      v-model="founderConsultDto.status"
                    >
                      <option value selected>전체</option>
                      <option
                        v-for="status in founderConsultStatusSelect"
                        :key="status.no"
                        :value="status.key"
                        >{{ status.value }}</option
                      >
                    </select>
                    <p class="text-right" v-if="founderConsultDto.updatedAt">
                      ({{ founderConsultDto.updatedAt | dateTransformer }})
                    </p>
                  </li>
                  <li>
                    <label for="space_consult_etc">비고 내용</label>
                    <b-form-textarea
                      id="space_consult_etc"
                      style="height:100px;"
                      v-model="founderConsultDto.spaceConsultEtc"
                    ></b-form-textarea>
                  </li>
                </ul>
              </b-row>
            </div>
            <div v-else class="empty-data">상담 내역 없음</div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <div class="text-right">
      <router-link to="/founder-consult" class="btn btn-secondary text-center"
        >목록으로</router-link
      >
      <b-button variant="primary" @click="updateFounderConsult()"
        >수정하기</b-button
      >
    </div>
    <!-- for the text message -->
    <b-modal id="managemnt_history" title="업체 메모 이력" hide-footer>
      <div>
        <FounderConsultManagementHistory />
      </div>
    </b-modal>
    <b-modal
      id="nanuda_user"
      title="사용자정보 수정"
      @ok="updateFounderConsult()"
    >
      <div class="form-row">
        <div class="mb-3">
          <b-form-group label="사용자 성별">
            <b-form-radio
              v-model="founderConsultDto.gender"
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
    <!--
    <b-modal
      id="consult_info"
      title="상담 내용 수정"
      @ok="updateFounderConsult()"
    >
      <div class="form-row">
        <div class="col-12 mb-3">
          <label>신청 상태</label>
          <select
            class="custom-select"
            v-model="founderConsultUpdateDto.status"
          >
            <option value selected>전체</option>
            <option
              v-for="status in founderConsultStatusSelect"
              :key="status.no"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
        <div class="col-12 mb-3">
          <label for="changup_exp_yn">창업 경험 유무</label>
          <b-form-radio
            v-model="founderConsultUpdateDto.changUpExpYn"
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
              v-model="founderConsultUpdateDto.hopeFoodCategory"
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
            v-model="founderConsultUpdateDto.spaceConsultEtc"
          ></b-form-textarea>
        </div>
      </div>
    </b-modal>
    -->
    <b-modal
      v-if="founderConsultDto.nanudaUser"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      @ok="sendMessage()"
      :title="`${founderConsultDto.nanudaUser.name} 사용자에게 문자하기`"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          {{ founderConsultDto.nanudaUser.phone | phoneTransformer }}
        </b>
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
    <br />
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
    <!-- 관리자 수정하기 -->
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
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CodeManagementDto } from '../../../services/init/dto';
import { GENDER, CONST_GENDER } from '../../../services/shared';
import CodeManagementService from '../../../services/code-management.service';
import FounderConsultService from '../../../services/founder-consult.service';
import AdminService from '../../../services/admin.service';
import FoodCategoryService from '../../../services/food-category.service';
import FounderConsultManagementService from '../../../services/founder-consult-management.service';
import SmsService from '../../../services/sms.service';
import {
  AdminDto,
  AdminListDto,
  FounderConsultDto,
  FounderConsultUpdateDto,
  FounderConsultManagementDto,
} from '../../../dto';
import {
  FoodCategoryDto,
  FoodCategoryListDto,
} from '../../../dto/food-category';
import { AdminSendMessageDto } from '../../../dto';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import FounderConsultManagementHistory from './FounderConsultManagementHistory.vue';
import toast from '../../../../resources/assets/js/services/toast.js';
import {
  FOUNDER_CONSULT,
  CONST_FOUNDER_CONSULT,
} from '../../../services/shared';

import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'FounderConsultDetail',
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
  private founderConsultDto = new FounderConsultDto();
  private founderConsultUpdateDto = new FounderConsultUpdateDto();
  private founderConsultStatusSelect: CodeManagementDto[] = [];
  private genderSelect: CodeManagementDto[] = [];
  private foodCategorySelect: FoodCategoryDto[] = [];
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private founderConsultManagements: FounderConsultManagementDto[] = [];
  private elapsedTime = null;
  private deliveredTime = new Date();
  private createdTime = new Date();
  private adminSendMessageDto = new AdminSendMessageDto();

  // get status color
  getStatusColor(status: FOUNDER_CONSULT) {
    return getStatusColor(status);
  }

  // 사용자 정보 수정
  // updateNanudaUser() {
  //   if (this.founderConsultDto.nanudaUser.gender) {
  //     this.founderConsultUpdateDto.gender = this.founderConsultDto.nanudaUser.gender;
  //   }
  //   this.getGender();
  // }

  // send message to user
  sendMessage() {
    this.adminSendMessageDto.phone = this.founderConsultDto.nanudaUser.phone;
    SmsService.sendMessage(this.adminSendMessageDto).subscribe(res => {
      if (res) {
        this.adminSendMessageDto = new AdminSendMessageDto();
        toast.success('문자가 발송 되었습니다.');
      } else {
        return;
      }
    });
  }

  // 지도 가져오기
  setMap(founderConsult: FounderConsultDto) {
    const mapContainer = document.getElementById('map'),
      mapOption = {
        center: new window.kakao.maps.LatLng(
          founderConsult.space.lat,
          founderConsult.space.lon,
        ),
        level: 5,
        maxLevel: 6,
        minLevel: 3,
        mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
      };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const content = `<span class="badge badge-primary" style="font-size:21px;border-radius: 100px;opacity: 82%">Here</span>`;
    const markerPosition = new window.kakao.maps.LatLng(
      founderConsult.space.lat,
      founderConsult.space.lon,
    );

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: markerPosition,
      content: content,
      // image: markerImage,
    });

    const circle = new window.kakao.maps.Circle({
      map: map,
      center: new window.kakao.maps.LatLng(
        founderConsult.space.lat,
        founderConsult.space.lon,
      ),
      strokeWeight: 2,
      strokeColor: '#FF00FF',
      strokeOpacity: 0.8,
      strokeStyle: 'dashed',
      fillColor: '#00EEEE',
      fillOpacity: 0.5,
    });
    circle.setRadius(400);
    circle.setMap(map);
    customOverlay.setMap(map);
  }

  // 상담 내용 수정
  // updateConsultInfo() {
  //   this.founderConsultUpdateDto = this.founderConsultDto;
  //   this.getFounderConsultCodes();
  //   this.getAvailableTimes();
  //   this.getFoodCategories();
  //   this.getGender();
  // }

  reverseReadStatus() {
    FounderConsultService.reverseReadStatus(this.$route.params.id).subscribe(
      res => {
        this.findOne(this.$route.params.id);
      },
    );
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
      this.founderConsultStatusSelect = res.data;
    });
  }

  // 상담 메모 management
  getFounderConsultManagements(id) {
    FounderConsultManagementService.findForManagement(id).subscribe(res => {
      if (res) {
        this.founderConsultManagements = res.data;
      }
    });
  }

  findOne(id) {
    // find founder consult detail
    FounderConsultService.findOne(id).subscribe(res => {
      this.founderConsultDto = res.data;
      this.deliveredTime = res.data.deliveredAt;
      this.setMap(res.data);
      if (this.deliveredTime) {
        this.createdTime = new Date(res.data.createdAt);
        this.deliveredTime = new Date(res.data.deliveredAt);
        this.getElapsedTime(this.createdTime, this.deliveredTime);
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

  // 담당자 본인으로 정하기
  assignYourselfAdmin() {
    FounderConsultService.assignAdmin(this.founderConsultDto.no).subscribe(
      res => {
        this.findOne(this.founderConsultDto.no);
      },
    );
  }

  updateFounderConsult() {
    if (this.selectedAdmin) {
      this.founderConsultDto.spaceConsultManager = this.selectedAdmin.no;
    }

    if (this.founderConsultDto.nanudaUser.gender) {
      this.founderConsultDto.gender = this.founderConsultDto.nanudaUser.gender;
    }

    FounderConsultService.update(
      this.founderConsultDto.no,
      this.founderConsultDto,
    ).subscribe(res => {
      this.cancelSelection();
      // this.founderConsultUpdateDto = new FounderConsultUpdateDto();
      this.findOne(this.founderConsultDto.no);
      toast.success('수정완료');
    });
  }

  created() {
    this.findOne(this.$route.params.id);
    this.getFounderConsultCodes();
    this.getFoodCategories();
    this.getGender();
  }
}
</script>
