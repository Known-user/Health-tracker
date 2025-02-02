import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey = 'userData';

  // Get all users from local storage
  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Save users to local storage
  saveUsers(users: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  // Add or update a user's workout data
  addUserWorkout(name: string, workoutType: string, minutes: number): void {
    let users = this.getUsers();
    let user = users.find((u: any) => u.name === name);

    if (!user) {
      user = { id: users.length + 1, name: name, workouts: [] };
      users.push(user);
    }

    // Check if the user already has the workout type, if not, add it
    const existingWorkout = user.workouts.find((w: any) => w.type === workoutType);
    if (existingWorkout) {
      existingWorkout.minutes += minutes; // Add minutes to existing workout
    } else {
      user.workouts.push({ type: workoutType, minutes }); // New workout type
    }

    this.saveUsers(users); // Save updated users data to local storage
  }
}
