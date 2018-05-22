import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Aktivnost} from "../../model/aktivnost";

/**
 * Generated class for the DetailsAktivnostiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-aktivnosti',
  templateUrl: 'details-aktivnosti.html',
})
export class DetailsAktivnostiPage {

  aktivnost: Aktivnost;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.aktivnost = this.navParams.get("aktivnostDetails");
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsAktivnostiPage');
  }

}
