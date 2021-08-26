<template>
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import LoginLayout from './LoginLayout.layout.vue';

@Component({
  name: 'EmptyLayout',
  components: {
    LoginLayout,
  },
})
export default class EmptyLayout extends BaseComponent {}
</script>

<style lang="scss" scoped></style>
