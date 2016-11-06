import { AuthGuard } from './_guards/auth.guard';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
const ROUTES: Routes = [
        { path: 'login', component: LoginComponent },
        { path: '', component: HomeComponent, canActivate: [AuthGuard] },
        // otherwise redirect to home
        { path: '**', redirectTo: '' }
    ]; 

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})

export class AppRoutingModule {}