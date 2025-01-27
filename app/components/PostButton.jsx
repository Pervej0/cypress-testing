"use client";

import { Button } from "@mui/material";

export default function PostButton() {
  function handleClick() {
    fetch("https://jsonplaceholder.typicode.com/todos", { method: "GET" })
      .then((res) => res.json((data) => console.log(data)))
      .catch(() => {
        console.log("An error occured");
      });
  }

  return (
    <Button test-data="post-grudges-btn" onClick={handleClick}>
      Post Data
    </Button>
  );
}
