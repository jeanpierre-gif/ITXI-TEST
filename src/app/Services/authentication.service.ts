import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private Client_Id:string='2edb2f8c54864f17a9dabe0c9a330dd8';
private redirect_URI:string='http://localhost:4200/callback';
accessToken:any='';
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }


  Login() : void {
    const queryParams={
      client_id:this.Client_Id,
      response_type:"token",
      redirect_uri:this.redirect_URI,
    
    };
      const url=`https://accounts.spotify.com/authorize?response_type=${queryParams.response_type}&client_id=${queryParams.client_id}&redirect_uri=${queryParams.redirect_uri}`;
      window.location.href = url;
    }
    handleCallback(): void {
      this.route.fragment.subscribe(fragment => {

        if (fragment) {
          this.accessToken = new URLSearchParams(fragment).get('access_token');
          if (this.accessToken) {
localStorage.setItem('access_token',this.accessToken);
            } 
        } 
      });
    }
    SearchArtist(searchParams: string){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.accessToken}`
      });
      
      return this.http.get<any>('https://api.spotify.com/v1/search', { headers: headers, params: { q: searchParams, type: 'artist' } })
      }
      SearchArtistAlbum(artistId: string){
        const AccessToken=localStorage.getItem('access_token');

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${AccessToken}`
        });
        return this.http.get<any>(`https://api.spotify.com/v1/artists/${artistId}/albums`, { headers: headers});
      }
}
