import { NgModule } from '@angular/core';
import { NbIconModule, NbInputModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { BloggersComponent } from './bloggers.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { BanButtonRenderComponent } from './banButton.render.component';

@NgModule({
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
  ],
  entryComponents: [
    BanButtonRenderComponent
  ],
  declarations: [
    BloggersComponent,
    BanButtonRenderComponent,
  ],
})
export class BloggersModule { }
