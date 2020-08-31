import NProgress from 'nprogress';
import '../../../node_modules/nprogress/nprogress.css';
import { Route } from 'vue-router';
import router from '@/router';
import JwtStorageService from '../../services/shared/auth/jwt-storage.service';
import { PermissionGuard } from './permission.guard';
import * as jwtDecode from 'jwt-decode';
import toast from '../../../resources/assets/js/services/toast.js';

// const whiteList = ['/login', '/auth-redirect'];

NProgress.configure({ showSpinner: true });

const getPageTitle = (key: string) => {
  const hasKey = `${key}`;
  if (hasKey) {
    return hasKey;
  }
  return '나누다 공유 플랫폼';
};
router.beforeEach(async (to: Route, from: Route, next: any) => {
  // 진행바 시작~
  const token = JwtStorageService.getToken();

  NProgress.start();

  if (to.meta.authRequired) {
    if (!token) {
      toast.error('로그인 해주세요.');
      NProgress.done();
      next('/login');
      return;
    }
    const payload = await jwtDecode(token);
    if (!payload) {
      toast.error('payload error');
      JwtStorageService.removeToken();
      next('/login');
      return;
    }
    const authCode = payload.adminRole;
    const newArray = [];
    const splittedArray = authCode.split(',');
    splittedArray.map(role => {
      newArray.push(role);
    });

    const hasPermission = () =>
      to.meta.roles.some(role => {
        return newArray.includes(role);
      });
    if (!hasPermission()) {
      next(false);
      toast.error(
        `${to.path}으로 진입할 권한이 없습니다. 가능한 등금: ${to.meta.roles} | 본인 등급: ${authCode}`,
      );
      NProgress.done();
      return;
    }
    next();
  }
  if (!to.meta.authRequired) {
    if (token) {
      next('/dashboard');
      NProgress.done();
      return;
    }
  }
  next();
  return;
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();
  // set page title
  document.title = getPageTitle(`${to.meta.title} - 나누다 공유 플랫폼`);
});
