<template>
  <section>
    <SectionTitle
      v-if="companyDto && companyDto.nameKr"
      :title="`${companyDto.nameKr} - 업체 정보`"
      divider
    >
      <template v-slot:rightArea>
        <router-link to="/company" class="btn btn-secondary text-center"
          >목록으로</router-link
        >
      </template>
    </SectionTitle>
    <div class="row d-flex align-items-stretch">
      <div class="my-3 col-12 col-lg-6">
        <BaseCard title="업체 정보">
          <template v-slot:head>
            <div>
              <b-button variant="danger" v-b-modal.delete_company
                >삭제하기</b-button
              >
              <b-button
                variant="primary"
                v-b-modal.company_info
                @click="showUpdateModal()"
                v-if="companyDto.companyStatus === 'APPROVAL'"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="companyDto">
              <div v-if="companyDto.logo && companyDto.logo.length > 0">
                <div v-for="logo in companyDto.logo" :key="logo.endpoint">
                  <b-img-lazy
                    :src="logo.endpoint"
                    class="rounded mx-auto d-block company-logo"
                    style="max-height:80px"
                  />
                </div>
              </div>
              <ul>
                <li v-if="companyDto.no">
                  업체 ID :
                  <b>{{ companyDto.no }}</b>
                </li>
                <li v-if="companyDto.nameKr">
                  업체명 :
                  <b>{{ companyDto.nameKr }}</b>
                  <span v-if="companyDto.nameEng"
                    >({{ companyDto.nameEng }})</span
                  >
                </li>
                <li v-if="companyDto.businessNo">
                  사업자 번호 :
                  <b>{{ companyDto.businessNo | bizNoTransformer }}</b>
                </li>
                <li v-if="companyDto.ceoKr">
                  대표명 :
                  <b>{{ companyDto.ceoKr }}</b>
                  <span v-if="companyDto.ceoEng"
                    >({{ companyDto.ceoEng }})</span
                  >
                </li>
                <li v-if="companyDto.phone">
                  전화번호 : {{ companyDto.phone | phoneTransformer }}
                </li>
                <li v-if="companyDto.email">
                  이메일 :
                  <a
                    :href="
                      `https://mail.google.com/mail/?view=cm&fs=1&to=${companyDto.email}`
                    "
                    target="_blank"
                    >{{ companyDto.email }}</a
                  >
                </li>
                <li v-if="companyDto.fax">
                  팩스 : {{ companyDto.fax | phoneTransformer }}
                </li>
                <li v-if="companyDto.address">
                  주소 : {{ companyDto.address }}
                </li>
                <li v-if="companyDto.website">
                  웹사이트 :
                  <a :href="companyDto.website" target="_blank">{{
                    companyDto.website
                  }}</a>
                </li>
                <li v-if="companyDto.createdAt">
                  등록일 : {{ companyDto.createdAt | dateTransformer }}
                </li>
                <li v-if="companyDto.createdAt">
                  승인 상태 :
                  <b-badge
                    :variant="getStatusColor(companyDto.companyStatus)"
                    class="badge-pill p-2 mr-2"
                    >{{ companyDto.companyStatus | enumTransformer }}</b-badge
                  >
                  <span v-if="companyDto.updatedAt" class="d-inline-block"
                    >({{ companyDto.updatedAt | dateTransformer }})</span
                  >
                </li>
              </ul>
            </div>
            <ApprovalCard
              :data="companyDto"
              :dto="companyUpdateRefusalDto"
              :reasonDto="companyUpdateRefusalReasonDto"
              status="companyStatus"
              histories="companyUpdateHistories"
              @approval="updateApproval()"
              @refusal="updateRefusal()"
            />
          </template>
        </BaseCard>
      </div>
      <!-- TODO: 관리자 처음 추가시 에러 -->
      <div class="my-3 col-12 col-lg-6" v-if="adminList">
        <BaseCard title="관리자 정보">
          <template v-slot:head>
            <div>
              <b-button
                variant="primary"
                v-b-modal.admin_list
                @click="findAdmin()"
                >수정하기</b-button
              >
            </div>
          </template>
          <template v-slot:body>
            <div v-if="companyDto.admin">
              <ul>
                <li>
                  관리자 ID:
                  <span>
                    <b>{{ companyDto.admin.no }}</b>
                  </span>
                </li>
                <li>
                  관리자 이름:
                  <span>
                    <b>{{ companyDto.admin.name }}</b>
                  </span>
                </li>
                <li>
                  관리자 휴대폰번호:
                  <span>
                    <b>{{ companyDto.admin.phone | phoneTransformer }}</b>
                  </span>
                </li>
              </ul>
            </div>
            <div v-else class="empty-data">관리자 없음</div>
          </template>
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="companyDto">
        <BaseCard title="업체 지점 정보" no-body>
          <template v-slot:head>
            <b-button variant="outline-info" @click="findAllDistrict()"
              >전체보기</b-button
            >
          </template>
          <CompanyDetailDistrictList />
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="companyDto">
        <BaseCard title="업체 사용자 정보" no-body>
          <template v-slot:head>
            <b-button variant="outline-info" @click="findAllCompanyUser()"
              >전체보기</b-button
            >
          </template>
          <CompanyDetailCompanyUserList />
        </BaseCard>
      </div>
    </div>

    <b-modal
      id="delete_company"
      title="업체 삭제"
      header-bg-variant="danger"
      header-text-variant="light"
      hide-footer
    >
      <div class="text-center">
        <p>
          <b>정말로 삭제하시겠습니까?</b>
        </p>
        <div class="mt-3">
          <input
            type="text"
            placeholder="업체 이름을 입력해주세요"
            name="delete_company"
            class="form-control"
            id="delete_company"
            v-model="deleteCompanyName"
          />
        </div>
        <div class="mt-2 text-right">
          <b-button variant="danger" @click="deleteCompany()">삭제</b-button>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="admin_list"
      title="관리자 수정하기"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
      @ok="updateCompany()"
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
            <td>{{ admin.phone }}</td>
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
    <b-modal
      id="company_info"
      title="업체 정보 수정"
      @ok="updateCompany()"
      @cancel="cancelSelection()"
    >
      <div
        v-if="companyDto.logo && companyDto.logo.length > 0 && !logoChanged"
        class="mb-4"
      >
        <div v-for="logo in companyDto.logo" :key="logo.endpoint">
          <b-img-lazy
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:80px"
          />
        </div>
      </div>
      <div v-if="newLogo && newLogo.length > 0 && logoChanged" class="mb-4">
        <div v-for="logo in newLogo" :key="logo.endpoint">
          <b-img-lazy
            :src="logo.endpoint"
            class="rounded mx-auto d-block company-logo"
            style="max-height:80px"
          />
        </div>
        <div class="text-center mt-2">
          <b-button variant="danger" @click="removeCompanyLogo()"
            >로고 제거</b-button
          >
        </div>
      </div>
      <div class="form-row">
        <div class="col-12 col-md-6 mt-2">
          <label>업체명</label>
          <input
            type="text"
            v-model="companyUpdateDto.nameKr"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>업체명(영문)</label>
          <input
            type="text"
            v-model="companyUpdateDto.nameEng"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>대표명</label>
          <input
            type="text"
            v-model="companyUpdateDto.ceoKr"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>대표명(영문)</label>
          <input
            type="text"
            v-model="companyUpdateDto.ceoEng"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>사업자 번호</label>
          <input
            type="text"
            v-model="companyUpdateDto.businessNo"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>이메일</label>
          <input
            type="text"
            v-model="companyUpdateDto.email"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>전화번호</label>
          <input
            type="text"
            v-model="companyUpdateDto.phone"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>팩스</label>
          <input
            type="text"
            v-model="companyUpdateDto.fax"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-12 mt-2">
          <label>주소</label>
          <input
            type="text"
            v-model="companyUpdateDto.address"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>웹사이트</label>
          <input
            type="text"
            v-model="companyUpdateDto.website"
            class="form-control"
          />
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>업체 로고</label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFileLang"
              lang="kr"
              v-on:change="upload($event.target.files)"
              multiple
            />
            <label class="custom-file-label" for="customFileLang"
              >로고 변경</label
            >
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script lang="ts">
import ApprovalCard from '../../../modules/_components/ApprovalCard.vue';
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { CodeManagementDto } from '../../../services/init/dto';

