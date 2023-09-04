import React, { useRef, useState } from 'react';

const Exercise = ({ exercise, setWorkouts, workoutCount, setWorkoutCount, workouts }) => {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const modalRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState("flex items-center py-5 bg-neutral")
  const [workoutObj] = useState({
    exercise: exercise,
    set: sets,
    rep: reps
  });

  const showModal = () => {
    if (modalRef.current) modalRef.current.showModal();
  };

  const handleAddWorkout = (e) => {
    e.preventDefault();
    setClicked(true);
    setWorkoutCount(workoutCount + 1);
    setWorkouts([...workouts, workoutObj]);
  };

  const handleHover = () => {
    setHover("flex items-center py-5 bg-accent");
  };

  const handleLeave = () => {
    setHover("flex items-center py-5 bg-neutral");
  };

  const handleSetChange = (e) => {
    setSets(e.target.value);
  };

  const handleRepsChange = (e) => {
    setReps(e.target.value);
  };

  return (
    <React.Fragment>
      <div className={hover + ' w-1/1'} onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <div className="pr-4 pl-2 w-2/3 text-left cursor-pointer" onClick={showModal}>{exercise.name.toUpperCase()}</div>
        {exercise.equipment === 'body_only' ?
            <div className="pr-4 w-1/3 text-center">BODYWEIGHT</div> :
            <div className="pr-4 w-1/3 text-center">{exercise.equipment.toUpperCase()}</div>
        }
        <div className="pr-4 w-1/4 text-center">
          {exercise.type !== 'cardio' ?
            <input
              type="number"
              name="sets"
              min={0}
              value={sets || 3}
              className="input bg-secondary input-bordered w-20 max-w-xs"
              onChange={handleSetChange}
            /> :
            'N/A'}
        </div>
        <div className="pr-2 w-1/4 text-center">
          <input
            type="number"
            name="reps"
            min={0}
            value={reps || 10}
            className="input bg-secondary input-bordered w-20 max-w-xs"
            onChange={handleRepsChange}
          />
        </div>
      </div>
      {/* <div className="divider"></div> */}
      <dialog ref={modalRef} className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">{exercise.name}</h3>
          <p className="py-4">{exercise.instructions}</p>
          <div className="modal-action">
            <button className="btn">Close</button>
            {!clicked ?
              <button className="btn" onClick={handleAddWorkout}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button> :
              null
            }
          </div>
        </form>
      </dialog>
    </React.Fragment>
  )
};

export default Exercise;