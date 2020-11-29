import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { E404Component } from './e404/e404.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: '' } },
  { path: 'list', component: ListComponent, data: { title: 'Lista de Ferramentas' } },
  { path: 'new', component: NewComponent, data: { title: 'Nova Ferramenta' } },
  { path: 'about', component: AboutComponent, data: { title: 'Sobre o MyTools' } },
  { path: '**', component: E404Component, data: { title: 'Página não encontrada' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
