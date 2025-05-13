import { Component } from '@angular/core';

import { DefaultComponent } from './default/default.component';
import { SignalsComponent } from './signals/signals.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [DefaultComponent,SignalsComponent,UserListComponent]
})
export class AppComponent {}
