<template>
  <section v-if="adminDto">
    <SectionTitle :title="`${adminDto.name} - 관리자 정보`">
      <template v-slot:rightArea>
        <router-link to="/admin" class="btn btn-secondary"
          >목록으로</router-link
        >
        <b-button
          variant="primary"
          v-b-modal.update_admin
          @click="showUpdateModal()"
          >수정하기</b-button
        >
      </template>
    </SectionTitle>
    <b-row>
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li v-if="adminDto.no">사용자 ID : {{ adminDto.no }}</li>
                <li v-if="adminDto.name">사용자명 : {{ adminDto.name }}</li>
                <li v-if="adminDto.phone">
                  휴대폰 번호 :
                  <span>{{ adminDto.phone | phoneTransformer }}</span>
                </li>

                <li v-if="adminDto.createdAt">
                  가입 일시 : {{ adminDto.createdAt | dateTransformer }}
                </li>
                <li v-if="adminDto.lastLoginAt">
                  마지막 로그인 일시 :
                  {{ adminDto.lastLoginAt | dateTransformer }}
                </li>
                <li v-if="adminDto.spaceTypeNo">
                  담당 공유주방 :
                  {{ adminDto.spaceType.name }}
                </li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <b-modal
      id="update_admin"
      title="관리자 수정"
      ok-title="수정하기"
      cancel-title="취소"
      size="sm"
      @ok="updateAdmin()"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-row>
          <b-col cols="6" class="mt-2">
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
          </b-col>
          <b-col cols="6" class="mt-2">
            <label>
              비밀번호
              <span class="red-text">*</span>
            </label>
            <input
              type="password"
              v-model="adminUpdateDto.password"
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
              v-model="adminUpdateDto.passwordConfirm"
              class="form-control"
            />
          </b-col>
          <b-col cols="12" class="mt-2">
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
          </b-col>
        </b-form-row>
      </form>
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

@Component({
  name: 'AdminDetail',
})
export default class AdminDetail extends BaseComponent {
  private adminDto = new AdminDto(BaseUser);
  private spaceTypes: SpaceTypeDto[] = [];
  private adminUpdateDto: AdminDto = new AdminDto(BaseUser);

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
    AdminService.update(this.$route.params.id, this.adminUpdateDto).subscribe(
      res => {
        this.findSpaceType();
        this.findOne();
      },
    );
  }

  created() {
    this.findSpaceType();
    this.findOne();
  }
}
</script>
