import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'view-card',
  templateUrl: 'view.html'
})
export class ViewCard {
  private locationName: string;
  private locationDesc: string;
  private locationImage: string;

  constructor(public navCtrl: NavController, private params: NavParams, private viewCtrl: ViewController) {
    this.locationName = params.get('locationName');
    this.locationDesc = params.get('locationDesc');
    this.locationImage = params.get('locationImage');
  }

  closeCard(){
    this.viewCtrl.dismiss();
  }

}
