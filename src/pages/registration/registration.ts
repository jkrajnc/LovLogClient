import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {LovskaDruzina} from "../../model/lovskaDruzina";
import {RestDruzinaProvider} from "../../providers/rest-druzina/rest-druzina";
import {RestAuthProvider} from "../../providers/rest-auth/rest-auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Clan} from "../../model/clan";
import {LoginPage} from "../login/login";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-registration',
    templateUrl: 'registration.html',
})
export class RegistrationPage {

    registriranClan: Clan;

    lovskeDruzine: LovskaDruzina[];
    registrationForm: FormGroup;
    constructor(public navCtrl: NavController, public navParams: NavParams,
                public restDruzinaProvider: RestDruzinaProvider, public restAuthProvider: RestAuthProvider, private formBuilder: FormBuilder){
        this.getLovskeDruzine();
        this.registrationForm = this.formBuilder.group( {
            userName:['', Validators.compose([
                Validators.minLength(6),
                Validators.required,
                Validators.pattern(this.textPattern)
            ])],
            password:['', Validators.compose([
                Validators.required,
                Validators.minLength(6)
            ])],
            email:['', Validators.compose([
                Validators.pattern(this.emailPattern),
                Validators.required])
            ],
            name:['', Validators.compose([
                Validators.required,
                Validators.pattern(this.textPattern),
                Validators.minLength(3)
            ])],
            surname:['',  Validators.compose([
                Validators.required,
                Validators.pattern(this.textPattern),
                Validators.minLength(3)
            ])],
            role:['', Validators.required],
            phoneNumber:['',Validators.compose([
                Validators.required,
                Validators.pattern(this.numberPattern),
                Validators.minLength(6),
                Validators.maxLength(9)
            ])],
            druzina:['', Validators.required]
        })
    };

    signUpClan(clan: Clan): void{
        this.restAuthProvider.signUp(clan)
            .subscribe();
    }

    getLovskeDruzine(): void{
        this.restDruzinaProvider.getDruzine()
            .subscribe(lovskeDruzine => this.lovskeDruzine = lovskeDruzine);
    }

    onRegister(): void{
        this.registriranClan = new Clan();
        this.registriranClan.uporabnisko_ime = this.registrationForm.controls['userName'].value;
        this.registriranClan.hash_geslo = this.registrationForm.controls['password'].value;
        this.registriranClan.elektronska_posta = this.registrationForm.controls['email'].value;
        this.registriranClan.ime = this.registrationForm.controls['name'].value;
        this.registriranClan.priimek = this.registrationForm.controls['surname'].value;
        this.registriranClan.telefonska_stevilka = this.registrationForm.controls['phoneNumber'].value;
        this.registriranClan.vloga = this.registrationForm.controls['role'].value;
        this.registriranClan.lovska_druzina_id = this.registrationForm.controls['druzina'].value;

        this.signUpClan(this.registriranClan);
        this.navCtrl.push(LoginPage)

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegistrationPage');
    }

    emailPattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    textPattern = '[a-zA-Z ]*';
    numberPattern='^[0-9]*$';

}
