<template>
  <section>
    <SectionTitle title="내 정보" divider>
      <template v-slot:rightArea>
        <b-button variant="primary" @click="updateSelf()">수정하기</b-button>
      </template>
    </SectionTitle>
    <b-row>
      <b-col cols="12" lg="4" class="my-3">
        <BaseCard title="내 정보">
          <template v-slot:head>
            <b-button variant="outline-info" v-b-modal.change_password
              >비밀번호 변경</b-button
            >
          </template>
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li>관리자 ID : {{ myPageDto.no }}</li>
                <li>등급 : {{ myPageDto.authCode }}</li>
                <li>
                  <b-form-group label="이름">
                    <b-form-input v-model="myPageDto.name" />
                  </b-form-group>
                </li>
                <li>
                  <b-form-group label="연락처">
                    <b-form-input v-model="myPageDto.phone" />
                  </b-form-group>
                </li>
                <li>
                  <b-form-group>
                    <label for="space_type">담당 공유주방</label>
                    <select
                      class="custom-select"
                      id="space_type"
                      v-model="myPageDto.spaceTypeNo"
                    >
                      <option value selected>전체</option>
                      <option
                        v-for="spaceType in spaceTypes"
                        :key="spaceType.no"
                        :value="spaceType.no"
                        >{{ spaceType.name }}</option
                      >
                    </select>
                  </b-form-group>
                </li>
                <li>가입 일시 : {{ myPageDto.createdAt | dateTransformer }}</li>
                <li>
                  마지막 로그인 일시 :{{
                    myPageDto.lastLoginAt | dateTransformer
                  }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col
        cols="12"
        lg="8"
        v-if="founderConsultTotalCount || deliveryFounderConsultTotalCount"
        class="my-3"
      >
        <BaseCard title="내 상담 리스트" no-body>
          <b-tabs card fill>
            <b-tab title="식당형" no-body active @click="findConsults()">
              <div v-if="!dataLoading" class="table-responsive">
                <div class="table-top mt-4 mb-2 px-4">
                  <div class="total-count">
                    <h5>
                      <span>TOTAL</span>
                      <strong class="text-primary">{{
                        founderConsultTotalCount
                      }}</strong>
                    </h5>
                  </div>
                  <div>
                    <b-button
                      variant="outline-info"
                      @click="
                        $router.push({
                          path: '/founder-consult',
                          query: {
                            spaceTypeNo: 1,
                            adminUserName: myPageDto.name,
                            page: pagination.page,
                            limit: pagination.limit,
                          },
                        })
                      "
                      >전체보기</b-button
                    >
                  </div>
                </div>
                <table
                  class="table table-hover table-md table-nowrap text-center"
                  v-if="founderConsultTotalCount"
                >
                  <thead>
                    <tr>
                      <th scope="col">공간ID</th>
                      <th scope="col">사용자명</th>
                      <th scope="col">휴대폰 번호</th>
                      <th scope="col">공간 주소</th>
                      <th scope="col">희망상담시간</th>
                      <th scope="col">등록일</th>
                      <th scope="col">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="founderConsult in founderConsultList"
                      :key="founderConsult.no"
                      @click="
                        $router.push(`/founder-consult/${founderConsult.no}`)
                      "
                      style="cursor:pointer"
                    >
                      <td>{{ founderConsult.spaceNo }}</td>
                      <td>{{ founderConsult.nanudaUser.name }}</td>
                      <td>
                        {{ founderConsult.nanudaUser.phone | phoneTransformer }}
                      </td>
                      <td>
                        {{ founderConsult.space.address }}
                        {{ founderConsult.space.detailAddress }}
                      </td>

                      <td>
                        <div v-if="founderConsult.availableTime">
                          {{ founderConsult.availableTime.value }}
                        </div>
                      </td>
                      <td>{{ founderConsult.createdAt | dateTransformer }}</td>
                      <td>
                        <b-badge
                          :variant="getStatusColor(founderConsult.status)"
                          class="badge-pill p-2 mr-2"
                          >{{ founderConsult.codeManagement.value }}</b-badge
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="empty-data" v-else>상담 신청 내역 없음</div>
                <b-pagination
                  v-model="pagination.page"
                  v-if="founderConsultTotalCount"
                  pills
                  :total-rows="founderConsultTotalCount"
                  :per-page="pagination.limit"
                  @input="paginateRestaurantConsult()"
                  class="mt-4 justify-content-center"
                ></b-pagination>
              </div>
              <div class="half-circle-spinner my-5" v-else>
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
              </div>
            </b-tab>
            <b-tab title="배달형" no-body @click="findDeliveryConsults()">
              <div v-if="!dataLoadingDelivery" class="table-responsive">
                <div class="table-top mt-4 mb-2 px-4">
                  <div class="total-count">
                    <h5>
                      <span>TOTAL</span>
                      <strong class="text-primary">{{
                        deliveryFounderConsultTotalCount
                      }}</strong>
                    </h5>
                  </div>
                  <div>
                    <b-button
                      variant="outline-info"
                      @click="
                        $router.push({
                          path: '/delivery-founder-consult',
                          query: {
                            adminUserName: myPageDto.name,
                            page: pagination.page,
                            limit: pagination.limit,
                          },
                        })
                      "
                      >전체보기</b-button
                    >
                  </div>
                </div>
                <table
                  class="table table-hover table-md table-nowrap text-center"
                  v-if="deliveryFounderConsultTotalCount"
                >
                  <thead>
                    <tr>
                      <th scope="col">공간 ID</th>
                      <th scope="col">사용자명</th>
                      <th scope="col">휴대폰 번호</th>
                      <th scope="col">업체</th>
                      <th scope="col">희망상담시간</th>
                      <th scope="col">공간 공실</th>
                      <th scope="col">등록일</th>
                      <th scope="col">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="founderConsult in deliveryFounderConsultList"
                      :key="founderConsult.no"
                      @click="
                        $router.push(
                          `/delivery-founder-consult/${founderConsult.no}`,
                        )
                      "
                      style="cursor:pointer"
                    >
                      <td>{{ founderConsult.deliverySpaceNo }}</td>
                      <td>{{ founderConsult.nanudaUser.name }}</td>
                      <td>
                        {{ founderConsult.nanudaUser.phone | phoneTransformer }}
                      </td>
                      <td>
                        <div v-if="founderConsult.deliverySpace">
                          {{
                            founderConsult.deliverySpace.companyDistrict.company
                              .nameKr
                          }}
                        </div>
                      </td>
                      <td>
                        <div v-if="founderConsult.availableTime">
                          {{ founderConsult.availableTime.value }}
                        </div>
                      </td>
                      <td>
                        <div v-if="founderConsult.deliverySpace">
                          {{
                            founderConsult.deliverySpace.quantity -
                              founderConsult.deliverySpace.contracts.length
                          }}/{{ founderConsult.deliverySpace.quantity }}
                        </div>
                      </td>
                      <td>{{ founderConsult.createdAt | dateTransformer }}</td>
                      <td>
                        <b-badge
                          :variant="getStatusColor(founderConsult.status)"
                          class="badge-pill p-2 mr-2"
                          >{{ founderConsult.codeManagement.value }}</b-badge
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="empty-data" v-else>상담 신청 내역 없음</div>
                <b-pagination
                  v-model="pagination.page"
                  v-if="deliveryFounderConsultTotalCount"
                  pills
                  :total-rows="deliveryFounderConsultTotalCount"
                  :per-page="pagination.limit"
                  @input="paginateDeliveryConsults()"
                  class="mt-4 justify-content-center"
                ></b-pagination>
              </div>
              <div class="half-circle-spinner my-5" v-else>
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
              </div>
            </b-tab>
          </b-tabs>
        </BaseCard>
      </b-col>
    </b-row>
    <b-modal
      id="change_password"
      title="비밀변호 변경"
      ok-title="변경"
      cancel-title="취소"
      @ok="updateSelf('password')"
      @cancel="clearOutUpdateDto()"
    >
      <b-form-row>
        <b-col cols="12" md="6">
          <b-form-group label="비밀번호 *">
            <b-form-input v-model="myPageUpdateDto.password" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="비밀번호 확인 *">
            <b-form-input v-model="myPageUpdateDto.passwordConfirm" />
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import {
  AdminDto,
  DeliveryFounderConsultDto,
  DeliveryFounderConsultListDto,
  FounderConsultDto,
  SpaceTypeDto,
} from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';
import SpaceTypeService from '@/services/space-type.service';
import FounderConsultService from '@/services/founder-consult.service';
import { getStatusColor } from '../../../core/utils/status-color.util';
import { Pagination } from '@/common';
import { APPROVAL_STATUS } from '@/services/shared';
import toast from '../../../../resources/assets/js/services/toast.js';
import DeliveryFounderConsultService from '../../../services/delivery-founder-consult.service';

@Component({
  name: 'MyPageDetail',
})
export default class MyPageDetail extends BaseComponent {
  private myPageDto: AdminDto = new AdminDto(BaseUser);
  private myPageUpdateDto: AdminDto = new AdminDto(BaseUser);
  private pagination = new Pagination();
  private paginationCounsults = new Pagination();
  private paginationDeliveryConsults = new Pagination();
  private founderConsultList: FounderConsultDto[] = [];
  private founderConsultTotalCount = null;
  private deliveryFounderConsultList: DeliveryFounderConsultDto[] = [];
  private deliveryFounderConsultTotalCount = null;
  private dataLoading = false;
  private dataLoadingDelivery = false;
  private spaceTypes: SpaceTypeDto[] = [];

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  findSpaceType() {
    SpaceTypeService.findForSelect().subscribe(res => {
      this.spaceTypes = res.data;
    });
  }

  findOne() {
    AdminService.findMe().subscribe(res => {
      if (res) {
        this.myPageDto = res.data;
        this.myPageUpdateDto = this.myPageDto;
      }
    });
  }

  findConsults(isPagination?: boolean) {
    if (!isPagination) {
      this.paginationCounsults.page = 1;
    }
    this.paginationCounsults.limit = 5;
    this.dataLoading = true;
    FounderConsultService.findMyConsults(this.paginationCounsults).subscribe(
      res => {
        this.dataLoading = false;
        this.founderConsultList = res.data.items;
        this.founderConsultTotalCount = res.data.totalCount;
      },
    );
  }

  findDeliveryConsults(isPagination?: boolean) {
    if (!isPagination) {
      this.paginationDeliveryConsults.page = 1;
    }
    this.paginationDeliveryConsults.limit = 5;
    this.dataLoadingDelivery = true;
    DeliveryFounderConsultService.findMyConsults(
      this.paginationDeliveryConsults,
    ).subscribe(res => {
      if (res) {
        this.dataLoadingDelivery = false;
        this.deliveryFounderConsultList = res.data.items;
        this.deliveryFounderConsultTotalCount = res.data.totalCount;
      }
    });
  }

  updateSelf(password) {
    AdminService.updateSelf(
      this.myPageDto.no,
      password ? this.myPageUpdateDto : this.myPageDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne();
      }
    });
  }

  clearOutUpdateDto() {
    this.myPageUpdateDto = new AdminDto(BaseUser);
  }

  paginateRestaurantConsult() {
    this.findConsults(true);
  }

  paginateDeliveryConsults() {
    this.findDeliveryConsults(true);
  }

  created() {
    this.findOne();
    this.findConsults();
    this.findSpaceType();
  }
}
</script>
