/**
 * Created by kevinkreuzer on 19.12.16.
 */

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import StatisticsComponent from "./statistics.component";
import routes from './statistics.routes';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import StatisticsService from "./statistics.service";
import DoghnutChartService from "./chartServices/doughnutChartService";
import BarChartService from "./chartServices/barChartService";

@NgModule({
  imports: [CommonModule, routes, ChartsModule],
  declarations: [StatisticsComponent],
  exports: [StatisticsComponent],
  providers: [StatisticsService, DoghnutChartService, BarChartService]
})
export default class StatisticModule {

}
