<template>
  <section v-if="adminDto">
    <SectionTitle :title="`${adminDto.name} - 관리자 정보`">
      <template v-slot:rightArea>
        <router-link to="/admin" class="btn btn-secondary"
          >목록으로</router-link
        >
        <b-button variant="primary" @click="updateAdmin()">수정하기</b-button>
        <b-button variant="danger" v-b-modal.delete_admin>영구삭제</b-button>
      </template>
    </SectionTitle>
    <b-row>
      <b-col xl="4" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <b-button
              variant="outline-info"
              v-b-modal.update_admin
              v-if="
                (myPageDto.authCode && myPageDto.authCode.includes('SUPER')) ||
                  adminDto.no === myPageDto.no
              "
              >비밀번호 변경</b-button
            >
          </template>
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li v-if="adminDto.no">사용자 ID : {{ adminDto.no }}</li>
                <li>
                  <b-form-group label="사용자명">
                    <b-form-input v-model="adminDto.name"> </b-form-input>
                  </b-form-group>
                </li>
                <li>
                  <b-form-group label="휴대폰 번호">
                    <b-form-input v-model="adminDto.phone"> </b-form-input>
                  </b-form-group>
                </li>
                <li>
                  <b-form-group>
                    <label for="space_type">담당 공유주방</label>
                    <select
                      class="custom-select"
                      id="space_type"
                      v-model="adminDto.spaceTypeNo"
                    >
                      <option value selected>전체</option>
                      <option
                        v-for="spaceType in spaceTypes"
                        :key="spaceType.no"
                        :value="spaceType.no"
                        >{{ spaceType.name }}</option
                      >
                    </select>
                  </b-form-group>
                </li>
                <li v-if="adminDto.createdAt">
                  가입 일시 : {{ adminDto.createdAt | dateTransformer }}
                </li>
                <li v-if="adminDto.lastLoginAt">
                  마지막 로그인 일시 :
                  {{ adminDto.lastLoginAt | dateTransformer }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <b-modal
      id="update_admin"
      title="비밀변호 변경"
      ok-title="변경"
      cancel-title="취소"
      @ok="updateAdmin()"
    >
      <form ref="form" @submit.stop.prevent="updateAdmin()">
        <b-form-row>
          <!-- <b-col cols="6" class="mt-2">
            <label>
              이름
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="adminUpdateDto.name"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" class="mt-2">
            <label>
              휴대폰 번호
              <span class="red-text">*</span>
            </label>
            <input
              type="text"
              v-model="adminUpdateDto.phone"
              class="form-control"
            />
          </b-col> -->
          <b-col cols="6" class="mt-2">
            <label>
              비밀번호
              <span class="red-text">*</span>
            </label>
            <input
              type="password"
              v-model="adminDto.password"
              class="form-control"
            />
          </b-col>
          <b-col cols="6" class="mt-2">
            <label>
              비밀번호 확인
              <span class="red-text">*</span>
            </label>
            <input
              type="password"
              v-model="adminDto.passwordConfirm"
              class="form-control"
            />
          </b-col>
          <!-- <b-col cols="12" class="mt-2">
            <label for="space_type">담당 공유주방</label>
            <select
              class="custom-select"
              id="space_type"
              v-model="adminUpdateDto.spaceTypeNo"
            >
              <option value selected>전체</option>
              <option
                v-for="spaceType in spaceTypes"
                :key="spaceType.no"
                :value="spaceType.no"
                >{{ spaceType.name }}</option
              >
            </select>
          </b-col> -->
        </b-form-row>
      </form>
    </b-modal>
    <!-- 관리자 삭제 하기 -->
    <b-modal
      id="delete_admin"
      title="관리자 삭제"
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
import { AdminDto, SpaceTypeDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import { Component, Vue } from 'vue-property-decorator';
import AdminService from '@/services/admin.service';
import SpaceTypeService from '@/services/space-type.service';
import { SPACE_TYPE } from '@/services/shared';
import toast from '../../../../resources/assets/js/services/toast.js';
@Component({
  name: 'AdminDetail',
})
export default class AdminDetail extends BaseComponent {
  private adminDto = new AdminDto(BaseUser);
  private spaceTypes: SpaceTypeDto[] = [];
  private adminUpdateDto: AdminDto = new AdminDto(BaseUser);
  private myPageDto: AdminDto = new AdminDto(BaseUser);

  findMe() {
    AdminService.findMe().subscribe(res => {
      if (res) {
        this.myPageDto = res.data;
      }
    });
  }

  findOne() {
    AdminService.findOne(this.$route.params.id).subscribe(res => {
      this.adminDto = res.data;
    });
  }

  findSpaceType() {
    SpaceTypeService.findForSelect().subscribe(res => {
      this.spaceTypes = res.data;
    });
  }

  showUpdateModal() {
    AdminService.findOne(this.$route.params.id).subscribe(res => {
      this.adminUpdateDto = res.data;
    });
  }

  updateAdmin() {
    AdminService.update(this.$route.params.id, this.adminDto).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.findOne();
      }
    });
  }

  deleteOne() {
    AdminService.hardDelete(this.$route.params.id).subscribe(res => {
      if (res) {
        toast.success('삭제완료');
        this.$router.push('/admin');
      }
    });
  }

  created() {
    this.findSpaceType();
    this.findOne();
    this.findMe();
  }
}
</script>
