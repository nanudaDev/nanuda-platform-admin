<template>
  <div class="body">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import LoginLayout from './LoginLayout.layout.vue';

@Component({
  name: 'NonMainLayout',
  components: {
    LoginLayout,
  },
})
export default class NonMainLayout extends BaseComponent {}
</script>

<style lang="scss" scoped>
html,
.body {
  height: 100%;
}

.body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 40px;
}
</style>
