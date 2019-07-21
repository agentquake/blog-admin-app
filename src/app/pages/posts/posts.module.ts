import { NgModule } from '@angular/core';
// import { NbAlertModule, NbCardModule, NbIconModule, NbPopoverModule, NbSearchModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { NbIconModule, NbInputModule, NbDialogModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { PostsComponent } from './posts.component';
import { ButtonRenderComponent } from './button.render.component';
import { ContentRenderComponent } from './content.render.component';


@NgModule({
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbEvaIconsModule,
    NbDialogModule.forRoot(),
  ],
  entryComponents: [
    ButtonRenderComponent,
    ContentRenderComponent
  ],
  declarations: [
    PostsComponent,
    ButtonRenderComponent,
    ContentRenderComponent
  ],
})
export class PostsModule { }
