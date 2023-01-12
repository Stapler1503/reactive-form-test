import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { debounceTime, Observable, of, Subject, takeUntil } from "rxjs";
import { FormService } from "../form.service";
import { IMovie } from "../../interfaces/movie.interface";
import { Router } from "@angular/router";
import { countriesList } from "../../consts/countries-list.const";

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit, OnDestroy {
  public formGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.pattern(`^[^0-9]+$`)]],
    username: ['', Validators.email],
    country: ['', Validators.required],
    postCode: [''],
    movie: ['']
  });
  public countriesList = countriesList;

  public filteredMovies$: Observable<IMovie[]> = of([]);
  public destroy$: Subject<void> = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.subscribeToControlChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onFormSubmit(): void {
    if (this.formGroup.valid) {
      const { name, username, country, postCode, movie } = this.formGroup.getRawValue();
      this.router.navigate(['thankyou'], { queryParams: { name, username, country, postCode, movie } });
    }
  }

  private subscribeToControlChanges(): void {
    this.formGroup.controls.movie.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.filteredMovies$ = this.formService.getMoviesFromAPI(value as string);
      });

    this.formGroup.controls.country.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value === this.countriesList[0].value) { // ie
          this.formGroup.controls.postCode.setValidators(Validators.pattern('^.{6,10}$'));
          this.formGroup.controls.postCode.updateValueAndValidity();
        } else if (value === this.countriesList[1].value) { // uk
          this.formGroup.controls.postCode.setValidators(
            [
              Validators.required,
              Validators.pattern('^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$')
            ]
          );
          this.formGroup.controls.postCode.updateValueAndValidity();
        }
    });
  }
}
