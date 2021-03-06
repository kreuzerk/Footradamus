/**
 * Created by kevinkreuzer on 22.01.17.
 */
import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import PredictionListService from "../shared/service/predictionList.service";
import predictionTableEntry from "../shared/model/predictionTableEntry.model";
import AuthenticationService from "../../shared/authentication/authentication.service";

@Component({
  selector: 'filter-table',
  templateUrl: 'filterTable.html',
  styleUrls: ['filterTable.css'],
  encapsulation: ViewEncapsulation.None
})
export default class FilterTableComponent implements OnInit {

  private readonly ACTION_COLUMN_NAME: string = 'actions';
  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'League', className: 'row-header sorting-table glyphicon glyphicon-sort', name: 'leagueName', filtering: {filterString: '', placeholder: 'Filter by League'}},
    {title: 'Hometeam', className: 'row-header sorting-table glyphicon glyphicon-sort', name: 'homeTeam', filtering: {filterString: '', placeholder: 'Filter by HomeTeam'}},
    {title: 'AwayTeam', className: 'row-header sorting-table glyphicon glyphicon-sort', name: 'awayTeam', filtering: {filterString: '', placeholder: 'Filter by AwayTeam'}},
    {title: 'Pred.Winner', className: 'row-header sorting-table glyphicon glyphicon-sort', name: 'winner', filtering: {filterString: '', placeholder: 'Filter by winner.'}},
    {title: 'Matchdate', className: 'row-header sorting-table glyphicon glyphicon-sort', name: 'matchDate', filtering: {filterString: '', placeholder: 'Filter by match date.'}},
    {title: 'Predicted', className: 'row-header', name: 'isPredicted'},
    {title: 'Correctly Predicted', className: 'row-header', name: 'isCorrectlyPredicted'},
    {title: 'Actions', className: 'row-header', name: 'actions'},
  ];
  public page: number = 1;
  public itemsPerPage: number = 1000;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['prediction-table', 'table-striped', 'table-bordered']
  };

  private data: Array<predictionTableEntry> = [];

  public constructor(private predictionListService: PredictionListService,
    private authenticationService: AuthenticationService) {
    this.length = this.data.length;
    this.predictionListService.getPredictionTableData()
      .subscribe((predictionTableData: Array<predictionTableEntry>) => {
        this.data = predictionTableData;
        this.onChangeTable(this.config);
      });
    let hasValidAdminToken = this.authenticationService.hasValidAdminToken();
    if(!hasValidAdminToken){
      this.columns.splice(this.columns.length - 1, 1);
    }
  }

  public ngOnInit(): void {
    this.onChangeTable(this.config);
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    config.filtering.filterString = config.filtering.filterString.toLowerCase();
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }
    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    let column = data.column;
    if (column === this.ACTION_COLUMN_NAME) {
      let id = data.row.id;
      this.predictionListService.deletePrediction(id)
        .subscribe(() => {
          let indexToSplice = this.getIndexOfElement(id);
          this.data.splice(indexToSplice, 1);
          this.onChangeTable(this.config);
        });
    }
  }

  private getIndexOfElement(id: string) {
    return this.data.findIndex((prediction: predictionTableEntry) => prediction.id === id);
  }
}
