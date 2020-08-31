<template>
  <div class="card">
    <div class="card-head" v-show="!hideTitle">
      <h4 class="card-title">
        <span>{{ title }}</span>
      </h4>
      <slot name="head"></slot>
    </div>
    <div class="card-body" v-if="noBody">
      <slot name="body"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';

@Component({
  name: 'BaseCard',
})
export default class BaseCard extends BaseComponent {
  @Prop() readonly title: string;
  @Prop({ default: false }) readonly hideTitle: boolean;
  @Prop({ default: true }) noBody: boolean;
}
</script>
<style lang="scss" scoped>
.card {
  border: 0;
  border-radius: 0.5rem;
  background-color: #fff;
  height: 100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.05);
  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 0.625rem 1rem;
    min-height: 52px;
    margin-bottom: -1px;
    .card-title {
      margin-bottom: 0;
      line-height: 1;
    }
  }
  .card-body {
    padding: 1.25em;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        list-style: none;
        position: relative;
        margin: 5px 0;
      }
    }
  }
}
</style>
