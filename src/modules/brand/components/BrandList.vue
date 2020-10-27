<template>
  <section>
    <SectionTitle title="브랜드 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-sm-4 col-lg-1 mb-3">
          <label>업종</label>
          <b-form-input
            list="food-category-list"
            id="food_category"
            v-model="brandSearchDto.categoryName"
          ></b-form-input>
          <datalist id="food-category-list">
            <option
              v-for="category in foodCategorySelect"
              :key="category.code"
              :value="category.nameKr"
              >{{ category.nameKr }}</option
            >
          </datalist>
        </div>
        <div class="col-sm-4 col-lg-1 mb-3">
          <label>추천 브랜드</label>
          <select
            class="custom-select"
            v-model="brandSearchDto.isRecommendedYn"
          >
            <option value>전체</option>
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-sm-4 col-lg-2 mb-3">
          <b-form-group label="브랜드명">
            <b-form-input v-model="brandSearchDto.nameKr"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-sm-4 col-lg-2 mb-3">
          <label>노출 여부</label>
          <select class="custom-select" v-model="brandSearchDto.showYn">
            <option value>전체</option>
            <option v-for="yn in ynSelect" :key="yn" :value="yn">{{
              yn | enumTransformer
            }}</option>
          </select>
        </div>
        <div class="col-sm-4 col-lg-2 mb-3">
          <label>창업 비용</label>
          <select class="custom-select" v-model="brandSearchDto.cost">
            <option value>전체</option>
            <option
              v-for="cost in costValues"
              :key="cost.no"
              :value="cost.key"
              >{{ cost.value }}</option
            >
          </select>
        </div>
        <div class="col-sm-4 col-lg-2 mb-3">
          <label>조리 난이도</label>
          <select class="custom-select" v-model="brandSearchDto.difficulty">
            <option value>전체</option>
            <option
              v-for="difficulty in difficultyValues"
              :key="difficulty.no"
              :value="difficulty.key"
              >{{ difficulty.value }}</option
            >
          </select>
        </div>
        <div class="col-sm-4 col-lg-2 mb-3">
          <label>매장 수</label>
          <select class="custom-select" v-model="brandSearchDto.storeCount">
            <option value>전체</option>
            <option
              v-for="storeCount in storeCountValues"
              :key="storeCount.no"
              :value="storeCount.key"
              >{{ storeCount.value }}</option
            >
          </select>
        </div>
      </b-form-row>
      <!-- second row -->
      <b-row align-h="center">
        <b-btn-group>
          <b-button variant="primary" @click="clearOut()">초기화</b-button>
          <b-button variant="success" @click="search()">검색</b-button>
        </b-btn-group>
      </b-row>
    </div>
    <div class="table-top">
      <div class="total-count">
        <h5>
          <span>TOTAL</span>
          <strong class="text-primary">{{ brandListCount }}</strong>
        </h5>
      </div>
      <b-button variant="primary" v-b-modal.add_brand>브랜드 추가</b-button>
    </div>
    <div v-if="!dataLoading" class="table-bordered table-responsive">
      <table class="table table-sm table-hover" v-if="brandListCount">
        <thead>
          <th scope="row">NO</th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.categoryName,
            }"
          >
            업종
          </th>

          <th scope="row">로고</th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.nameKr,
            }"
          >
            브랜드명
          </th>
          <th scope="row">설명</th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.cost,
            }"
          >
            창업 비용
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.difficulty,
            }"
          >
            조리 난이도
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.storeCount,
            }"
          >
            매장 수
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.isRecommendedYn,
            }"
          >
            추천
          </th>
          <th
            scope="row"
            v-bind:class="{
              highlighted: brandSearchDto.showYn,
            }"
          >
            노출 여부
          </th>
        </thead>
        <tbody>
          <tr
            v-for="brand in brandList"
            :key="brand.no"
            @click="findOne(brand.no)"
            style="cursor:pointer"
          >
            <td>{{ brand.no }}</td>
            <td>{{ brand.category.nameKr }}</td>

            <td style="width:80px">
              <div v-if="brand.logo && brand.logo.length > 0">
                <div v-for="logo in brand.logo" :key="logo.endpoint">
                  <b-img-lazy
                    :src="logo.endpoint"
                    class="rounded mx-auto d-block company-logo"
                    style="max-height:40px"
                  />
                </div>
              </div>
            </td>
            <td>{{ brand.nameKr }}</td>
            <td>
              <template v-if="brand.desc">{{ brand.desc }}</template>
            </td>
            <td>
              <template v-if="brand.costValue">{{
                brand.costValue.value
              }}</template>
              <template v-else> - </template>
            </td>
            <td>
              <template v-if="brand.difficultyValue">{{
                brand.difficultyValue.value
              }}</template>
              <template v-else> - </template>
            </td>
            <td>
              <template v-if="brand.storeCountValue">{{
                brand.storeCountValue.value
              }}</template>
              <template v-else> - </template>
            </td>
            <td>
              <b-badge
                :variant="brand.isRecommendedYn === 'Y' ? 'success' : 'danger'"
                >{{ brand.isRecommendedYn }}</b-badge
              >
            </td>
            <td>
              <b-badge :variant="brand.showYn === 'Y' ? 'success' : 'danger'">{{
                brand.showYn
              }}</b-badge>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-data border">검색결과가 없습니다.</div>
    </div>
    <b-pagination
      v-model="pagination.page"
      v-if="brandListCount"
      pills
      :total-rows="brandListCount"
      :per-page="pagination.limit"
      @input="paginateSearch()"
      class="mt-4 justify-content-center"
    ></b-pagination>
    <div class="half-circle-spinner mt-5" v-if="dataLoading">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
    </div>
    <!-- 브랜드 추가 모달 -->
    <b-modal
      id="add_brand"
      title="브랜드 추가"
      ok-title="추가"
      cancel-title="취소"
      size="lg"
      @hide="clearOutBrandCreateDto()"
      @cancel="clearOutBrandCreateDto()"
      @ok="createBrand()"
    >
      <div v-if="brandLogo && brandLogo.length > 0" class="mb-4">
        <div v-for="logo in brandLogo" :key="logo.endpoint">
          <img
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:80px"
          />
        </div>
      </div>
      <b-form-row>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            업종 카테고리
            <span class="red-text">*</span>
          </label>
          <select
            id="create_food_category_list"
            class="custom-select"
            v-model="brandCreateDto.categoryNo"
            required
          >
            <option
              v-for="category in foodCategorySelect"
              :key="category.code"
              :value="category.no"
              >{{ category.nameKr }}</option
            >
          </select>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            브랜드 로고
            <span class="red-text">*</span>
          </label>
          <b-form-file
            placeholder="파일 선택"
            ref="fileInput"
            @input="upload($event)"
            required
          ></b-form-file>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            브랜드명
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="brandCreateDto.nameKr" required></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>브랜드명 (영문)</label>
          <b-form-input v-model="brandCreateDto.nameEng"></b-form-input>
        </b-col>
        <b-col cols="4" md="4" class="mb-3">
          <label>창업 비용</label>
          <select
            id="brand_cost"
            class="custom-select"
            v-model="brandCreateDto.cost"
            required
          >
            <option
              v-for="cost in costValues"
              :key="cost.code"
              :value="cost.key"
              >{{ cost.value }}</option
            >
          </select>
        </b-col>
        <b-col cols="4" md="4" class="mb-3">
          <label>조리 난이도</label>
          <select
            id="brand_difficulty"
            class="custom-select"
            v-model="brandCreateDto.difficulty"
            required
          >
            <option
              v-for="difficulty in difficultyValues"
              :key="difficulty.code"
              :value="difficulty.key"
              >{{ difficulty.value }}</option
            >
          </select>
        </b-col>
        <b-col cols="4" md="4" class="mb-3">
          <label>매장 수</label>
          <select
            id="brand_store_count"
            class="custom-select"
            v-model="brandCreateDto.storeCount"
            required
          >
            <option
              v-for="storeCount in storeCountValues"
              :key="storeCount.code"
              :value="storeCount.key"
              >{{ storeCount.value }}</option
            >
          </select>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>브랜드 설명</label>
          <textarea
            class="form-control"
            maxlength="100"
            style="min-height:100px"
            v-model="brandCreateDto.desc"
            required
          ></textarea>
          <p class="text-length text-right" v-if="brandCreateDto.desc">
            <b class="text-primary">{{ brandCreateDto.desc.length }}</b> / 100
          </p>
        </b-col>
        <b-col cols="12" md="4">
          <label>키오스크 아이디</label>
          <b-form-input v-model="brandCreateDto.kioskNo"></b-form-input>
        </b-col>
      </b-form-row>
    </b-modal>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { BrandDto, BrandListDto, FoodCategoryDto } from '../../../dto';
