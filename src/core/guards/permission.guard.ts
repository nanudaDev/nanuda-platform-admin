import { ADMIN_USER } from '@/services/shared';
import * as jwtDecode from 'jwt-decode';
import toast from '../../../resources/assets/js/services/toast.js';

export const PermissionGuard = async (roles: ADMIN_USER[], token: string) => {
  if (token) {
    const payload = await jwtDecode(token);
    if (!payload) {
      toast.error('payload error');
      return false;
    }

    const authCode = payload.adminRole;
    const newArray = [];
    const splittedArray = authCode.split(',');
    splittedArray.map(role => {
      newArray.push(role);
    });

    //   maybe change the name to hasRoles to sync with server??
    const hasPermission = () =>
      roles.some(role => {
        return newArray.includes(role);
      });

    if (!hasPermission()) {
      toast.error('권한 없습니다.');
      return false;
    } else {
      return true;
    }
  } else {
    return;
  }
};
