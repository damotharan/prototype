import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { VisitedPage } from '../pages/visited/visited';
import { AboutPage } from '../pages/about/about';
import { WishListPage } from '../pages/wishlist/wishlist';
import { TabsPage } from '../pages/tabs/tabs';

import { MoreDirective } from './more';
import { AddPlaceComponent } from '../pages/add places/addplaces';
import { ViewCard } from '../pages/view/view';
import { GetDataService } from './get';
import { Data } from './data';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    VisitedPage,
    AboutPage,
    WishListPage,
    TabsPage,
    MoreDirective,
    AddPlaceComponent,
    ViewCard
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VisitedPage,
    AboutPage,
    WishListPage,
    TabsPage,
    AddPlaceComponent,
    ViewCard
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    File,
    SQLite,
    GetDataService,
    Data
  ]
})
export class AppModule {}
