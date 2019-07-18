import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Router } from '@angular/router';

// import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { User } from 'src/app/@core/data/user';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  showName = true;
  user: User = new User();

  currentTheme = 'default';

  userMenu = [{ title: 'Profile' }, { title: 'Log out', link: 'auth/logout' }];

  constructor(private sidebarService: NbSidebarService,
              private themeService: NbThemeService,
              private router: Router,
              private userService: UserService,
              private layoutService: LayoutService,
              private authService: NbAuthService,
              private breakpointService: NbMediaBreakpointsService) {
    // this.authService.onTokenChange()
    //   .subscribe((token: NbAuthJWTToken) => {
    //     if (token.isValid()) {
    //       this.user = token.getPayload();
    //     }
    //   });
  }


  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getMe()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.user.id = data.id;
        this.user.name = data.fullName;
        this.user.email = data.email;
      });

    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService.onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigate(['/pages']);
    return false;
  }
}
