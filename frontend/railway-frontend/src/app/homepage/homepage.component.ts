import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-homepage",
  imports: [RouterLink],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.css",
})
export class HomepageComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle("Homepage - Railway Manager");
  }
}
