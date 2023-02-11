import { Button } from "@mui/material";
import React from "react";
import "./PfButton.scss";

export default function PfButton(props) {
  return (
    <Button
      onClick={props.onClick}
      variant="contained"
      color="success"
      endIcon={props.endIcon}
      sx={{
        backgroundColor: "#20976C",
        color: "#fff",
        borderRadius: "50px",
        boxShadow: "none",
        textTransform: "capitalize",
        fontFamily: "Inter",
        padding: "10px 30px",
        "&:hover": {
          boxShadow: "none",
          backgroundColor: "#18835c",
        },
      }}
      type={props.buttonType}
    >
      {props.text}
    </Button>
  );
}
