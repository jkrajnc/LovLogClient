import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule, IonicPageModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
import {MapPage} from "../pages/map/map";
import {LoginPage} from "../pages/login/login";
import {RegistrationPage} from "../pages/registration/registration";
import { RestDruzinaProvider } from '../providers/rest-druzina/rest-druzina';
import {FormsModule} from "@angular/forms";
import { RestAuthProvider } from '../providers/rest-auth/rest-auth';
import {SeznamClanovPage} from "../pages/seznam-clanov/seznam-clanov";
import {DetailsClanPage} from "../pages/details-clan/details-clan";
import {SettingsPage} from "../pages/settings/settings";
import {AboutPage} from "../pages/about/about";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MapPage,
        SeznamPorocilPage,
        SeznamAktivnostiPage,
        DetailsAktivnostiPage,
        LoginPage,
        RegistrationPage,
        SeznamClanovPage,
        DetailsClanPage,
        SettingsPage,
        AboutPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        IonicPageModule.forChild(MyApp),
        FormsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MapPage,
        SeznamPorocilPage,
        SeznamAktivnostiPage,
        DetailsAktivnostiPage,
        LoginPage,
        RegistrationPage,
        SeznamClanovPage,
        DetailsClanPage,
        SettingsPage,
        AboutPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        Camera,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        RestClan,
        RestPorociloProvider,
        RestAktivnostProvider,
        RestDruzinaProvider,
        RestAuthProvider
    ]
})
export class AppModule {}
