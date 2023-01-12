import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from "./form/enter/enter.component";
import {ThankYouComponent} from "./form/thank-you/thank-you.component";

const routes: Routes = [
  { path: '', redirectTo: 'enter', pathMatch: 'full' },
  { path: 'enter', component: EnterComponent },
  { path: 'thankyou', component: ThankYouComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

