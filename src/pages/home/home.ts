import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { AddPlaceComponent } from '../add places/addplaces';
import { ViewCard } from '../view/view';
import { ActionSheetController } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GetDataService } from '../../app/get';
import { Data } from '../../app/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data: Array<any> = [];
  keyArray: Array<string> = [];
  constructor(
    public navCtrl: NavController,
    private modal: ModalController,
    private action: ActionSheetController,
    private nativeStorage: NativeStorage,
    private sqlite: SQLite,
    private getService: GetDataService,
    private _data: Data
  ) {
    this.sqlite.create({
      name: 'enroute.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(`CREATE TABLE IF NOT EXISTS temp02(
        id TEXT PRIMARY KEY,
        locationName TEXT,
        locationDesc TEXT,
        locationImage TEXT,
        status INT
      )`,{}
        ).then((info) => {
          console.log('info', info);
        });
    }, (error) => {
      console.error('ERROR =>' + JSON.stringify("error.err"));
    });
    this.getService.getData();
  }

  ngOnInit(){
    this.data = this._data.data;
  }

  openModal(){
    let myModal = this.modal.create(AddPlaceComponent);
    myModal.present();
  }

  openAction(){
    let actionSheet = this.action.create({
      buttons: [
        {
          text: 'About Us',
          handler: () => {
            let myModal = this.modal.create(ContactPage);
            myModal.present();
          }
        }
        
      ]
    });
    actionSheet.present();
  }

  openCard(id){
    
    let result = this._data.data.filter(function( obj ) {
      return obj.id == id;
    });

    let viewModal = this.modal.create(ViewCard,result[0]);
    viewModal.present();

    console.log(result);
  }

  statusChanged(id){
    this.sqlite.create({
      name: 'enroute.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql("UPDATE temp02 SET status=1 WHERE id='"+ id +"'",{}).then((info) => {
          console.log('info', info);
          
          this.getService.getData();
        });
    }, (error) => {
      console.error('ERROR =>' + JSON.stringify("error.err"));
    });
  }

}
