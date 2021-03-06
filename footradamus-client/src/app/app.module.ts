import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {matchReducer} from "./reducers/match.reducer";
import {environment} from "../environments/environment";
import appRoutes from './app.routes';
import CoreModule from "./core/core.module";
import SharedModule from "./shared/shared.model";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    SharedModule,
    StoreModule.provideStore({match: matchReducer}),
    appRoutes
  ],
  providers: [
    {provide: 'config', useValue: environment}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