import BrandService from '../../../services/brand.service';
import FoodCategoryService from '../../../services/food-category.service';
import { Pagination, YN, CONST_YN } from '@/common';
import CodeManagementService from '../../../services/code-management.service';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';
import { CodeManagementDto } from '@/services/init/dto';
import { ReverseQueryParamMapper } from '@/core';

@Component({
  name: 'BrandList',
})
export default class BrandList extends BaseComponent {
  constructor() {
    super();
  }
  private brandList: BrandDto[] = [];
  private brandListCount = null;
  private brandSearchDto = new BrandListDto();
  private pagination = new Pagination();
  private ynSelect: YN[] = [...CONST_YN];
  private foodCategorySelect: FoodCategoryDto[] = [];
  private dataLoading = false;
  private storeCountValues: CodeManagementDto[] = [];
  private costValues: CodeManagementDto[] = [];
  private difficultyValues: CodeManagementDto[] = [];
  private brandCreateDto = new BrandDto();
  private brandLogo: FileAttachmentDto[] = [];

  // get food category
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  // search brand
  search(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    BrandService.findAll(this.brandSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.brandList = res.data.items;
          this.brandListCount = res.data.totalCount;
          this.$router.push({
            query: Object.assign(this.brandSearchDto),
          });
        }
      },
    );
  }

  getCommonCodes() {
    CodeManagementService.findAnyCode('BRAND').subscribe(res => {
      this.costValues = res.data;
    });
    CodeManagementService.findAnyCode('STORE_COUNT').subscribe(res => {
      this.storeCountValues = res.data;
    });
    CodeManagementService.findAnyCode('DIFFICULTY').subscribe(res => {
      this.difficultyValues = res.data;
    });
  }

  paginateSearch() {
    this.search(true);
  }

  // clear brand search dto
  clearOut() {
    this.brandSearchDto = new BrandListDto();
    this.search();
  }

  // find brand detail
  findOne(brandNo) {
    this.$router.push(`/brand/${brandNo}`);
  }

  // create brand
  createBrand() {
    if (this.brandLogo) {
      this.brandCreateDto.logo = this.brandLogo;
    }

    BrandService.create(this.brandCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.search();
      }
    });
  }

  // upload brand logo
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(
        UPLOAD_TYPE.BRAND_LOGO,
        [file],
      );
      this.brandLogo = [];
      this.brandLogo.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
    }
  }

  // clear brand craete dto
  clearOutBrandCreateDto() {
    this.brandLogo = [];
    this.brandCreateDto = new BrandDto();
  }

  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.brandSearchDto = query;
    }
    this.getCommonCodes();
    this.search();
    this.getFoodCategories();
  }
}
</script>
