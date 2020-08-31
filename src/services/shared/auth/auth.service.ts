import { Pagination } from '@/common';
import { BaseService } from '@/core';
import JwtStorageService from './jwt-storage.service';
import { SigninDto, BaseUser } from './dto';
import { Observable } from 'rxjs';
import { Auth } from './dto/auth.dto';
import * as JWThelper from 'jwthelper';

class AuthService extends BaseService {
  constructor() {
    super();
  }

  signin(credential: SigninDto): Observable<any> {
    return this.post('auth/admin/login', credential);
  }

  //   logout and remove session storage
  signout() {
    return JwtStorageService.removeToken();
  }

  //   verify if token is valid
  // isTokenExpired(token: string) {
  //   if (token) {
  //     return JWThelper.verify(token);
  //   } else {
  //     return null;
  //   }
  // }
}

export default new AuthService();
