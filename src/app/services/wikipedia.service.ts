import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  Article,
  ArticleDetail,
  ArticleDetailResponse,
  ArticleListResponse,
} from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  private baseURL: string = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  /**
   * method to retrieve an article detail data by pageId
   *
   * @param pageId article id
   * @returns the article detail data
   */
  getArticle(pageId: number): Observable<ArticleDetail> {
    const url = `${this.baseURL}?format=json&action=query&prop=extracts&exintro&explaintext&utf8&pageids=${pageId}&origin=*`;

    return this.http
      .get<ArticleDetailResponse>(url, { responseType: 'json' })
      .pipe(map((response) => response.query.pages[pageId]));
  }

  /**
   * method to retrieve a list of articles that match the search term provided
   *
   * @param searchTerm term to perform the search
   * @returns list of articles
   */
  getArticles(searchTerm: string): Observable<Article[]> {
    const url = `${this.baseURL}?action=query&list=search&srsearch=${searchTerm}&format=json&utf8&origin=*`;

    return this.http
      .get<ArticleListResponse>(url, { responseType: 'json' })
      .pipe(map((response) => response.query.search));
  }
}
