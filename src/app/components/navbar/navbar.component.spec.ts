import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NavbarComponent } from './navbar.component';
import { State } from 'src/app/store/reducers';
import { selectIfDetailUrl } from 'src/app/store/selectors/router.selectors';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let loader: HarnessLoader;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatIconModule, MatToolbarModule, RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a toolbar with the NMR title', async () => {
    const toolbars = await loader.getAllHarnesses(MatToolbarHarness.with({ text: 'NMR' }));

    expect(toolbars.length).toBe(1);
  });

  it('should show the back button if in detail url', async () => {
    store.overrideSelector(selectIfDetailUrl, true);
    store.refreshState();
    const button = await loader.getHarness(MatButtonHarness);

    expect(button).toBeDefined();
  });

  it('should show the back button if not in detail url', async () => {
    store.overrideSelector(selectIfDetailUrl, false);
    store.refreshState();

    try {
      await loader.getHarness(MatButtonHarness);
      // should not run
      expect(false).toBeTrue();
    } catch (e) {
      expect(true).toBeTrue();
    }
  });
});
