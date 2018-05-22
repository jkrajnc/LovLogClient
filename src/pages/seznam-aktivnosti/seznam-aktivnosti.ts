import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Aktivnost} from "../../model/aktivnost";
import {DetailsAktivnostiPage} from "../details-aktivnosti/details-aktivnosti";

/**
 * Generated class for the SeznamAktivnostiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seznam-aktivnosti',
  templateUrl: 'seznam-aktivnosti.html',
})
export class SeznamAktivnostiPage {

  aktivnosti: Aktivnost[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.aktivnosti = navParams.get('aktivnostiList');
  }

  goToAktivnostDetails(aktivnost: Aktivnost){
    this.navCtrl.push(DetailsAktivnostiPage, {'aktivnostDetails': aktivnost})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeznamAktivnostiPage');
  }

}
