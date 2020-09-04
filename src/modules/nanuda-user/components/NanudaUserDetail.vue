<template>
  <section v-if="nanudaUserDto">
    <SectionTitle :title="`${nanudaUserDto.name} - 사용자 정보`">
      <template v-slot:rightArea>
        <router-link to="/nanuda-user" class="btn btn-secondary">목록으로</router-link>
      </template>
    </SectionTitle>
    <b-row>
      <b-col lg="6" class="my-3">
        <BaseCard title="사용자 정보">
          <template v-slot:head>
            <div>
              <b-button variant="outline-info" v-b-modal.send_message>
                <b-icon icon="envelope"></b-icon>
                <span class="ml-2">문자전송</span>
              </b-button>
            </div>
          </template>
          <template v-slot:body>
            <div>
              <ul class="u-list">
                <li v-if="nanudaUserDto.gender">사용자 ID : {{nanudaUserDto.no}}</li>
                <li v-if="nanudaUserDto.name">사용자명 : {{nanudaUserDto.name}}</li>
                <li v-if="nanudaUserDto.phone">
                  휴대폰 번호 :
                  <span>{{nanudaUserDto.phone | phoneTransformer }}</span>
                </li>
                <li v-if="nanudaUserDto.gender">성별 : {{nanudaUserDto.gender | enumTransformer}}</li>
                <li v-if="nanudaUserDto.infoYn">
                  개인정보 이용 약관 동의 :
                  <b-badge
                    :variant="
                        nanudaUserDto.infoYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                  >
                    {{
                    nanudaUserDto.infoYn | enumTransformer
                    }}
                  </b-badge>
                </li>
                <li v-if="nanudaUserDto.serviceYn">
                  서비스 이용 약관 동의 :
                  <b-badge
                    :variant="
                        nanudaUserDto.serviceYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                  >
                    {{
                    nanudaUserDto.serviceYn | enumTransformer
                    }}
                  </b-badge>
                </li>
                <li v-if="nanudaUserDto.marketYn">
                  마케팅 이용 약관 동의 :
                  <b-badge
                    :variant="
                        nanudaUserDto.marketYn === 'Y'
                          ? 'success'
                          : 'danger'
                      "
                  >
                    {{
                    nanudaUserDto.marketYn | enumTransformer
                    }}
                  </b-badge>
                </li>
                <li
                  v-if="nanudaUserDto.createdAt"
                >가입 일시 : {{nanudaUserDto.createdAt | dateTransformer}}</li>
                <li
                  v-if="nanudaUserDto.lastLoginAt"
                >마지막 로그인 일시 : {{nanudaUserDto.lastLoginAt | dateTransformer}}</li>
              </ul>
            </div>
          </template>
        </BaseCard>
      </b-col>
    </b-row>
    <!-- 문자 전송 모달 -->
    <b-modal
      v-if="nanudaUserDto"
      id="send_message"
      ok-title="전송"
      cancel-title="취소"
      @hide="clearOutSendMessage()"
      @cancel="clearOutSendMessage()"
      @ok="sendMessage()"
      :title="`${nanudaUserDto.name} 사용자에게 문자하기`"
    >
      <p class="mb-2">
        휴대폰 번호 :
        <b class="text-primary">
          {{
          nanudaUserDto.phone | phoneTransformer
          }}
        </b>
      </p>
      <b-form-input
        placeholder="제목을 입력해주세요"
        id="title"
        v-model="adminSendMessageDto.title"
        class="mb-2"
      ></b-form-input>
      <b-form-textarea
        id="message"
        placeholder="메세지를 입력해주세요.."
        rows="3"
        max-rows="6"
        v-model="adminSendMessageDto.message"
      ></b-form-textarea>
    </b-modal>
  </section>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import { AdminSendMessageDto, NanudaUserDto } from '@/dto';
import { BaseUser } from '@/services/shared/auth';
import NanudaUserService from '../../../services/nanuda-user.service';
import SmsService from '../../../services/sms.service';
import toast from '../../../../resources/assets/js/services/toast.js';

@Component({
  name: 'NanudaUserDetail',
})
export default class NanudaUserDetail extends BaseComponent {
  private nanudaUserDto = new NanudaUserDto(BaseUser);
  private adminSendMessageDto = new AdminSendMessageDto();

  // 상세 보기
  findOne(id) {
    NanudaUserService.findOne(id).subscribe(res => {
      if (res) {
        this.nanudaUserDto = res.data;
      }
    });
  }

  // send message to user
  sendMessage() {
    this.adminSendMessageDto.phone = this.nanudaUserDto.phone;
    SmsService.sendMessage(this.adminSendMessageDto).subscribe(res => {
      if (res) {
        this.adminSendMessageDto = new AdminSendMessageDto();
        toast.success('문자가 발송 되었습니다.');
      } else {
        return;
      }
    });
  }

  // clear out send message
  clearOutSendMessage() {
    this.adminSendMessageDto = new AdminSendMessageDto();
  }

  created() {
    const id = this.$route.params.id;
    this.findOne(id);
  }
}
</script>