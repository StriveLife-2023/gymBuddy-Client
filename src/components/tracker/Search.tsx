import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { exercise } from "./exerciseInterface.ts";
import axios from "axios";

interface SearchProps {
  setExercise: Dispatch<SetStateAction<exercise>>;
}

function apiCall(x: string) {
  return axios.get(
    `https://api.api-ninjas.com/v1/exercises?name=${x}`,
    {
      headers: {
        "X-Api-Key": import.meta.env.VITE_EXERCISE_API,
      },
    },
    { withCredentials: true }
  );
}

const Search: React.FC<SearchProps> = ({ setter }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [exList, setExList] = useState<exercise[]>([]);

  function inputChange(evt: React.FormEvent<HTMLInputElement>) {
    setSearchVal(evt.currentTarget.value);
  }

  function enterHit(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      if (evt.currentTarget.value.length > 0) {
        apiCall(searchVal)
          .then((data) => {
            setExList(data.data);
          })
          .catch((err) => {
            console.log("apiCall error", err);
          });
        evt.currentTarget.value = "";
        setSearchVal("");
      }
    }
  }

  function dropdownChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setter(exList[evt.currentTarget.value]);
  }

  function renderDropdown() {
    let i = -1;
    return (
      <>
        {exList.map((ex) => {
          return (
            <>
              <option value={`${(i += 1)}`}>{ex.name}</option>
            </>
          );
        })}
      </>
    );
  }
  return (
    <div className="m-auto">
      <input
        type="search"
        placeholder="Search Exercise Name"
        onChange={inputChange}
        onKeyDown={enterHit}
        className="w-full mb-2"></input>
      <br></br>
      <select
        onChange={dropdownChange}
        className="w-full mb-2">
        {renderDropdown()}
      </select>
    </div>
  );
};

export default Search;
