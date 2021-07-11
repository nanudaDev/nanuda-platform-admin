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
        <div
          v-for="(item, index) in extraService.items"
          :key="item.id"
          class="tr"
        >
          <div class="th">
            <template v-if="index === 0">
              {{ extraService.title }}
            </template>
          </div>
          <div class="td">
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
      <div class="tfoot">
        <div class="tr">
          <div>합계</div>
          <div>{{ totalPrice }}</div>
          <div>
            <b-button
              v-for="(type, index) in discountTypes"
              :key="index"
              v-b-modal.discount_modal
              @click="selectDiscountType(type)"
              >{{ type }}</b-button
            >
            <b-button @click="resetDiscount()">할인초기화</b-button>
          </div>
        </div>
        <div class="tr">
          <div scope="row">최종 합계</div>
          <div>{{ finalTotalValue }}</div>
          <div></div>
        </div>
        <div class="tr">
          <div></div>
          <div>매월 {{ monthlyFee }}</div>
          <div></div>
        </div>
      </div>
    </div>
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
import { ProformaCalculatorDto } from '@/dto';
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

  private serviceCategories = [
    {
      title: '레시피',
      name: 'recipe',
      items: [
        {
          id: 'recipe01',
          name: '레시피 & 북배달 매뉴얼 제공',
          price: 1188000,
          checked: false,
        },
      ],
    },
    {
      title: '메뉴교육',
      name: 'menu',
      type: 'radio',
      items: [
        {
          id: 'menu01',
          name: '현장실습',
          price: 300000,
          checked: false,
        },
        {
          id: 'menu02',
          name: '방문교육(교통비 실비 별도)',
          price: 300000,
          checked: false,
        },
      ],
    },
    {
      title: '배달앱관리',
      name: 'deliveryApp',
      items: [
        {
          id: 'deliveryApp01',
          name: '배달 앱 등록(배민, 쿠팡, 요기요 등)',
          price: 100000,
          checked: false,
        },
        {
          id: 'deliveryApp02',
          name: '로고, 사진, 브랜드 제공',
          price: 200000,
          checked: false,
        },
        {
          id: 'deliveryApp03',
          name: '배달앱 컨설팅(리뷰이벤트, 깃발 등)',
          price: 200000,
          checked: false,
        },
      ],
    },
    {
      title: '디자인물',
      name: 'designApp',
      items: [
        {
          id: 'designApp01',
          name: '스티커, 메모지, 자석전단지',
          price: 100000,
          checked: false,
        },
      ],
    },
  ];

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
  }

  // 할인 방법 선택
  selectDiscountType(type) {
    this.discountValue = 0;
    this.discountType = type;
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
    localStorage.setItem('checkboxValues', JSON.stringify(this.checkboxValues));
    localStorage.setItem('radioValues', JSON.stringify(this.radioValues));
    localStorage.setItem(
      'extraServiceValues',
      JSON.stringify(this.extraService),
    );
  }

  getItem() {
    const getValueChecked = localStorage.getItem('checkboxValues');
    const getRadioValueChecked = localStorage.getItem('radioValues');
    const extraServiceValues = localStorage.getItem('extraServiceValues');
    if (getValueChecked) {
      this.checkboxValues = [...JSON.parse(getValueChecked)];
    }

    if (getRadioValueChecked) {
      this.radioValues = JSON.parse(getRadioValueChecked);
    }

    if (extraServiceValues) {
      this.extraService = JSON.parse(extraServiceValues);
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
    > div {
      flex: 1;
      border: 1px solid #dcdcdc;
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
      }
    }
  }
}
</style>
