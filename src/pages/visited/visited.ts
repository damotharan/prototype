import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../app/data';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { GetDataService } from '../../app/get';
import { ModalController, NavParams } from 'ionic-angular';
import { ViewCard } from '../view/view';

@Component({
  selector: 'page-visited',
  templateUrl: 'visited.html'
})
export class VisitedPage {
  data: Array<any> = [];
  constructor(public navCtrl: NavController, private _data: Data, private sqlite: SQLite, private modal: ModalController, private getService: GetDataService) {
    this.data = this._data.data;
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
      db.executeSql("UPDATE temp02 SET status=0 WHERE id='"+ id +"'",{}).then((info) => {
          console.log('info', info);
          
          this.getService.getData();
        });
    }, (error) => {
      console.error('ERROR =>' + JSON.stringify("error.err"));
    });
  }

}
