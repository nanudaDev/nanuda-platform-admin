<template>
  <div id="app" class="page-content">
    <section :id="this.$route.name">
      <NavBar />
      <div id="app-main" class="main-conetnt container-fluid">
        <router-view :key="$route.fullPath" />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import NavBar from '../NavBar/NavBar.layout.vue';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';

@Component({
  name: 'MainLayout',
  components: {
    NavBar,
  },
})
export default class MainLayout extends BaseComponent {}
</script>
<style lang="scss">
#app-main {
  margin-top: 80px;
  margin-bottom: 40px;
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
#Dashboard {
  #app-main {
    max-width: none;
  }
}
</style>
