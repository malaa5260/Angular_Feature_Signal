import { Component, inject } from '@angular/core';
import { MemoApiService } from '../services/memo-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = new Array<any>();

  private service = inject(MemoApiService);

  loadUsers(page: number): void {

    const url = 'https://jsonplaceholder.typicode.com/users';
    const params = { page };

    this.service.fetchWithParams(url, params).subscribe((data: any) => {
      this.users = data;
    })
  }

}
