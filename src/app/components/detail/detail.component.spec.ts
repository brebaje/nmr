import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { DetailComponent } from './detail.component';
import { State } from 'src/app/store/reducers';
import { clearArticleDetail, loadArticleDetail } from 'src/app/store/actions/articles.actions';

describe('ListComponent', () => {
  const pageid = 12345;
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let store: MockStore<State>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DetailComponent],
      providers: [provideMockStore({}), { provide: ActivatedRoute, useValue: { params: of({ id: pageid }) } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch the loadArticleDetail action on init', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(loadArticleDetail({ id: pageid }));
  });

  it('should dispatch the clearArticleDetail action on destroy', () => {
    spyOn(store, 'dispatch');
    component.ngOnDestroy();

    expect(store.dispatch).toHaveBeenCalledWith(clearArticleDetail());
  });
});
