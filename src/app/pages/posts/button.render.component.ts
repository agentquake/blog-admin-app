
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../../service/post.service';


@Component({
  template: `
    <button *ngIf="approvebtn" (click)="approve()" type="button" class="btn btn-danger btn-block">Approve</button>
    <button *ngIf="rejectbtn" (click)="reject()" type="button" class="btn btn-success btn-block">Reject</button>
  `,
})
export class ButtonRenderComponent implements OnInit {

  public renderValue;
  approvebtn = false;
  rejectbtn = false;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
      private post: PostService
      ) {  }

  ngOnInit() {
    if (this.value.status ===  'PENDING') {
        this.approvebtn = true;
        this.rejectbtn = true;
    } else if (this.value.status ===  'REJECTED') {
        this.approvebtn = true;
    } else if (this.value.status ===  'APPROVED') {
        this.rejectbtn = true;
    }
  }

  approve() {
    this.post.approvePost(this.value.id).subscribe(() => {
      this.save.emit({post: this.value, status: 'APPROVED'});
    });
  }

  reject() {
    this.post.rejectPost(this.value.id).subscribe(() => {
      this.save.emit({post: this.value, status: 'REJECTED'});
    });
  }
}
