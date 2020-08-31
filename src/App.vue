<template>
  <div id="app" class="page-content">
    <component :is="layout"></component>
  </div>
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
  height: 100%;
  background-color: #f1f1f1;
  padding: 10px 0 40px;
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

.table-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1rem;
  .total-count {
    h5 {
      font-size: 14px;
      margin: 0;
    }
    .text-primary {
      margin-left: 0.25rem;
    }
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

.table {
  margin-bottom: 0;

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
  }
  thead {
    th {
      border-top: 0;
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

.empty-data {
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
    }
  }
}
</style>
