<template>
  <div>
    <div class="table">
      <div class="thead">
        <div class="tr">
          <div>분류</div>
          <div>항목</div>
          <div></div>
        </div>
      </div>
      <div class="tbody">
        <div
          v-for="category in serviceCategories"
          :key="category.name"
          class="tr"
        >
          <div class="th">
            {{ category.title }}
          </div>
          <div class="td">
            <div>
              <div v-for="item in category.items" :key="item.id" class="td">
                <div>{{ item.name }}</div>
                <div>
                  <template v-if="category.type === 'radio'">
                    <div>
                      <input
                        type="radio"
                        :name="serviceCategories.name"
                        :id="item.id"
                        :value="item"
                        v-model="radioValues"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <input
                      type="checkbox"
                      :name="serviceCategories.name"
                      :id="item.id"
                      :value="item"
                      v-model="checkboxValues"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="extraService" class="tr">
          <div class="th">
            {{ extraService.title }}
          </div>
          <div class="td">
            <div>
              <div
                v-for="(item, index) in extraService.items"
                :key="item.id"
                class="td"
              >
                <div>{{ item.name }} {{ item.qty }} {{ item.unit }}</div>
                <div>
                  <input
                    type="hidden"
                    :name="extraService.name"
                    :id="item.id"
                    :value="item.price"
                  />
                  <input
                    type="text"
                    v-model="item.qty"
                    @change="changePrice(index)"
                    style="width:60px"
                  />
                  <b-button @click="increase(index)">+</b-button>
                  <b-button @click="decrease(index)">-</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tfoot">
        <div class="tr">
          <div class="th">합계</div>
          <div class="td">{{ totalPrice | numeralTransformer }} 원</div>
          <div class="td">
            <b-button
              v-for="(type, index) in discountTypes"
              :key="index"
              @click="selectDiscountType(type)"
              >{{ type }}</b-button
            >
            <b-button @click="resetDiscount()">할인초기화</b-button>
          </div>
        </div>
        <div class="tr">
          <div class="th"></div>
          <div class="td">
            매월 {{ Math.floor(totalPrice / 12) | numeralTransformer }} 원
          </div>
          <div class="td"></div>
        </div>
        <div class="tr">
          <div class="th">최종 합계</div>
          <div class="td">{{ finalTotalValue | numeralTransformer }} 원</div>
          <div class="td"></div>
        </div>
        <div class="tr">
          <div class="th"></div>
          <div class="td">매월 {{ monthlyFee | numeralTransformer }} 원</div>
          <div class="td"></div>
        </div>
      </div>
    </div>
    <div class="text-right">
      <b-button variant="primary" @click="resetProforma()">초기화</b-button>
    </div>

    <b-modal
      :id="`${this.categoryType}_discount_modal`"
      size="sm"
      title="할인"
      @ok="calculateDiscount()"
      @cancel="cancelDiscount()"
      ok-title="적용"
      cancel-title="취소"
    >
      <b-form @submit.stop.prevent="calculateDiscount()">
        <b-input-group :append="discountType === '%' ? '%' : '원'">
          <b-form-input v-model="discountValue"></b-form-input>
        </b-input-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { ProformaCalculatorDto } from '@/dto';
import { Component, Prop, Watch } from 'vue-property-decorator';

enum DISCOUNT_TYPE {
  WON = '￦',
  PERCENT = '%',
}
const CONST_DISCOUNT_TYPE = Object.values(DISCOUNT_TYPE);

@Component({
  name: 'ProformaCalculator',
})
export default class ProformaCalculator extends BaseComponent {
  @Prop() categoryType: string;
  @Prop() serviceCategories;

  private discountValue = 0;
  private calculateDiscountValue = 0;
  private discountType = DISCOUNT_TYPE.WON;
  private discountTypes: DISCOUNT_TYPE[] = [...CONST_DISCOUNT_TYPE];
  private valueQty: number[] = [];

  private checkboxValues = [];
  get checkboxPriceValues() {
    return this.checkboxValues.map(e => e.price);
  }

  private radioValues = new ProformaCalculatorDto();
  get radioPriceValues() {
    return this.radioValues.price;
  }

  private extraServicePriceValues = [];
  private extraService = {
    title: '부가서비스',
    name: 'extraService',
    items: [
      {
        id: 'extraService01',
        name: '포스피드',
        unit: '개월',
        price: 50000,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 'extraService02',
        name: '상권분석',
        unit: '개월',
        price: 50000,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 'extraService03',
        name: '매장 관리 서비스',
        unit: '개월',
        price: 50000,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 'extraService04',
        name: '사후교육',
        unit: '회',
        price: 50000,
        qty: 0,
        totalPrice: 0,
      },
    ],
  };

