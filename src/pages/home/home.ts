import {Component, Input} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Clan} from "../../model/clan";
import {Storage} from "@ionic/storage";
//import {AddReportPage} from "../addReport/addReport";
import {SeznamPorocilPage} from "../seznam-porocil/seznam-porocil";
import {SeznamClanovPage} from "../seznam-clanov/seznam-clanov";
import {SettingsPage} from "../settings/settings";
import {MapPage} from "../map/map";

@IonicPage({
    name: 'home'
})

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  clan: Clan;
  clani: Clan[];

  routes:any;

  constructor(public navCtrl: NavController,
              public navParam: NavParams,
              private storage: Storage) {


    storage.get("session").then((value => {
       this.clan = value;
    }));
  }

  printClan(){
    console.log(this.clan);
  }

    addReport() {
        this.navCtrl.push(MapPage);
    }
    archive() {
        this.navCtrl.push(SeznamPorocilPage);
    }
    contacts() {
        this.navCtrl.push(SeznamClanovPage);
    }
    settings() {
        this.navCtrl.push(SettingsPage);
    }
}
