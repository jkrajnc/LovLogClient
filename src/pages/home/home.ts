import {Component, Input} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Clan} from "../../model/clan";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  clan: Clan;
  clani: Clan[];

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
}
