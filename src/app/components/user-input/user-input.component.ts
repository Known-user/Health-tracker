import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';
import { CommonModule } from '@angular/common'; // Add this import

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule, CommonModule], // Include CommonModule here
  templateUrl: './user-input.component.html',
  styles: ``,
})
export class UserInputComponent {
  name = '';
  selectedWorkoutTypes: { [key: string]: boolean } = {}; // Explicitly define type
  minutes: Record<string, number> = {}; // Store minutes for each workout type
  successMessage = ''; // Flag to show success message

  workoutTypes = ['Running', 'Swimming', 'Yoga', 'Cycling']; // Fixed list of workout types

  constructor(private workoutService: WorkoutService) {
    // Initialize selectedWorkoutTypes with false values
    this.workoutTypes.forEach((type) => {
      this.selectedWorkoutTypes[type] = false;
    });
  }

  // Add workout
  addWorkout() {
    if (!this.name || Object.values(this.selectedWorkoutTypes).every(val => !val) || 
        Object.values(this.minutes).some(minutes => !minutes)) {
      this.successMessage = 'Please fill all the fields.';
      setTimeout(() => {
        this.successMessage = ''; // Hide error message after 3 seconds
      }, 3000);
      return;
    }

    // Loop through selected workouts and add them with their time
    this.workoutTypes.forEach((workoutType) => {
      if (this.selectedWorkoutTypes[workoutType]) {
        const minutes = this.minutes[workoutType];
        if (minutes) {
          this.workoutService.addUserWorkout(this.name, workoutType, minutes); // Using service to handle adding workouts
        }
      }
    });

    this.successMessage = 'Workout added successfully!'; // Show success message
    setTimeout(() => {
      this.successMessage = ''; // Hide success message after 3 seconds
    }, 3000);

    // Reset all fields after submission
    this.name = '';
    this.selectedWorkoutTypes = {};
    this.minutes = {};
    this.workoutTypes.forEach((type) => {
      this.selectedWorkoutTypes[type] = false;
    });
  }
}
