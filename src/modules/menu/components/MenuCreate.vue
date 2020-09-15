<template>
  <b-modal
    id="add_menu"
    title="메뉴 추가하기"
    @hide="clearOutCreateDto()"
    @cancel="clearOutCreateDto()"
    @ok="create()"
    ok-title="추가"
    cancel-title="취소"
  >
    <b-form-row>
      <b-col lg="12" class="text-right mb-3">
        <b-row no-gutters align-h="end">
          <b-form-group
            label="노출 활성화"
            label-size="sm"
            label-text-align="right"
            label-cols="8"
          >
            <b-form-checkbox
              switch
              size="lg"
              v-model="menuCreateDto.showYn"
              :value="showYn[0]"
              :unchecked-value="showYn[1]"
            ></b-form-checkbox>
          </b-form-group>
        </b-row>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴명 *">
          <b-form-input v-model="menuCreateDto.nameKr" />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴 (영문명)">
          <b-form-input v-model="menuCreateDto.nameEng" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="대표 메뉴 노출">
          <b-form-radio
            v-model="menuCreateDto.mainYn"
            v-for="yn in showYn"
            :key="yn"
            :value="yn"
            name="main_yn"
            :id="`main_yn_${yn}`"
            >{{ yn | enumTransformer }}</b-form-radio
          >
        </b-form-group>
        <b-alert
          variant="success"
          show
          class="my-4"
          v-if="menuCreateDto.showYn === 'N' && menuCreateDto.mainYn === 'Y'"
        >
          <p class="text-center">
            <small>노출상태가 활성화 되어있어야 대표메뉴에 노출됩니다.</small>
          </p>
        </b-alert>
      </b-col>
    </b-form-row>
    <b-form-row v-if="proppedBrandNo">
      <b-col md="6">
        <!-- TODO: 브랜드 자동완성 -->
        <b-form-group label="브랜드">
          <b-form-input v-model="menuCreateDto.brandNo" />
        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="12">
        <b-form-group label="메뉴 설명 글">
          <b-form-textarea
            style="height:100px;"
            v-model="menuCreateDto.desc"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-modal>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { MenuCreateDto } from '@/dto';
import BrandService from '../../../services/brand.service';
import MenuService from '../../../services/menu.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { CONST_YN, YN } from '@/common';

@Component({
  name: 'MenuCreate',
})
export default class MenuCreate extends BaseComponent {
  @Prop() readonly brandNo: number;
  private menuCreateDto = new MenuCreateDto();
  private proppedBrandNo = true;
  private showYn: YN[] = [...CONST_YN];

  clearOutCreateDto() {
    this.menuCreateDto = new MenuCreateDto();
  }

  create() {
    if (this.brandNo) {
      this.menuCreateDto.brandNo = this.brandNo;
    }
    MenuService.create(this.menuCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가 완료');
        this.$root.$emit('menu_create');
      }
    });
  }

  created() {
    if (this.brandNo) {
      this.proppedBrandNo = true;
    } else {
      this.proppedBrandNo = false;
    }
  }
}
</script>
