import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { CommonModule } from '@angular/common';  // Import CommonModule for ngIf

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [FormsModule, CommonModule],  // Include FormsModule and CommonModule here
  templateUrl: './workout-list.component.html',
  styles:`` ,
})
export class WorkoutListComponent implements OnInit {
  users: any[] = [];
  searchQuery = '';
  filterType = '';
  currentPage = 1;
  usersPerPage = 5;
  totalPages = 0;
  smallNames: string[] = [];
  
  constructor(private workoutService: WorkoutService) {}
 
  
  ngOnInit() {
    this.loadUsers();
    this.smallNames = this.workoutService.getUsers().map(user => user.name.toLowerCase());
  }
  
  loadUsers() {
    this.users = this.workoutService.getUsers();
    this.calculateTotalPages();
  }
  
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
  }

  // Search functionality: Search by name and workout type
  searchUsers() {
    const query = this.searchQuery.toLowerCase().trim();
    this.currentPage = 1;
  
    const users = this.workoutService.getUsers();
    this.users = users.filter((u, index) => 
      this.smallNames[index].includes(query) || 
      u.workouts.some((w: any) => w.type.toLowerCase().includes(query))
    );
    this.calculateTotalPages();
  }
  
  // Filter workouts by workout type
  filterWorkouts() {
    this.currentPage = 1;
    if (this.filterType) {
      this.users = this.workoutService.getUsers()
        .map(user => ({
          ...user,
          workouts: user.workouts.filter((w: any) => w.type === this.filterType)
        }))
        .filter(user => user.workouts.length);
    } else {
      this.loadUsers();
    }
    this.calculateTotalPages();
  }

  // Ensure usersPerPage stays within limits
  updateUsersPerPage() {
    if (this.usersPerPage < 1) {
      this.usersPerPage = 1;
    } else if (this.usersPerPage > 50) {
      this.usersPerPage = 50;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Paginate users list
  paginate() {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.users.slice(start, start + this.usersPerPage);
  }
}