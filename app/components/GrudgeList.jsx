"use client";
import { Button, TextField } from "@mui/material";
import { useReducer, useState } from "react";

function grudgeReducer(state, action) {
  console.log({ state, action });
  if (action.type === "ADD") {
    return [...state, action.payload];
  }
  if (action.type === "REMOVE") {
    return state.filter((grudge) => grudge.id !== action.payload.id);
  }
  if (action.type === "CLEAR") {
    return [];
  }
  return [];
}

export default function GrudgeList() {
  const [grudges, dispatch] = useReducer(grudgeReducer, []);
  const [inputValue, setInputValue] = useState("");

  console.log({ grudges });

  const title = grudges.length > 0 ? "Grudges" : "Add Some Grudges";

  function deleteGrudge(grudge) {
    dispatch({ type: "REMOVE", payload: grudge });
  }

  function clearGrudges() {
    dispatch({ type: "CLEAR" });
  }

  function addGrudge() {
    if (!inputValue) return;
    dispatch({ type: "ADD", payload: { text: inputValue, id: Math.random() } });
    setInputValue("");
  }

  return (
    <div style={{ margin: "20px" }}>
      <h3 test-data="grudge-title" style={{ margin: "20px 0px" }}>
        {title}
      </h3>
      <div>
        <TextField
          label="Add Grudge"
          variant="filled"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ backgroundColor: "white" }}
          test-data="grudge-field"
        />
      </div>
      <Button test-data="grudge-add-btn" onClick={addGrudge}>
        Add Grudge
      </Button>
      <ul
        test-data="grudge-list"
        style={{ color: "black", listStyleType: "none" }}
      >
        {grudges.length > 0 &&
          grudges.map((g) => {
            return (
              <li key={g.id}>
                <span>{g.text}</span>
                <Button onClick={() => deleteGrudge(g)}>X</Button>
              </li>
            );
          })}
      </ul>
      {grudges.length > 0 && (
        <Button test-data="grudge-clear" onClick={clearGrudges}>
          Clear
        </Button>
      )}
    </div>
  );
}
