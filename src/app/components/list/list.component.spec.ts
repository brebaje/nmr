import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatListHarness, MatListItemHarness } from '@angular/material/list/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ListComponent } from './list.component';
import { State } from 'src/app/store/reducers';
import { selectArticlesList } from 'src/app/store/selectors/articles.selectors';
import { list } from 'src/app/test/data/articles.data';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let loader: HarnessLoader;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatListModule, RouterTestingModule],
      declarations: [ListComponent],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectArticlesList, list);
    store.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the articles list', async () => {
    const articlesList = await loader.getHarness(MatListHarness);
    expect(articlesList).toBeDefined();

    const items: MatListItemHarness[] = await articlesList.getItems();
    expect(items.length).toEqual(list.length);
  });
});
