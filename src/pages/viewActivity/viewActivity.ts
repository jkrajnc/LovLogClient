import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, ModalController, Modal } from 'ionic-angular';
import { FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-viewActivity',
  templateUrl: 'viewActivity.html',
})
export class ViewActivityPage {

  private activityData: FormGroup;
  private base64Image: string;

  constructor(private viewCtrl: ViewController, private navParams: NavParams, private modalCtrl: ModalController) {
  }

  //pridobimo podatke
  ionViewWillLoad(){
    this.activityData = this.navParams.get("data");
  }

  //posljemo prazne podatke
  closeModal() {
    this.viewCtrl.dismiss(null);
  }

  //posljemo prazne podatke
  deleteActivity() {
    this.viewCtrl.dismiss(null);
  }

  openEditActivityModal(data: any) {
    this.viewCtrl.dismiss(null);
    const editActivityModal: Modal = this.modalCtrl.create('EditActivityPage', { data: this.activityData });
    editActivityModal.present();
  }

}
