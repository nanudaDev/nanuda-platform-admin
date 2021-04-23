<template>
  <section>
    <SectionTitle title="프로모션 관리" divider />
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="프로모션 타입">
            <b-form-select v-model="promotionSearchDto.promotionType">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="type in promitionTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" lg="3">
          <b-form-group label="노출 여부">
            <b-form-select v-model="promotionSearchDto.showYn">
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="type in showYn"
                :key="type"
                :value="type"
                >{{ type | stringShowTransformer }}</b-form-select-option
              >
            </b-form-select>
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
          <strong class="text-primary">{{ promotionTotalCount }}</strong>
        </h5>
      </div>
      <div class="text-right">
        <b-button variant="primary" v-b-modal.add_promotion
          >프로모션 추가</b-button
        >
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-hover table-sm table-nowrap"
          v-if="promotionTotalCount"
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">진행 여부</th>
              <th
                scope="col"
                v-bind:class="{ highlighted: promotionSearchDto.promotionType }"
              >
                프로모션 타입
              </th>
              <th scope="col">프로모션 제목</th>
              <th scope="col">프로모션 제목 (노출용)</th>
              <th scope="col">프로모션 내용 요약</th>
              <th scope="col">프로모션 기간</th>
              <th
                scope="col"
                v-bind:class="{ highlighted: promotionSearchDto.showYn }"
              >
                노출 여부
              </th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="promotion in promotionList"
              :key="promotion.no"
              @click="
                $router.push({
                  name: 'CompanyDistrictPromotionDetail',
                  params: {
                    id: promotion.no,
                  },
                })
              "
              style="cursor:pointer"
            >
              <td>
                {{ promotion.no }}
              </td>
              <td>
                <b-badge
                  variant="secondary"
                  v-if="new Date(promotion.ended) < new Date()"
                >
                  종료
                </b-badge>
                <b-badge variant="warning" v-else>진행중</b-badge>
              </td>
              <td>
                {{ promotion.codeManagement.value }}
              </td>
              <td>
                {{ promotion.title }}
              </td>
              <td>
                {{ promotion.displayTitle }}
              </td>
              <td class="text-left">
                {{ promotion.summary }}
              </td>
              <td>
                {{ promotion.started | dateTransformer }} ~
                {{ promotion.ended | dateTransformer }}
              </td>
              <td>
                <b-badge
                  :variant="promotion.showYn === 'Y' ? 'success' : 'danger'"
                  >{{ promotion.showYn }}</b-badge
                >
              </td>
              <td>
                {{ promotion.createdAt | dateTransformer }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="promotionTotalCount"
        pills
        :total-rows="promotionTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="half-circle-spinner mt-5">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
    <!-- 프로모션 추가 모달 -->
    <b-modal
      size="xl"
      id="add_promotion"
      title="프로모션 추가"
      @ok="createPromotion()"
    >
      <b-form-row>
        <b-col lg="12" class="text-right mb-3">
          <b-row no-gutters align-h="end">
            <b-form-group
              label="노출 활성화"
              label-size="sm"
              label-text-align="right"
              label-cols="8"
            >
              <b-form-checkbox
                switch
                size="lg"
                v-model="promotionCreateDto.showYn"
                :value="showYn[0]"
                :unchecked-value="showYn[1]"
              ></b-form-checkbox>
            </b-form-group>
          </b-row>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 타입">
            <b-form-select v-model="promotionCreateDto.promotionType">
              <b-form-select-option
                v-for="type in promitionTypeSelect"
                :key="type.code"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 제목">
            <b-form-input v-model="promotionCreateDto.title"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 제목 (노출용)">
            <b-form-input
              v-model="promotionCreateDto.displayTitle"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 내용 요약">
            <b-form-input v-model="promotionCreateDto.summary"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 시작 날짜">
            <b-form-datepicker
              id="started"
              v-model="promotionCreateDto.started"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 종료 날짜">
            <b-form-datepicker
              id="ended"
              v-model="promotionCreateDto.ended"
              :disabled="promotionCreateDto.started ? false : true"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
        <b-col cols="12" md="6" class="mb-4">
          <label for="create_content">
            내용
            <span class="red-text">*</span>
          </label>
          <vue-editor
            id="create_content"
            class="bg-white"
            v-model="promotionCreateDto.desc"
            :editorToolbar="editorToolbar"
          ></vue-editor>
        </b-col>
        <b-col cols="12" md="6">
          <b-form-group label="프로모션 지점 선택">
            <b-row>
              <b-col
                cols="12"
                md="6"
                v-for="district in companyDistrictSelect"
                :key="district.no"
                :value="district.no"
              >
                <b-form-checkbox
                  v-model="companyDistrictIds"
                  @change="addDistrict(district.no)"
                >
                  <b>{{ district.nameKr }} </b> ({{ district.company.nameKr }})
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import {
  CompanyDistrictDto,
  CompanyDistrictPromotionDto,
  CompanyDistrictPromotionListDto,
} from '@/dto';
import CompanyDistrictPromotionService from '@/services/company-district-promotion.service';
import { CONST_YN, Pagination, YN } from '@/common';
import CodeManagementService from '@/services/code-management.service';
import CompanyDistrictService from '@/services/company-district.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { APPROVAL_STATUS } from '@/services/shared';
import { VueEditor } from 'vue2-editor';
import { EditorConfig } from '../../../config';
import {
  ClearOutQueryParamMapper,
  ReverseQueryParamMapper,
  RouterQueryParamMapper,
} from '@/core';

@Component({
  name: 'CompanyDistrictPromotionList',
  components: {
    VueEditor,
  },
})
export default class PromotionList extends BaseComponent {
  private promotionSearchDto = new CompanyDistrictPromotionListDto();
  private promotionCreateDto = new CompanyDistrictPromotionDto();
  private promotionList: CompanyDistrictPromotionDto[] = [];
  private promotionTotalCount = null;
  private pagination = new Pagination();
  private dataLoading = false;
  private promitionTypeSelect = [];
  private companyDistrictSelect = [];
  private companyDistrictDto = new CompanyDistrictDto();
  private showYn: YN[] = [...CONST_YN];
  private companyDistrictIds: number[] = [];
  private editorToolbar = EditorConfig;

  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    } else {
      if (isSearch) this.pagination.page = 1;
      RouterQueryParamMapper(this.promotionSearchDto, this.pagination);
    }
    CompanyDistrictPromotionService.findAll(
      this.promotionSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.dataLoading = false;
        this.promotionList = res.data.items;
        this.promotionTotalCount = res.data.totalCount;
      }
    });
  }

  search() {
    this.findAll(true, true);
  }

  paginateSearch() {
    this.findAll(true);
  }

  clearOut() {
    if (location.search) {
      ClearOutQueryParamMapper();
    } else {
      this.promotionSearchDto = new CompanyDistrictPromotionListDto();
      this.findAll();
    }
  }

  getCommonCodes() {
    CodeManagementService.findAnyCode('B2B_EVENT_TYPE').subscribe(res => {
      if (res) {
        this.promitionTypeSelect = res.data;
      }
    });
  }

  getCompanyDistrict() {
    const companyDistrictDto = new CompanyDistrictDto();
    CompanyDistrictService.findForSelectOption(companyDistrictDto).subscribe(
      res => {
        if (res) {
          this.companyDistrictSelect = res.data;
        }
      },
    );
  }

  addDistrict(districtNo) {
    if (this.companyDistrictIds.includes(parseInt(districtNo))) {
      const index = this.companyDistrictIds.indexOf(parseInt(districtNo));
      if (index > -1) {
        this.companyDistrictIds.splice(index, 1);
      }
    } else {
      this.companyDistrictIds.unshift(parseInt(districtNo));
    }
  }

  createPromotion() {
    this.promotionCreateDto.companyDistrictIds = this.companyDistrictIds;
    CompanyDistrictPromotionService.create(this.promotionCreateDto).subscribe(
      res => {
        if (res) {
          toast.success('추가완료');
          this.clearOut();
        }
      },
    );
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.promotionSearchDto = query;
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
    this.getCommonCodes();
    this.getCompanyDistrict();
  }
}
</script>
