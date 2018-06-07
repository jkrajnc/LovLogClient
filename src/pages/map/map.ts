import { Component } from '@angular/core';
import { NavController, Platform, ModalController, Modal, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker, LatLng, GoogleMapsAnimation, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Porocilo } from "../../model/porocilo";
import { RestPorociloProvider } from "../../providers/rest-porocilo/rest-porocilo";
import { Aktivnost } from "../../model/aktivnost";
import { RestAktivnostProvider } from "../../providers/rest-aktivnost/rest-aktivnost";
import { ActivityConverter } from "../../providers/rest-aktivnost/activityConverter";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: GoogleMap;
  reportREST: RestPorociloProvider = new RestPorociloProvider(this.http);
  activityREST: RestAktivnostProvider = new RestAktivnostProvider(this.http);
  activityConverter: ActivityConverter = new ActivityConverter();
  index: number;
  userID: number;
  markerLocalStorageName: string;

  constructor(private navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController,
    private geolocation: Geolocation, private storage: Storage, private alertCtrl: AlertController, private http: HttpClient) {
    //ko se vse zazene inicializiramo mapo
    platform.ready().then(() => {
      storage.get("session").then((value => {
        this.userID = value.id;
        this.markerLocalStorageName = "markerData" + value.id;
        this.initMap();
        this.storage.get(this.markerLocalStorageName).then((markerData) => {
          if (markerData != null) {
            this.generateMarkers(markerData);
          }
        });
      }));
    });
  }

  //mapo inicializiramo glede na naso lokacijo, preko geolokacije, ustvarimo tudi click event
  initMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        mapTypeId: GoogleMapsMapTypeId.ROADMAP,
        camera: {
          target: {
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          },
          zoom: 18,
          tilt: 30
        }
      };

      this.map = GoogleMaps.create('map', mapOptions);
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.onMapClick.bind(this));
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //ob kliku prvo pridobimo koordinate klika, ki jih nato posljemo v modalno okno
  onMapClick(params: any[]) {
    let latLng: LatLng = params[0];
    this.openAddActivityModal(latLng);
  }

  //ob kliku na gumb pridobimo nase koordinate, ki jih nato posljemo v modalno okno
  addMarkerButton() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.openAddActivityModal(latLng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //ustvarimo marker
  createMarker(data: any) {
    //poljubni parametri za nas marker
    let options: MarkerOptions = {
      title: data.title,
      position: { lat: data.latitude, lng: data.longitude },
      animation: GoogleMapsAnimation.DROP
    };

    //ustvarimo marker
    this.map.addMarker(options).then((marker: Marker) => {
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(binder => {
        this.openViewActivityModal(binder, data);
      });
      //marker.hideInfoWindow();`
    });
  }

  //ustvarimo modalno okno in ob zaprtju vrnemo podatke, ce podatki niso null ustvarimo marker
  openAddActivityModal(position: LatLng) {
    const addActivityModal: Modal = this.modalCtrl.create('AddActivityPage');
    addActivityModal.present();
    addActivityModal.onWillDismiss((data) => {
      if (data != null) {
        //v podatke shranimo koordinate
        data.value.latitude = position.lat;
        data.value.longitude = position.lng;

        //ustvarimo marker
        this.createMarker(data.value);

        //shranimo podatke markerja v local storagu
        this.storage.get(this.markerLocalStorageName).then((markerData) => {
          if (markerData == null) {
            markerData = [data.value];
            this.storage.set(this.markerLocalStorageName, markerData);
          } else {
            markerData.push(data.value);
            this.storage.set(this.markerLocalStorageName, markerData);
          }
        });
      }

    });
  }

  openViewActivityModal(binder: any, data1: any) {
    const viewActivityModal: Modal = this.modalCtrl.create('ViewActivityPage', { data: data1 });
    viewActivityModal.present();
    viewActivityModal.onWillDismiss((data2) => {
      //ce dobimo podatke od modalnega okna jih shranimo, posljemo na bazo in izbrisemo iz local storega ter mape
      if (data2 == "Delete") {
        binder[1].remove();
        this.storage.get(this.markerLocalStorageName).then((markerData) => {
          this.compareArrays(markerData, data1);
          markerData.splice(this.index, 1);
          this.storage.set(this.markerLocalStorageName, markerData);
        });
      } else if (data2 != null) {
        this.storage.get(this.markerLocalStorageName).then((markerData) => {
          this.compareArrays(markerData, data2[0]);
          markerData[this.index] = data2[1];
          this.storage.set(this.markerLocalStorageName, markerData);
          binder[1].remove();
          this.generateMarkers([data2[1]]);
        });
      }
    });
  }

  //ustvarimo modalno okno za porocilo
  openAddReportModal() {
    //preverimo ce sploh imamo markerje na zemljevidu, ce jih ni ustvarimo alert
    this.storage.get(this.markerLocalStorageName).then((markerData) => {
      if (markerData != null) {
        const addReportModal: Modal = this.modalCtrl.create('AddReportPage');
        addReportModal.present();
        addReportModal.onWillDismiss((data) => {
          //ce dobimo podatke od modalnega okna jih shranimo, posljemo na bazo in izbrisemo iz local storega ter mape
          if (data != null) {
            const report: Porocilo = new Porocilo(this.userID, data.value.title, data.value.date, this.activityConverter.arrayToActivities(markerData));
            this.reportREST.savePorocilo(report).subscribe();
            this.clearMap();
          }
        });
      } else {
        //ustvarimo alert
        let alert = this.alertCtrl.create({
          title: 'No activities',
          subTitle: 'You have no activities on your map! Please add some and then send a report.',
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  //odpremo modalno okno, ki nam prikaze vsa nasa porocila
  openGetReportModal() {
    const getReportModal: Modal = this.modalCtrl.create('GetReportPage');
    getReportModal.present();
    getReportModal.onWillDismiss((data) => {
      //ce izberemo porocilo ga prikazemo na mapi
      if (data != null) {
        const report: any = data;
        const markerData = this.activityConverter.activitiesToArray(report);
        this.clearMap();
        this.generateMarkers(markerData);
      }
    });
  }

  //generiramo markerje glede na array
  generateMarkers(markerData) {
    markerData.forEach(element => {
      this.createMarker(element);
    });
  }

  //pocistimo mapo in local storage
  clearMap() {
    this.storage.remove(this.markerLocalStorageName);
    this.map.clear();
  }

  compareArrays(arrArr: any, arrElement: any) {
    this.index = -1;
    var indexTemp = 0
    arrArr.forEach(element => {
      if (JSON.stringify(element) === JSON.stringify(arrElement)) {
        this.index = indexTemp;
      }
      indexTemp++;
    });
  }

}
