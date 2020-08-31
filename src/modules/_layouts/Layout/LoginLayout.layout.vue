<template>
  <section class="body text-center">
    <div class="form-signin" v-on:keyup.enter="signin()">
      <img class="mb-4 logo" src="https://nanudakitchen.com/_nuxt/img/65bad5b.svg" alt width="72" />
      <div>
        <label for="inputPhone" class="sr-only">휴대폰 번호</label>
        <input
          id="inputPhone"
          class="form-control"
          placeholder="휴대폰 번호"
          v-model="signinDto.phone"
          required
          autofocus
        />
      </div>
      <div class="mt-1">
        <label for="inputPassword" class="sr-only">비밀번호</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="비밀번호"
          v-model="signinDto.password"
          required
        />
      </div>
      <div class="text-left my-1">
        <b-form-checkbox
          id="checkbox-1"
          v-model="signinDto.rememberMe"
          name="checkbox-1"
          :value="true"
          :unchecked-value="false"
        >Stay signed in</b-form-checkbox>
      </div>
      <button
        @click="signin()"
        v-on:keyup.enter="signin()"
        class="btn btn-lg btn-primary btn-block mt-1"
      >로그인</button>
      <span style="font-size: 11px; margin-bottom:5px">
        <i>기존 나누다키친 관리자 계정으로 로그인 하시면 됩니다</i>
      </span>
      <br />
      <span style="font-size: 11px; margin-bottom:5px">
        <i>로그인하는 부분에 있어 문제가 발생하면 시스템팀에게 문의 바랍니다</i>
      </span>
      <p class="mt-5 mb-3 text-muted">
        &copy;
        <a href="https://nanudakitchen.com" target="_blank">위대한 상사 2020</a>
      </p>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import BaseComponent from '../../../core/base.component';
import { SigninDto } from '../../../services/shared/auth/dto';
import AuthService from '../../../services/shared/auth/auth.service';
import JwtStorageService from '../../../services/shared/auth/jwt-storage.service';
import CompanyUserService from '../../../services/company-user.service';
import { CompanyUserDto, CompanyUserListDto } from '../../../dto';
import { IsValidatePhone, IsValidatePassword } from '../../../core';
import { Pagination } from '../../../common';

@Component({
  name: 'LoginLayout',
})
export default class LoginLayout extends BaseComponent {
  private signinDto = new SigninDto();
  // clear all parameters
  private clearOut() {
    this.signinDto = new SigninDto();
  }

  // TODO: phone and password validator
  signin() {
    AuthService.signin(this.signinDto).subscribe(res => {
      if (!res) {
        this.clearOut();
      } else {
        JwtStorageService.setToken(res.data);
        this.$router.push('/dashboard');
      }
    });
  }

  mounted() {
    this.clearOut();
  }
}
</script>
<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 380px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn-primary {
  background-color: #eb7f1a;
  border-color: #eb7f1a;
}

/* img */
.logo {
  padding-bottom: 32px;
}
</style>
