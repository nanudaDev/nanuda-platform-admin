<template>
  <nav id="nav" class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand brand-text" to="/">NND</router-link>
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
      <!--
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="통합검색" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">검색하기</button>
      </form>
      -->
    </div>
  </nav>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import NavBarList from './NavBarList.layout.vue';
import NavBarAccount from './NavBarAccount.layout.vue';
import componentsRouter from '@/router/modules/component';

@Component({
  name: 'Navbar',
  components: {
    NavBarList,
    NavBarAccount,
  },
})
export default class NavBar extends BaseComponent {
  private items = componentsRouter;
}
</script>

<style scoped lang="scss">
.brand-text {
  color: #fff;
  font-weight: 700;
}
</style>
