<template>
  <section v-if="brandDto">
    <SectionTitle :title="`${brandDto.nameKr} - 브랜드 정보`" divider>
      <template v-slot:rightArea>
        <router-link to="/brand" class="btn btn-secondary"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col lg="5" class="my-3">
        <BaseCard title="브랜드 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_brand
                >삭제하기</b-button
              >
              <b-button
                variant="primary"
                v-b-modal.update_brand
                @click="showUpdateModal()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div>
              <b-row>
                <b-col>
                  <div v-if="brandDto.logo && brandDto.logo.length > 0">
                    <div v-for="logo in brandDto.logo" :key="logo.endpoint">
                      <b-img-lazy
                        :src="logo.endpoint"
                        class="rounded mx-auto d-block company-logo"
                        style="max-height:80px"
                      />
                    </div>
                  </div>
                </b-col>
                <b-col
                  v-if="
                    brandDto.mainMenuImage && brandDto.mainMenuImage.length > 0
                  "
                >
                  <div>
                    <div
                      v-for="image in brandDto.mainMenuImage"
                      :key="image.endpoint"
                    >
                      <b-img-lazy
                        :src="image.endpoint"
                        class="rounded mx-auto d-block company-logo"
                        style="max-height:80px"
                      />
                    </div>
                  </div>
                </b-col>
              </b-row>
              <ul class="u-list">
                <li v-if="brandDto.nameKr">
                  브랜드명 : {{ brandDto.nameKr }}
                  <span v-if="brandDto.nameEng">({{ brandDto.nameEng }})</span>
                </li>
                <li v-if="brandDto.category">
                  업종 : {{ brandDto.category.nameKr }}
                  <span v-if="brandDto.category.code"
                    >({{ brandDto.category.code }} )</span
                  >
                </li>
                <li v-if="brandDto.desc">설명 : {{ brandDto.desc }}</li>
                <li v-if="brandDto.showYn">
                  노출 여부 :
                  <b-badge
                    :variant="brandDto.showYn === 'Y' ? 'success' : 'danger'"
                    >{{ brandDto.showYn }}</b-badge
                  >
                </li>
                <li v-if="brandDto.costValue">
                  창업 비용: {{ brandDto.costValue.value }}
                </li>
                <li v-if="brandDto.storeCountValue">
                  매장 수: {{ brandDto.storeCountValue.value }}
                </li>
                <li v-if="brandDto.difficultyValue">
                  조리 난이도: {{ brandDto.difficultyValue.value }}
                </li>
              </ul>
            </div>
            <div
              class="bg-light border text-right p-3 mt-3"
              v-if="revenues && revenues.length > 0"
            >
              <div>
                <b-row
                  no-gutters
                  align-h="between"
                  align-v="center"
                  class="mb-2"
                  v-for="revenue in revenues"
                  :key="revenue.nanudaName"
                >
                  <span> {{ revenue.nanudaName }}</span>
                  <p>{{ revenue.sum | currencyTransformer }}</p>
                </b-row>
              </div>
              <div class="pt-2 border-top">
                <b-row no-gutters align-h="between" align-v="end">
                  <span>TOTAL</span>
                  <h4>
                    <b>
                      {{ totalRevenue | currencyTransformer }}
                    </b>
                  </h4>
                </b-row>
              </div>
            </div>
          </template>
        </BaseCard>
      </b-col>
      <b-col lg="7" class="my-3">
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
                  <th scope="col">ID</th>
                  <th scope="col">메뉴명</th>
                  <th scope="col">노출 여부</th>
                  <th scope="col">대표 메뉴</th>
                  <th scope="col">생성날짜</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="menu in menus" :key="menu.no" style="cursor:pointer">
                  <td>{{ menu.no }}</td>
                  <td>{{ menu.nameKr }}</td>
                  <td>
                    <b-badge
                      :variant="menu.showYn === 'Y' ? 'success' : 'danger'"
                      >{{ menu.showYn }}</b-badge
                    >
                  </td>
                  <td>
                    <b-badge
                      :variant="menu.mainYn === 'Y' ? 'success' : 'danger'"
                      >{{ menu.mainYn }}</b-badge
                    >
                  </td>
                  <td>{{ menu.createdAt | dateTransformer }}</td>
                  <td>
                    <b-button
                      variant="primary"
                      v-b-modal.update_menu
                      @click="showMenuUpdateModal(menu.no)"
                      >수정하기</b-button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else class="empty-data">등록된 메뉴가 없습니다.</div>
            <b-pagination
              v-model="pagination.page"
              v-if="menuTotalCount"
              pills
              :total-rows="menuTotalCount"
              :per-page="pagination.limit"
              @input="paginateSearch()"
              class="mt-4 justify-content-center"
            ></b-pagination>
          </div>
          <div class="half-circle-spinner mt-5" v-if="dataLoading">
            <div class="circle circle-1"></div>
            <div class="circle circle-2"></div>
          </div>
        </BaseCard>
      </b-col>
      <!-- <b-col cols="12" class="my-3" v-if="revenues && revenues.length > 0">
        <BaseCard title="키오스크 매출">
          <template v-slot:head>
            {{ brandDto.updatedAt | dateTransformer }} 기준
          </template>
          <template v-slot:body>
            <b-row align-v="start">
              <b-col md="5">
                <BrandRevenusGraph />
              </b-col>
              <b-col md="7">
                <table class="table table-lg">
                  <tfoot>
                    <tr>
                      <th class="text-left" scope="row">
                        <b>TOTAL</b>
                      </th>
                      <td class="text-right">
                        <h4>{{ totalRevenue | currencyTransformer }}</h4>
                      </td>
                    </tr>
                  </tfoot>
                  <tbody>
                    <tr v-for="revenue in revenues" :key="revenue.nanudaName">
                      <th class="text-left" scope="row">
                        {{ revenue.nanudaName }}
                      </th>
                      <td class="text-right">
                        {{ revenue.sum | currencyTransformer }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
          </template>
        </BaseCard>
      </b-col> -->
    </b-row>
    <!-- 브랜드 수정 모달 -->
    <b-modal
      id="update_brand"
      title="브랜드 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateBrand()"
      size="lg"
    >
      <b-row no-gutters align-h="end">
        <b-form-group
          label="노출 여부"
          label-size="sm"
          label-text-align="right"
          label-cols="8"
        >
          <b-form-checkbox
            switch
            size="lg"
            v-model="brandUpdateDto.showYn"
            :value="showYn[0]"
            :unchecked-value="showYn[1]"
          ></b-form-checkbox>
        </b-form-group>
      </b-row>
      <b-form-row>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            브랜드 로고
            <span class="red-text">*</span>
          </label>
          <div class="my-2">
            <div
              v-if="brandDto.logo && brandDto.logo.length > 0 && !logoChanged"
              class="mb-4"
            >
              <div v-for="logo in brandDto.logo" :key="logo.endpoint">
                <b-img-lazy
                  :src="logo.endpoint"
                  class="rounded mx-auto d-block company-logo"
                  style="max-height:80px"
                />
              </div>
            </div>
            <div v-if="!brandDto.logo && !newBrandLogo" class="mb-4">
              <b-img-lazy
                class="rounded mx-auto d-block company-logo"
                :src="
                  require('@/assets/images/general/common/img_placeholder.jpg')
                "
                rounded
                style="max-height:80px"
              />
            </div>
            <div
              v-if="newBrandLogo && newBrandLogo.length > 0 && logoChanged"
              class="mb-4"
            >
              <div v-for="logo in newBrandLogo" :key="logo.endpoint">
                <b-img-lazy
                  :src="logo.endpoint"
                  class="rounded mx-auto d-block company-logo"
                  style="max-height:80px"
                />
              </div>
              <div class="text-center mt-2">
                <b-button variant="danger" @click="removeBrandLogo()"
                  >로고 제거</b-button
                >
              </div>
            </div>
          </div>
          <div class="custom-file">
            <b-form-file
              placeholder="파일 첨부"
              ref="fileInput"
              @input="upload($event)"
            ></b-form-file>
          </div>
        </b-col>
        <b-col cols="12" md="6" class="mb-3">
          <label>
            메인 메뉴 이미지
            <span class="red-text">*</span>
          </label>
          <div class="my-2">
            <div
              v-if="
                brandDto.mainMenuImage &&
                  brandDto.mainMenuImage.length > 0 &&
                  !menuChanged
              "
              class="mb-4"
            >
              <div
                v-for="image in brandDto.mainMenuImage"
                :key="image.endpoint"
              >
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block company-logo"
                  style="max-height:80px"
                />
              </div>
            </div>

            <div
              v-if="newMainMenu && newMainMenu.length > 0 && menuChanged"
              class="mb-4"
            >
              <div v-for="image in newMainMenu" :key="image.endpoint">
                <b-img-lazy
                  :src="image.endpoint"
                  class="rounded mx-auto d-block company-logo"
                  style="max-height:80px"
                />
              </div>
              <div class="text-center mt-2">
                <b-button variant="danger" @click="removeMainMenu()"
                  >메뉴 이미지 제거</b-button
                >
              </div>
            </div>
            <div
              v-if="!brandDto.mainMenuImage && newMainMenu.length === 0"
              class="mb-4"
            >
              <b-img-lazy
                class="rounded mx-auto d-block company-logo"
                :src="
                  require('@/assets/images/general/common/img_placeholder.jpg')
                "
                rounded
                style="max-height:80px"
              />
            </div>
          </div>
          <div class="custom-file">
            <b-form-file
              placeholder="파일 첨부"
              ref="fileInputMainMenu"
              @input="uploadMainmenu($event)"
            ></b-form-file>
          </div>
        </b-col>
        <b-col cols="12" md="4" class="mb-3">
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
              >{{ category.nameKr }}</option
            >
          </select>
        </b-col>
        <b-col cols="12" md="4" class="mb-3">
          <label>
            브랜드명
            <span class="red-text">*</span>
          </label>
          <b-form-input v-model="brandUpdateDto.nameKr"></b-form-input>
        </b-col>
        <b-col cols="12" md="4" class="mb-3">
          <label>브랜드명 (영문)</label>
          <b-form-input v-model="brandUpdateDto.nameEng"></b-form-input>
        </b-col>
        <b-col cols="4" md="4" class="mb-3">
          <label>창업 비용</label>
          <select
            id="brand_cost"
            class="custom-select"
            v-model="brandUpdateDto.cost"
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
          <label>매장 수</label>
          <select
            id="brand_store_count"
            class="custom-select"
            v-model="brandUpdateDto.storeCount"
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
        <b-col cols="4" md="4" class="mb-3">
          <label>조리 난이도</label>
          <select
            id="brand_difficulty"
            class="custom-select"
            v-model="brandUpdateDto.difficulty"
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
        <b-col cols="12" md="12" class="mb-3">
          <label>브랜드 설명</label>
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
        <b-col cols="12" md="4">
          <label>키오스크 아이디</label>
          <b-form-input v-model="brandUpdateDto.kioskNo"></b-form-input>
        </b-col>
        <!-- TODO: CASE 2 때는 삭제 -->
        <b-col md="12">
          <span class="red-text text-center" style="font0-size:11px">
            <i>
              아래 부분은
              <b>개발자들만이</b> 사용할 수 있으며 잘못 사용하실 경우 운영
              사이트에 정확한 정보를 노출 못할 수도 있습니다
            </i>
          </span>
          <b-form-group label-cols="3" label="공간 유형">
            <b-form-radio
              v-model="brandUpdateDto.spaceTypeNo"
              v-for="type in spaceType"
              :key="type"
              :value="type"
              name="space_type_no"
              >{{ type }}</b-form-radio
            >
          </b-form-group>
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
    <MenuUpdate />
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import {
  BrandDto,
  BrandKioskMapperDto,
  BrandUpdateDto,
  FoodCategoryDto,
  MenuDto,
  MenuListDto,
} from '@/dto';
import BrandService from '../../../services/brand.service';
import PaymentListService from '../../../services/payment-list.service';
import MenuService from '../../../services/menu.service';
import FoodCategoryService from '../../../services/food-category.service';
import CodeManagementService from '../../../services/code-management.service';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import toast from '../../../../resources/assets/js/services/toast.js';
import { CONST_YN, YN, Pagination } from '@/common';
import MenuCreate from '../../menu/components/MenuCreate.vue';
import MenuUpdate from '../../menu/components/MenuUpdate.vue';
import { CONST_SPACE_TYPE, SPACE, SPACE_TYPE } from '@/services/shared';
import { CodeManagementDto } from '@/services/init/dto';
import BrandKioskMapperService from '../../../services/brand-kiosk-mapper.service';
// import BrandRevenusGraph from './BrandRevenusGraph.vue';

@Component({
  name: 'BrandDetail',
  components: {
    MenuCreate,
    MenuUpdate,
    // BrandRevenusGraph,
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
  private newMainMenu: FileAttachmentDto[] = [];
  private menuChanged = false;
  private showYn: YN[] = [...CONST_YN];
  private spaceType = [2, 1];
  private menus: MenuDto[] = [];
  private menuListDto = new MenuListDto();
  private menuTotalCount = null;
  private pagination = new Pagination();
  private dataLoading = false;
  private storeCountValues: CodeManagementDto[] = [];
  private costValues: CodeManagementDto[] = [];
  private difficultyValues: CodeManagementDto[] = [];
  private brandRevenueInfo = new BrandKioskMapperDto();
  private revenues: BrandKioskMapperDto[] = [];
  private totalRevenue = null;
  // find for detail
  findOne(id) {
    BrandService.findOne(id).subscribe(res => {
      if (res) {
        this.brandDto = res.data;
        this.newBrandLogo = [];
        this.logoChanged = false;
        this.newMainMenu = [];
        this.menuChanged = false;
      }
      // if (this.brandDto.kioskNo) {
      //   PaymentListService.findRevenueForBrand(this.brandDto.kioskNo).subscribe(
      //     res => {
      //       this.todayRevenue = res.data.sum;
      //     },
      //   );
      // }
      this.brandRevenueInfo.brandNo = id;
      // this.brandRevenueInfo.started = new Date('2020-10-06');
      BrandKioskMapperService.getRevenueForBrand(
        this.brandRevenueInfo,
      ).subscribe(res => {
        this.revenues = res.data;

        function amount(item) {
          return item.sum;
        }
        function sum(prev, next) {
          return prev + next;
        }
        this.totalRevenue = this.revenues.map(amount).reduce(sum);
      });
    });
  }

  // show update modal
  showUpdateModal() {
    this.getFoodCategories();
    this.brandUpdateDto = this.brandDto;
    this.findOne(this.$route.params.id);
  }

  showMenuUpdateModal(menuNo) {
    this.$root.$emit('menu_update', menuNo);
    this.$bvModal.show('update_menu');
  }

  // update brand
  updateBrand() {
    if (this.newBrandLogo.length > 0) {
      this.brandUpdateDto.logo = this.newBrandLogo;
    } else {
      delete this.brandUpdateDto.logo;
    }

    if (this.newMainMenu.length > 0) {
      this.brandUpdateDto.mainMenuImage = this.newMainMenu;
    } else {
      delete this.brandUpdateDto.mainMenuImage;
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
    this.newBrandLogo = [];
    this.$refs['fileInput'].reset();
    this.logoChanged = false;
  }

  // upload main menu
  async uploadMainmenu(file: File) {
    if (file) {
      const attachments = await FileUploadService.upload(
        UPLOAD_TYPE.MAIN_MENU_IMAGE,
        [file],
      );
      this.newMainMenu = [];
      this.newMainMenu.push(
        ...attachments.filter(
          fileUpload =>
            fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
        ),
      );
      this.menuChanged = true;
    }
  }

  // remove main menu
  removeMainMenu() {
    this.newMainMenu = [];
    this.$refs['fileInputMainMenu'].reset();
    this.menuChanged = false;
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
    this.getCommonCodes();
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
