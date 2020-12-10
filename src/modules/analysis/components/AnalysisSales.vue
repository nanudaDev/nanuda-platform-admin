<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>매출분석</h3>
      </header>
      <div class="section-content">
        <div class="bg-light p-4 mt-4">
          <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
        </div>
        <div class="mt-4">
          <b-button
            v-for="category in categories"
            :key="category.id"
            class="ml-0 mr-2 mb-2"
          >
            {{ category.categoryNameKr }}
          </b-button>
        </div>
        <div class="mt-4 pt-4 border-top">
          <div class="title-box text-center">
            <h4>
              <b>한식</b>
            </h4>
          </div>
          <div class="content-box">
            <div class="mt-4">
              <h5>
                1) 성별
                <b-icon
                  icon="question-circle"
                  variant="secondary"
                  v-b-tooltip.hover.right="
                    '남성은 자잘자잘하게 많이시키지만, 여성은 한번 시킬 때 매출액이 크다 등의 정보를 설명하게 됩니다.'
                  "
                ></b-icon>
              </h5>
              <div class="mt-2">
                <b-row>
                  <b-col cols="6">
                    <div class="bg-light" style="height:250px"></div>
                  </b-col>
                  <b-col cols="6">
                    <div class="bg-light" style="height:250px"></div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div class="mt-4">
              <h5>
                2) 연령별
                <b-icon
                  icon="question-circle"
                  variant="secondary"
                  v-b-tooltip.hover.right="
                    '해당 동에서 배달음식을 주문시키는 사람의 주요 연령대를 나타내며, 지역의 소비력이 강한 연령대를 설명합니다.'
                  "
                ></b-icon>
              </h5>
              <div class="bg-light mt-2" style="height:150px"></div>
            </div>
            <div class="mt-4">
              <h5>
                3) 요일별
                <b-icon
                  icon="question-circle"
                  variant="secondary"
                  v-b-tooltip.hover.right="
                    '요일별 15% 기준으로, 매출액의 평균추이를 설명하며, 평일이 주요한 타겟이지만, 토요일에는 풀타임 근무를 통해서 매출액을 증가시켜야 하는 부분을 강조하여 설명합니다.'
                  "
                ></b-icon>
              </h5>
              <div class="mt-2">
                <b-row>
                  <b-col cols="6">
                    <div class="bg-light" style="height:250px"></div>
                  </b-col>
                  <b-col cols="6">
                    <div class="bg-light" style="height:250px"></div>
                  </b-col>
                </b-row>
              </div>
            </div>
            <div class="mt-4">
              <h5>
                4) 객단가
                <b-icon
                  icon="question-circle"
                  variant="secondary"
                  v-b-tooltip.hover.right="
                    '해당 카테고리의 소비층은 2개로 나뉘는데, 1.5만원, 2.8만원 기준의 세트메뉴를 기본적으로 만들어야 함을 설명합니다.'
                  "
                ></b-icon>
              </h5>
              <div class="bg-light mt-2" style="height:150px"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>시간대별 업종 매출 순위</h3>
      </header>
      <div class="section-content">
        <table class="table table-sm">
          <thead>
            <tr>
              <th></th>
              <th scope="col">순위</th>
              <th scope="col">업종</th>
              <th scope="col">성별</th>
              <th scope="col">연령대</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" rowspan="3">점심<br />11 ~ 14시</th>
              <td>1</td>
              <td>한식</td>
              <td>남</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <th scope="row" rowspan="3">저녁<br />17 ~ 21시</th>
              <td>1</td>
              <td>한식</td>
              <td>남</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <th scope="row" rowspan="3">점심<br />21 ~ 06시</th>
              <td>1</td>
              <td>한식</td>
              <td>남</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>도시락</td>
              <td>여</td>
              <td>40대</td>
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
  name: 'AnalysisSales',
})
export default class AnalysisSales extends BaseComponent {
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
