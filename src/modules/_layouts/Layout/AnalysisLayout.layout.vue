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
          <div>
            <NavBarAccount class="d-inline-block d-lg-none mr-4" />
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
          </div>

          <NavBarList :items="items" />
        </div>
      </nav>
      <div id="app-main" class="main-content">
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
import NavBarList from '../NavBar/NavBarList.layout.vue';
import NavBarAccount from '../NavBar/NavBarAccount.layout.vue';

@Component({
  name: 'AnalysisLayout',
  components: {
    NavBarList,
    NavBarAccount,
  },
})
export default class AnalysisLayout extends BaseComponent {
  private items = analysisComponentRouter;
}
</script>
<style lang="scss">
#analysis-app {
  padding: 0;

  #app-main {
    margin-top: 55px;
    font-size: 11px;
  }
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
#Dashboard {
  #app-main {
    max-width: none;
  }
}
</style>
