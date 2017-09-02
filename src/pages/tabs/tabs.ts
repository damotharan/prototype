import { Component } from '@angular/core';

import { VisitedPage } from '../visited/visited';
import { AboutPage } from '../about/about';
import { WishListPage } from '../wishlist/wishlist';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WishListPage;
  tab2Root = VisitedPage;

  constructor() {

  }
}
