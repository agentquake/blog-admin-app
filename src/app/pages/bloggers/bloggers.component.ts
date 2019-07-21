import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { BloggerService } from '../../service/blogger.service';
import { Blogger } from 'src/app/@core/data/blogger';
import { BanButtonRenderComponent } from './banButton.render.component';

@Component({
  selector: 'app-bloggers-list',
  templateUrl: './bloggers.component.html',
  styleUrls: ['./bloggers.component.scss'],
})
export class BloggersComponent {

  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'String',
        width: '10%',
      },
      fullName: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      active: {
        title: 'Active',
        type: 'string',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: true, title: 'True' },
              { value: false, title: 'False' },
            ],
          },
        },
      },
      button: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: BanButtonRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((row) => {
            this.handleBanBlogger(row);
          });
        },
        filter: false,
        sort: false,
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  bloggers: Blogger[] = [];

  constructor(private service: BloggerService) {
    this.getAll();
  }

  handleBanBlogger(blogger: Blogger) {
    const newBl = blogger;
    newBl.active = !newBl.active;
    this.source.update(blogger, newBl);
  }

  getAll() {
    this.service.getAll()
      .subscribe(data => {
        data.forEach(element => {
          const bl: Blogger = new Blogger();
          bl.id = element.id;
          bl.fullName = element.fullName;
          bl.email = element.email;
          bl.active = element.active;
          this.bloggers.push(bl);
        });
        this.source.load(this.bloggers);
      });
  }
}
