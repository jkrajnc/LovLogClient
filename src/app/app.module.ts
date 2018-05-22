import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';

import {HttpClientModule} from "@angular/common/http";
import { RestClan } from '../providers/rest-clan/rest-clan';
import { RestPorociloProvider } from '../providers/rest-porocilo/rest-porocilo';
import { RestAktivnostProvider } from '../providers/rest-aktivnost/rest-aktivnost';
import {SeznamAktivnostiPage} from "../pages/seznam-aktivnosti/seznam-aktivnosti";
import {DetailsAktivnostiPage} from "../pages/details-aktivnosti/details-aktivnosti";
import {SeznamPorocilPage} from "../pages/seznam-porocil/seznam-porocil";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    SeznamPorocilPage,
    SeznamAktivnostiPage,
    DetailsAktivnostiPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ListPage,
    SeznamPorocilPage,
    SeznamAktivnostiPage,
    DetailsAktivnostiPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestClan,
    RestPorociloProvider,
    RestAktivnostProvider
  ]
})
export class AppModule {}
