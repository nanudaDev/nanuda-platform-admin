<template>
  <div>
    <div class="title mb-4">
      <div class="left-area">
        <h3>{{ title }}</h3>
        <slot name="leftArea"> </slot>
      </div>
      <div class="right-area">
        <slot name="rightArea"></slot>
      </div>
    </div>
    <div class="divider mt-4 mb-4" v-if="!divider"></div>
  </div>
</template>
<script lang="ts">
import { Prop, Component } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';

@Component({
  name: 'SectionTitle',
})
export default class SectionTitle extends BaseComponent {
  @Prop() title!: string;
  @Prop({ default: true }) divider?: boolean;
}
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  align-content: flex-end;
  justify-content: space-between;
  h3 {
    line-height: 1;
  }
  .right-area {
    text-align: right;
  }
  @media screen and (max-width: 767px) {
    display: block;
    .right-area {
      margin-top: 1em;
    }
  }
}
</style>
