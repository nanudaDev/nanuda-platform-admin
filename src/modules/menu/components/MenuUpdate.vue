<template>
  <b-modal
    id="update_menu"
    title="메뉴 수정하기"
    @hide="clearOutUpdateDto()"
    @cancel="clearOutUpdateDto()"
    @ok="update()"
    ok-title="수정"
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
              v-model="menuUpdateDto.showYn"
              :value="showYn[0]"
              :unchecked-value="showYn[1]"
            ></b-form-checkbox>
          </b-form-group>
        </b-row>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴 한글명 (필수)">
          <b-form-input v-model="menuUpdateDto.nameKr" />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴 영어명">
          <b-form-input v-model="menuUpdateDto.nameEng" />
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="대표 메뉴 노출">
          <b-form-radio
            v-model="menuUpdateDto.mainYn"
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
          v-if="menuUpdateDto.showYn === 'N' && menuUpdateDto.mainYn === 'Y'"
        >
          <p class="text-center">
            <small>노출상태가 활성화 되어있어야 대표메뉴에 노출됩니다.</small>
          </p>
        </b-alert>
      </b-col>
    </b-form-row>
    <b-form-row>
      <b-col md="12">
        <b-form-group label="메뉴 설명 글">
          <b-form-textarea
            style="height:100px;"
            v-model="menuUpdateDto.desc"
          ></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-form-row>
  </b-modal>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '@/core/base.component';
import { MenuUpdateDto, MenuDto } from '@/dto';
import MenuService from '../../../services/menu.service';
import toast from '../../../../resources/assets/js/services/toast.js';
import { CONST_YN, YN } from '@/common';

@Component({ name: 'MenuUpdate' })
export default class MenuUpdate extends BaseComponent {
  private menuUpdateDto = new MenuUpdateDto();
  private menuDto = new MenuDto();
  private updateMenuNo = null;
  private showYn: YN[] = [...CONST_YN];

  clearOutUpdateDto() {
    this.menuUpdateDto = new MenuUpdateDto();
  }

  findOne(menuNo) {
    MenuService.findOne(menuNo).subscribe(res => {
      this.menuUpdateDto = res.data;
    });
  }

  update() {
    MenuService.update(this.updateMenuNo, this.menuUpdateDto).subscribe(res => {
      if (res) {
        toast.success('수정완료');
        this.$root.$emit('menu_create');
      }
    });
  }

  mounted() {
    this.$root.$on('menu_update', menuNo => {
      this.updateMenuNo = menuNo;
      this.findOne(menuNo);
    });
  }
}
</script>
