<template>
  <article id="main-article" :class="{ 'is-collpased': !slidebarVisible }">
    <div id="tab-section">
      <header class="article-header">
        <h2>나누다키친 상권분석</h2>
        <div class="mt-3">
          <b-form-row>
            <b-col cols="10">
              <b-form-input
                list="company_lsit"
                v-model="analysisTabSearchDto.bdongCode"
              ></b-form-input>
              <datalist id="company_lsit">
                <option
                  v-for="address in addressKeywords"
                  :key="address.bdongCode"
                  :value="address.bdongCode"
                  >{{ address.baeminCategoryName }}</option
                >
              </datalist>
            </b-col>
            <b-col cols="2">
              <b-button variant="info" size="lg" block @click="search()">
                검색
              </b-button>
            </b-col>
          </b-form-row>
        </div>
      </header>
      <b-tabs fill>
        <b-tab title="요약" active @click="clickTabSummary()">
          <AnalysisSummary />
        </b-tab>
        <b-tab title="매출분석" @click="clickTabRevenue()">
          <AnalysisSales />
        </b-tab>
        <b-tab title="업종분석" @click="clickTabCategory()">
          <AnalysisCategory />
        </b-tab>
        <b-tab title="인구분석" @click="clickTabPopulation()">
          <AnalysisPopulation />
        </b-tab>
      </b-tabs>
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
    </div>

    <section id="map-section">
      <!-- <AnalysisMap /> -->
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
import { AnalysisTabListDto } from '@/dto';
import { ReverseQueryParamMapper } from '@/core';

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
  private selectedBdongCode = null;

  private addressKeywords = [
    {
      bdongCode: 1168010100,
      baeminCategoryName: '역삼동',
    },
    {
      bdongCode: 1168010800,
      baeminCategoryName: '논현동',
    },
  ];
  search() {
    this.$router.push({
      query: Object.assign(this.analysisTabSearchDto),
    });
  }
  clickTabSummary() {
    this.$root.$emit('tabSummary');
  }
  clickTabRevenue() {
    this.$root.$emit('tabRevenue');
  }
  clickTabCategory() {
    this.$root.$emit('tabCategory');
  }
  clickTabPopulation() {
    this.$root.$emit('tabPopulation');
  }
  created() {
    const query = ReverseQueryParamMapper(location.search);
    if (query) {
      this.analysisTabSearchDto = query;
    }
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
  height: calc(100vh - 55px);
  &.is-collpased {
    #tab-section {
      transform: translateX(-100%);
    }

    #map-section {
      width: 100%;
    }
  }
  #tab-section {
    position: absolute;
    left: 0;
    top: 0;
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
    .btn-toggle {
      position: absolute;
      left: 100%;
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
    width: 100%;
    height: 100%;
  }

  .table {
    th {
      background-color: #f8f9fa;
    }
  }
}
</style>
