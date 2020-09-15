<template>
  <section v-if="brandDto">
    <SectionTitle title="브랜드 관리" divider>
      <template v-slot:rightArea>
        <router-link to="/brand" class="btn btn-secondary">목록으로</router-link>
      </template>
    </SectionTitle>
    <b-row>
      <b-col md="5">
        <BaseCard title="브랜드 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_brand>삭제하기</b-button>
              <b-button variant="primary" v-b-modal.update_brand @click="showUpdateModal()">수정하기</b-button>
            </div>
          </template>
          <template v-slot:body>
            <div>
              <div v-if="brandDto.logo && brandDto.logo.length > 0">
                <div v-for="logo in brandDto.logo" :key="logo.endpoint">
                  <b-img-lazy
                    :src="logo.endpoint"
                    class="rounded mx-auto d-block company-logo"
                    style="max-height:80px"
                  />
                </div>
              </div>
              <ul class="u-list">
                <li v-if="brandDto.nameKr">
                  브랜드명 : {{ brandDto.nameKr }}
                  <span v-if="brandDto.nameEng">({{ brandDto.nameEng }})</span>
                </li>
                <li v-if="brandDto.category">
                  업종 : {{ brandDto.category.nameKr }}
                  <span
                    v-if="brandDto.category.code"
                  >({{ brandDto.category.code }} )</span>
                </li>
                <li v-if="brandDto.desc">설명 : {{ brandDto.desc }}</li>
                <li v-if="brandDto.showYn">
                  노출 여부 :
                  <b-badge
                    :variant="brandDto.showYn === 'Y' ? 'success' : 'danger'"
                  >{{ brandDto.showYn }}</b-badge>
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col md="7">
        <BaseCard title="브랜드 메뉴" no-body>
          <template v-slot:head>
            <div>
              <b-button variant="success" v-b-modal.add_menu>추가하기</b-button>
            </div>
          </template>
          <div v-if="!dataLoading" class="table-responsive">
            <table class="table table-hover" v-if="menuTotalCount">
              <thead>
                <tr>
                  <th scope="col">NO</th>
                  <th scope="col">메뉴명</th>
                  <th scope="col">노출 여부</th>
                  <th scope="col">생성날짜</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="menu in menus" :key="menu.no" style="cursor:pointer">
                  <td>{{ menu.no }}</td>
                  <td>{{ menu.nameKr }}</td>
                  <td>
                    <b-badge :variant="menu.showYn === 'Y' ? 'success' : 'danger'">{{ menu.showYn }}</b-badge>
                  </td>
                  <td>{{ menu.createdAt | dateTransformer }}</td>
                  <td>
                    <b-button variant="primary" v-b-modal.update_menu>수정하기</b-button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-data">등록된 메뉴가 없습니다.</div>
          </div>
          <b-pagination
            v-model="pagination.page"
            v-if="menuTotalCount"
            pills
            :total-rows="menuTotalCount"
            :per-page="pagination.limit"
            @input="paginateSearch()"
            class="mt-4 justify-content-center"
          ></b-pagination>
          <div class="half-circle-spinner mt-5" v-if="dataLoading">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
          </div>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 브랜드 수정 모달 -->
    <b-modal id="update_brand" title="브랜드 수정" ok-title="수정" cancel-title="취소" @ok="updateBrand()">
      <b-row no-gutters align-h="end">
        <b-form-group label="노출 여부" label-size="sm" label-text-align="right" label-cols="8">
          <b-form-checkbox
            switch
            size="lg"
            v-model="brandUpdateDto.showYn"
            :value="showYn[0]"
            :unchecked-value="showYn[1]"
          ></b-form-checkbox>
        </b-form-group>
      </b-row>
      <div v-if="brandDto.logo && brandDto.logo.length > 0 && !logoChanged" class="mb-4">
        <div v-for="logo in brandDto.logo" :key="logo.endpoint">
          <b-img-lazy
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:80px"
          />
        </div>
      </div>
      <div v-if="newBrandLogo && newBrandLogo.length > 0 && logoChanged" class="mb-4">
        <div v-for="logo in newBrandLogo" :key="logo.endpoint">
          <b-img-lazy
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:80px"
          />
        </div>
        <div class="text-center mt-2">
          <b-button variant="danger" @click="removeBrandLogo()">로고 제거</b-button>
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
            v-model="brandUpdateDto.categoryNo"
          >
            <option
              v-for="category in foodCategorySelect"
              :key="category.code"
              :value="category.no"
            >{{ category.nameKr }}</option>
          </select>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            브랜드 로고
            <span class="red-text">*</span>
          </label>
          <div class="custom-file">
            <!-- <input
              type="file"
              class="custom-file-input"
              id="customFileLang"
              lang="kr"
              @input="upload($event.target.files)"
            />
            <label class="custom-file-label" for="customFileLang"
              >로고 추가</label
            >-->
            <b-form-file placeholder="로고 추가" ref="fileInput" @input="upload($event)"></b-form-file>
          </div>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            브랜드명
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="brandUpdateDto.nameKr"></b-form-input>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>브랜드명 (영문)</label>
          <b-form-input v-model="brandUpdateDto.nameEng"></b-form-input>
        </b-col>
        <b-col cols="12" md="12" class="mb-3">
          <label>
            설명
            <span class="red-text">*</span>
          </label>
          <textarea
            class="form-control"
            maxlength="100"
            style="min-height:100px"
            v-model="brandUpdateDto.desc"
          ></textarea>
          <p
            class="text-length text-right"
            v-if="brandUpdateDto.desc && brandUpdateDto.desc.length"
          >
            <b class="text-primary">{{ brandUpdateDto.desc.length }}</b> / 100
          </p>
        </b-col>
      </b-form-row>
    </b-modal>
    <!-- 브랜드 삭제하기 -->
    <b-modal
      id="delete_brand"
      title="브랜드 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteOne()">삭제</b-button>
        </div>
      </div>
    </b-modal>
    <MenuCreate :brandNo="brandDto.no" />
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import {
  BrandDto,
  BrandUpdateDto,
  FoodCategoryDto,
  MenuDto,
  MenuListDto,
} from '@/dto';
import BrandService from '../../../services/brand.service';
import MenuService from '../../../services/menu.service';
import FoodCategoryService from '../../../services/food-category.service';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import toast from '../../../../resources/assets/js/services/toast.js';
import { CONST_YN, YN, Pagination } from '@/common';
import MenuCreate from '../../menu/components/MenuCreate.vue';
import MenuUpdate from '../../menu/components/MenuUpdate.vue';

