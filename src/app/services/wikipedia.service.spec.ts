import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { WikipediaService } from './wikipedia.service';

describe('WikipediaService', () => {
  const httpClientSpy = { get: jasmine.createSpy('get') };
  let service: WikipediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WikipediaService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });

    service = TestBed.inject(WikipediaService);
  });

  describe('getArticle', () => {
    it('should make an http call to the wikipedia API to retrieve the article data', (done) => {
      const articleId = 1234;
      const expected = { some: 'data' };
      httpClientSpy.get.and.returnValue(of(expected));

      service.getArticle(articleId).subscribe((data) => {
        expect(httpClientSpy.get).toHaveBeenCalled();
        const args: string[] = httpClientSpy.get.calls.mostRecent().args;
        expect(args[0].includes(articleId.toString())).toBeTrue();
        expect(data).toEqual(expected as any);
        done();
      });
    });
  });

  describe('getArticles', () => {
    it('should make an http call to the wikipedia API to retrieve the articles list', (done) => {
      const expected = [{ some: 'data' }, { more: 'awesome data' }];
      const searchTerm = 'nmr';
      httpClientSpy.get.and.returnValue(of(expected));

      service.getArticles(searchTerm).subscribe((data) => {
        expect(httpClientSpy.get).toHaveBeenCalled();
        const args: string[] = httpClientSpy.get.calls.mostRecent().args;
        expect(args[0].includes(searchTerm)).toBeTrue();
        expect(data).toEqual(expected as any);
        done();
      });
    });
  });
});
