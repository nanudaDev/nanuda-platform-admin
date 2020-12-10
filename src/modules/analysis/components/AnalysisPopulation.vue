<template>
  <div class="article-content">
    <section class="section">
      <header class="section-header">
        <h3>주거인구</h3>
      </header>
      <div class="section-content">
        <b-row>
          <b-col cols="6">
            <div class="bg-light" style="width:100%; height:250px"></div>
          </b-col>
          <b-col cols="6">
            <div class="bg-light" style="width:100%; height:250px"></div>
          </b-col>
        </b-row>
        <div class="mt-4">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col" rowspan="2">구분</th>
                <th scope="col" rowspan="2">총 인구</th>
                <th scope="colgroup" colspan="2">성별</th>
                <th scope="colgroup" colspan="4">연령별</th>
              </tr>
              <tr>
                <th scope="col">남성</th>
                <th scope="col">여성</th>
                <th scope="col">10대</th>
                <th scope="col">20대</th>
                <th scope="col">30대</th>
                <th scope="col">40대</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">명</th>
                <td rowspan="2">138,200</td>
                <td>80,200</td>
                <td>58,000</td>
                <td>13,293</td>
                <td>38,522</td>
                <td>35,265</td>
                <td>11,021</td>
              </tr>
              <tr>
                <th scope="row">비율</th>
                <td>59%</td>
                <td>41%</td>
                <td>13%</td>
                <td>26%</td>
                <td>24%</td>
                <td>11%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>가구수</h3>
      </header>
      <div class="section-content">
        <div class="bg-light" style="width:100%; height:250px"></div>
        <div class="mt-4">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col">구분</th>
                <th scope="col">총 가구수</th>
                <th scope="col">1인</th>
                <th scope="col">2인</th>
                <th scope="col">3인</th>
                <th scope="col">4인</th>
                <th scope="col">5인</th>
                <th scope="col">6인 이상</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">세대</th>
                <td rowspan="2">138,200</td>
                <td>80,200</td>
                <td>58,000</td>
                <td>13,293</td>
                <td>38,522</td>
                <td>35,265</td>
                <td>11,021</td>
              </tr>
              <tr>
                <th scope="row">비율</th>
                <td>59%</td>
                <td>41%</td>
                <td>13%</td>
                <td>26%</td>
                <td>24%</td>
                <td>11%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>직장인 수</h3>
      </header>
      <div class="section-content">
        <div class="text-center">
          <p>
            <strong style="font-family: fantasy;" class="display-4"
              >42,000</strong
            >
            <span>명</span>
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <header class="section-header">
        <h3>유동인구</h3>
      </header>
      <div class="section-content">
        <b-row>
          <b-col cols="6">
            <div class="bg-light" style="width:100%; height:250px"></div>
          </b-col>
          <b-col cols="6">
            <div class="bg-light" style="width:100%; height:250px"></div>
          </b-col>
        </b-row>
        <div class="mt-4">
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col" rowspan="2">구분</th>
                <th scope="col" rowspan="2">총 인구</th>
                <th scope="colgroup" colspan="2">성별</th>
                <th scope="colgroup" colspan="4">연령별</th>
              </tr>
              <tr>
                <th scope="col">남성</th>
                <th scope="col">여성</th>
                <th scope="col">10대</th>
                <th scope="col">20대</th>
                <th scope="col">30대</th>
                <th scope="col">40대</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">명</th>
                <td rowspan="2">138,200</td>
                <td>80,200</td>
                <td>58,000</td>
                <td>13,293</td>
                <td>38,522</td>
                <td>35,265</td>
                <td>11,021</td>
              </tr>
              <tr>
                <th scope="row">비율</th>
                <td>59%</td>
                <td>41%</td>
                <td>13%</td>
                <td>26%</td>
                <td>24%</td>
                <td>11%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'AnalysisPopulation',
})
export default class AnalysisPopulation extends BaseComponent {}
</script>
