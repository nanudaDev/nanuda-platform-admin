<template>
  <section>
    <SectionTitle title="브랜드 관리" divider></SectionTitle>
    <div class="search-box my-4" v-on:keyup.enter="search()">
      <b-form-row>
        <div class="col-md-2 mb-3">
          <label>업종 카테고리</label>
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
        <div class="col-md-3 mb-3">
          <b-form-group label="브랜드명">
            <b-form-input v-model="brandSearchDto.nameKr"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-2 mb-3">
          <label>노출 여부</label>
          <select class="custom-select" v-model="brandSearchDto.showYn">
            <option value>전체</option>
            <option v-for="yn in ynSelect" :key="yn" :value="yn">
              {{ yn | enumTransformer }}
            </option>
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
    <div v-if="!dataLoading" class="table-bordered  table-responsive">
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
            <td>{{ brand.name }}</td>
            <td>
              <template v-if="brand.desc">{{ brand.desc }}</template>
            </td>
            <td>
              <b-badge :variant="brand.showYn === 'Y' ? 'success' : 'danger'">
                {{ brand.showYn }}
              </b-badge>
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
    <b-modal
      id="add_brand"
      title="브랜드 추가"
      @hide="clearBrandCreateDto()"
      @cancel="clearBrandCreateDto()"
      @ok="create()"
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
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFileLang"
              lang="kr"
              v-on:change="upload($event.target.files)"
            />
            <label class="custom-file-label" for="customFileLang"
              >로고 추가</label
            >
          </div>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            브랜드명
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="brandCreateDto.nameKr"></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>브랜드명 (영문)</label>
          <b-form-input v-model="brandCreateDto.nameEng"></b-form-input>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>
            브랜드 설명
            <span class="red-text">*</span>
          </label>
          <textarea
            class="form-control"
            maxlength="100"
            style="min-height:100px"
            v-model="brandCreateDto.desc"
          ></textarea>
          <p class="text-length text-right" v-if="brandCreateDto.desc">
            <b class="text-primary">{{ brandCreateDto.desc.length }}</b> / 100
          </p>
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

import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';

import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'BrandList',
})
export default class BrandList extends BaseComponent {
  private brandList: BrandDto[] = [];
  private brandListCount = null;
  private brandSearchDto = new BrandListDto();
  private pagination = new Pagination();
  private ynSelect: YN[] = [...CONST_YN];
  private foodCategorySelect: FoodCategoryDto[] = [];
  private dataLoading = false;

  private brandCreateDto = new BrandDto();
  private brandLogo: FileAttachmentDto[] = [];
  private logoChanged = false;

  // get food category
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  // search brand
  search(isPagination?: boolean) {
    if (!isPagination) {
      this.pagination.page = 1;
    }
    BrandService.findAll(this.brandSearchDto, this.pagination).subscribe(
      res => {
        if (res) {
          this.brandList = res.data.items;
          this.brandListCount = res.data.totalCount;
        }
      },
    );
  }

  paginateSearch() {
    this.search(true);
  }

  clearOut() {
    this.brandSearchDto = new BrandListDto();
    this.search();
  }

  // find detail
  findOne(barndNo) {
    this.$router.push(`/brand/${barndNo}`);
  }

  // create brand
  create() {
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

  async upload(file: FileList) {
    console.log(file);

    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.BRAND_LOGO,
      file,
    );
    this.brandLogo = [];
    this.brandLogo.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.logoChanged = true;
  }

  clearBrandCreateDto() {
    this.brandCreateDto = new BrandDto();
  }

  created() {
    this.pagination.page = 1;
    this.search();
    this.getFoodCategories();
  }
}
</script>
