import { NgModule } from '@angular/core';
import { NbCardModule, NbInputModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { RecapComponent } from './recap.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
  ],
  declarations: [
    RecapComponent,
  ],
})
export class RecapModule { }
