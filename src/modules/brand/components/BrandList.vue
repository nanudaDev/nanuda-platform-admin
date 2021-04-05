<template>
  <section>
    <SectionTitle title="브랜드 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="업종">
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
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="추천 브랜드">
            <b-form-select
              class="custom-select"
              v-model="brandSearchDto.isRecommendedYn"
            >
              <b-form-select-option>전체</b-form-select-option>
              <b-form-select-option
                v-for="yn in ynSelect"
                :key="yn"
                :value="yn"
                >{{ yn | enumTransformer }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="브랜드명">
            <b-form-input v-model="brandSearchDto.nameKr"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="노출 여부">
            <b-form-select
              class="custom-select"
              v-model="brandSearchDto.showYn"
            >
              <b-form-select-option>전체</b-form-select-option>
              <b-form-select-option
                v-for="yn in ynSelect"
                :key="yn"
                :value="yn"
                >{{ yn | stringShowTransformer }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="창업 비용">
            <b-form-select class="custom-select" v-model="brandSearchDto.cost">
              <b-form-select-option>전체</b-form-select-option>
              <b-form-select-option
                v-for="cost in costValues"
                :key="cost.no"
                :value="cost.key"
                >{{ cost.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="조리 난이도">
            <b-form-select
              class="custom-select"
              v-model="brandSearchDto.difficulty"
            >
              <b-form-select-option>전체</b-form-select-option>
              <b-form-select-option
                v-for="difficulty in difficultyValues"
                :key="difficulty.no"
                :value="difficulty.key"
                >{{ difficulty.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="매장 수">
            <b-form-select
              class="custom-select"
              v-model="brandSearchDto.storeCount"
            >
              <b-form-select-option>전체</b-form-select-option>
              <b-form-select-option
                v-for="storeCount in storeCountValues"
                :key="storeCount.no"
                :value="storeCount.key"
                >{{ storeCount.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6" sm="4" md="3">
          <b-form-group label="뷔페/플레이트">
            <b-form-select
              class="custom-select"
              v-model="brandSearchDto.brandType"
            >
              <b-form-select-option value>전체</b-form-select-option>
              <b-form-select-option
                v-for="type in brandType"
                :key="type.no"
                :value="type.key"
                >{{ type.value }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <!-- second row -->
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
          <strong class="text-primary">{{ brandTotalCount }}</strong>
        </h5>
      </div>
      <div>
        <b-button variant="primary" v-b-modal.add_brand>브랜드 추가</b-button>
      </div>
    </div>
    <template v-if="!dataLoading">
      <div class="bg-white table-responsive">
        <table
          class="table table-sm table-hover table-nowrap"
          v-if="brandTotalCount"
        >
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
            <!-- <th scope="row">운영방식</th> -->
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
              @click="$router.push(`/brand/${brand.no}`)"
              style="cursor:pointer"
            >
              <td>{{ brand.no }}</td>
              <td>{{ brand.category.nameKr }}</td>
              <!-- <td>
                <template v-if="brand.brandType">
                  {{ brand.brandType }}
                </template>
                <template v-else>
                  뷔페/플레이트
                </template>
              </td> -->
              <td style="width:80px">
                <div v-if="brand.logo && brand.logo.length > 0">
                  <div v-for="logo in brand.logo" :key="logo.endpoint">
                    <b-img-lazy
                      :src="logo.endpoint"
                      class="rounded mx-auto d-block company-logo"
                      style="max-height:40px; max-width:none;"
                    />
                  </div>
                </div>
              </td>
              <td class="text-nowrap">{{ brand.nameKr }}</td>
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
                  :variant="
                    brand.isRecommendedYn === 'Y' ? 'success' : 'danger'
                  "
                  >{{ brand.isRecommendedYn }}</b-badge
                >
              </td>
              <td>
                <b-badge
                  :variant="brand.showYn === 'Y' ? 'success' : 'danger'"
                  >{{ brand.showYn }}</b-badge
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-data border">검색결과가 없습니다.</div>
      </div>
      <b-pagination
        v-model="pagination.page"
        v-if="brandTotalCount"
        pills
        :total-rows="brandTotalCount"
        :per-page="pagination.limit"
        @input="paginateSearch()"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </template>
    <template v-else>
      <div class="half-circle-spinner py-4">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
      </div>
    </template>
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
      <b-row no-gutters align-h="end">
        <b-form-group
          label="노출"
          label-size="sm"
          label-text-align="right"
          label-cols="5"
        >
          <b-form-checkbox
            switch
            size="lg"
            v-model="brandCreateDto.showYn"
            :value="ynSelect[0]"
            :unchecked-value="ynSelect[1]"
          ></b-form-checkbox>
        </b-form-group>
        <b-form-group
          label="추천 브랜드"
          label-size="sm"
          label-text-align="right"
          label-cols="8"
        >
          <b-form-checkbox
            switch
            size="lg"
            v-model="brandCreateDto.isRecommendedYn"
            :value="ynSelect[0]"
            :unchecked-value="ynSelect[1]"
          ></b-form-checkbox>
        </b-form-group>
      </b-row>
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
        <!-- <b-col cols="12" md="4">
          <label>키오스크 아이디</label>
          <b-form-input v-model="brandCreateDto.kioskNo"></b-form-input>
        </b-col> -->
      </b-form-row>
    </b-modal>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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
import { BRAND_TYPE } from '@/services/shared';

@Component({
  name: 'BrandList',
})
export default class BrandList extends BaseComponent {
  constructor() {
    super();
  }
  private brandList: BrandDto[] = [];
  private brandTotalCount = null;
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
  private brandType: CodeManagementDto[] = [];
  private searchPramsDto: any = {};

  // search brand
  findAll(isPagination?: boolean, isSearch?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1; // 최초 페이지 진입시 페이지 초기화
    } else {
      if (isSearch) this.pagination.page = 1; // 검색버튼 클릭시 페이지 초기화
      this.searchPramsDto = Object.assign(this.brandSearchDto, this.pagination);
    }
    BrandService.findAll(this.brandSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.dataLoading = false;
          this.brandList = res.data.items;
          this.brandTotalCount = res.data.totalCount;
          this.$router
            .push({
              query: this.searchPramsDto,
            })
            .catch();
        }
      },
    );
  }

  // pagination
  paginateSearch() {
    this.findAll(true);
  }

  // serach
  search() {
    this.findAll(true, true);
  }

  // get food category
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  // get common codes
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
    CodeManagementService.findAnyCode('BRAND_TYPE').subscribe(res => {
      this.brandType = res.data;
    });
  }

  // clear brand search dto
  clearOut() {
    this.brandSearchDto = new BrandListDto();
    this.$router.push({ query: null });
  }

  // create brand
  createBrand() {
    if (this.brandLogo) {
      this.brandCreateDto.logo = this.brandLogo;
    }

    BrandService.create(this.brandCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가완료');
        this.clearOut();
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
      this.pagination.limit = +query.limit;
      this.pagination.page = +query.page;
      this.paginateSearch();
    } else {
      this.findAll();
    }

    this.getCommonCodes();
    this.getFoodCategories();
  }
}
</script>
