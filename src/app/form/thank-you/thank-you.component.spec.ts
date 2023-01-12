import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouComponent } from './thank-you.component';
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { countriesList } from "../../consts/countries-list.const";

describe('ThankYouComponent', () => {
  let component: ThankYouComponent;
  let fixture: ComponentFixture<ThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                name: 'Name',
                username: 'qwe@qw.qw',
                country: 'ie',
                postCode: '123123',
                movie: 'Some Like It Hot'
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {}
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call OnInit', () => {
    spyOn<any>(component, 'getQueryParams');
    component.ngOnInit();
    expect(component['getQueryParams']).toHaveBeenCalled();
  });

  it('should get all query params', () => {
    const params = component['route'].snapshot.queryParams;
    spyOn<any>(component, 'getCountryName');
    component['getQueryParams']();
    expect(component.data.name).toEqual(params['name']);
    expect(component.data.username).toEqual(params['username']);
    expect(component['getCountryName']).toHaveBeenCalled();
    expect(component.data.postCode).toEqual(params['postCode']);
    expect(component.data.movie).toEqual(params['movie']);
  });

  it('should get country name of ie', () => {
    const name = component['getCountryName']('ie');
    expect(name).toEqual(countriesList[0].name);
  });

  it('should get country name of uk', () => {
    const name = component['getCountryName']('uk');
    expect(name).toEqual(countriesList[1].name);
  });

  it('should go back to form', () => {
    spyOn<any>(component['router'], 'navigate');
    component.goBack();
    expect(component['router'].navigate).toHaveBeenCalledWith(['']);
  })
});
