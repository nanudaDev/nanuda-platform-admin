<template>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <div v-for="item in items" :key="item.path">
        <b-nav-item-dropdown :text="item.name" left>
          <template>
            <div v-for="children in item.children" :key="children.path">
              <b-dropdown-item
                v-if="!children.meta.detailPage"
                :to="children.path"
              >
                <template>
                  {{ children.meta.title }}
                </template>
              </b-dropdown-item>
            </div>
          </template>
        </b-nav-item-dropdown>
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
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">마이 프로필</a>

            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="logout()">로그아웃</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import AdminService from '../../../services/admin.service';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { AdminDto } from '../../../dto';
import { BaseUser } from '../../../services/shared/auth';
import { IsValidExternalPath } from '../../../core';
import componentsRouter from '../../../router/modules/component';
import NavBarLink from './NavBarLink.layout.vue';

@Component({
  name: 'NavBarList',
  components: {
    NavBarLink,
  },
})
export default class NavBarList extends BaseComponent {
  private items = componentsRouter;
  private admin = new AdminDto(BaseUser);

  // for external values
  // private resolvePath(routePath: string) {
  //   if (IsValidExternalPath(routePath)) {
  //     return routePath;
  //   }
  // }

  private logout() {
    JwtStorageService.removeToken();
    toast.success('로그아웃 성공적으로 했습니다.');
    this.$router.push('/login');
  }

  private activeRoutes() {
    return this.items.filter(item => {
      console.log(item, 'item');
    });
  }

  created() {
    AdminService.findMe().subscribe(res => {
      this.admin = res.data;
    });
  }
}
</script>
