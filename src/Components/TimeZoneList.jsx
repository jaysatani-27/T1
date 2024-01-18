import { useState, useEffect } from "react";
import moment from "moment-timezone";
import Select from "react-select";
import TimeZonesGrid from "./TimeZonesGrid";
import { MdOutlineSwapVert } from "react-icons/md";


const TimeZoneList = (prop) => {

    const selectedTime = prop.selectedTime;

    localStorage.removeItem("selectedTimeZones");

    const [selectedTimeZones, setSelectedTimeZones] = useState([]);
    const [reverseOrder, setReverseOrder] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);
    console.log(selectedTimeZones);

    const timeZones = moment.tz.names();


    const getTimeInSelectedTimeZones = () => {
        const sortedTimeZones = reverseOrder ? [...selectedTimeZones].reverse() : selectedTimeZones;
        return sortedTimeZones.map((timeZone) => {
            const timeInTimeZone = moment(selectedTime).tz(timeZone);
            return {
                timeZone,
                time: timeInTimeZone.format("h:mm A z"),
                date: timeInTimeZone.format("MMM D, YYYY"),
            };
        });
    };

    const handleTimeZoneSelect = (option) => {
        if (option) {
            const newTimeZone = option.value;
            if (!selectedTimeZones.includes(newTimeZone)) {
                const updatedTimeZones = [...selectedTimeZones, newTimeZone];
                setSelectedTimeZones(updatedTimeZones);
                localStorage.setItem("selectedTimeZones", JSON.stringify(updatedTimeZones));
            }
        }
    };

    useEffect(() => {
        const savedSelectedTimeZones = localStorage.getItem("selectedTimeZones");
        if (savedSelectedTimeZones) {
            setSelectedTimeZones(JSON.parse(savedSelectedTimeZones));
        }
        localStorage.removeItem("selectedTimeZones");
        setIsFirstRender(false);
    }, []);

    // useEffect(() => {

    //   }, []);

    const handleTimeZoneDelete = (timeZoneToDelete) => {
        if (window.confirm(`Are you sure you want to delete the ${timeZoneToDelete} time zone?`)) {
            const filteredTimeZones = selectedTimeZones.filter((timeZone) => timeZone !== timeZoneToDelete);
            setSelectedTimeZones(filteredTimeZones);
            localStorage.setItem("selectedTimeZones", JSON.stringify(filteredTimeZones));
        }
    };

    const toggleOrder = () => {
        setReverseOrder(!reverseOrder);
    };

    const options = timeZones.map((tz) => ({
        value: tz,
        label: tz,
    }));


    return (
        <div>
            <div className="w-full max-w-xs mt-6 space-y-1 mb-5 mt-3">
                <label className="text-lg font-semibold text-slate-200">
                    Select Place :{" "}
                </label>
                <Select
                    options={options}
                    onChange={handleTimeZoneSelect}
                    placeholder="Search for a Timezone"
                    className="text-base"
                    classNamePrefix="react-select"
                />
            </div>

            <hr />

            <button className="text-white" onClick={toggleOrder}>
                <MdOutlineSwapVert className=" size-8 hover:bg-slate-500 rounded-sm ml-3 mt-1" />
            </button>

            <hr />
            {selectedTimeZones.length > 0 && !isFirstRender && (
                <TimeZonesGrid
                    timeZoneList={getTimeInSelectedTimeZones()}
                    onDeleteTimeZone={handleTimeZoneDelete}
                />
            
                
            )}
        </div>
    );
};

export default TimeZoneList;