import { Component, Vue } from 'vue-property-decorator';
import JwtStorageService from '@/services/shared/auth/jwt-storage.service';
import toast from '../../resources/assets/js/services/toast.js';

@Component
export default class BaseComponent extends Vue {
  public $refs: {
    fileInput: any;
  };

  public logout() {
    JwtStorageService.removeToken();
    toast.success('로그아웃 성공적으로 했습니다.');
    this.$router.push('/login');
  }
}
