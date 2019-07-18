import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
  ],
  declarations: [
    WelcomeComponent,
  ],
})
export class WelcomeModule { }
