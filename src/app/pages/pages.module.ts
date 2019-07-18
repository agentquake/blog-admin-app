import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { WelcomeModule } from './welcome/welcome.module';
import { BloggersModule } from './bloggers/bloggers.module' ;

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    WelcomeModule,
    BloggersModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
