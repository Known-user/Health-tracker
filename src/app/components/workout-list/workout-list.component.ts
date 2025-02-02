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

  
  constructor(private workoutService: WorkoutService) {}
  
  ngOnInit() {
    console.log('ngOnInit triggered');
    this.loadUsers();
  }
  
  loadUsers() {
    console.log('loadUsers triggered');
    this.users = this.workoutService.getUsers();
    this.totalPages = Math.ceil(this.users.length / this.usersPerPage);
    console.log('Users loaded:', this.users);
  }

  // Search functionality: Search by name and workout type
  searchUsers() {
    this.users = this.workoutService.getUsers().filter(u => u.name.includes(this.searchQuery) || 
      u.workouts.some((w: any) => w.type.toLowerCase().includes(this.searchQuery.toLowerCase())));
  }

  // Filter workouts by workout type
  filterWorkouts() {
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
  }

  // Paginate users list
  paginate() {
    const start = (this.currentPage - 1) * this.usersPerPage;
    return this.users.slice(start, start + this.usersPerPage);
  }
}
