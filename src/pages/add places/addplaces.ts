import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GetDataService } from '../../app/get';
import { Data } from '../../app/data';

@Component({
    selector : "page-add-places",
    templateUrl: "addplaces.html"
})
export class AddPlaceComponent {
    imageURI: string = '';
    locationName: string = '';
    locationDesc: string = '';
    storage:any;
    constructor(
        private viewCtrl: ViewController, 
        private camera: Camera, 
        private file: File,
        private sqlite: SQLite,
        private getService: GetDataService,
        private _data: Data
    ){
        
    }

    closeModal(){
        this.viewCtrl.dismiss();
    }

    openGallery(){
        let options = {
            destinationType   : this.camera.DestinationType.DATA_URL,
            sourceType        : this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then((data)  => {
            // alert(data);
            let image = "data:image/jpeg;base64," + data;
            this.imageURI = image;
            // alert(image);
          },
            (error) => {
                console.error(error);
            }
        );
    }

    addPlace(){
        let dateObject = new Date();
        let _id = dateObject.getTime().toString();
        console.log(_id,this.locationName, this.locationDesc);
        this.sqlite.create({
            name: 'enroute.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql("INSERT INTO temp02(id, locationName, locationDesc, locationImage, status) VALUES ('" + _id + "','" + this.locationName + "','" + this.locationDesc + "','" + this.imageURI + "',0)",{}).then((error)=>{
                this.getService.getData();
                this.closeModal();
            }, (error) => {
                alert(error);
                console.log('error' , error);
            });
          }, (err) => {
            console.error(err);
          });
        
    }
}