@Component({
  name: 'BrandDetail',
  components: {
    MenuCreate,
    MenuUpdate,
  },
})
export default class BrandDetail extends BaseComponent {
  constructor() {
    super();
  }
  private brandDto = new BrandDto();
  private brandUpdateDto = new BrandUpdateDto();
  private foodCategorySelect: FoodCategoryDto[] = [];
  private newBrandLogo: FileAttachmentDto[] = [];
  private logoChanged = false;
  private showYn: YN[] = [...CONST_YN];
  private menus: MenuDto[] = [];
  private menuListDto = new MenuListDto();
  private menuTotalCount = null;
  private pagination = new Pagination();
  private dataLoading = false;

  // find for detail
  findOne(id) {
    BrandService.findOne(id).subscribe(res => {
      if (res) {
        this.brandDto = res.data;
        this.newBrandLogo = [];
        this.logoChanged = false;
      }
    });
  }

  // show update modal
  showUpdateModal() {
    this.getFoodCategories();
    this.brandUpdateDto = this.brandDto;
    this.findOne(this.$route.params.id);
  }

  // update brand
  updateBrand() {
    if (this.newBrandLogo.length > 0) {
      this.brandUpdateDto.logo = this.newBrandLogo;
    } else {
      delete this.brandUpdateDto.logo;
    }
    BrandService.update(this.$route.params.id, this.brandUpdateDto).subscribe(
      res => {
        if (res) {
          toast.success('수정완료');
          this.findOne(this.$route.params.id);
        }
      },
    );
  }

  searchMenus(isPagination?: boolean) {
    this.dataLoading = true;
    if (!isPagination) {
      this.pagination.page = 1;
    }
    this.menuListDto.brandNo = this.$route.params.id;
    this.pagination.limit = 5;
    MenuService.findAll(this.menuListDto, this.pagination).subscribe(res => {
      this.dataLoading = false;
      this.menus = res.data.items;
      this.menuTotalCount = res.data.totalCount;
    });
  }

  paginateSearch() {
    this.searchMenus(true);
  }

  // get food category
  getFoodCategories() {
    FoodCategoryService.findForSelect().subscribe(res => {
      this.foodCategorySelect = res.data;
    });
  }

  // upload brand logo
  async upload(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(
        UPLOAD_TYPE.BRAND_LOGO,
        [file],
      );
      this.newBrandLogo = [];
      this.newBrandLogo.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.logoChanged = true;
    }
  }

  // remove brand logo
  removeBrandLogo() {
    this.$refs['fileInput'].reset();
    this.logoChanged = false;
  }

  deleteOne() {
    BrandService.deleteOne(this.$route.params.id).subscribe(res => {
      if (res) {
        toast.success('삭제완료');
        this.$router.push('/brand');
      }
    });
  }

  created() {
    const id = this.$route.params.id;
    this.pagination.page = 1;
    this.searchMenus();
    this.findOne(id);
  }

  mounted() {
    this.$root.$on('menu_create', () => {
      this.searchMenus();
    });
  }
}
</script>
