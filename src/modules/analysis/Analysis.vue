<template>
  <article id="main-article" :class="{ 'is-collapsed': !slidebarVisible }">
    <div id="tab-section">
      <header class="article-header">
        <b-row no-gutters align-v="center" align-h="between">
          <h2 class="mb-0">나누다키친 상권분석</h2>
          <b-button
            variant="dark"
            @click="slidebarVisible = !slidebarVisible"
            class="btn-open-map"
          >
            <b-icon icon="map" class="mr-2"></b-icon>
            지도 보기
          </b-button>
        </b-row>
        <div class="mt-3">
          <b-form-row>
            <b-col cols="12">
              <select
                id="district_list"
                v-model="addressKeyword"
                class="custom-select"
                @change="findBdongCode()"
              >
                <option value="" hidden>지역 선택</option>
                <option
                  v-for="district in districtSelect"
                  :key="district.no"
                  :value="district.region3DepthName"
                  >{{ district.region3DepthName }}</option
                >
              </select>
            </b-col>
            <!-- <b-col cols="2">
              <b-button
                variant="info"
                size="lg"
                block
                @click="search()"
                :disabled="!addressKeyword"
              >
                검색
              </b-button>
            </b-col> -->
          </b-form-row>
        </div>
      </header>
      <template v-if="addressKeyword">
        <b-tabs fill>
          <b-tab title="요약" :active="summaryClicked">
            <AnalysisSummary :bdongCode="bdongCode" v-if="bdongCode" />
          </b-tab>
          <b-tab
            title="매출분석"
            @click="clickTabRevenue()"
            :active="revenueClicked"
          >
            <AnalysisSales v-if="revenueClicked" :bdongCode="bdongCode" />
          </b-tab>
          <b-tab
            title="업종분석"
            @click="clickTabCategory()"
            :active="categoryClicked"
          >
            <AnalysisCategory v-if="categoryClicked" :bdongCode="bdongCode" />
          </b-tab>
          <b-tab
            title="인구분석"
            @click="clickTabPopulation()"
            :active="populationClicked"
          >
            <AnalysisPopulation
              v-if="populationClicked"
              :bdongCode="bdongCode"
            />
          </b-tab>
        </b-tabs>
      </template>
      <!-- <template v-else-if=""></template> -->
      <template v-else>
        <div class="tabs">
          <b-row
            no-gutters
            align-v="center"
            align-h="center"
            style="height:100%"
            class="bg-white"
          >
            <div class="text-center">
              <p style="font-size:30px">
                <b-icon icon="geo-alt" variant="info"></b-icon>
              </p>
              <p class="mt-2">
                분석하려는 지역을 선택해주세요
              </p>
            </div>
          </b-row>
        </div>
      </template>
    </div>
    <section id="map-section">
      <AnalysisMap
        :slidebarVisible="slidebarVisible"
        :district="propDistrict"
      />
      <b-button
        variant="light"
        class="btn-toggle"
        @click="slidebarVisible = !slidebarVisible"
      >
        <template v-if="slidebarVisible">
          <b-icon-chevron-left
            style="width:25px; height:40px;"
          ></b-icon-chevron-left>
        </template>
        <template v-else>
          <b-icon-chevron-right
            style="width:25px; height:40px;"
          ></b-icon-chevron-right>
        </template>
      </b-button>
      <div class="map-controls">
        <b-button
          variant="dark"
          @click="slidebarVisible = !slidebarVisible"
          class="btn-close-map"
          >닫기</b-button
        >
        <b-button id="remove-circles">모두 지우기</b-button>
      </div>
    </section>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BaseComponent from '../../core/base.component';
import AnalysisSummary from './components/AnalysisSummary.vue';
import AnalysisSales from './components/AnalysisSales.vue';
import AnalysisCategory from './components/AnalysisCategory.vue';
import AnalysisPopulation from './components/AnalysisPopulation.vue';
import AnalysisMap from './components/AnalysisMap.vue';
import { AnalysisTabListDto, CompanyDistrictDto } from '@/dto';
import { ReverseQueryParamMapper } from '@/core';
import { BaeminCategoryCode } from '@/services/shared';
import CompanyDistrictService from '@/services/company-district.service';
import CodeBdongService from '@/services/analysis/code-bdong.service';

@Component({
  name: 'Analysis',
  components: {
    AnalysisSummary,
    AnalysisSales,
    AnalysisCategory,
    AnalysisPopulation,
    AnalysisMap,
  },
})
export default class Analysis extends BaseComponent {
  private slidebarVisible = true;
  private bdongCode = null;
  private analysisTabSearchDto = new AnalysisTabListDto();
  private addressKeyword = '';
  private searched = false;
  private districtSelect = [];
  private comapnyDistrictDto = new CompanyDistrictDto();
  private queryParam: any;
  private summaryClicked = false;
  private revenueClicked = false;
  private categoryClicked = false;
  private populationClicked = false;
  private propDistrict = { lat: '37.5012283', lon: '127.0334121' };

