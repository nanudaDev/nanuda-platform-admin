<template>
  <div>
    <div class="title mb-2 pb-2">
      <div>
        <h3>{{ title }}</h3>
        <slot name="leftArea"> </slot>
      </div>
      <div>
        <slot name="rightArea"></slot>
      </div>
    </div>
    <div class="divider mb-4" v-if="!divider"></div>
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
}
</style>
