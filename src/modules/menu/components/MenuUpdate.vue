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
      <b-col lg="12" class="mb-3">
        <label for>이미지</label>
        <b-form-file
          placeholder="파일 선택"
          ref="fileInput"
          @input="upload($event)"
          required
          multiple
        ></b-form-file>
        <b-form-row no-gutters class="attatchments-list mt-2">
          <template>
            <b-col
              cols="2"
              v-for="(images, index) in uploadImages"
              :key="images.endpoint"
              class="p-2 item"
            >
              <div class="attatchments-list-item">
                <b-img
                  :src="images.endpoint"
                  alt
                  style="max-width:100%"
                  class="border rounded"
                />
                <b-icon
                  icon="x-circle-fill"
                  variant="danger"
                  class="btn-delete-item"
                  @click="deleteOldImages(images, index)"
                ></b-icon>
              </div>
            </b-col>
          </template>
          <template v-if="newImages && newImages.length > 0">
            <b-col
              cols="2"
              v-for="(images, index) in newImages"
              :key="images.endpoint"
              class="p-2"
            >
              <div class="attatchments-list-item">
                <b-img
                  :src="images.endpoint"
                  alt
                  style="max-width:100%"
                  class="border rounded"
                />
                <b-icon
                  icon="x-circle-fill"
                  variant="danger"
                  class="btn-delete-item"
                  @click="deleteNewImages(images, index)"
                ></b-icon>
              </div>
            </b-col>
          </template>
        </b-form-row>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴명 *">
          <b-form-input v-model="menuUpdateDto.nameKr" />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group label="메뉴명 (영문)">
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
import { ArticleUpdateDto } from '@/dto/article/article-update.dto';
import { FileAttachmentDto } from '@/services/shared/file-upload';
import FileUploadService from '../../../services/shared/file-upload/file-upload.service';
import { UPLOAD_TYPE } from '../../../services/shared/file-upload/file-upload.service';
import { ATTACHMENT_REASON_TYPE } from '@/services/shared/file-upload';
import draggable from 'vuedraggable';

@Component({ name: 'MenuUpdate' })
export default class MenuUpdate extends BaseComponent {
  private menuUpdateDto = new MenuUpdateDto();
  private menuDto = new MenuDto();
  private updateMenuNo = null;
  private showYn: YN[] = [...CONST_YN];
  private uploadImages: FileAttachmentDto[] = [];
  private newImages: FileAttachmentDto[] = [];
  private selectedImages = [];
  private dataLoading = false;

  // delete images
  deleteNewImages(image, index) {
    if (this.newImages.includes(image)) {
      index = this.newImages.indexOf(image);
      if (index > -1) {
        this.newImages.splice(index, 1);
      }
    }
  }

  deleteOldImages(image, index) {
    if (this.uploadImages.includes(image)) {
      index = this.uploadImages.indexOf(image);
      if (index > -1) {
        this.uploadImages.splice(index, 1);
      }
    }
  }

  // 이미지 업로드
  async upload(file: File[]) {
    this.dataLoading = true;
    const attachments = await FileUploadService.upload(UPLOAD_TYPE.MENU, file);
    this.newImages = [];
    this.newImages.push(
      ...attachments.filter(
        fileUpload =>
          fileUpload.attachmentReasonType === ATTACHMENT_REASON_TYPE.SUCCESS,
      ),
    );

    this.dataLoading = false;
  }

  clearOutUpdateDto() {
    this.menuUpdateDto = new MenuUpdateDto();
    this.newImages = [];
  }

  findOne(menuNo) {
    MenuService.findOne(menuNo).subscribe(res => {
      this.menuUpdateDto = res.data;
      this.uploadImages = res.data.images;
      this.newImages = [];
    });
  }

  update() {
    if (this.uploadImages && this.uploadImages.length > 0) {
      this.menuUpdateDto.images = this.uploadImages;
      this.menuUpdateDto.newImages = this.newImages;
    }
    if (
      this.uploadImages &&
      this.uploadImages.length < 1 &&
      this.newImages &&
      this.newImages.length > 0
    ) {
      this.menuUpdateDto.images = [];
      this.menuUpdateDto.newImages = this.newImages;
    }
    if (
      this.uploadImages &&
      this.uploadImages.length < 1 &&
      this.newImages &&
      this.newImages.length < 1
    ) {
      this.menuUpdateDto.newImages = [];
      this.menuUpdateDto.images = [];
    }

    if (
      this.uploadImages &&
      this.uploadImages.length < 1 &&
      this.newImages &&
      this.newImages.length > 0
    ) {
      this.menuUpdateDto.images = this.newImages;
      this.menuUpdateDto.newImages = [];
    }

    // if (this.newImages && this.newImages.length < 1) {
    //   this.menuUpdateDto.images = this.uploadImages;
    //   this.menuUpdateDto.newImages = [];
    // }
    console.log(this.menuUpdateDto);
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
``
