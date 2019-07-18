import { NgModule } from '@angular/core';
import { NbIconModule, NbInputModule, NbTreeGridModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { BloggersComponent } from './bloggers.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbEvaIconsModule
  ],
  declarations: [
    BloggersComponent,
  ],
})
export class BloggersModule { }
