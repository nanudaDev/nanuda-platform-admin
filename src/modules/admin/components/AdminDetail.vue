<template>
  <section v-if="adminDto">
    <SectionTitle :title="`${adminDto.name} - 관리자 정보`">
      <template v-slot:rightArea>
        <router-link to="/admin" class="btn btn-secondary"
          >목록으로</router-link
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
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { AdminDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import { Component, Vue } from 'vue-property-decorator';
import AdminService from '@/services/admin.service';

@Component({
  name: 'AdminDetail',
})
export default class AdminDetail extends BaseComponent {
  private adminDto = new AdminDto(BaseUser);

  findOne() {
    AdminService.findOne(this.$route.params.id).subscribe(res => {
      this.adminDto = res.data;
    });
  }

  created() {
    this.findOne();
  }
}
</script>
