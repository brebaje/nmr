import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Article, ArticleList } from 'src/app/models/api.model';

@Injectable({
  providedIn: 'root',
})
export class WikipediaService {
  private baseURL: string = 'https://en.wikipedia.org/w/api.php';

  constructor(private http: HttpClient) {}

  getArticle(pageId: number): Observable<Article> {
    const url = `${this.baseURL}?format=json&action=query&prop=extracts&exintro&explaintext&utf8&pageids=${pageId}&origin=*`;

    return this.http.get<Article>(url, { responseType: 'json' });
  }

  getArticles(searchTerm: string): Observable<ArticleList> {
    const url = `${this.baseURL}?action=query&list=search&srsearch=${searchTerm}&format=json&utf8&origin=*`;

    return this.http.get<ArticleList>(url, { responseType: 'json' });
  }
}