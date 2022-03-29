import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIfDetailUrl } from 'src/app/store/selectors/router.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showBackButton$: Observable<boolean>;

  constructor(private store: Store) {
    // show button if url includes 'detail' (DetailComponent)
    this.showBackButton$ = this.store.select(selectIfDetailUrl);
  }
}
