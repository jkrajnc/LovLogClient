import { DateTime } from "ionic-angular";
import { Aktivnost } from "../../model/aktivnost";

export class ActivityConverter {

    object = {
        title: null,
        type: null,
        date: null,
        description: null,
        image: null,
        latitude: null,
        longitude: null,
        gameType: null,
        gameCategory: null
      }

    constructor() { }

    objectToActivity(object) {
        const activity: Aktivnost = new Aktivnost();
        //naziv?
        activity.tip_aktivnost = object.type;
        activity.datum_vnos = object.date;
        activity.latitude = object.latitude;
        activity.longitude = object.longitude;
        activity.tip_divjad = object.gameType;
        activity.starostna_kategorija = object.gameCategory;
        activity.slika_path = object.image;
        activity.opomba = object.description;

        return activity;
    }

    arrayToActivities(array) {
        const activities: Aktivnost[] = new Array();
        array.forEach(element => {
            activities.push(this.objectToActivity(element));
        });
        return activities;
    }

    activityToObject(activity: Aktivnost) {
        //object.title = 
        this.object.type = activity.tip_aktivnost;
        this.object.date = activity.datum_vnos;
        this.object.latitude = activity.latitude;
        this.object.longitude = activity.longitude;
        this.object.gameType = activity.tip_divjad;
        this.object.gameCategory = activity.starostna_kategorija;
        this.object.image = activity.slika_path;
        this.object.description = activity.opomba;

        return this.object;
    }

    activitiesToArray(activities: Aktivnost[]) {
        const array = new Array();
        activities.forEach(activity => {
            array.push(this.activityToObject(activity));
        });
        return array;
    }

}