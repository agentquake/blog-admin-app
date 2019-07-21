
import { Component, Input, OnInit, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


@Component({
  template: `
  <ng-template #dialog let-data let-ref="dialogRef">
  <nb-card>
    <nb-card-header>{{value.title}}</nb-card-header>
    <nb-card-body>
    <img *ngIf="img" src="{{value.image}}" alt="" height="200px" width="auto">
    <blockquote *ngIf="content" class="blockquote">
    <p>{{value.content}}</p>
    <footer *ngIf="source" class="blockquote-footer">{{value.source}}</footer>
  </blockquote>
    </nb-card-body>
    <nb-card-footer>
      <button (click)="ref.close()" class="btn btn-primary">Close Dialog</button>
    </nb-card-footer>
  </nb-card>
</ng-template>
{{value.title}}
<button (click)="open(dialog)" class="btn btn-primary btn-block">Content</button>
  `,
})
export class ContentRenderComponent implements OnInit {

  img = false;
  content = false;
  source = false;

  @Input() value;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
    if (this.value.type === 'PHOTO') {
      this.img = true;
    } else if (this.value.type === 'BLOG') {
      this.content = true;
      this.img = true;
    } else if (this.value.type === 'SLOGAN') {
      this.content = true;
      this.source = true;
    }
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {hasBackdrop: true, hasScroll: true});
  }
}
