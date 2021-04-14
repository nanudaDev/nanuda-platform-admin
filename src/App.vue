<template>
  <component :is="layout"></component>
</template>
<script lang="ts">
declare global {
  interface Window {
    kakao: any;
  }
}
import BaseComponent from './core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
})
export default class extends BaseComponent {
  // get layout
  get layout() {
    return this.$route.meta.layout;
  }
}
</script>
<style lang="scss">
html,
body {
  // height: 100%;
  background-color: #f1f1f1;
  // padding: 10px 0 40px;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}

.btn {
  font-size: 12px;
  + .btn {
    margin-left: 0.5rem;
  }
}
.divider {
  width: 100%;
  height: 1px;
  background-color: rgb(167, 167, 167);
  margin-bottom: 10px;
}
.badge {
  font-size: 11px;
}

.div-center {
  margin: 0;
}

.highlighted {
  background-color: orange;
  border-color: orange;
  color: #fff;
}

a,
a:hover {
  color: inherit;
}
select {
  font: inherit;
}

.navbar {
  @media screen and (max-width: 991px) {
    position: absolute;
  }
}

.page-content {
  padding: 1.5rem 0;
  @media screen and (min-width: 992px) {
    padding: 1.5rem 1rem;
  }
}

.table-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  // flex-direction: row-reverse;
  margin-bottom: 1rem;

  .total-count {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    h5 {
      font-size: 14px;
      margin: 0;
    }
    .text-primary {
      margin-left: 0.25rem;
    }
  }
  .btn-wrap {
    text-align: right;
  }
  .select-limit {
    width: 100px;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

h4 {
  font-size: 1.125rem;
}
h5 {
  font-size: 1rem;
}

img {
  max-width: 100%;
}
.card {
  .custom-radio {
    line-height: 2.2;
  }
}

.table {
  margin-bottom: 0;

  &.table-fixed {
    table-layout: fixed;
  }

  &.table-nowrap {
    th,
    td {
      white-space: nowrap;
    }
  }

  th,
  td {
    vertical-align: middle;
    text-align: center;
    height: 40px;
  }
  thead {
    th {
      border-bottom: 0;
      vertical-align: middle;
    }
  }
  .empty-data {
    display: table-cell;
    height: 100px;
  }

  &.table-sm {
    font-size: 11px;
  }
}
.modal-title {
  font-size: 1rem;
  font-weight: bold;
}

.empty-data,
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  min-height: 100px;
}

// font color
.red-text {
  color: red;
}
.white-text {
  color: white;
}

// list
.u-list {
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    list-style: none;
    position: relative;
    margin: 5px 0;
  }
}

.carousel-indicators {
  position: static;
  li {
    width: 10px;
    height: 10px;
    background-color: #646464;
    &.active {
      background-color: #323232;
    }
  }
}

// attatchments file
.attatchments-list {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  .attatchments-list-item {
    position: relative;
    img {
      width: 100%;
    }
    .btn-delete-item {
      position: absolute;
      right: -5px;
      top: -5px;
      cursor: pointer;
      border-radius: 50%;
      background: #fff;
    }
  }
}
.custom-file-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 90px;
}

.cropped-img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

@media screen and (max-width: 540px) {
  .table-top {
    display: block;
    .total-count {
      margin-bottom: 10px;
    }
  }
}
</style>
