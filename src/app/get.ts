import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Data } from './data';

@Injectable()
export class GetDataService{
    constructor(private sqlite: SQLite, private _data: Data){

    }

    getData(){
        this._data.data.length = 0;
        this.sqlite.create({ name: 'enroute.db', location: 'default'}).then((db: SQLiteObject) => {
        db.executeSql(`SELECT * FROM temp02`,{}).then((response) => {
            if(response.rows.length > 0){
                for(let i=0; i< response.rows.length; i++){
                    let item = response.rows.item(i);
                    this._data.data.push(item);
                }
            }
        }, (error) => {
            console.error(error);
        })
        }, (error) => {
            console.error(error);
        });

    }
}