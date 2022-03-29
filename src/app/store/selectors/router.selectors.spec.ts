import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { State } from 'src/app/store/reducers';
import * as routerSelectors from 'src/app/store/selectors/router.selectors';

describe('Router Selectors', () => {
  let store: MockStore<State>;
  const state = {
    router: {
      state: {
        url: '/detail/25670533',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: state })],
    });

    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    store.resetSelectors();
  });

  describe('selectRouteUrl', () => {
    it('should select the route url', (done) => {
      store.select(routerSelectors.selectRouteUrl).subscribe((url) => {
        expect(url).toEqual(state.router.state.url);
        done();
      });
    });
  });

  describe('selectIfDetailUrl', () => {
    it('should return true if the current route matches the detail url', (done) => {
      store.overrideSelector(routerSelectors.selectRouteUrl, '/detail/25670533');
      store.refreshState();

      store.select(routerSelectors.selectIfDetailUrl).subscribe((matches) => {
        expect(matches).toBeTrue();
        done();
      });
    });

    it('should return false if the current route does not match the detail url', (done) => {
      store.overrideSelector(routerSelectors.selectRouteUrl, '/list');
      store.refreshState();

      store.select(routerSelectors.selectIfDetailUrl).subscribe((matches) => {
        expect(matches).toBeFalse();
        done();
      });
    });
  });
});
