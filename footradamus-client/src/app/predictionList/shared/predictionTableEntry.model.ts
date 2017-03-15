/**
 * Created by kevinkreuzer on 23.01.17.
 */

interface predictionTableEntry {
  id: string,
  leagueName: string,
  homeTeam: string,
  awayTeam: string,
  winner: string,
  matchDate: string,
  wasPredicted: string,
  actions: string
}

export default predictionTableEntry;