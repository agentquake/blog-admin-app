import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { BloggerService } from '../../service/blogger.service';
import { Blogger } from 'src/app/@core/data/blogger';

@Component({
  selector: 'app-bloggers-list',
  templateUrl: './bloggers.component.html',
  styleUrls: ['./bloggers.component.scss'],
})
export class BloggersComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      fullname: {
        title: 'Name',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      active: {
        title: 'Active',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  bloggers: Blogger[] = [];

  constructor(private service: BloggerService) {
    this.getAll();
  }

  getAll() {
    this.service.getAll()
      .subscribe(data => {
        console.log(data);
        data.forEach(element => {
          const bl: Blogger = new Blogger();
          bl.id = element.id;
          bl.fullname = element.fullname;
          bl.email = element.email;
          bl.active = element.active;
          this.bloggers.push(bl);
          console.log(this.bloggers);
        });
        console.log(this.bloggers);
        this.source.load(this.bloggers);
      });
  }
}
