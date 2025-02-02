import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { WorkoutService } from './services/workout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ,RouterLink ,RouterLinkActive],
  templateUrl: './app.component.html',
  styles: ``,
})
export class AppComponent {
  title = 'health-tracker';
  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.initializeUserData();
  }

  initializeUserData(): void {
    const userData = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          { type: 'Running', minutes: 30 },
          { type: 'Cycling', minutes: 45 },
        ],
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          { type: 'Swimming', minutes: 60 },
          { type: 'Running', minutes: 20 },
        ],
      },
      {
        id: 3,
        name: 'Abhay',
        workouts: [
          { type: 'Swimming', minutes: 10 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
      {
        id: 4,
        name: 'Mike Johnson',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Cycling', minutes: 40 },
        ],
      },
      {
        id: 5,
        name: 'Snow White',
        workouts: [
          { type: 'Yoga', minutes: 50 },
          { type: 'Running', minutes: 20 },
        ],
      },
      {
        id: 6,
        name: 'Mike Tyson',
        workouts: [
          { type: 'Running', minutes: 50 },
          { type: 'Cycling', minutes: 60 },
        ],
      },
    ];

    const users = this.workoutService.getUsers()

    if (users.length === 0) {
      // Adding workouts for each user
      userData.forEach((user) => {
        user.workouts.forEach((workout) => {
          this.workoutService.addUserWorkout(user.name, workout.type, workout.minutes);
        });
      });
    }
  }
}
