// src/app/components/user-list/user-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { createMemoizedFetcher } from '../services/memo-api.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users: any[] = [];

  private http = inject(HttpClient);
  private fetchWithParams = createMemoizedFetcher(this.http); 
  loadUsers(page: number): void {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const params = { page };

    this.fetchWithParams(url, params).subscribe((data: any) => {
      this.users = data;
    });
  }
}