  get sumPrice() {
    return [
      ...this.checkboxPriceValues,
      ...this.extraServicePriceValues,
      this.radioPriceValues ? this.radioValues.price : null,
    ];
  }

  get totalPrice(): any {
    return this.sumPrice.reduce((a: number, b: number) => a + b, 0);
  }

  // 가격 변동
  changePrice(index) {
    const changePrice =
      this.extraService.items[index].qty * this.extraService.items[index].price;
    this.extraService.items[index].totalPrice = changePrice;
    this.extraServicePriceValues = this.extraService.items.map(
      e => e.totalPrice,
    );
  }

  // 수량 증가
  increase(index) {
    +this.extraService.items[index].qty++;
    this.changePrice(index);
  }

  // 수량 감소
  decrease(index) {
    if (this.extraService.items[index].qty < 1) return;
    +this.extraService.items[index].qty--;
    this.changePrice(index);
  }

  // 할인 가격 적용
  calculateDiscount() {
    this.calculateDiscountValue = this.discountValue;
    this.$bvModal.hide(`${this.categoryType}_discount_modal`);
  }

  // 할인 방법 선택
  selectDiscountType(type) {
    this.discountValue = 0;
    this.discountType = type;
    this.$bvModal.show(`${this.categoryType}_discount_modal`);
  }

  // 할인 가격 취소
  cancelDiscount() {
    this.discountValue = 0;
    this.$bvModal.hide(`${this.categoryType}_discount_modal`);
  }

  // 할인 가격 초기화
  resetDiscount() {
    this.calculateDiscountValue = 0;
  }

  // 견적 초기화
  resetProforma() {
    this.radioValues = new ProformaCalculatorDto();
    this.checkboxValues = [];
    this.extraService.items.forEach((e, i) => {
      e.qty = 0;
      this.changePrice(i);
    });
  }

  // 최종 합계
  get finalTotalValue(): any {
    if (this.discountType === DISCOUNT_TYPE.WON) {
      return this.totalPrice - this.calculateDiscountValue;
    } else if (this.discountType === DISCOUNT_TYPE.PERCENT) {
      return this.totalPrice * (1 - this.calculateDiscountValue / 100);
    } else {
      return this.totalPrice;
    }
  }

  // 매월 요금
  get monthlyFee() {
    return Math.floor(this.finalTotalValue / 12);
  }

  @Watch('finalTotalValue')
  setItem() {
    localStorage.setItem(
      `${this.categoryType}_checkboxValues`,
      JSON.stringify(this.checkboxValues),
    );
    localStorage.setItem(
      `${this.categoryType}_radioValues`,
      JSON.stringify(this.radioValues),
    );
    localStorage.setItem(
      `${this.categoryType}_extraServiceValues`,
      JSON.stringify(this.extraService),
    );
  }

  getItem() {
    const getValueChecked = localStorage.getItem(
      `${this.categoryType}_checkboxValues`,
    );
    const getRadioValueChecked = localStorage.getItem(
      `${this.categoryType}_radioValues`,
    );
    const extraServiceValues = localStorage.getItem(
      `${this.categoryType}_extraServiceValues`,
    );
    if (getValueChecked) {
      this.checkboxValues = [...JSON.parse(getValueChecked)];
    }

    if (getRadioValueChecked) {
      this.radioValues = JSON.parse(getRadioValueChecked);
    }

    if (extraServiceValues) {
      this.extraService = JSON.parse(extraServiceValues);
      this.extraService.items.forEach((e, i) => {
        this.changePrice(i);
      });
    }
  }

  created() {
    this.getItem();
  }
}
</script>
<style lang="scss">
.table {
  .tr {
    display: flex;
    width: 100%;
    .th {
      display: flex;
      align-items: center;
    }
    > div {
      flex: 1;
      border: 1px solid #dcdcdc;
    }
  }
  .thead {
    .tr {
      background: #f5f5f5;
      > div {
        padding: 1em 0;
        text-align: center;
      }
    }
  }
  .tbody {
    .tr {
      .td {
        flex: 2;
        display: flex;
        > div {
          flex: 1;
        }
        .td {
          + .td {
            border-top: 1px solid #dcdcdc;
          }
        }
      }
    }
  }
  .tfoot {
    .td {
      flex: 1;
    }
  }
}
</style>
