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
                    v-if="companyDto.companyStatus"
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
                v-b-modal.add_admin
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
            <b-button
              variant="outline-info"
              @click="
                $router.push({
                  path: '/company/company-district',
                  query: {
                    companyNameKr: companyDto.nameKr,
                    page: pagination.page,
                    limit: pagination.limit,
                  },
                })
              "
              >전체보기</b-button
            >
          </template>
          <CompanyDetailDistrictList />
        </BaseCard>
      </div>
      <div class="my-3 col-12 col-lg-6" v-if="companyDto">
        <BaseCard title="업체 사용자 정보" no-body>
          <template v-slot:head>
            <b-button
              variant="outline-info"
              @click="
                $router.push({
                  path: '/company/company-user',
                  query: {
                    companyNameKr: companyDto.nameKr,
                    page: pagination.page,
                    limit: pagination.limit,
                  },
                })
              "
              >전체보기</b-button
            >
          </template>
          <CompanyDetailCompanyUserList />
        </BaseCard>
      </div>
    </div>
    <!-- 업체 삭제 모달 -->
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
    <!-- 관리자 수정 모달 -->
    <b-modal
      id="add_admin"
      title="관리자 수정"
      ok-title="수정"
      cancel-title="취소"
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
        v-model="paginationAdmin.page"
        v-if="adminListCount"
        pills
        :total-rows="adminListCount"
        :per-page="paginationAdmin.limit"
        @input="paginateSearch"
        class="mt-4 justify-content-center"
      ></b-pagination>
    </b-modal>
    <!-- 업체 정보 수정 모달 -->
    <b-modal
      id="company_info"
      title="업체 정보 수정"
      ok-title="수정"
      cancel-title="취소"
      @ok="updateCompany()"
      @cancel="cancelSelection()"
      @hide="cancelSelection()"
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
          <b-form-file
            placeholder="파일 선택"
            ref="fileInput"
            @input="upload($event)"
          ></b-form-file>
        </div>
        <div class="col-12 col-md-6 mt-2">
          <label>업체 상태</label>
          <select
            class="custom-select"
            v-model="companyUpdateDto.companyStatus"
          >
            <option value>전체</option>
            <option
              v-for="status in approvalStatusSelect"
              :key="status.key"
              :value="status.key"
              >{{ status.value }}</option
            >
          </select>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script lang="ts">
import ApprovalCard from '@/modules/_components/ApprovalCard.vue';
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { CodeManagementDto } from '@/services/init/dto';

import {
  AdminDto,
  AdminListDto,
  CompanyDto,
  CompanyUpdateDto,
  CompanyUpdateRefusalDto,
  CompanyDistrictListDto,
  CompanyDistrictDto,
  CompanyUpdateRefusalReasonDto,
} from '@/dto';
import { Pagination, YN, CONST_YN } from '@/common';
import { BaseUser } from '@/services/shared/auth';
import BaseCard from '../../_components/BaseCard.vue';
import CompanyDetailDistrictList from './CompanyDetailDistrictList.vue';
import CompanyDetailCompanyUserList from './CompanyDetailCompanyUserList.vue';

import AdminService from '@/services/admin.service';
import CompanyService from '@/services/company.service';
import { APPROVAL_STATUS, CONST_APPROVAL_STATUS } from '@/services/shared';
import toast from '../../../../resources/assets/js/services/toast.js';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '@/services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '@/services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import { getStatusColor } from '@/core/utils/status-color.util';
import CodeManagementService from '@/services/code-management.service';

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
  private adminListCount = null;
  private approvalStatusSelect: CodeManagementDto[] = [];

  private companyDto = new CompanyDto();
  private companyUpdateDto = new CompanyUpdateDto();
  private companyUpdateRefusalDto = new CompanyUpdateRefusalDto();
  private companyUpdateRefusalReasonDto = (this.companyUpdateRefusalDto.refusalReasons = new CompanyUpdateRefusalReasonDto());
  private pagination = new Pagination();
  private paginationAdmin = new Pagination();
  private selectedAdmin: AdminDto = new AdminDto(BaseUser);
  private newLogo: FileAttachmentDto[] = [];
  private logoChanged = false;
  private deleteCompanyName = null;

  // get status color
  getStatusColor(status: APPROVAL_STATUS) {
    return getStatusColor(status);
  }

  // find company detail
  findOne(id) {
    CompanyService.findOne(id).subscribe(res => {
      this.companyDto = res.data;
    });
  }

  findAdmin(isPagination: boolean) {
    if (!isPagination) {
      this.paginationAdmin.page = 1;
    }
    this.paginationAdmin.limit = 5;
    AdminService.findAll(this.adminListDto, this.paginationAdmin).subscribe(
      res => {
        this.adminList = res.data.items;
        this.adminListCount = res.data.totalCount;
      },
    );
  }

  findApprovalStatus() {
    CodeManagementService.findAnyCode('APPROVAL_STATUS').subscribe(res => {
      this.approvalStatusSelect = res.data;
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

  // upload company logo
  async upload(file: File) {
    const attachments = await FileUploadService.upload(
      UPLOAD_TYPE.COMPANY_LOGO,
      [file],
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

  // remove company logo
  removeCompanyLogo() {
    this.$refs['fileInput'].reset();
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
    this.findApprovalStatus();
    this.findOne(id);
  }
}
</script>
