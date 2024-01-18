import { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "moment-timezone";


const DateTimePicker = (prop) => {

    const onDateTimeChange = prop.onDateTimeChange;

    const [startDate, setStartDate] = useState(moment().toDate());

    const handleChange = (date) => {
        setStartDate(date);
        localStorage.setItem("selectedDate", date);
        onDateTimeChange(date);
    };

    const userTimeZone = moment.tz.guess();
    const userTimeZoneOffset = moment.tz(userTimeZone).format("Z (z)");


    return (
        <div className="flex flex-col space-y-2">
            <p className="text-lg font-semibold dark:text-green-600">
                Your current time zone: {userTimeZone} {userTimeZoneOffset}
            </p>
            <label className="text-lg font-semibold text-slate-200">
                Select Date and Time :{" "}
            </label>
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                dateFormat="MM/dd/yyyy    h:mm aa"
                showTimeInput={true}
                timeInputLabel="Time:"
                className="form-input block max-w-xs w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                wrapperClassName="flex flex-col space-y-2"
            />
        </div>
    );
};



export default DateTimePicker;