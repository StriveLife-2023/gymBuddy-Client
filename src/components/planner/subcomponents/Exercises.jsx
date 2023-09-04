import React from 'react';
import Exercise from './Exercise.jsx';

const Exercises = ({ exercises, setWorkouts, workoutCount, setWorkoutCount, workouts }) => {

  return (
    <React.Fragment>
      <div className="flex items-left py-5 bg-secondary">
          <div className="pr-4 pl-2 w-2/3 text-left cursor-pointer font-bold">EXERCISE</div>
          <div className="pr-4 w-1/3 text-center font-bold">EQUIPMENT</div>
          <div className="pr-4 w-1/4 text-left font-bold">SETS</div>
          <div className="pr-2 w-1/4 text-left font-bold">REPS</div>
        </div>
      <div className="max-h-96 overflow-y-auto">
        {exercises.map((exercise, i) => {
          return <Exercise key={i} exercise={exercise} setWorkouts={setWorkouts} workouts={workouts} workoutCount={workoutCount} setWorkoutCount={setWorkoutCount}/>
        })}
      </div>
    </React.Fragment>
  )
};

export default Exercises;