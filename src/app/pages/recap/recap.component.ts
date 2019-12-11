import { Component } from '@angular/core';

@Component({
  selector: 'app-recap',
  styleUrls: ['./recap.component.scss'],
  templateUrl: './recap.component.html',
})
export class RecapComponent {
  fileToUpload: File[] = [];
  handleFileInput(files: FileList) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < files.length; i++) {
      this.fileToUpload.push(files.item(0));
    }
}
}
