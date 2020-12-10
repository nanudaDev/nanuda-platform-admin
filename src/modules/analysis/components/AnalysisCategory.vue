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
              <th scope="col">점포수</th>
              <th scope="col">점포비율</th>
              <th scope="col">매출비율</th>
              <th scope="col">차이</th>
              <!-- <th scope="col">경쟁도</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <th scope="row">
                {{ category.categoryNameKr }}
              </th>
              <td>{{ category.storeCount }}</td>
              <td style="position:relative;">
                <div
                  class="bg-primary"
                  style="position:absolute; left:0; top:0; height:100%;"
                  :style="`width: ${((category.storeRate * 100) / 32) * 100}%`"
                ></div>
                <span
                  style="position:relative; z-index:2;"
                  :class="{
                    'text-white': ((category.storeRate * 100) / 32) * 100 > 60,
                  }"
                >
                  {{ Math.round(category.storeRate * 100) }}%
                </span>
              </td>
              <td style="position:relative;">
                <div
                  class="bg-warning"
                  style="position:absolute; left:0; top:0; height:100%;"
                  :style="`width: ${((category.salesRate * 100) / 30) * 100}%`"
                ></div>
                <span
                  style="position:relative; z-index:2;"
                  :class="{
                    'text-white': ((category.salesRate * 100) / 30) * 100 > 60,
                  }"
                >
                  {{ Math.round(category.salesRate * 100) }}%
                </span>
              </td>
              <td style="position:relative;">
                <template v-if="category.gap * 100 > 0">
                  <div
                    class="bg-success"
                    style="position:absolute; left:50%; top:0; height:100%;"
                    :style="`width: ${((category.gap * 100) / 27) * 50}%`"
                  ></div>
                  <span
                    style="position:relative; z-index:2; padding-left:50%; text-align:left;"
                  >
                    {{ Math.round(category.gap * 100) }}%
                  </span>
                </template>
                <template v-else>
                  <div
                    class="bg-danger"
                    style="position:absolute; right:50%; top:0; height:100%;"
                    :style="`width: ${((-category.gap * 100) / 27) * 50}%`"
                  ></div>
                  <span
                    style="position:relative; z-index:2; padding-left:50%; text-align:left;"
                  >
                    {{ Math.round(category.gap * 100) }}%
                  </span>
                </template>
              </td>
              <!-- <td>1.62</td> -->
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
              <th scope="col">카테고리</th>
              <th scope="col">평균영업기간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id">
              <th scope="row">
                {{ index + 1 }}
              </th>
              <td>
                {{ category.categoryNameKr }}
              </td>
              <td>{{ category.period }}년</td>
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
      id: 1,
      categoryNameKr: '한식',
      categoryCode: 'BM01',
      categoryNameEng: 'Korean',
      storeCount: '1195',
      storeRate: '0.3201',
      salesRate: '0.0982',
      gap: '-0.2219',
      period: '3.2',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 7,
      categoryNameKr: '아시안/양식',
      categoryCode: 'BM07',
      categoryNameEng: null,
      storeCount: '91',
      storeRate: '0.0244',
      salesRate: '0.0063',
      gap: '-0.0181',
      period: '0.9',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 13,
      categoryNameKr: '패스트푸드',
      categoryCode: 'BM13',
      categoryNameEng: null,
      storeCount: '112',
      storeRate: '0.0300',
      salesRate: '0.3042',
      gap: '0.2742',
      period: '2.2',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 3,
      categoryNameKr: '카페/디저트',
      categoryCode: 'BM03',
      categoryNameEng: null,
      storeCount: '915',
      storeRate: '0.2451',
      salesRate: '0.0383',
      gap: '-0.2068',
      period: '1.2',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 4,
      categoryNameKr: '돈까스/회/일식',
      categoryCode: 'BM04',
      categoryNameEng: null,
      storeCount: '606',
      storeRate: '0.1623',
      salesRate: '0.0175',
      gap: '-0.1448',
      period: '1.9',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 10,
      categoryNameKr: '야식',
      categoryCode: 'BM10',
      categoryNameEng: null,
      storeCount: '214',
      storeRate: '0.0573',
      salesRate: '0.0484',
      gap: '-0.0089',
      period: '1.7',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 11,
      categoryNameKr: '찜/탕',
      categoryCode: 'BM11',
      categoryNameEng: null,
      storeCount: '48',
      storeRate: '0.0129',
      salesRate: '0.0702',
      gap: '0.0573',
      period: '1.1',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 2,
      categoryNameKr: '분식',
      categoryCode: 'BM02',
      categoryNameEng: null,
      storeCount: '264',
      storeRate: '0.0707',
      salesRate: '0.0145',
      gap: '-0.0562',
      period: '2.9',
    },

    {
      created: '2020-11-26T03:34:01.000Z',
      id: 6,
      categoryNameKr: '피자',
      categoryCode: 'BM06',
      categoryNameEng: null,
      storeCount: '30',
      storeRate: '0.0080',
      salesRate: '0.1217',
      gap: '0.1137',
      period: '2',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 5,
      categoryNameKr: '치킨',
      categoryCode: 'BM05',
      categoryNameEng: null,
      storeCount: '86',
      storeRate: '0.0230',
      salesRate: '0.1825',
      gap: '0.1595',
      period: '3.6',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 9,
      categoryNameKr: '족발/보쌈',
      categoryCode: 'BM09',
      categoryNameEng: null,
      storeCount: '28',
      storeRate: '0.0075',
      salesRate: '0.0839',
      gap: '0.0764',
      period: '1.5',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 8,
      categoryNameKr: '중국집',
      categoryCode: 'BM08',
      categoryNameEng: null,
      storeCount: '120',
      storeRate: '0.0321',
      salesRate: '0.0142',
      gap: '-0.0179',
      period: '2.3',
    },
  ];
  private storeRateMax = null;
  maxValues() {
    Math.max.apply(
      Math,
      ...this.categories.map(function(item) {
        return parseInt(item.storeCount);
      }),
    );
  }
}
</script>
