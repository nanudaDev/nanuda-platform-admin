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
      <b-col md="6">
        <b-form-group label="메뉴 한글명 (필수)">
          <b-form-input v-model="menuCreateDto.nameKr" />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴 영어명">
          <b-form-input v-model="menuCreateDto.nameEng" />
        </b-form-group>
      </b-col>
    </b-form-row>
    <!-- <b-form-row v-if="brandNo">
      <b-col md="6">
        <b-form-group label="브렌드">
          <b-form-input v-model="menuCreateDto.brandNo" />
        </b-form-group>
      </b-col>
    </b-form-row>-->
    <b-form-row>
      <b-col md="12">
        <b-form-group label="메뉴 설명 글">
          <b-form-textarea style="height:100px;" v-model="menuCreateDto.desc"></b-form-textarea>
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

@Component({
  name: 'MenuCreate',
})
export default class MenuCreate extends BaseComponent {
  @Prop() readonly brandNo: number;
  private menuCreateDto = new MenuCreateDto();

  clearOutCreateDto() {
    this.menuCreateDto = new MenuCreateDto();
  }

  create() {
    if (this.brandNo) {
      this.menuCreateDto.brandNo = this.brandNo;
    }
    console.log(this.menuCreateDto);
    MenuService.create(this.menuCreateDto).subscribe(res => {
      if (res) {
        toast.success('추가 완료');
        this.$root.$emit('menu_create');
      }
    });
  }

  created() {
    console.log(this.brandNo);
  }
}
</script>