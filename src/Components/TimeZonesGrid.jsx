import { FaDeleteLeft } from "react-icons/fa6";
import moment from "moment-timezone";

const  TimeZonesGrid = (prop) => {

    const timeZoneList=prop.timeZoneList;
    const onDeleteTimeZone=prop.onDeleteTimeZone;

    const getTimeZoneOffset = (timeZone, format) => {
        return moment.tz(timeZone).format(format);
    };


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

            {timeZoneList.map(({ timeZone, time, date }, index) => (
                <div
                    key={index}
                    className="relative flex flex-col justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 h-full"
                >
                    <div>
                        <div className="text-lg font-semibold text-blue-600">{time}</div>
                        <div className="text-sm text-gray-500">{date}</div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-medium text-gray-800 break-words">
                            {timeZone} {getTimeZoneOffset(timeZone, "Z")}
                        </span>
                        <button
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-2"
                            onClick={() => onDeleteTimeZone(timeZone)}
                        >
                            <FaDeleteLeft />
                        </button>
                    </div>
                </div>
            ))}
            
        </div>
    );
};


export default TimeZonesGrid;