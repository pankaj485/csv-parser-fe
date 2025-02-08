import { Routes } from '@angular/router';
import { FileParserComponent } from './file-parser/file-parser.component';

export const routes: Routes = [
  {
    path: 'parser',
    component: FileParserComponent,
  },
  {
    path: '**',
    redirectTo: 'parser',
  },
];
