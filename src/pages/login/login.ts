import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestAuthProvider} from "../../providers/rest-auth/rest-auth";
import { Storage} from "@ionic/storage";
import {Clan} from "../../model/clan";
import {Form} from "../../model/form";
import {SeznamAktivnostiPage} from "../seznam-aktivnosti/seznam-aktivnosti";
import {HomePage} from "../home/home";
import {RegistrationPage} from "../registration/registration";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    form = new Form();

    constructor(public navCtrl: NavController,
                public restAuthProvider: RestAuthProvider,
                public navParams: NavParams,
                private storage: Storage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    signInClan(){
        this.restAuthProvider.signIn(this.form).subscribe((res)=>{
            if(res!=undefined){
                this.storage.set("session", res);
                this.navCtrl.push(HomePage);
            }
        })
    }

    submitForm(){
        this.signInClan();
    }
    registracijaNav(){
        this.navCtrl.push(RegistrationPage);
    }
}
