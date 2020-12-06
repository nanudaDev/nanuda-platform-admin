<template>
  <section>
    <SectionTitle title="프로모션 상세" divider>
      <template v-slot:rightArea>
        <router-link to="/company-district-promotion" class="btn btn-secondary"
          >목록으로</router-link
        >
        <b-button variant="primary" @click="updateOne()">
          수정하기
        </b-button>
        <!-- <b-button variant="danger" v-b-modal.delete_promotion>
          삭제하기
        </b-button> -->
      </template>
    </SectionTitle>
    <b-form-row>
      <b-col lg="12">
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
              v-model="promotionDto.showYn"
              :value="showYn[0]"
              :unchecked-value="showYn[1]"
            ></b-form-checkbox>
          </b-form-group>
        </b-row>
      </b-col>
      <b-col cols="12">
        <b-form-group label="프로모션 타입">
          <b-form-select v-model="promotionDto.promotionType">
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
          <b-form-input v-model="promotionDto.title"></b-form-input>
        </b-form-group>
        <b-form-group label="프로모션 제목 (노출용)">
          <b-form-input v-model="promotionDto.displayTitle"></b-form-input>
        </b-form-group>
        <b-form-group label="프로모션 내용 요약">
          <b-form-input v-model="promotionDto.summary"></b-form-input>
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
          v-model="promotionDto.desc"
          :editorToolbar="editorToolbar"
        ></vue-editor>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label="프로모션 시작 날짜">
          <b-form-datepicker
            id="started"
            v-model="startedDate"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <b-col cols="12" md="6">
        <b-form-group label="프로모션 종료 날짜">
          <b-form-datepicker
            id="ended"
            v-model="endedDate"
            :disabled="startedDate ? false : true"
          ></b-form-datepicker>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group label="프로모션 지점 선택">
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-checkbox
                @change="addDistrict(district.no)"
                v-for="district in companyDistrictSelect"
                :key="district.no"
                :value="district.no"
                v-model="companyDistrictSelectedIds"
              >
                <b>{{ district.nameKr }}</b> ({{ district.company.nameKr }})
              </b-form-checkbox>
            </b-col>
          </b-row>
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-modal
      id="delete_promotion"
      title="프로모션 삭제"
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
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { CompanyDistrictDto, CompanyDistrictPromotionDto } from '@/dto';
import CompanyDistrictPromotionService from '@/services/company-district-promotion.service';
import CompanyDistrictService from '@/services/company-district.service';
import CodeManagementService from '@/services/code-management.service';
import { CONST_YN, YN, Pagination } from '@/common';
import toast from '../../../../resources/assets/js/services/toast.js';
import { VueEditor } from 'vue2-editor';
import { EditorConfig } from '../../../config';

@Component({
  name: 'PromotionDetail',
  components: {
    VueEditor,
  },
})
export default class CompanyDistrictPromotionDetail extends BaseComponent {
  private promotionDto = new CompanyDistrictPromotionDto();
  private companyDistrictDto = new CompanyDistrictDto();
  private promitionTypeSelect = [];
  private companyDistrictSelect: CompanyDistrictDto[] = [];
  private showYn: YN[] = [...CONST_YN];
  private companyDistrictIds: number[] = [];
  private companyDistrictSelectedIds: number[] = [];
  private editorToolbar = EditorConfig;
  private startedDate = new Date();
  private endedDate = new Date();

  findOne(id) {
    CompanyDistrictPromotionService.findOne(id).subscribe(res => {
      if (res) {
        this.promotionDto = res.data;
        if (this.promotionDto.companyDistricts.length > 0) {
          this.companyDistrictSelectedIds = this.promotionDto.companyDistricts.map(
            v => v.no,
          );
        }
        this.startedDate = this.promotionDto.started;
        this.endedDate = this.promotionDto.ended;
      }
    });
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

  updateOne() {
    if (this.companyDistrictSelectedIds) {
      this.promotionDto.companyDistrictIds = this.companyDistrictSelectedIds;
    }
    if (this.startedDate) {
      this.promotionDto.started = this.startedDate;
    }
    if (this.endedDate) {
      this.promotionDto.ended = this.endedDate;
    }
    CompanyDistrictPromotionService.update(
      this.$route.params.id,
      this.promotionDto,
    ).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne(this.$route.params.id);
      }
    });
  }

  deleteOne() {
    CompanyDistrictPromotionService.deleteOne(this.$route.params.id).subscribe(
      res => {
        if (res) {
          toast.success('삭제완료');
          this.$router.push('/company-district-promotion');
        }
      },
    );
  }

  created() {
    this.findOne(this.$route.params.id);
    this.getCompanyDistrict();
    this.getCommonCodes();
  }
}
</script>
