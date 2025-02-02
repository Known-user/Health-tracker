import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styles:``,
})
export class WorkoutListComponent implements OnInit {
  users: any[] = [];
  searchQuery = '';
  filterType = '';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.workoutService.getUsers();
  }

  searchUsers() {
    this.users = this.workoutService.getUsers().filter(u => u.name.includes(this.searchQuery));
  }

  filterWorkouts() {
    if (this.filterType) {
      this.users = this.workoutService.getUsers().map(user => ({
        ...user,
        workouts: user.workouts.filter((w: any) => w.type === this.filterType)
      })).filter(user => user.workouts.length);
    } else {
      this.loadUsers();
    }
  }
}