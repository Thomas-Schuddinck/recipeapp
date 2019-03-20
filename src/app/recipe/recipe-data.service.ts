import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Observable, Subject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataService {
  public loadingError$ = new Subject<string>();

  constructor(private http: HttpClient) {}

  get recipes$(): Observable<Recipe[]> {
    return this.http.get(`${environment.apiUrl}/recipes/`).pipe(
      catchError(error => {
        this.loadingError$.next(error.statusText);
        return of();
      }),
      tap((x: any[]) => {
        for (const y of x) {
          console.log(y);
        }
      }),
      map((list: any[]): Recipe[] => list.map(Recipe.fromJSON))
    );
  }

  addNewRecipe(recipe: Recipe) {
    return this.http.post(`${environment.apiUrl}/recipes/`, recipe.toJSON());
  }
}