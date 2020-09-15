<template>
  <b-modal
    id="update_menu"
    title="메뉴 수정하기"
    @hide="clearOutUpdateDto()"
    @cancel="clearOutUpdateeDto()"
    @ok="create()"
    ok-title="추가"
    cancel-title="취소"
  >
    <b-form-row>
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
    </b-form-row>
    <b-form-row>
      <b-col md="12">
        <b-form-group label="메뉴 설명 글">
          <b-form-textarea style="height:100px;" v-model="menuUpdateDto.desc"></b-form-textarea>
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

@Component({ name: 'MenuUpdate' })
export default class MenuUpdate extends BaseComponent {
  @Prop() private readonly menuNo: number;
  private menuUpdateDto = new MenuUpdateDto();
  private menuDto = new MenuDto();

  clearOutCreateDto() {
    this.menuUpdateDto = new MenuUpdateDto();
  }

  findOne() {
    MenuService.findOne(this.menuNo).subscribe(res => {
      this.menuUpdateDto = res.data;
    });
  }

  update() {
    MenuService.update(this.menuNo, this.menuUpdateDto).subscribe(res => {
      this.$root.$emit('menu_create');
    });
  }

  created() {
    this.findOne();
  }
}
</script>