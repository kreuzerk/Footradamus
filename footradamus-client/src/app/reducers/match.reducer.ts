/**
 * Created by kevinkreuzer on 16.11.16.
 */

import {ActionReducer, Action} from "@ngrx/store";
import match from "../shared/model/match.model";

let initialMatch: match = {
  leagueId: undefined,
  leagueName: undefined,
  homeTeam: undefined,
  awayTeam: undefined
}

export const ADD_HOMETEAM = 'ADD_HOMETEAM';
export const ADD_AWAYTEAM = 'ADD_AWAYTEAM';

export const matchReducer: ActionReducer<match> = (state: match = initialMatch, action: Action) => {
  switch (action.type) {
    case ADD_HOMETEAM:
      return {
        leagueId: action.payload.leagueId,
        leagueName: action.payload.leagueName,
        homeTeam: action.payload.team,
        awayTeam: state.awayTeam
      };
    case ADD_AWAYTEAM:
      return {
        leagueId: action.payload.leagueId,
        leagueName: action.payload.leagueName,
        homeTeam: state.homeTeam,
        awayTeam: action.payload.team
      };
    default:
      return state;
  }
}
