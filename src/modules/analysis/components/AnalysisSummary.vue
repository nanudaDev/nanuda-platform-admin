<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>상권 요약</h3>
      </header>
      <div class="section-content">
        <table class="table">
          <colgroup>
            <col width="25%" />
            <col width="*" />
            <col width="25%" />
            <col width="*%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">음식점수(개)</th>
              <td></td>
              <th scope="row">주거인구(명)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">총세대수(세대)</th>
              <td></td>
              <th scope="row">직장인구(명)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">아파트 세대 수(세대)</th>
              <td></td>
              <th scope="row">유동인구(명)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">주택 세대 수(세대)</th>
              <td></td>
              <th scope="row">주요 연령대</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">평균 영업기간(년)</th>
              <td></td>
              <th scope="row">업종포화도</th>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="bg-light p-4 mt-4">
          <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
        </div>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>상권 요약</h3>
      </header>
      <div class="section-content">
        <table class="table">
          <colgroup>
            <col width="25%" />
            <col width="*" />
            <col width="25%" />
            <col width="*%" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">음식점수(개)</th>
              <td></td>
              <th scope="row">주거인구(명)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">총세대수(세대)</th>
              <td></td>
              <th scope="row">직장인구(명)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">아파트 세대 수(세대)</th>
              <td></td>
              <th scope="row">유동인구(명)</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">주택 세대 수(세대)</th>
              <td></td>
              <th scope="row">주요 연령대</th>
              <td></td>
            </tr>
            <tr>
              <th scope="row">평균 영업기간(년)</th>
              <td></td>
              <th scope="row">업종포화도</th>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div class="bg-light p-4 mt-4">
          <p>카테고리별 매출 비중 (배달의민족 카테고리 기준)</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AnalysisSummary',
})
export default class AnalysisSummary extends BaseComponent {}
</script>
