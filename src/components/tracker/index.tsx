import React, { useState, useEffect } from "react";
import TrackerModal from "./TrackModal";
import Search from "./Search";
import axios from "axios";

interface TrackerProps {
  number: number;
}

const Tracker: React.FC<TrackerProps> = ({ number }) => {
  const [tracked, setTracked] = useState([]);

  const addWorkout = (input) => {
    if (input.length > 0) {
      let arr = [];
      tracked.forEach((val) => arr.push(val));
      const d = new Date();
      arr.push({
        workout: input,
        date: d,
      });
      setTracked(arr);
    }
  };

  const listWorkout = (wo) => {
    return wo.map((v) => {
      return (
        <div className="flex flex-col">
          <div>{v.exercise.name}</div>
          <div>
            {v.set} x {v.rep}
          </div>
        </div>
      );
    });
  };

  const renderAccordion = () => {
    let arr = [];
    for (let i = tracked.length - 1; i >= 0; i--) {
      let v = tracked[i];
      arr.push(
        <div className="collapse collapse-arrow join-item border border-base-300">
          <input
            type="radio"
            name="my-accordion-4"
          />
          <div className="collapse-title text-xl font-medium">
            {v.date.getMonth() + 1}/{v.date.getDate()}/{v.date.getFullYear()}
          </div>
          <div className="collapse-content">{listWorkout(v.workout)}</div>
        </div>
      );
    }
    return arr;
  };

  const reformWO = (val) => {
    let arr = [];
    let d = new Date(val.created_at);
    val.date = d;
    val.exercises.map((el) => {
      arr.push({
        exercise: {
          name: el.exercise_name,
        },
        set: el.set,
        rep: el.rep,
      });
    });
    return {
      date: d,
      workout: arr,
    };
  };

  useEffect(() => {
    axios
      .get(
        import.meta.env.VITE_SERVER_TRACKER_URL,
        { params: { num: number } },
        { withCredentials: true }
      )
      .then((data) => {
        let arr = [];
        data.data.forEach((val) => {
          arr.push(reformWO(val));
        });
        setTracked(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="m-4">
        <TrackerModal
          addWorkout={addWorkout}
          u_id={number}></TrackerModal>
      </div>
      <div className="overflow-auto h-[500px]">
        <div className="join join-vertical w-[500px]">{renderAccordion()}</div>
      </div>
    </>
  );
};

export default Tracker;
