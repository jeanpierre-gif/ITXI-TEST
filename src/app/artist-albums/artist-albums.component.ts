import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-artist-albums',
  templateUrl: './artist-albums.component.html',
  styleUrls: ['./artist-albums.component.css']
})
export class ArtistAlbumsComponent implements OnInit {
  artistId: any ;
  albums: any[] = [];
  initialized: boolean = false;
  loading: boolean = false;
loadersArray: any[] = [];
colors: string[] = ['red', 'blue', 'greenyellow', 'yellow', 'orange', 'purple'];

  constructor(private route: ActivatedRoute, private http: HttpClient,private auth:AuthenticationService) { }

  ngOnInit(): void {
    
    this.loadersArray = new Array(14).fill(0);

    this.route.params.subscribe(params => {
      this.artistId = params['id'];

    });
   this.DisplaySearch();
  }
  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomIndex];
  }
  
  DisplaySearch(){
this.loading = true;
    this.auth.SearchArtistAlbum(this.artistId).subscribe(
      (res:any)=>{
this.albums=res.items;
console.log(this.albums);
this.loading = false;
      }
      );
  }
  truncateString(str: string, maxLength: number): string {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    } else {
      return str;
    }
  }
  getArtistNames(artists: any[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
  previewOnspotify(item: any): void {
    if (item && item.external_urls ) {
      window.open(item.external_urls.spotify, '_blank');
    } 
  }
}
