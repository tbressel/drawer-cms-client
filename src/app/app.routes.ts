import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { InformationsComponent } from './informations/informations.component';
import { NewsComponent } from './news/news.component';
import { CodingComponent } from './coding/coding.component';
import { CertificatsComponent } from './certificats/certificats.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';




export const routes: Routes = [
    { path: './', component: AppComponent },
    { path: 'accueil', component: HomeComponent },
    { path: 'informations', component: InformationsComponent },
    { path: 'news', component: NewsComponent },
    { path: 'coding', component: CodingComponent },
    { path: 'certificats', component: CertificatsComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SigninComponent }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
    export class AppRoutingModule { }  