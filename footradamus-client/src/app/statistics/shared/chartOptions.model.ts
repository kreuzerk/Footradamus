/**
 * Created by kevinkreuzer on 11.01.17.
 */

interface chartOptions{
  labels: Array<string>,
  data: Array<any>,
  options ?: any,
  legend ?: boolean,
  chartColors ?: Array<any>
}

export default chartOptions;
