import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { countriesList } from "../../consts/countries-list.const";
import { ICountryOption } from "../../interfaces/country-option.interface";

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  public data = {
    name: '',
    username: '',
    country: '',
    postCode: '',
    movie: ''
  }

  constructor(
   private route: ActivatedRoute,
   private router: Router
  ) { }

  public ngOnInit(): void {
    this.getQueryParams();
  }


  public goBack(): void {
    this.router.navigate(['']);
  }

  private getQueryParams(): void {
    const params = this.route.snapshot.queryParams;
    const countryValue = params['country'];
    this.data.name = params['name'];
    this.data.username = params['username'];
    this.data.country = this.getCountryName(countryValue);
    this.data.postCode = params['postCode'];
    this.data.movie = params['movie'];
  }

  private getCountryName(countryValue: string): string {
    const country = countriesList.find(({ value }) => value === countryValue) as ICountryOption;
    return country['name'];
  }
}
