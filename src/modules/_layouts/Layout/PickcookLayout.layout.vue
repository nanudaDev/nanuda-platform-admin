<template>
  <div id="pickcook-app" class="page-content">
    <section :id="this.$route.name">
      <nav id="nav" class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
          <router-link
            class="navbar-brand brand-text"
            to="/pickcook/consult-response-v3"
            >PICKCOOK</router-link
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
      <div id="app-main" class="container-fluid">
        <router-view :key="$route.fullPath" />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import pickcookComponentRouter from '@/router/modules/pickcook-component';
import AdminService from '../../../services/admin.service';
import { AdminDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import NavBarList from '../NavBar/NavBarList.layout.vue';
import NavBarAccount from '../NavBar/NavBarAccount.layout.vue';

@Component({
  name: 'PickcookLayout',
  components: {
    NavBarList,
    NavBarAccount,
  },
})
export default class PickcookLayout extends BaseComponent {
  private items = pickcookComponentRouter;
}
</script>
<style lang="scss">
#pickcook-app {
  #nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #0b538d;
  }
  #app-main {
    margin-top: 80px;
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
</style>
