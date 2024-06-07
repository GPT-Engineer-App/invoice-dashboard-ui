import * as React from "react";
import { format, parse } from "date-fns";
import { Calendar } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import { Input } from "@/components/ui/input";

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDateChange = (date) => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
          placeholder="Select date"
          readOnly
          className="cursor-pointer"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={handleDateChange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;