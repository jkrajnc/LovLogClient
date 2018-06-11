import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {Clan} from "../../model/clan";
import {AddReportPage} from "../addReport/addReport";
import {LoginPage} from "../login/login";
import {AboutPage} from "../about/about";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  clan:Clan;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {

      storage.get("session").then((value => {
          this.clan = value;
      }));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
    logout() {
        this.storage.remove("session").then(() => {
          this.clan = null;
            this.navCtrl.push(LoginPage);
        });
    }
    about() {
      this.navCtrl.push(AboutPage);
    }
}