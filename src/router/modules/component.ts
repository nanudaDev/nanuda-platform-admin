import { RouteConfig } from 'vue-router';
import { CONST_ADMIN_USER } from '@/services/shared';
import kioskComponentRouter from './kiosk.component';

// 철자 순으로 컴퍼논트 나열한다.
const componentsRouter: RouteConfig[] = [
  {
    path: '/nanuda-user',
    name: '관리자/사용자',
    component: () => import('../../modules/nanuda-user/NanudaUser.vue'),
    children: [
      {
        path: '/nanuda-user',
        name: 'NanudaUserList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/nanuda-user/components/NanudaUserList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '사용자 관리',
        },
      },
      {
        path: '/nanuda-user/:id([0-9]+)',
        name: 'NanudaUserDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/nanuda-user/components/NanudaUserDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '사용자',
        },
      },
      {
        path: '/admin',
        name: 'AdminList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/admin/components/AdminList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '관리자 관리',
        },
      },
      {
        path: '/admin/:id([0-9]+)',
        name: 'AdminDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/admin/components/AdminDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          detailPage: true,
          roles: [...CONST_ADMIN_USER],
          title: '관리자 관리',
        },
      },
    ],
  },
  {
    path: '/brand',
    name: '브랜드',
    component: () => import('../../modules/brand/Brand.vue'),
    children: [
      {
        path: '/brand',
        name: 'BrandList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/brand/components/BrandList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '브랜드 관리',
        },
      },
      {
        path: '/brand/:id([0-9]+)',
        name: 'BrandDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/brand/components/BrandDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '브랜드 관리',
        },
      },
    ],
  },
  {
    path: '/company',
    name: '업체/공간',
    component: () => import('../../modules/company/Company.vue'),
    children: [
      {
        path: '/company',
        name: 'CompanyList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company/components/CompanyList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '업체 관리',
        },
      },
      {
        path: '/company/:id([0-9]+)',
        name: 'CompanyDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company/components/CompanyDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '업체 관리',
        },
      },
      {
        path: '/company/company-user',
        name: 'CompanyUserList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company-user/components/CompanyUserList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '업체 사용자 관리',
        },
      },
      {
        path: '/company/company-user/:id([0-9]+)',
        name: 'CompanyUserDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company-user/components/CompanyUserDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '업체 사용자 관리',
        },
      },
      {
        path: '/company/company-district',
        name: 'CompanyDistrictList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company-district/components/CompanyDistrictList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '업체 지점 관리',
        },
      },
      {
        path: '/company/company-district/:id([0-9]+)',
        name: 'CompanyDistrictDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/company-district/components/CompanyDistrictDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '업체 지점 관리',
        },
      },
      {
        path: '/company/delivery-space',
        name: 'DeliverySpaceList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/delivery-space/components/DeliverySpaceList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '지점 타입 관리',
        },
      },
      {
        path: '/company/delivery-space/:id([0-9]+)',
        name: 'DeliverySpaceDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/delivery-space/components/DeliverySpaceDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '지점 타입 상세',
        },
      },
    ],
  },
  {
    path: '/founder-consult',
    name: '신청',
    component: () => import('../../modules/founder-consult/FounderConsult.vue'),
    children: [
      {
        path: '/founder-consult',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/founder-consult/components/FounderConsultList.vue'
          ),
        name: 'FounderConsultList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '식당형 상담 신청 관리',
        },
      },
      {
        path: '/founder-consult/:id([0-9]+)',
        name: 'FounderConsultDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/founder-consult/components/FounderConsultDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '식당형 상담 신청 상세',
        },
      },
      {
        path: '/delivery-founder-consult',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/delivery-founder-consult/components/DeliveryFounderConsultList.vue'
          ),
        name: 'DeliveryFounderConsultList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '배달형 상담 신청 관리',
        },
      },
      {
        path: '/delivery-founder-consult/:id([0-9]+)',
        name: 'DeliveryFounderConsultDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/delivery-founder-consult/components/DeliveryFounderConsultDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '배달형 상담 신청 상세',
        },
      },
      {
        path: '/delivery-founder-consult-contract',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/delivery-founder-consult-contract/components/DeliveryFounderConsultContractList.vue'
          ),
        name: 'DeliveryFounderConsultContractList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '배달형 계약 내역 관리',
        },
      },
      {
        path: '/delivery-founder-consult-contract/:id([0-9]+)',
        name: 'DeliveryFounderConsultContractDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/delivery-founder-consult-contract/components/DeliveryFounderConsultContractDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '배달형 계약 상세',
        },
      },
      {
        path: '/product-consult',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/product-consult/components/ProductConsultList.vue'
          ),
        name: 'ProductConsultList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '상품 상담 신청 관리',
        },
      },
      {
        path: '/product-consult/:id([0-9]+)',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/product-consult/components/ProductConsultDetail.vue'
          ),
        name: 'ProductConsultDetail',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '상품 상담 신청 상세',
        },
      },
    ],
  },
  {
    path: '/amenity',
    name: '시설 관리',
    component: () => import('../../modules/amenity/Amenity.vue'),
    children: [
      {
        path: '/amenity',
        name: 'AmenityList',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */ '../../modules/amenity/components/AmenityList.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '시설 관리',
        },
      },
    ],
  },
  {
    path: '/board',
    name: '게시판',
    component: () => import('../../modules/notice-board/NoticeBoard.vue'),
    children: [
      {
        path: '/notice-board',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/notice-board/components/NoticeBoardList.vue'
          ),
        name: '공지사항 관리',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '공지사항 관리',
        },
      },
      {
        path: '/notice-board/:id([0-9]+)',
        name: 'NoticeBoardDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/notice-board/components/NoticeBoardDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '공지사항 상세',
        },
      },
      {
        path: '/inquiry',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/inquiry/components/InquiryList.vue'
          ),
        name: 'InquiryList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: 'Q&A 관리',
        },
      },
      {
        path: '/inquiry/:id([0-9]+)',
        name: 'InquiryDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/inquiry/components/InquiryDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: 'Q&A 상세',
        },
      },
      {
        path: '/article',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/article/components/ArticleList.vue'
          ),
        name: 'ArticleList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '기사 관리',
        },
      },
      {
        path: '/article/:id([0-9]+)',
        name: 'ArticleDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/article/components/ArticleDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '기사 상세',
        },
      },
    ],
  },
  // {
  //   path: '/inquiry',
  //   name: 'Q&A',
  //   component: () => import('../../modules/inquiry/Inquiry.vue'),
  //   children: [
  //     {
  //       path: '/inquiry',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "lazyLoaded" */
  //           '../../modules/inquiry/components/InquiryList.vue'
  //         ),
  //       name: 'InquiryList',
  //       meta: {
  //         authRequired: true,
  //         layout: 'MainLayout',
  //         roles: [...CONST_ADMIN_USER],
  //         title: 'Q&A 관리',
  //       },
  //     },
  //     {
  //       path: '/inquiry/:id([0-9]+)',
  //       name: 'InquiryDetail',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "lazyLoaded" */
  //           '../../modules/inquiry/components/InquiryDetail.vue'
  //         ),
  //       meta: {
  //         authRequired: true,
  //         layout: 'MainLayout',
  //         roles: [...CONST_ADMIN_USER],
  //         detailPage: true,
  //         title: 'Q&A 상세',
  //       },
  //     },
  //     // {
  //     //   path: '/inquiry/create',
  //     //   component: () =>
  //     //     import(
  //     //       /* webpackChunkName: "lazyLoaded" */
  //     //       '../../modules/inquiry/components/InquiryCreate.vue'
  //     //     ),
  //     //   name: 'Q&A 생성',
  //     //   meta: {
  //     //     authRequired: true,
  //     //     layout: 'MainLayout',
  //     //     roles: [...CONST_ADMIN_USER],
  //     //     title: '공지사항 생성',
  //     //   },
  //     // },
  //   ],
  // },
  // {
  //   path: '/article',
  //   name: '기사 관리',
  //   component: () => import('../../modules/article/Article.vue'),
  //   children: [
  //     {
  //       path: '/article',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "lazyLoaded" */
  //           '../../modules/article/components/ArticleList.vue'
  //         ),
  //       name: 'ArticleList',
  //       meta: {
  //         authRequired: true,
  //         layout: 'MainLayout',
  //         roles: [...CONST_ADMIN_USER],
  //         title: '기사 관리',
  //       },
  //     },
  //     {
  //       path: '/article/:id([0-9]+)',
  //       name: 'ArticleDetail',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "lazyLoaded" */
  //           '../../modules/article/components/ArticleDetail.vue'
  //         ),
  //       meta: {
  //         authRequired: true,
  //         layout: 'MainLayout',
  //         roles: [...CONST_ADMIN_USER],
  //         detailPage: true,
  //         title: '기사 상세',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/presentation-event',
    name: '창업 설명회',
    component: () =>
      import('../../modules/presentation-event/PresentationEvent.vue'),
    children: [
      {
        path: '/presentation-event',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/presentation-event/components/PresentationEventList.vue'
          ),
        name: 'PresentationEventList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '창업 설명회 관리',
        },
      },
      {
        path: '/presentation-event/:id([0-9]+)',
        name: 'PresentationEventDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/presentation-event/components/PresentationEventDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '창업 설명회 상세',
        },
      },
    ],
  },
  {
    path: '/banner',
    name: '배너',
    component: () => import('../../modules/banner/Banner.vue'),
    children: [
      {
        path: '/banner',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/banner/components/BannerList.vue'
          ),
        name: 'BannerList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '배너 관리',
        },
      },
      {
        path: '/banner/:id([0-9]+)',
        name: 'BannerDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/banner/components/BannerDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '배너 상세',
        },
      },
    ],
  },
  {
    path: '/company-district-promotion',
    name: '프로모션',
    component: () =>
      import(
        '../../modules/company-district-promotion/CompanyDistrictPromotion.vue'
      ),
    children: [
      {
        path: '/company-district-promotion',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/company-district-promotion/components/CompanyDistrictPromotionList.vue'
          ),
        name: 'CompanyDistrictPromotionList',
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          title: '프로모션 관리',
        },
      },
      {
        path: '/company-district-promotion/:id([0-9]+)',
        name: 'CompanyDistrictPromotionDetail',
        component: () =>
          import(
            /* webpackChunkName: "lazyLoaded" */
            '../../modules/company-district-promotion/components/CompanyDistrictPromotionDetail.vue'
          ),
        meta: {
          authRequired: true,
          layout: 'MainLayout',
          roles: [...CONST_ADMIN_USER],
          detailPage: true,
          title: '프로모션 상세',
        },
      },
    ],
  },
  ...kioskComponentRouter,
];

export default componentsRouter;
