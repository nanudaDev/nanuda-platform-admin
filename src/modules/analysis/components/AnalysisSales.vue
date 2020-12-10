<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>매출분석</h3>
      </header>
      <div class="section-content">
        <div class="bg-light p-4 mt-4">
          <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
          <div class="mt-3">
            <img
              src="@/assets/images/general/analysis/saleschart_01.png"
              alt=""
            />
          </div>
        </div>
        <div class="mt-4">
          <b-button
            :variant="category.id === 1 ? 'secondary' : 'outline-secondary'"
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
              <div class="mt-4">
                <b-row>
                  <b-col cols="6">
                    <p class="text-center mb-2"><b>매출 건수 비율</b></p>
                    <img
                      src="@/assets/images/general/analysis/saleschart_02.png"
                      alt=""
                    />
                  </b-col>
                  <b-col cols="6">
                    <p class="text-center mb-2"><b>매출 금액 비율</b></p>
                    <img
                      src="@/assets/images/general/analysis/saleschart_03.png"
                      alt=""
                    />
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
              <div class=" mt-4">
                <img
                  src="@/assets/images/general/analysis/saleschart_04.png"
                  alt=""
                />
              </div>
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
              <div class="mt-4">
                <div>
                  <div class="mt-4">
                    <p class="text-center mb-2"><b>매출 건수 비율</b></p>
                    <img
                      src="@/assets/images/general/analysis/saleschart_05.png"
                      alt=""
                    />
                    <div class="mt-4">
                      <img
                        src="@/assets/images/general/analysis/saleschart_05_1.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div class="mt-4">
                    <p class="text-center mb-2"><b>매출 금액 비율</b></p>
                    <img
                      src="@/assets/images/general/analysis/saleschart_06.png"
                      alt=""
                    />
                    <div class="mt-4">
                      <img
                        src="@/assets/images/general/analysis/saleschart_05_1.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="mt-4">
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
            </div> -->
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
              <td>분식</td>
              <td>남</td>
              <td>20대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>족발</td>
              <td>여</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>일식</td>
              <td>남</td>
              <td>40대</td>
            </tr>
            <tr>
              <th scope="row" rowspan="3">야식<br />21 ~ 06시</th>
              <td>1</td>
              <td>야식</td>
              <td>남</td>
              <td>30대</td>
            </tr>
            <tr>
              <td>2</td>
              <td>한식</td>
              <td>여</td>
              <td>40대</td>
            </tr>
            <tr>
              <td>3</td>
              <td>치킨</td>
              <td>남</td>
              <td>20대</td>
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
      id: 1,
      categoryNameKr: '한식',
      categoryCode: 'BM01',
      categoryNameEng: 'Korean',
      storeCount: '1195',
      storeRate: '0.3201',
      salseRate: '0.0982',
      gap: '-0.2219',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 7,
      categoryNameKr: '아시안/양식',
      categoryCode: 'BM07',
      categoryNameEng: null,
      storeCount: '91',
      storeRate: '0.0244',
      salseRate: '0.0063',
      gap: '-0.0181',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 13,
      categoryNameKr: '패스트푸드',
      categoryCode: 'BM13',
      categoryNameEng: null,
      storeCount: '112',
      storeRate: '0.0300',
      salseRate: '0.3042',
      gap: '0.2742',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 3,
      categoryNameKr: '카페/디저트',
      categoryCode: 'BM03',
      categoryNameEng: null,
      storeCount: '915',
      storeRate: '0.2451',
      salseRate: '0.0383',
      gap: '-0.2068',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 4,
      categoryNameKr: '돈까스/회/일식',
      categoryCode: 'BM04',
      categoryNameEng: null,
      storeCount: '606',
      storeRate: '0.1623',
      salseRate: '0.0175',
      gap: '-0.1448',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 10,
      categoryNameKr: '야식',
      categoryCode: 'BM10',
      categoryNameEng: null,
      storeCount: '214',
      storeRate: '0.0573',
      salseRate: '0.0484',
      gap: '-0.0089',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 11,
      categoryNameKr: '찜/탕',
      categoryCode: 'BM11',
      categoryNameEng: null,
      storeCount: '48',
      storeRate: '0.0129',
      salseRate: '0.0702',
      gap: '0.0573',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 2,
      categoryNameKr: '분식',
      categoryCode: 'BM02',
      categoryNameEng: null,
      storeCount: '264',
      storeRate: '0.0707',
      salseRate: '0.0145',
      gap: '-0.0562',
    },

    {
      created: '2020-11-26T03:34:01.000Z',
      id: 6,
      categoryNameKr: '피자',
      categoryCode: 'BM06',
      categoryNameEng: null,
      storeCount: '30',
      storeRate: '0.0080',
      salseRate: '0.1217',
      gap: '-0.1137',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 5,
      categoryNameKr: '치킨',
      categoryCode: 'BM05',
      categoryNameEng: null,
      storeCount: '86',
      storeRate: '0.0230',
      salseRate: '0.1825',
      gap: '-0.1595',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 9,
      categoryNameKr: '족발/보쌈',
      categoryCode: 'BM09',
      categoryNameEng: null,
      storeCount: '28',
      storeRate: '0.0075',
      salseRate: '0.0839',
      gap: '0.0764',
    },
    {
      created: '2020-11-26T03:34:01.000Z',
      id: 8,
      categoryNameKr: '중국집',
      categoryCode: 'BM08',
      categoryNameEng: null,
      storeCount: '120',
      storeRate: '0.0321',
      salseRate: '0.0142',
      gap: '-0.0179',
    },
  ];
}
</script>
