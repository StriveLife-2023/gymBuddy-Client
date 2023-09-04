import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import Workouts from './subcomponents/Workouts.jsx';
import AuthContext from '../auth/context/AuthProvider';
const Planner = ({ number }) => {
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [workoutCount, setWorkoutCount] = useState(0);
  const [workoutType, setWorkoutType] = useState('SELECT WORKOUT TYPE');
  const exModalRef = useRef(null);
  const user = useContext(AuthContext);

  const getExercises = () => {
    axios.get(`https://api.api-ninjas.com/v1/exercises?type=${workoutType}`, {
      headers: {
        'X-Api-Key': import.meta.env.VITE_API_KEY
      }
    })
    .then(response => {
      setExercises(response.data);
    })
    .catch(err => console.log(err));
  };

  const handleSelect = (e) => {
    setWorkoutType(e.target.value);
    getExercises();
  }

  useEffect(() => {
    getExercises();
  }, [workoutType]);

  const showExModal = () => {
    if (workouts.length) {
      if (exModalRef.current) exModalRef.current.showModal();
    }
  };

  const postWorkout = () => {
    axios.post(import.meta.env.VITE_SERVER_TRACKER_URL,{
      user_id: user.auth.id,
      exercises: workouts
    })
    .then((data)=>{
      console.log('Posting new workout', data);
    })
    .catch((err)=>{console.log('Error posting new workout', err)})
  };

    const addWorkout = () => {
      postWorkout();
      setWorkouts([]);
      setWorkoutCount(0);
    };

  return (
    <React.Fragment>
      <div className="flex items-center py-5 overflow-hidden" style={{maxHeight: '90vh'}}>
        <div className="py-5 m-auto">
            <select className="select select-bordered w-full max-w-xs" value={workoutType} onChange={handleSelect}>
              <option disabled>SELECT WORKOUT TYPE</option>
              <option value="cardio">CARDIO</option>
              <option value="olympic_weightlifting">OLYMPIC WEIGHTLIFTING</option>
              <option value="plyometrics">PLYOMETRICS</option>
              <option value="powerlifting">POWERLIFTING</option>
              <option value="strength">STRENGTH</option>
              <option value="stretching">STRETCHING</option>
              <option value="strongman">STRONGMAN</option>
            </select>
            <button className="btn" onClick={showExModal}>
              Exercises
              <div className="badge badge-secondary">{workoutCount}</div>
            </button>
            <dialog ref={exModalRef} className="modal">
              <form method="dialog" className="modal-box">
                <div className="py-4">
                  {workouts.map((workout, i) => {
                    return <p key={i}>{workout.exercise.name}</p>
                  })}
                </div>
                <div className="modal-action">
                  <button className="btn">Close</button>
                  <button className="btn" onClick={addWorkout}>Add Workout</button>
                </div>
              </form>
            </dialog>
            <div className="flex items-center py-5" style={{width: '65vw'}}>
              <Workouts exercises={exercises} workouts={workouts} setWorkouts={setWorkouts} workoutCount={workoutCount} setWorkoutCount={setWorkoutCount}/>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Planner;

