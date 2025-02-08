import { Routes } from '@angular/router';
import { FileParserComponent } from './file-parser/file-parser.component';
import { FilesStatComponent } from './files-stat/files-stat.component';

export const routes: Routes = [
  {
    path: 'parser',
    component: FileParserComponent,
  },
  {
    path: 'analytics',
    component: FilesStatComponent,
  },
  {
    path: '**',
    redirectTo: 'parser',
  },
];
