<template>
  <section>
    <b-row>
      <b-col md="6" lg="4">
        <BaseCard title="내 정보">
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li>관리자 ID : {{ myPageDto.no }}</li>
                <li>이름 : {{ myPageDto.name }}</li>
                <li>휴대폰 번호 : {{ myPageDto.phone }}</li>
                <li>등급 : {{ myPageDto.authCode }}</li>
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
import Component from 'vue-class-component';
import { AdminDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';

@Component({
  name: 'MyPageDetail',
})
export default class MyPageDetail extends BaseComponent {
  private myPageDto: AdminDto = new AdminDto(BaseUser);

  findOne() {
    AdminService.findMe().subscribe(res => {
      if (res) {
        this.myPageDto = res.data;
      }
    });
  }

  created() {
    this.findOne();
  }
}
</script>
