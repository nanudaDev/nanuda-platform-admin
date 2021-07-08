<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">분류</th>
          <th scope="col">항목</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">레시피</th>
          <td>레시피북 &amp; 배달 메뉴얼 {{ valueChecked }}</td>
          <td>
            <input
              type="checkbox"
              id="recipe"
              :value="30000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <th scope="row" rowspan="2">메뉴교육</th>
          <td>현장실습</td>
          <td>
            <input
              type="radio"
              name="menu"
              id="menu_01"
              :value="20000"
              v-model="radioValueChecked"
            />
          </td>
        </tr>
        <tr>
          <td>방문교육</td>
          <td>
            <input
              type="radio"
              name="menu"
              id="menu_02"
              :value="50000"
              v-model="radioValueChecked"
            />
          </td>
        </tr>
        <tr>
          <th scope="row" rowspan="3">배달앱관리</th>
          <td>배달 앱 등록(배민, 쿠팡, 요기요 등)</td>
          <td>
            <input
              type="checkbox"
              name="app"
              id="app_01"
              :value="10000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <td>로고, 사진, 브랜드 제공</td>
          <td>
            <input
              type="checkbox"
              name="app"
              id="app_02"
              :value="40000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <td>배달앱 컨설팅(리뷰이벤트, 깃발 등)</td>
          <td>
            <input
              type="checkbox"
              name="app"
              id="app_03"
              :value="30000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">디자인물</th>
          <td>스티커, 메모지, 자석전단지</td>
          <td>
            <input
              type="checkbox"
              name="design"
              id="design_01"
              :value="25000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <th scope="row" rowspan="4">부가서비스</th>
          <td>포스피드 1 개월</td>
          <td>
            <input
              type="checkbox"
              name="service"
              id="service_01"
              :value="1000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <td>상권분석 3 개월</td>
          <td>
            <input
              type="checkbox"
              name="service"
              id="service_02"
              :value="2000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <td>매장 관리 서비스 1 개월</td>
          <td>
            <input
              type="checkbox"
              name="service"
              id="service_03"
              :value="3000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <td>사후교육 2 회</td>
          <td>
            <input
              type="checkbox"
              name="service"
              id="service_04"
              :value="4000"
              v-model="valueChecked"
            />
          </td>
        </tr>
        <tr>
          <th scope="row">합계</th>
          <td>{{ totalValue }}</td>
          <td>
            <b-button
              v-for="(type, index) in discountTypes"
              :key="index"
              v-b-modal.discount_modal
              >{{ type }}</b-button
            >
            <b-button @click="resetDiscount()">초기화</b-button>
          </td>
        </tr>
        <tr>
          <th scope="row">최종 합계</th>
          <td>{{ finalTotalValue }}</td>
        </tr>
        <tr>
          <td></td>
          <td>매월 {{ monthlyFee }}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
    <b-modal
      id="discount_modal"
      size="sm"
      title="할인"
      @ok="calculateDiscount()"
      @cancel="cancelDiscount()"
    >
      <b-form>
        <b-form-input v-model="discountValue"></b-form-input>
      </b-form>
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';

enum DISCOUNT_TYPE {
  WON = '￦',
  PERCENT = '%',
}
const CONST_DISCOUNT_TYPE = Object.values(DISCOUNT_TYPE);

@Component({
  name: 'ProformaCalculator',
})
export default class ProformaCalculator extends BaseComponent {
  private valueChecked: number[] = [0];
  private radioValueChecked = '';
  private discountValue = 0;
  private calculateDiscountValue = 0;
  private discountType = DISCOUNT_TYPE.WON;
  private discountTypes: DISCOUNT_TYPE[] = [...CONST_DISCOUNT_TYPE];

  get sumValue() {
    if (this.radioValueChecked) {
      return [...this.valueChecked, this.radioValueChecked];
    } else {
      return this.valueChecked;
    }
  }

  get totalValue(): any {
    return this.sumValue.reduce((a: number, b: number) => a + b);
  }

  // 할인 가격 적용
  calculateDiscount() {
    this.calculateDiscountValue = this.discountValue;
  }

  // 할인 가격 취소
  cancelDiscount() {
    this.discountValue = 0;
    this.$bvModal.hide('discount_modal');
  }

  // 할인 가격 초기화
  resetDiscount() {
    this.calculateDiscountValue = 0;
  }

  // 최종 합계
  get finalTotalValue(): any {
    if (this.discountType === DISCOUNT_TYPE.WON) {
      return this.totalValue - this.calculateDiscountValue;
    } else if (this.discountType === DISCOUNT_TYPE.PERCENT) {
      return this.totalValue * (1 - this.calculateDiscountValue / 100);
    } else {
      return this.totalValue;
    }
  }

  // 매월 요금
  get monthlyFee() {
    return Math.floor(this.finalTotalValue / 12);
  }

  @Watch('finalTotalValue')
  setItem() {
    localStorage.setItem('valueChecked', JSON.stringify(this.valueChecked));
    localStorage.setItem('radioValueChecked', this.radioValueChecked);
  }

  getItem() {
    const getValueChecked = localStorage.getItem('valueChecked');
    const getRadioValueChecked = localStorage.getItem('radioValueChecked');
    if (getValueChecked) {
      this.valueChecked = [...JSON.parse(getValueChecked)];
    }
    if (getRadioValueChecked) {
      this.radioValueChecked = getRadioValueChecked;
    }
  }

  created() {
    this.getItem();
  }
}
</script>
