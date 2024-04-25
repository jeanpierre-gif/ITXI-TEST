import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../Services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.css'],
  animations: [
    trigger('moveToTop', [
      state('middle', style({
        transform: 'translate(0%,500%)'
      })),
      state('top', style({
        transform: 'translate(0,30%)'
      })),
      transition('middle => top', [
        animate('0.5s')
      ])
    ]),
    trigger('slideUpFromBottom', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.5s ease-in-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  
  ]
})
export class ArtistSearchComponent implements OnInit {
  state: string = 'middle';
  loading: boolean = false; //variable to track loading state
state2:string="middle";
  
  searchResults: any[] = [];
  searchQuery: any;

  constructor(private http: HttpClient,private auth:AuthenticationService,private router:Router,private route:ActivatedRoute,private Location:Location) { }
  ngOnInit(): void {
    this.auth.handleCallback();
    this.route.paramMap.subscribe(params => {
      if (params.has('searchQuery')) {
        this.state = 'top';

        //extract the search query from the url
        this.searchQuery = params.get('searchQuery');
        // perform search
        this.search();
      }
    });  }
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {

      this.state = 'top';
      this.search();
    }
  }
search() {
  if (this.searchQuery.trim() !== '') {
    //update the url with the search query
    const newUrl = '/search/' + encodeURIComponent(this.searchQuery);
    //we are using location service to update the url without triggering a route change
    this.Location.replaceState(newUrl);

    this.loading = true; //set loading state to true when search starts

    this.auth.SearchArtist(this.searchQuery).subscribe(
      (res: any) => {
        if (res.artists && res.artists.items) {
          this.searchResults = res.artists.items;
        } else {
          this.searchResults = [];
        }
        this.loading = false; //set loading state to false after receiving search results
      },
      (error) => {
        console.error('Error fetching artists:', error);
        this.searchResults = [];
        this.loading = false; //set loading state to false on error
        this.state2 = "top";
      }
    );
  }
}

  
  viewArtistAlbums(artistId: string): void {
    // Navigate to artist albums component with artist ID as parameter
    this.router.navigate(['/albums', artistId]);
  }
  
  }
