import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Clan} from "../../model/clan";
import {RestDruzinaProvider} from "../../providers/rest-druzina/rest-druzina";
import {LovskaDruzina} from "../../model/lovskaDruzina";
import {SettingsPage} from "../settings/settings";

/**
 * Generated class for the DetailsClanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-clan',
  templateUrl: 'details-clan.html',
})
export class DetailsClanPage {

  clan:Clan;
  lovske_druzine:LovskaDruzina;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restlovskadruzina:RestDruzinaProvider) {
      this.clan = this.navParams.get("details")
      this.lovske_druzine = this.navParams.get("druzina");
  }

  ionViewDidLoad() {

    //console.log('ionViewDidLoad DetailsClanPage');
  }

    settings() {
        this.navCtrl.push(SettingsPage);
    }
}
