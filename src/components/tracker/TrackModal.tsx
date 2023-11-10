import React, { useState, useEffect, useRef } from "react";
import { exercise } from "./exerciseInterface.ts";
import Search from "./Search.tsx";
import PlusMinus from "./PlusMinus.tsx";
import axios from "axios";

interface exercisePlus {
  exercise: exercise;
  set: number;
  rep: number;
}

const TrackerModal = ({ addWorkout, u_id }) => {
  const [currSets, setCurrSets] = useState<number>(0);
  const [currReps, setCurrReps] = useState<number>(0);
  const [currExercise, setCurrExercise] = useState<exercise>();

  const [exerciseList, setExerciseList] = useState<exercisePlus[]>([]);

  const addExercise = (e) => {
    e.preventDefault();
    const arr = [];
    exerciseList.forEach((val) => arr.push(val));
    if (currExercise) {
      const tempObj = {
        exercise: currExercise,
        set: currSets,
        rep: currReps,
      };
      arr.push(tempObj);
    }
    setExerciseList(arr);
  };

  const postWorkout = () => {
    axios
      .post(
        import.meta.env.VITE_SERVER_TRACKER_URL,
        {
          user_id: u_id,
          exercises: exerciseList,
        },
        { withCredentials: true }
      )
      .then((data) => {
        console.log("post workouts then");
        console.log(data);
      })
      .catch((err) => {
        console.log("Tracker getWorkouts err: ", err);
      });
  };

  return (
    <>
      {/* You can open the modal using ID.showModal() method */}
      <button
        className="btn"
        onClick={() => window.my_modal_3.showModal()}>
        Add Workout
      </button>
      <dialog
        id="my_modal_3"
        className="modal">
        <form
          method="dialog"
          className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-row">
            <div className="flex-col w-2/5">
              <div>
                <Search setter={setCurrExercise}></Search>
              </div>
              <div>
                Sets:{" "}
                <PlusMinus
                  setter={setCurrSets}
                  mainValue={currSets}></PlusMinus>
              </div>
              <div>
                Reps:{" "}
                <PlusMinus
                  setter={setCurrReps}
                  mainValue={currReps}></PlusMinus>
              </div>
              <div className="flex flex-row">
                <div></div>
                <button
                  onClick={addExercise}
                  className="m-2">
                  Add Exercise
                </button>
              </div>
            </div>
            <div className="text-left pl-4 overflow-auto h-[200px] w-3/5">
              {exerciseList.map((val) => {
                return (
                  <div>
                    {val.exercise.name} : {val.set} x {val.rep}
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => {
              addWorkout(exerciseList);
              postWorkout();
              setExerciseList([]);
              window.my_modal_3.close();
            }}
            disabled={exerciseList.length === 0}>
            Confirm Workout
          </button>
        </form>
      </dialog>
    </>
  );
};

export default TrackerModal;
