<template>
  <div id="analysis-app" class="page-content">
    <section :id="this.$route.name">
      <nav
        id="nav"
        class="navbar fixed-top navbar-expand-lg navbar-dark bg-info"
      >
        <div class="container-fluid">
          <router-link class="navbar-brand brand-text" to="/analysis"
            >NND ANALYSIS</router-link
          >
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <div v-for="item in items" :key="item.path">
                <b-nav-item v-if="!item.meta.detailPage" :to="item.path">
                  <template>{{ item.meta.title }}</template>
                </b-nav-item>
              </div>
            </ul>
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
                    >{{ admin.name }}</a
                  >
                  <div
                    class="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdown"
                  >
                    <a class="dropdown-item" href="/my-page">마이 프로필</a>
                    <a class="dropdown-item" href="/dashboard">대시보드</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" @click="logout()">로그아웃</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div id="analysis-main">
        <router-view />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import analysisComponentRouter from '@/router/modules/analysis-component';
import AdminService from '../../../services/admin.service';
import { AdminDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';

@Component({
  name: 'AnalysisLayout',
})
export default class AnalysisLayout extends BaseComponent {
  private items = analysisComponentRouter;
  private admin = new AdminDto(BaseUser);

  created() {
    AdminService.findMe().subscribe(res => {
      this.admin = res.data;
    });
  }
}
</script>
<style lang="scss">
#analysis-main {
  margin-top: 55px;
  font-size: 11px;
}

.half-circle-spinner,
.half-circle-spinner * {
  box-sizing: border-box;
  margin: 0 auto;
}

.half-circle-spinner {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: relative;
}

.half-circle-spinner .circle {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  border: calc(60px / 10) solid transparent;
}

.half-circle-spinner .circle.circle-1 {
  border-top-color: #f49d37;
  animation: half-circle-spinner-animation 1s infinite;
}

.half-circle-spinner .circle.circle-2 {
  border-bottom-color: #f49d37;
  animation: half-circle-spinner-animation 1s infinite alternate;
}

@keyframes half-circle-spinner-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#app {
  padding: 0 1rem;
}
#Dashboard {
  #app-main {
    max-width: none;
  }
}
</style>
