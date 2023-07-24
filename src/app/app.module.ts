import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/pages/login/login.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeaderComponent } from './modules/common/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './modules/common/footer/footer.component';
import { LogoutComponent } from './modules/pages/logout/logout.component';
import { MarketsComponent } from './modules/pages/markets/markets.component';
import { MatTableModule } from '@angular/material/table';
import { MarketDetailsComponent } from './modules/pages/market-details/market-details.component';
import { BalancesComponent } from './modules/pages/balances/balances.component';
import { OpenOrdersComponent } from './modules/pages/open-orders/open-orders.component';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
registerLocaleData(localeTr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    LogoutComponent,
    MarketsComponent,
    MarketDetailsComponent,
    BalancesComponent,
    OpenOrdersComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCheckboxModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'tr' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
