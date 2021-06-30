<template>
  <div>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          v-if="admin"
        >
          <b-icon icon="person"></b-icon> {{ admin.name }}</a
        >
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
          style="position:absolute;  right:0; will-change: transform;"
        >
          <a class="dropdown-item" href="/my-page">마이 프로필</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="/dashboard">
            <strong style="color:#101010">NND PLATFORM</strong>
          </a>
          <a class="dropdown-item" href="/analysis">
            <strong style="color:#17a2b8">NND ANALYSIS</strong>
          </a>
          <a class="dropdown-item" href="/pickcook/consult-response-v3">
            <strong style="color:#0b538d">PICKCOOK</strong>
          </a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click="logout()">로그아웃</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { AdminDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import AdminService from '../../../services/admin.service';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'NavBarAccountLayout',
})
export default class NavBarAccountLayout extends BaseComponent {
  private admin = new AdminDto(BaseUser);

  logout() {
    JwtStorageService.removeToken();
    toast.success('로그아웃 성공적으로 했습니다.');
    this.$router.push('/login');
  }

  created() {
    AdminService.findMe().subscribe(res => {
      this.admin = res.data;
    });
  }
}
</script>
