<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>업종별 경쟁률 현황상세</h3>
      </header>
      <div class="section-content">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">카테고리</th>
              <th scope="col">업체수</th>
              <th scope="col">비중</th>
              <th scope="col">매출비중</th>
              <th scope="col">차이</th>
              <th scope="col">경쟁도</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <th scope="row">
                {{ category.categoryNameKr }}
              </th>
              <td>200</td>
              <td>9%</td>
              <td>15.5%</td>
              <td>5.4%</td>
              <td>1.62</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>평균영업기간</h3>
      </header>
      <div class="section-content">
        <table class="table">
          <thead>
            <tr>
              <th></th>
              <th scope="col">업종</th>
              <th scope="col">평균영업기간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>{{ category.categoryNameKr }}</td>
              <td>3.6년</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AnalysisCategory',
})
export default class AnalysisCategory extends BaseComponent {
  private categories = [
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 14,
      categoryNameKr: '채식',
      categoryCode: 'BM14',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 13,
      categoryNameKr: '페스트푸드',
      categoryCode: 'BM13',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 12,
      categoryNameKr: '도시락',
      categoryCode: 'BM12',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 11,
      categoryNameKr: '찜/탕',
      categoryCode: 'BM11',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 10,
      categoryNameKr: '야식',
      categoryCode: 'BM10',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 9,
      categoryNameKr: '족발/보쌈',
      categoryCode: 'BM09',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 8,
      categoryNameKr: '중국집',
      categoryCode: 'BM08',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 7,
      categoryNameKr: '아시안/양식',
      categoryCode: 'BM07',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 6,
      categoryNameKr: '피자',
      categoryCode: 'BM06',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 5,
      categoryNameKr: '치킨',
      categoryCode: 'BM05',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 4,
      categoryNameKr: '돈까스/회/일식',
      categoryCode: 'BM04',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 3,
      categoryNameKr: '카페/디저트',
      categoryCode: 'BM03',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 2,
      categoryNameKr: '분식',
      categoryCode: 'BM02',
      categoryNameEng: null,
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 1,
      categoryNameKr: '한식',
      categoryCode: 'BM01',
      categoryNameEng: 'Korean',
    },
  ];
}
</script>
