import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pageTitle = 'myTools';

  constructor(
    private actvatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) { }

  changeTitle(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.actvatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data.title) {
            return `${child.snapshot.data.title} ~ ${this.pageTitle}`;
          } else {
            return this.pageTitle;
          }
        }
        return this.pageTitle;
      })).subscribe((title: any) => {
        this.titleService.setTitle(title);
      });

  }

  menuToggle(): boolean {
    $(() => {

      if ($('#links').is(':visible')) {
        this.menuHide();
      } else {
        this.menuShow();
      }

    });
    return false;
  }

  menuHide(): void {
    $('#links').slideUp('fast');
  }

  menuShow(): void {
    $('#links').slideDown('fast');
  }

  ngOnInit(): void {
    this.changeTitle();

    $(() => {
      $(window).on('resize', () => {
        if (window.innerWidth > 549) {
          $('#links').show(0);
        } else {
          $('#links').hide(0);
        }
      });
      $(document).on('click', '#links > a', () => {
        $('#links').slideUp('fast');
      });
    });
  }
}
