import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/pages/login/login.component';
import { ProfileComponent } from './modules/pages/profile/profile.component';
import { AuthGuard } from './modules/guards/auth.guard';
import { LogoutComponent } from './modules/pages/logout/logout.component';
import { MarketsComponent } from './modules/pages/markets/markets.component';
import { BalancesComponent } from './modules/pages/balances/balances.component';
import { OpenOrdersComponent } from './modules/pages/open-orders/open-orders.component';
import { MarketDetailsComponent } from './modules/pages/market-details/market-details.component';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'marketler', component: MarketsComponent },
  { path: 'market/:marketCode', component: MarketDetailsComponent },
  { path: 'profil/bakiyeler', component: BalancesComponent, canActivate: [AuthGuard]  },
  { path: 'profil/acik-emirler', component: OpenOrdersComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
