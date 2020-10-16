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
import { AdminDto, FounderConsultDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '@/services/admin.service';
import FounderConsultService from '@/services/founder-consult.service'
import { Pagination } from '@/common';

@Component({
  name: 'MyPageDetail',
})
export default class MyPageDetail extends BaseComponent {
  private myPageDto: AdminDto = new AdminDto(BaseUser);
  private pagination = new Pagination()
  private founderConsultList: FounderConsultDto[] = []

  findOne() {
    AdminService.findMe().subscribe(res => {
      if (res) {
        this.myPageDto = res.data;
      }
    });
  }

  findConsults() {
    this.pagination.limit = 10
    FounderConsultService.findMyConsults(this.pagination).subscribe(res => {
      this.founderConsultList = res.data.items
    })
  }

  created() {
    this.findOne();
    this.findConsults()
  }
}
</script>