import {
  AdminDto,
  AdminListDto,
  CompanyDto,
  CompanyUpdateDto,
  CompanyUpdateRefusalDto,
  CompanyDistrictListDto,
  CompanyDistrictDto,
  CompanyUpdateRefusalReasonDto,
} from '../../../dto';
import { Pagination, YN, CONST_YN } from '../../../common';
import { BaseUser } from '../../../services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyDetailDistrictList from './CompanyDetailDistrictList.vue';
import CompanyDetailCompanyUserList from './CompanyDetailCompanyUserList.vue';

import AdminService from '../../../services/admin.service';
import CompanyService from '../../../services/company.service';
import {
  APPROVAL_STATUS,
  CONST_APPROVAL_STATUS,
} from '../../../services/shared';
import toast from '../../../../resources/assets/js/services/toast.js';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import { getStatusColor } from '../../../core/utils/status-color.util';

@Component({
  name: 'CompanyDetail',
  components: {
    ApprovalCard,
    BaseCard,
    CompanyDetailDistrictList,
    CompanyDetailCompanyUserList,
  },
})
export default class CompanyDetail extends BaseComponent {
  private adminList: AdminDto[] = [];
  private adminListDto = new AdminListDto();
  private adminListCount = 0;
  private approvalStatusSelect: APPROVAL_STATUS[] = [...CONST_APPROVAL_STATUS];