  //서울에 있는 상권분석가능한 지역 동을 받아옴
  getDistrictAddress() {
    this.comapnyDistrictDto.region1DepthName = '서울';
    CompanyDistrictService.findForSelectOptionAnalysis(
      this.comapnyDistrictDto,
    ).subscribe(res => {
      // console.log('getDistrictAddress res', res);
      if (res) {
        this.districtSelect = res.data;
      }
    });
  }
  //법정동코드로 지역정보를 받아옴
  getReverseDistrict(bdongCode) {
    this.comapnyDistrictDto.region1DepthName = '서울';
    this.comapnyDistrictDto.bCode = bdongCode;
    CompanyDistrictService.findForSelectOption(
      this.comapnyDistrictDto,
    ).subscribe(res => {
      if (res) {
        // console.log('getReverseDistrict res', res);
        if (res.data && res.data[0]) {
          this.$set(this.propDistrict, 'lat', res.data[0].lat);
          this.$set(this.propDistrict, 'lon', res.data[0].lon);
        }
      }
    });
  }
  //주소를 법정동 코드로 바꿔줌
  findBdongCode() {
    this.searched = false;
    CodeBdongService.findAll({ bdongName: this.addressKeyword }).subscribe(
      res => {
        this.populationClicked = false;
        this.revenueClicked = false;
        this.summaryClicked = false;
        this.categoryClicked = false;
        this.bdongCode = res.data.items[0].bdongCode;
        // console.log('this.bdongCode', this.bdongCode);
        this.getReverseDistrict(this.bdongCode);
      },
    );
  }

  async search() {
    this.$router
      .push({
        query: Object.assign({
          bdongCode: this.bdongCode,
        }),
      })
      .catch(() => {
        console.log('search failed');
      });
    this.searched = true;
  }
  clickTabSummary() {
    this.summaryClicked = true;
    // this.$root.$emit('tabSummary');
  }
  clickTabRevenue() {
    this.revenueClicked = true;
    // this.$root.$emit('tabRevenue');
  }
  clickTabCategory() {
    this.categoryClicked = true;
    // this.$root.$emit('tabCategory');
  }
  clickTabPopulation() {
    this.populationClicked = true;
    // this.$root.$emit('tabPopulation');
  }

  removeCircles() {
    this.$root.$emit('removeCircles');
  }

  created() {
    this.getDistrictAddress();
    // this.queryParam = ReverseQueryParamMapper(location.search);
    // if (this.queryParam) {
    //   this.searched = true;
    //   this.search();
    //   this.clickTabSummary();
    // } else {
    //   this.searched = false;
    // }
  }
}
</script>
<style lang="scss">
.loader {
  text-align: center;
  margin: 140px 0;
  img {
    height: 100px;
  }
}
#main-article {
  position: relative;
  display: flex;
  height: calc(100vh - 55px);
  &.is-collapsed {
    #tab-section {
      display: none;
    }

    #map-section {
      width: 100%;
    }
  }
  .btn-open-map,
  .btn-close-map {
    display: none;
  }

  #tab-section {
    position: relative;
    // left: 0;
    // top: 0;
    width: 600px;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 999;

    .article-header {
      background-color: #f8f9fa;
      padding: 3em 1.5em;
      height: 145px;
      h2 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
    .article-content {
      overflow-y: auto;
    }

    .section {
      background-color: #fff;
      padding: 3em 1.5em;
      + .section {
        border-top: 1.5em solid #f5f5f5;
      }
      .section-header {
        h3 {
          font-size: 16px;
          font-weight: bold;
        }
        + .section-content {
          margin-top: 1em;
        }
      }
    }

    .tabs {
      height: calc(100% - 145px);
      background-color: #f8f9fa;
      .nav-tabs {
        padding: 0 1.5em;
        .nav-link {
          padding: 0 0.5em;
          height: 45px;
          line-height: 45px;
          font-size: 14px;
        }
      }
    }
    .tab-content {
      background-color: #fff;
      height: calc(100% - 45px);
      overflow-y: auto;
    }
  }
  #map-section {
    position: relative;
    width: calc(100% - 600px);
    height: 100%;
  }

  .table {
    th {
      background-color: #f8f9fa;
    }
  }
  .btn-toggle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 80px;
    z-index: 99;
    background-color: white;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 0;
    padding: 0;
    span {
      font-size: 0;
    }
  }
}
.graph-label {
  background: #f5f5f5;
  padding: 0.25em 0.5em;
  border: 1px solid #dedede;
}
.map-controls {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 100;
}
.horizontal-stacked-bars {
  display: flex;
  height: 40px;
  .horizontal-stacked-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 16px;
    color: #fff;
    &.bar-gender-male {
      background-color: #17a2b8;
    }
    &.bar-gender-female {
      background-color: #e85d47;
    }

    &.bar-gender-etc {
      background-color: #646464;
    }
    p {
      font-weight: bold;
    }
    span {
      font-size: 12px;
      margin-left: 8px;
    }
  }
}

.no-data {
  text-align: center;
  padding: 140px 0;
}

@media screen and (max-width: 1024px) {
  #main-article {
    display: block;

    &.is-collapsed {
      #map-section {
        display: block;
      }
    }

    .btn-open-map,
    .btn-close-map {
      display: inline-block;
    }
    #tab-section {
      width: 100%;
    }

    #map-section {
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;

      .btn-toggle {
        display: none;
        width: 100%;
      }
    }
  }
}
</style>
