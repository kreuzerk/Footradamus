/**
 * Created by kevinkreuzer on 16.11.16.
 */

import {Component} from "@angular/core";
import StatisticService from "./shared/service/statstics.service";

@Component({
  selector: 'prediction',
  templateUrl: './prediction.html',
  styleUrls: ['./prediction.css']
})
export default class PredictionComponent{

  //TODO kk: Remove predictionservice because it does not belonge here
  constructor(private statisticService: StatisticService){
  }
}
