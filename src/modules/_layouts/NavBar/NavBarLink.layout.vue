<template>
  <div>
    <!-- <a :href="to" v-if="resolvePath(to)" target="_blank" rel="noopener"></a> -->
    <router-link class="navbar-link" :to="to">
      <slot />
    </router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { IsValidExternalPath } from '../../../core';

@Component({
  name: 'NavBarLink',
})
export default class NavBarLink extends BaseComponent {
  @Prop({ required: true }) private to!: string;

  // for external values
  // private resolvePath(routePath: string) {
  //   if (IsValidExternalPath(routePath)) {
  //     return routePath;
  //   }
  // }
}
</script>
<style lang="scss" scoped>
.navbar-link {
  color: #444444;
  font-weight: 700;
  text-decoration: none;
}
</style>
