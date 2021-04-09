<template>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav flex-row flex-wrap mr-auto no-gutters">
      <b-nav-item-dropdown
        :text="item.name"
        left
        v-for="item in items"
        :key="item.path"
        class="col-6 col-md-auto"
      >
        <template>
          <div v-for="children in item.children" :key="children.path">
            <b-dropdown-item
              v-if="!children.meta.detailPage"
              :to="children.path"
            >
              <template>{{ children.meta.title }}</template>
            </b-dropdown-item>
          </div>
        </template>
      </b-nav-item-dropdown>
    </ul>
    <NavBarAccount class="d-none d-lg-block" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { IsValidExternalPath } from '../../../core';
import NavBarLink from './NavBarLink.layout.vue';
import NavBarAccount from './NavBarAccount.layout.vue';
import { RouteConfig } from 'vue-router';

@Component({
  name: 'NavBarList',
  components: {
    NavBarLink,
    NavBarAccount,
  },
})
export default class NavBarList extends BaseComponent {
  @Prop() items?: RouteConfig[];

  // for external values
  // private resolvePath(routePath: string) {
  //   if (IsValidExternalPath(routePath)) {
  //     return routePath;
  //   }
  // }

  // private logout() {
  //   JwtStorageService.removeToken();
  //   toast.success('로그아웃 성공적으로 했습니다.');
  //   this.$router.push('/login');
  // }

  private activeRoutes() {
    return this.items.filter(item => {
      console.log(item, 'item');
    });
  }
}
</script>
