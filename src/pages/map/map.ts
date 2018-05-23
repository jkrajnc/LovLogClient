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

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: GoogleMap;
  reportREST: RestPorociloProvider = new RestPorociloProvider(this.http);
  activityREST: RestAktivnostProvider = new RestAktivnostProvider(this.http);

  constructor(private navCtrl: NavController, private platform: Platform, private modalCtrl: ModalController, 
    private geolocation: Geolocation, private storage: Storage, private alertCtrl: AlertController, private http: HttpClient) {
    //ko se vse zazene inicializiramo mapo
    platform.ready().then(() => {
      this.initMap();
      this.storage.get('markerData').then((markerData) => {
        if (markerData != null) {
          this.generateMarkers(markerData);
        }
      });
    });
  }

  //mapo inicializiramo glede na naso lokacijo, preko geolokacije, ustvarimo tudi click event
  /*initMap() {
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
  }*/

  initMap() {
    let mapOptions: GoogleMapOptions = {
      mapTypeId: GoogleMapsMapTypeId.ROADMAP,
      camera: {
        target: {
          lat: 40.730610,
          lng: -73.935242
        },
        zoom: 16,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(this.onMapClick.bind(this));
  }

  //ob kliku prvo pridobimo koordinate klika, ki jih nato posljemo v modalno okno
  onMapClick(params: any[]) {
    let latLng: LatLng = params[0];
    this.openAddActivityModal(latLng);
  }

  //ob kliku na gumb pridobimo nase koordinate, ki jih nato posljemo v modalno okno
  /*addMarkerButton() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng: LatLng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      this.openActivityModal(latLng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }*/

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
      //marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.openViewActivityModal.bind(data));
      marker.hideInfoWindow();
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

        const activity: Aktivnost = new Aktivnost(data.value.type, data.value.date, data.value.latitude, data.value.longitude,
          data.value.description, data.value.gameType, data.value.gameCategory, data.value.image);

        //shranimo podatke markerja v local storagu
        this.storage.get('markerData').then((markerData) => {
          if (markerData == null) {
            markerData = [data.value];
            let activityData: Aktivnost[];
            activityData.push(activity);
            this.storage.set('markerData', activityData);
          } else {
            markerData.push(activity);
            this.storage.set('markerData', markerData);
          }
        });
      }

    });
  }

  openViewActivityModal(data: any) {
    const viewActivityModal: Modal = this.modalCtrl.create('ViewActivityPage');
    viewActivityModal.present();
  }

  //ustvarimo modalno okno za porocilo
  openAddReportModal() {
    //preverimo ce sploh imamo markerje na zemljevidu, ce jih ni ustvarimo alert
    this.storage.get('markerData').then((markerData) => {
      if (markerData != null) {
        const addReportModal: Modal = this.modalCtrl.create('AddReportPage');
        addReportModal.present();
        addReportModal.onWillDismiss((data) => {
          //ce dobimo podatke od modalnega okna jih shranimo, posljemo na bazo in izbrisemo iz local storega ter mape
          if (data != null) {
            const report: Porocilo = new Porocilo(data.value.title, data.value.date, markerData);
            //this.reportREST.savePorocilo(report);
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

  openGetReportModal() {
    const id = 1;
    const getReportModal: Modal = this.modalCtrl.create('GetReportPage', {data: id});
    getReportModal.present();
    getReportModal.onWillDismiss((data) => {
      if (data != null) {
        const report: Porocilo = data;
        report.aktivnosti;
      }
    });
  }

  generateMarkers(markerData){
    markerData.forEach(element => {
      this.createMarker(element);
    });
  }

  //pocistimo mapo in local storage
  clearMap() {
    this.storage.remove("markerData");
    this.map.clear();
  }

}
