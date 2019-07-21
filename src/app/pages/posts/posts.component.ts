import { Component } from '@angular/core';
import { LocalDataSource, ServerDataSource } from 'ng2-smart-table';

import { PostService } from '../../service/post.service';
// import { Blogger } from 'src/app/@core/data/blogger';
import { ButtonRenderComponent } from './button.render.component';
import { ContentRenderComponent } from './content.render.component';
import { Post } from 'src/app/@core/data/posts';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Blogger } from 'src/app/@core/data/blogger';

@Component({
  selector: 'app-post-list',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {

  settings = {
    actions: false,
    columns: {
      id: {
        title: 'ID',
        type: 'String',
        width: '5%',
        filter: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        width: '10%',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'PENDING', title: 'Pending' },
              { value: 'APPROVE', title: 'Approved' },
              { value: 'REJECT', title: 'Rejected' },
              { value: 'DELETE', title: 'Deleted' },
            ],
          },
        },
      },
      type: {
        title: 'Type',
        type: 'string',
        width: '10%',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'BLOG', title: 'Blog' },
              { value: 'SLOGAN', title: 'Slogan' },
              { value: 'PHOTO', title: 'Image' },
            ],
          },
        },
      },
      title: {
        title: 'Title',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ContentRenderComponent,
      },
      createdDate: {
        title: 'Created date',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'dd-MMM-yyyy');
        }
      },
      updatedDate: {
        title: 'Created date',
        type: 'string',
        filter: false,
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          return this.datePipe.transform(raw, 'dd-MMM-yyyy');
        }
      },
      fullName: {
        title: 'User',
        type: 'string',
        valuePrepareFunction: (cell, row) => {
          return row.user.fullName;
        },
      },
      button: {
        title: '',
        type: 'custom',
        valuePrepareFunction: (cell, row) => row,
        renderComponent: ButtonRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.save.subscribe((data) => {
            this.handleChangeStatus(data);
          });
        },
        filter: false,
        sort: false,
      }
    },
  };

  source: ServerDataSource;
  posts: Post[] = [];

  constructor(
    private service: PostService,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.source = new ServerDataSource(http, {
      endPoint: 'http://blogwebsite.us-east-2.elasticbeanstalk.com/post',
      pagerLimitKey: 'size',
      pagerPageKey: 'page',
      totalKey: 'totalElements',
      filterFieldKey: '#field#',
      dataKey: 'content',
    });
    // this.getAll();
  }

  handleChangeStatus(data: any) {
    this.source.refresh();
  }

  getAll() {
    this.service.getAll()
      .subscribe(data => {
        data.forEach(element => {
          const post: Post = new Post();
          post.user = new Blogger();
          post.id = element.id;
          post.title = element.title;
          post.type = element.type;
          post.status = element.status;
          post.content = element.content;
          post.createdDate = element.createdDate;
          post.updatedDate = element.updatedDate;
          post.source = element.source;
          post.image = element.image;
          post.user.id = element.user.id;
          post.user.fullName = element.user.fullName;
          post.user.email = element.user.email;
          post.user.active = element.user.active;
          this.posts.push(post);
        });
        this.source.load(this.posts);
      });
  }
}
