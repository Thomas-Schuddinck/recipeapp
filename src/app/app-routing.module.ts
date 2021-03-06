import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './selective-preload-strategy';
import { AuthGuard } from './user/auth.guard';

const appRoutes: Routes = [
  {
    path: 'recipe',
    canActivate: [AuthGuard],
    loadChildren: './recipe/recipe.module#RecipeModule',
    data: { preload: true }
  },
  { path: '', redirectTo: 'recipe/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: SelectivePreloadStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
