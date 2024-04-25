import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ArtistSearchComponent } from './artist-search/artist-search.component';
import { ArtistAlbumsComponent } from './artist-albums/artist-albums.component';

const routes: Routes = [
  {path:"",component:LoginPageComponent},
  {path:"callback",component:ArtistSearchComponent},
  { path: 'search/:searchQuery', component: ArtistSearchComponent },
  {path:"albums/:id",component:ArtistAlbumsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
