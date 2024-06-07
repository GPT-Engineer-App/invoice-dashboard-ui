import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export function DatePicker({ selected, onSelect }) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
    />
  );
}