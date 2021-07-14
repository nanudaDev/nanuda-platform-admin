<template>
  <div>
    <div>
      <div>
        <div
          v-for="category in serviceCategories"
          :key="category.name"
          class="service-card"
        >
          <div class="service-card-title">
            <h4>{{ category.title }}</h4>
          </div>
          <div class="service-card-items">
            <div
              v-for="item in category.items"
              :key="item.id"
              class="service-card-item"
            >
              <div class="item-name">{{ item.name }}</div>
              <div class="item-value">
                <template v-if="category.type === 'radio'">
                  <b-form-radio
                    type="radio"
                    size="lg"
                    :name="serviceCategories.name"
                    :id="item.id"
                    :value="item"
                    v-model="radioValues"
                  />
                </template>
                <template v-else>
                  <b-form-checkbox
                    type="checkbox"
                    size="lg"
                    :name="serviceCategories.name"
                    :id="item.id"
                    :value="item"
                    v-model="checkboxValues"
                    switch
                  />
                </template>
              </div>
            </div>
          </div>
        </div>
        <div v-if="extraService" class="service-card">
          <div class="service-card-title">
            <h4>{{ extraService.title }}</h4>
          </div>
          <div class="service-card-items">
            <div
              v-for="(item, index) in extraService.items"
              :key="item.id"
              class="service-card-item"
            >
              <div class="item-name">
                {{ item.name }} {{ item.qty }} {{ item.unit }}
              </div>
              <div class="item-value">
                <input
                  type="hidden"
                  :name="extraService.name"
                  :id="item.id"
                  :value="item.price"
                />
                <div class="qty-control-box">
                  <b-form-input
                    type="text"
                    v-model="item.qty"
                    @change="changePrice(index)"
                  />
                  <div class="btn-control-box">
                    <span
                      class="btn-control btn-control-minus"
                      @click="decrease(index)"
                      ><span>감소</span></span
                    >
                    <span
                      class="btn-control btn-control-plus"
                      @click="increase(index)"
                      ><span>증가</span></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="service-total-box">
        <div class="row-box">
          <div class="service-total-title">합계</div>
          <div class="service-total-value">
            <span class="monthly-fee"
              ><b
                >매월
                {{ Math.floor(totalPrice / 12) | numeralTransformer }}원</b
              >
              <b>VAT 별도</b></span
            ><span class="total-fee"
              >{{ totalPrice | numeralTransformer }}원</span
            >
          </div>
        </div>
        <div class="row-box discount-value-box">
          <div class="d-flex justify-content-between">
            <div class="service-total-title">
              할인 적용
            </div>
            <div class="service-total-value">
              <div class="btn-control-box">
                <span
                  v-for="(type, index) in discountTypes"
                  :key="index"
                  @click="selectDiscountType(type)"
                  class="btn-control"
                  >{{ type }}</span
                >
                <!-- <span @click="resetDiscount()" class="btn-control">미적용</span> -->
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <div class="service-total-title">
              할인금액
            </div>
            <div class="service-total-value">
              <span class="total-fee"
                >{{ discountPrice | numeralTransformer }}원
              </span>
            </div>
          </div>
        </div>
        <div class="row-box final-total-value-box">
          <div class="service-total-title">최종 합계</div>
          <div class="service-total-value">
            <span class="monthly-fee">
              <b>매월 {{ monthlyFee | numeralTransformer }}원</b>
              <b>VAT 별도</b></span
            >
            <span class="total-fee"
              >{{ finalTotalValue | numeralTransformer
              }}<span class="unit">원</span>
            </span>
          </div>
        </div>
        <div class="row-box final-total-value-box" id="sticky-total">
          <div class="service-total-title">최종 합계</div>
          <div class="service-total-value">
            <span class="monthly-fee">
              <b>매월 {{ monthlyFee | numeralTransformer }}원</b>
              <b>VAT 별도</b></span
            >
            <span class="total-fee"
              >{{ finalTotalValue | numeralTransformer
              }}<span class="unit">원</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-right mt-4 pt-4">
      <b-button variant="primary" size="lg" pill @click="resetProforma()"
        >초기화</b-button
      >
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

  get discountPrice() {
    return this.finalTotalValue - this.totalPrice;
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
    this.calculateDiscountValue = 0;
    this.discountType = type;
    this.$bvModal.show(`${this.categoryType}_discount_modal`);
  }

  // 할인 가격 취소
  cancelDiscount() {
    this.discountValue = 0;
    this.calculateDiscountValue = 0;
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
    sessionStorage.setItem(
      `${this.categoryType}_checkboxValues`,
      JSON.stringify(this.checkboxValues),
    );
    sessionStorage.setItem(
      `${this.categoryType}_radioValues`,
      JSON.stringify(this.radioValues),
    );
    sessionStorage.setItem(
      `${this.categoryType}_extraServiceValues`,
      JSON.stringify(this.extraService),
    );
  }

  getItem() {
    const getValueChecked = sessionStorage.getItem(
      `${this.categoryType}_checkboxValues`,
    );
    const getRadioValueChecked = sessionStorage.getItem(
      `${this.categoryType}_radioValues`,
    );
    const extraServiceValues = sessionStorage.getItem(
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
<style lang="scss" scoped>
.btn-lg {
  min-width: 200px;
  height: 60px;
  font-size: 24px;
  font-weight: 700;
}

.service-card {
  border-radius: 10px;
  box-shadow: 0 7px 9px rgba(195, 195, 195, 0.16);
  background-color: #fff;
  overflow: hidden;
  padding: 0 0;
  margin: 40px 0;
  display: flex;
  align-items: center;
  .service-card-title {
    width: 25vw;
    padding: 0 60px;
    h4 {
      font-size: 24px;
      color: #000000;
      font-weight: 500;
    }
  }
  .service-card-items {
    width: calc(100% - 25vw);
    .service-card-item {
      display: flex;
      + .service-card-item {
        font-size: 20px;
        .item-name {
          border-top: 1px solid #e0e0e0;
        }
      }
      .item-name {
        width: calc(100% - 25vw);
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .item-value {
        width: 25vw;
        padding: 18px 0;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.service-total-box {
  .row-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 0;
    &.discount-value-box {
      border-top: 1px solid #c9c9c9;
      .service-total-value {
        .total-fee {
          font-weight: 700;
        }
      }
    }
    &.final-total-value-box {
      border-top: 1px solid #8c8c8c;
      border-bottom: 1px solid #8c8c8c;
      .service-total-title {
        color: #007eeb;
      }
      .service-total-value {
        .total-fee {
          font-size: 32px;
          font-weight: 700;
          color: #007eeb;
        }
        .unit {
          font-size: 24px;
        }
      }
    }
  }
  .service-total-title {
    font-size: 24px;
    color: #000;
    margin-right: 100px;
  }
  .service-total-value {
    display: flex;
    align-items: center;
    text-align: right;
    .monthly-fee {
      font-size: 16px;
      margin-right: 40px;
      > b {
        position: relative;
        font-weight: normal;
        + b {
          padding-left: 12px;
          margin-left: 12px;
          &:before {
            display: block;
            content: '';
            width: 1px;
            height: 14px;
            background: #c9c9c9;
            position: absolute;
            left: 0;
            top: 50%;
            margin-top: -7px;
          }
        }
      }
    }
    .total-fee {
      font-size: 24px;
      color: #000;
    }
  }
}
.qty-control-box {
  display: flex;
  justify-content: center;
  .form-control {
    width: 60px;
    height: 42px;
    box-shadow: 0 3px 6px rgba(195, 195, 195, 0.16);
    margin-right: 8px;
  }
}
.btn-control-box {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(195, 195, 195, 0.16);
  > .btn-control {
    position: relative;
    padding: 8px 16px;
    min-width: 70px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #707070;
    + .btn-control {
      &:before {
        display: block;
        content: '';
        width: 1px;
        position: absolute;
        left: 0;
        top: 8px;
        bottom: 8px;
        background: #e0e0e0;
      }
    }
    &.btn-control-plus {
      font-size: 0;
      span {
        &::before {
          display: block;
          content: '';
          width: 14px;
          height: 2px;
          background: #707070;
          border-radius: 30px;

          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -7px;
          margin-top: -1px;
        }
        &::after {
          display: block;
          content: '';
          width: 14px;
          height: 2px;
          background: #707070;
          border-radius: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -7px;
          margin-top: -1px;
          transform: rotate(90deg);
        }
      }
    }
    &.btn-control-minus {
      font-size: 0;
      span {
        &::before {
          display: block;
          content: '';
          width: 14px;
          height: 2px;
          background: #707070;
          border-radius: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-left: -7px;
          margin-top: -1px;
        }
      }
    }
  }
}

#sticky-total {
  position: fixed;
  bottom: 0;
  left: 100px;
  right: 0;
  z-index: 5;
  background: #fff;
  border: 0;
  padding: 40px 40px;
  box-shadow: 0 -5px 10px rgba(195, 195, 195, 0.16);
}

// overwrite
.custom-radio.b-custom-control-lg .custom-control-label::before,
.input-group-lg .custom-radio .custom-control-label::before {
  width: 32px;
  height: 32px;
  background: #f5f5f5;
  box-shadow: inset 0 1px 2px rgba(195, 195, 195, 1);
  border: 0;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #4cb0f8;
  background-color: #4cb0f8;
}
.custom-radio.b-custom-control-lg .custom-control-label::after,
.input-group-lg .custom-radio .custom-control-label::after {
  top: 7px;
  left: -28px;
  width: 28px;
  height: 28px;
}

.custom-switch.b-custom-control-lg,
.input-group-lg .custom-switch {
  padding-left: 27px;
  width: 55px;
  height: 32px;
  vertical-align: top;
}
.custom-switch.b-custom-control-lg .custom-control-label::before,
.input-group-lg .custom-switch .custom-control-label::before {
  width: 55px;
  height: 32px;
  background: #f5f5f5;
  box-shadow: inset 0 1px 2px rgba(195, 195, 195, 1);
  border: 0;
  border-radius: 100px;
  left: -44px;
}
.custom-switch.b-custom-control-lg .custom-control-label::after,
.input-group-lg .custom-switch .custom-control-label::after {
  background: #fff;
  box-shadow: 1px 1px 2px rgb(201 201 201);
  left: calc(-44px + 2px);
  width: calc(32px - 4px);
  height: calc(32px - 4px);
  border-radius: 50%;
}

.custom-switch.b-custom-control-lg
  .custom-control-input:checked
  ~ .custom-control-label::after,
.input-group-lg
  .custom-switch
  .custom-control-input:checked
  ~ .custom-control-label::after {
  background: #4cb0f8;
  box-shadow: 1px 1px 2px rgb(201 201 201);
  transform: translateX(22px);
}
</style>
