<template>
  <div
    id="proforma-calculaotr"
    ref="proforma"
    :style="{ 'padding-bottom': isToggleSticky ? '300px' : '100px' }"
  >
    <div>
      <div>
        <div
          v-for="category in serviceCategories"
          :key="category.name"
          class="service-card"
        >
          <div class="service-card-title">
            <h4>
              <span>
                <b-img-lazy
                  :src="
                    `https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_service_${category.name}.svg`
                  "
                ></b-img-lazy>
              </span>
              <span>{{ category.title }}</span>
            </h4>
          </div>
          <div class="service-card-items">
            <div
              v-for="item in category.items"
              :key="item.id"
              class="service-card-item"
            >
              <div
                class="item-name"
                :class="{
                  'text-blue': checkboxValues.includes(item),
                }"
              >
                {{ item.name }}
              </div>
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
            <h4>
              <span>
                <b-img-lazy
                  :src="
                    `https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_service_extra.svg`
                  "
                ></b-img-lazy>
              </span>
              <span>{{ extraService.title }}</span>
            </h4>
          </div>
          <div class="service-card-items">
            <div
              v-for="(item, index) in extraService.items"
              :key="item.id"
              class="service-card-item"
            >
              <div class="item-name">
                {{ item.name }}
                <div class="qty-control-box">
                  <b-form-input
                    type="text"
                    v-model="item.qty"
                    :class="{ 'text-blue': item.qty > 0 }"
                    @change="changePrice(index)"
                  />
                </div>
                <!-- {{ item.qty }}  -->
                {{ item.unit }}
              </div>
              <div class="item-value">
                <input
                  type="hidden"
                  :name="extraService.name"
                  :id="item.id"
                  :value="item.price"
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

      <div class="service-total-box" id="sticky-total" ref="proformaSticky">
        <div
          @click="onToggleSticky()"
          class="btn-toggle"
          :class="{ 'is-active': isToggleSticky }"
        >
          <span class="icon">
            <b-img-lazy
              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/common/icon_arrow_down.svg"
            ></b-img-lazy>
          </span>
          <span class="is-hidden">열기/닫기</span>
        </div>
        <template v-if="isToggleSticky">
          <div class="row-box">
            <div class="service-total-title">합계</div>
            <div class="service-total-value">
              <!-- <span class="monthly-fee"
                ><b
                  >매월
                  {{ Math.floor(totalPrice / 12) | numeralTransformer }}원</b
                >
                <b>VAT 별도</b></span
              > -->
              <span class="total-fee"
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
        </template>
        <div class="row-box final-total-value-box">
          <div class="d-flex justify-content-between align-items-center">
            <div class="service-total-title">최종 합계</div>
            <div class="btn-control-box">
              <span class="btn-control" @click="resetProforma()">
                <b-icon icon="arrow-clockwise"></b-icon>
                <span class="ml-2">초기화</span>
              </span>
            </div>
          </div>

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

  private isToggleSticky = false;

  private discountValue = 0;
  private calculateDiscountValue = 0;
  private discountType = DISCOUNT_TYPE.WON;
  private discountTypes: DISCOUNT_TYPE[] = [...CONST_DISCOUNT_TYPE];

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
    name: 'extra',
    items: [
      {
        id: 'extraService01',
        name: '포스피드',
        unit: '개월',
        price: 20000,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 'extraService02',
        name: '상권분석',
        unit: '개월',
        price: 100000,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 'extraService03',
        name: '매장 관리 서비스',
        unit: '개월',
        price: 200000,
        qty: 0,
        totalPrice: 0,
      },
      {
        id: 'extraService04',
        name: '사후교육',
        unit: '회',
        price: 300000,
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
    this.calculateDiscountValue = 0;
    this.checkboxValues = [];
    this.extraService.items.forEach((e, i) => {
      e.qty = 0;
      this.changePrice(i);
    });
  }

  onToggleSticky() {
    this.isToggleSticky = !this.isToggleSticky;
  }
  get stickyHeight() {
    const stickyHeight = this.$refs.proformaSticky.getBoundingClientRect()
      .height;
    return (this.$refs.proforma.style.paddingBottom = stickyHeight + 'px');
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
    sessionStorage.setItem(
      `${this.categoryType}_discountType`,
      JSON.stringify(this.discountType),
    );
    sessionStorage.setItem(
      `${this.categoryType}_discountValue`,
      JSON.stringify(this.calculateDiscountValue),
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

    const discountType = sessionStorage.getItem(
      `${this.categoryType}_discountType`,
    );

    const discountValue = sessionStorage.getItem(
      `${this.categoryType}_discountValue`,
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

    if (discountType && discountValue) {
      this.discountType = JSON.parse(discountType);
      this.calculateDiscountValue = JSON.parse(discountValue);
    }
  }

  created() {
    this.getItem();
  }
}
</script>
<style lang="scss">
.service-card {
  border-radius: 10px;
  box-shadow: 0 7px 9px rgba(195, 195, 195, 0.16);
  background-color: #fff;
  overflow: hidden;
  padding: 0 0;
  margin: 40px 0;
  display: flex;
  align-items: center;
  min-height: 100px;
  .service-card-title {
    text-align: left;
    width: 25vw;
    padding: 16px 16px 16px 60px;
    img {
      width: 68px;
      margin: 0 16px;
    }
    h4 {
      font-size: 24px;
      color: #000000;
      font-weight: 500;
      span {
        + span {
          margin: 0 24px;
        }
      }
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
    padding: 24px 0;
    + .row-box {
      border-top: 1px solid rgb(115 143 180 / 65%);
    }
    &.discount-value-box {
      .service-total-value {
        .total-fee {
          font-weight: 700;
        }
      }
    }
    &.final-total-value-box {
      border-top-width: 2px;
      .service-total-title {
        color: #007eeb;
      }
      .service-total-value {
        .total-fee {
          font-size: 44px;
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
    // display: flex;
    // align-items: center;
    text-align: right;
    .monthly-fee {
      display: block;
      font-size: 16px;
      white-space: nowrap;
      // margin-right: 40px;
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
    width: 50px;
    height: 36px;
    border: 0;
    background: #f5f5f5;
    box-shadow: inset 0 3px 6px rgba(195, 195, 195, 0.16);
    margin: 0 8px;
    text-align: center;
    font-weight: 700;
  }
}
.btn-control-box {
  display: inline-flex;
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
    cursor: pointer;
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
  background: rgba(240, 247, 252, 0.9);
  border: 0;
  padding: 0 40px;
  box-shadow: 0 -5px 10px rgba(195, 195, 195, 0.16);
  .btn-toggle {
    display: block;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: rgba(240, 247, 252, 0.9);
    position: absolute;
    left: 50%;
    margin-left: -40px;
    top: -40px;
    text-align: center;
    &.is-active {
      .icon {
        transform: rotate(0);
      }
    }
    .icon {
      display: inline-block;
      width: 20px;
      margin-top: 15px;
      transform: rotate(180deg);
    }
  }
}

// overwrite
.custom-radio.b-custom-control-lg,
.input-group-lg .custom-radio {
  position: relative;
  top: -4px;
  cursor: pointer;
}
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
  position: relative;
  top: -4px;
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
  cursor: pointer;
}
.custom-switch.b-custom-control-lg .custom-control-label::after,
.input-group-lg .custom-switch .custom-control-label::after {
  background: #fff;
  box-shadow: 1px 1px 2px rgb(201 201 201);
  left: calc(-44px + 2px);
  width: calc(32px - 4px);
  height: calc(32px - 4px);
  border-radius: 50%;
  cursor: pointer;
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

@media screen and (max-width: 1365px) {
  .service-card {
    .service-card-title {
      padding: 16px 30px;
      h4 {
        text-align: center;
        span {
          display: block;
          margin: 8px 0;
          img {
            width: 40px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 991px) {
  .service-card {
    display: block;
    .service-card-title {
      width: auto;
      h4 {
        font-size: 20px;
        span {
          display: inline-block;
          img {
            margin: 0 8px;
          }
          + span {
            margin: 0 8px;
          }
        }
      }
    }
    .service-card-items {
      width: auto;
      .service-card-item {
        border-top: 1px solid #e0e0e0;
        + .service-card-item {
          .item-name {
            border-top: 0;
          }
        }
        .item-name {
          width: calc(100% - 40%);
          font-size: 16px;
          padding: 18px 18px;
        }
        .item-value {
          width: 40%;
          padding: 18px 18px;
        }
      }
    }
  }
  #sticky-total {
    left: 0;
  }
  .service-total-box {
    .row-box {
      > div {
        display: block !important;
      }
      &.final-total-value-box {
        .service-total-value {
          .total-fee {
            font-size: 36px;
          }
        }
      }
    }

    .service-total-title {
      margin-right: 0;
      margin-bottom: 8px;
      font-size: 18px;
    }
    .service-total-value {
      .total-fee {
        font-size: 18px;
      }
      .monthly-fee {
        font-size: 12px;
      }
    }
  }
  .btn-control-box {
    > .btn-control {
      min-width: 44px;
    }
  }
}

@media screen and (max-width: 575px) {
  #sticky-total {
    padding: 0 16px;
  }
  .service-total-box {
    .row-box {
      &.final-total-value-box {
        display: block;
        > .d-flex {
          display: flex !important;
          margin-bottom: 16px;
          .service-total-title {
            margin: 0;
          }
        }
      }
    }
  }
  .btn-control-box {
    > .btn-control {
      padding: 4px 8px;
      height: 30px;
      font-size: 12px;
    }
  }
}
</style>
