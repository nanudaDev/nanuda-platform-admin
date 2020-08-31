<template>
  <div class="approval-card">
    <!-- 등록 / 수정 승인 요청 -->
    <template
      v-if="
        data[status] === 'UPDATE_APPROVAL' || data[status] === 'NEED_APPROVAL'
      "
    >
      <div class="border rounded bg-light p-3 mt-4">
        <template v-if="data[status] === 'UPDATE_APPROVAL'">
          <h5 class="text-danger">승인 요청 항목</h5>
          <div
            v-if="data[histories]"
            class="py-2 mt-3 mb-2 border-top border-bottom"
          >
            <ul>
              <li v-for="(value, name) in data[histories][0]" :key="name">
                <div v-if="value.length > 0">
                  <span v-if="histories === 'companyDistrictHistories'">{{
                    name | stringDistrictTransformer
                  }}</span>
                  <span v-else>{{ name | stringTransformer }}</span>
                  :
                  <span v-if="value[0].endpoint">
                    <b-img-lazy
                      :src="value[0].endpoint"
                      :alt="value[0].originFilename"
                      style="max-height:80px"
                    ></b-img-lazy>
                  </span>
                  <span v-else>{{ value }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <div class="text-right">
          <b-button variant="primary" class="mx-1" @click="updateApproval()"
            >승인</b-button
          >
          <b-button
            variant="secondary"
            v-b-modal.refusal_info
            class="mx-1"
            v-if="dto"
            >거절</b-button
          >
        </div>
      </div>
    </template>
    <!-- 거절 -->
    <template v-if="data[status] === 'REFUSED'">
      <div class="border rounded bg-light p-3 mt-4">
        <div>
          <h5 class="text-danger">승인 거절 사유</h5>
        </div>
        <div v-if="data[histories][0]">
          <ul
            v-if="data[histories][0].refusalReasons"
            class="py-2 mt-3 border-top border-bottom"
          >
            <li
              v-for="(value, name) in data[histories][0].refusalReasons"
              :key="name"
            >
              <span :class="{ 'text-danger': value }">
                <span v-if="histories === 'companyDistrictUpdateHistories'">{{
                  name | stringDistrictTransformer
                }}</span>
                <span v-else>{{ name | stringTransformer }}</span>
              </span>
            </li>
          </ul>
          <p v-if="data[histories][0].refusalDesc" class="mt-2">
            {{ data[histories][0].refusalDesc }}
          </p>
        </div>
      </div>
    </template>
    <!-- 거절 사유 모달 -->
    <b-modal
      id="refusal_info"
      title="승인 거절 사유"
      @ok="updateRefusal()"
      v-if="dto"
    >
      <div v-if="data[histories]">
        <div
          class="form-check"
          v-for="(value, name) in data[histories][0]"
          :key="name"
        >
          <input
            type="checkbox"
            v-model="reasonDto[name]"
            v-if="data[histories][0][name]"
            class="form-check-input"
            :id="name"
          />
          <label :for="name">
            <span v-if="histories === 'companyDistrictHistories'">{{
              name | stringTransformer
            }}</span>
            <span v-else>{{ name | stringTransformer }}</span>
          </label>
        </div>
        <div>
          <label for="refusalDesc" class="d-block">거절이유</label>
          <textarea
            name="refusalDesc"
            id="refusalDesc"
            v-model="dto['refusalDesc']"
            style="width:100%; height:100px;"
          ></textarea>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';

@Component({
  name: 'ApprovalCard',
})
export default class ApprovalCard extends BaseComponent {
  @Prop() data!: {
    type: object;
  };

  @Prop() dto?: {
    type: object;
  };

  @Prop() reasonDto?: {
    type: object;
  };
  @Prop() readonly status!: {
    type: string;
  };
  @Prop() readonly histories!: {
    type: string;
  };

  updateApproval() {
    this.$emit('approval');
  }

  updateRefusal() {
    this.$emit('refusal');
  }
}
</script>
<style lang="scss" scoped>
.approval-card {
  h5 {
    font-weight: bold;
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}
</style>
