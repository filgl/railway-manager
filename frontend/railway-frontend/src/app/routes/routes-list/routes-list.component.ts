import {Component, OnInit} from '@angular/core';
import {RoutesListService} from './routes-list.service';
import {Route} from '../../Models/Route';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-routes-list',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './routes-list.component.html',
  styleUrl: './routes-list.component.css'
})
export class RoutesListComponent implements OnInit {
  routes!: Route[];

  constructor(private routesListService: RoutesListService) {}

  ngOnInit(): void {
    this.loadRoutes();
  }

  loadRoutes(): void {
    this.routesListService.getRoutes().subscribe(routes => {
      this.routes = routes;
    });
  }
}
