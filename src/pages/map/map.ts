import { Component } from '@angular/core';
import { NavController, Platform, ModalController, Modal, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, MarkerOptions, Marker, LatLng, GoogleMapsAnimation, GoogleMapsMapTypeId } from '@ionic-native/google-maps';
import { Storage } from '@ionic/storage';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, private platform: Platform, public modalCtrl: ModalController, public geolocation: Geolocation, private storage: Storage, private alertCtrl: AlertController) {
    //ko se vse zazene inicializiramo mapo
    platform.ready().then(() => {
      this.initMap();
      this.storage.get('markerData').then((markerData) => {
        if (markerData != null) {
          markerData.forEach(element => {
            this.createMarker(element);
          });
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
    this.openActivityModal(latLng);
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

  createMarker(data: any) {
    //poljubni parametri za nas marker
    let options: MarkerOptions = {
      title: data.title,
      position: { lat: data.latitude, lng: data.longitude },
      animation: GoogleMapsAnimation.DROP
    };

    //ustvarimo marker
    this.map.addMarker(options).then((marker: Marker) => {
      marker.hideInfoWindow();
    });
  }

  //ustvarimo modalno okno in ob zaprtju vrnemo podatke, ce podatki niso null ustvarimo marker
  openActivityModal(position: LatLng) {
    const activityModal: Modal = this.modalCtrl.create('ActivityPage');
    activityModal.present();
    activityModal.onWillDismiss((data) => {
      if (data != null) {
        //v podatke shranimo koordinate
        data.value.latitude = position.lat;
        data.value.longitude = position.lng;

        //ustvarimo marker
        this.createMarker(data.value);

        //shranimo podatke markerja v local storagu
        this.storage.get('markerData').then((markerData) => {
          if (markerData == null) {
            markerData = [data.value];
            this.storage.set('markerData', markerData);
            console.log(markerData);
          } else {
            markerData.push(data.value);
            this.storage.set('markerData', markerData);
            console.log(markerData);
          }
        });
      }

    });
  }

  editActivityModal(data: any) {
    const activityModal: Modal = this.modalCtrl.create('ActivityPage', { data: data });
    activityModal.present();


    /*activityModal.onWillDismiss((data) => {
      if (data != null) {
        data.value.latitude = position.lat;
        data.value.longitude = position.lng;
        console.log(data);
        let options: MarkerOptions = {
          title: data.value.title,
          position: { lat: position.lat, lng: position.lng },
          animation: GoogleMapsAnimation.DROP
        };

        this.map.addMarker(options).then((marker: Marker) => {
          marker.hideInfoWindow();
        });
      }
    });*/
  }

  //ustvarimo modalno okno za porocilo
  openReportModal() {
    //preverimo ce sploh imamo markerje na zemljevidu, ce jih ni ustvarimo alert
    this.storage.get('markerData').then((markerData) => {
      if (markerData != null) {
        const reportModal: Modal = this.modalCtrl.create('ReportPage');
        reportModal.present();
        reportModal.onWillDismiss((data) => {
          //ce dobimo podatke od modalnega okna jih shranimo, posljemo na bazo in izbrisemo iz local storega ter mape
          if (data != null) {
            data.value.markerData = markerData;
            this.storage.remove("markerData");
            this.map.clear();
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

}