  private companyDto = new CompanyDto();
  private companyUpdateDto = new CompanyUpdateDto();
  private companyUpdateRefusalDto = new CompanyUpdateRefusalDto();
  private companyUpdateRefusalReasonDto = (this.companyUpdateRefusalDto.refusalReasons = new CompanyUpdateRefusalReasonDto());
  private pagination = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private newLogo: FileAttachmentDto[] = [];
  private logoChanged = false;
  private deleteCompanyName = '';

  // get status color
  getStatusColor(status) {
    return getStatusColor(status);
  }

  findOne(id) {
    // find founder consult detail
    CompanyService.findOne(id).subscribe(res => {
      this.companyDto = res.data;
    });
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

  // 업체 지점 전체 보기
  findAllDistrict() {
    this.$router.push({
      name: 'CompanyDistrictList',
      params: {
        companyNo: this.$route.params.id,
      },
    });
  }

  // 업체 사용자 전체 보기
  findAllCompanyUser() {
    this.$router.push({
      name: 'CompanyUserList',
      params: {
        companyNo: this.$route.params.id,
      },
    });
  }

  showUpdateModal() {
    this.companyUpdateDto = this.companyDto;
    this.findOne(this.$route.params.id);
  }

  updateCompany() {
    if (this.selectedAdmin) {
      this.companyUpdateDto.managerNo = this.selectedAdmin.no;
    }
    if (this.newLogo.length > 0) {
      this.companyUpdateDto.logo = this.newLogo;
    } else {
      delete this.companyUpdateDto.logo;
    }
    console.log(this.companyUpdateDto);
    CompanyService.update(
      this.$route.params.id,
      this.companyUpdateDto,
    ).subscribe(res => {
      if (res) {
        this.companyUpdateDto = new CompanyUpdateDto();
        this.findOne(this.$route.params.id);
        toast.success('수정완료');
      }
    });
  }

  // 삭제
  deleteCompany() {
    if (this.deleteCompanyName === this.companyDto.nameKr) {
      CompanyService.deleteCompany(this.$route.params.id).subscribe(res => {
        if (res) {
          this.$router.push('/company');
          toast.success('삭제완료');
        }
      });
    } else {
      toast.error('업체명을 정확히 입력해주세요');
    }
  }

  // 승인
  updateApproval() {
    CompanyService.updateCompanyStatus(
      this.$route.params.id,
      'approve-update',
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인완료');
      }
    });
  }

  // 거절
  updateRefusal() {
    CompanyService.updateCompanyStatus(
      this.$route.params.id,
      'refuse-update',
      this.companyUpdateRefusalDto,
    ).subscribe(res => {
      if (res) {
        this.findOne(this.$route.params.id);
        toast.success('승인거절');
      }
    });
  }

  async upload(file: FileList) {
    console.log(file);

    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.COMPANY_LOGO,
      file,
    );
    this.newLogo = [];
    this.newLogo.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );
    this.logoChanged = true;
  }

  removeCompanyLogo() {
    this.newLogo = [];
    this.logoChanged = false;
  }

  paginateSearch() {
    this.findAdmin(true);
  }

  selectAdmin(admin: AdminDto) {
    this.selectedAdmin = admin;
  }

  cancelSelection() {
    this.selectedAdmin = new AdminDto(BaseUser);
    this.logoChanged = false;
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>
