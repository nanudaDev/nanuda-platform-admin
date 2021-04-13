import {
  DevelopmentEnvironment,
  Environment,
  EnvironmentType,
  ProductionEnvironment,
  StagingEnvironment,
} from '../../environments';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class BaseComponent extends Vue {
  public env = new Environment();
  public $refs: {
    fileInput: any;
  };

  getNavBarHeight() {
    const navBar = document.querySelector('.navbar');
    const windowWidth = window.innerWidth;
    let navBarHeight;
    if (windowWidth >= 992) {
      navBarHeight = navBar.getBoundingClientRect().height;
    } else {
      navBarHeight = 56;
    }
    if (navBarHeight) {
      document.getElementById('app-main').style.marginTop = `${navBarHeight}px`;
    }
  }

  created() {
    if (process.env.NODE_ENV === EnvironmentType.development) {
      this.env = DevelopmentEnvironment;
    }
    if (process.env.NODE_ENV === EnvironmentType.staging) {
      this.env = StagingEnvironment;
    }
    if (process.env.NODE_ENV === EnvironmentType.production) {
      this.env = ProductionEnvironment;
    }
  }

  mounted() {
    const navDropdown = document.getElementById('navbarSupportedContent');
    if (navDropdown) {
      if (navDropdown.classList.contains('show'))
        navDropdown.classList.remove('show');
    }

    window.addEventListener('load', this.getNavBarHeight);
    window.addEventListener('resize', this.getNavBarHeight);
  }
}
