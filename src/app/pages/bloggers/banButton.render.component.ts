
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BloggerService } from '../../service/blogger.service';


@Component({
  template: `
    <button *ngIf="active" (click)="ban()" type="button" class="btn btn-danger">Ban</button>
    <button *ngIf="!active" (click)="unban()" type="button" class="btn btn-success">Unban</button>
  `,
})
export class BanButtonRenderComponent implements OnInit {

  public renderValue;
  active: boolean;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private bloggers: BloggerService) {  }

  ngOnInit() {
    this.renderValue = this.value;
    this.active = this.renderValue.active;
  }

  ban() {
    this.bloggers.banBlogger(this.renderValue.email).subscribe();
    this.save.emit(this.renderValue);
  }

  unban() {
    this.bloggers.unbanBlogger(this.renderValue.email).subscribe();
    this.save.emit(this.renderValue);
  }


}
