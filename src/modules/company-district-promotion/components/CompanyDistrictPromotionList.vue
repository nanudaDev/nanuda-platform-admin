<template>
  <section>
    <SectionTitle title="프로모션 관리" divider />
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="2">
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
      </b-form-row>
      <b-row align-h="center">
        <div>
          <b-button variant="secondary" @click="clearOut()">초기화</b-button>
          <b-button variant="primary" @click="search()">검색</b-button>
        </div>
      </b-row>
    </div>
    <div v-if="!dataLoading">
      <div class="table-top">
        <div class="total-count">
          <h5>
            <span>TOTAL</span>
            <strong class="text-primary">{{ promotionTotalCount }}</strong>
          </h5>
        </div>
        <div>
          <b-button variant="primary" v-b-modal.add_promotion
            >프로모션 추가</b-button
          >
        </div>
      </div>

      <div class="table-responsive" v-if="promotionTotalCount">
        <table class="table table-hover table-sm border">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">프로모션 타입</th>
              <th scope="col">프로모션 제목</th>
              <th scope="col">프로모션 제목 (노출용)</th>
              <th scope="col">프로모션 내용 요약</th>
              <th scope="col">프로모션 기간</th>
              <th scope="col">만료</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="promotion in promotionList"
              :key="promotion.no"
              @click="findOne(promotion.no)"
              style="cursor:pointer"
            >
              <td>
                {{ promotion.no }}
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
              <td>
                {{ promotion.summary }}
              </td>
              <td>
                {{ promotion.started | dateTransformer }} ~
                {{ promotion.ended | dateTransformer }}
              </td>
              <td>
                <span v-if="promotion.ended < new Date()">
                  만료
                </span>
                <span v-else>진행중</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="empty-data border">검색결과가 없습니다.</div>
      <b-pagination
        v-model="pagination.page"
        v-if="promotionTotalCount"
        pills
        :total-rows="promotionTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </div>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <b-modal
      size="lg"
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
        <b-col cols="12">
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
        <b-col cols="12">
          <b-form-group label="프로모션 제목">
            <b-form-input v-model="promotionCreateDto.title"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="프로모션 제목 (노출용)">
            <b-form-input
              v-model="promotionCreateDto.displayTitle"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="프로모션 내용 요약">
            <b-form-input v-model="promotionCreateDto.summary"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mb-4">
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
        <b-col cols="12">
          <b-form-group label="프로모션 지점 선택">
            <b-row>
              <b-col
                cols="12"
                md="6"
                lg="4"
                v-for="district in companyDistirctSelect"
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

@Component({
  name: 'PromotionList',
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
  private companyDistirctSelect = [];
  private companyDistrictDto = new CompanyDistrictDto();
  private showYn: YN[] = [...CONST_YN];
  private companyDistrictIds: number[] = [];
  private editorToolbar = EditorConfig;

  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    CompanyDistrictPromotionService.findAll(
      this.promotionSearchDto,
      this.pagination,
    ).subscribe(res => {
      if (res) {
        this.promotionList = res.data.items;
        this.promotionTotalCount = res.data.totalCount;
      }
    });
  }

  clearOut() {
    this.pagination.page = 1;
    this.promotionSearchDto = new CompanyDistrictPromotionListDto();
    this.search();
  }

  findOne(id) {
    this.$router.push(`/company-district-promotion/${id}`);
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
          this.companyDistirctSelect = res.data;
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

  paginateSearch() {
    this.search(true);
  }

  createPromotion() {
    this.promotionCreateDto.companyDistrictIds = this.companyDistrictIds;
    CompanyDistrictPromotionService.create(this.promotionCreateDto).subscribe(
      res => {
        if (res) {
          toast.success('추가완료');
          this.search();
        }
      },
    );
  }

  created() {
    this.search();
    this.getCommonCodes();
    this.getCompanyDistrict();
  }
}
</script>
