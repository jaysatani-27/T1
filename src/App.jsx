import { useState, useEffect } from 'react';
import TimeZoneList from "./Components/TimeZoneList";
import DateTimePicker from "./Components/DateTimePicker";
import moment from 'moment-timezone';
import Header from './Components/Header';
import { MdOutlineDarkMode } from "react-icons/md";

function App() {

  const [selectedTime, setSelectedTime] = useState(moment().toDate());                 

  let [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

  }, [darkMode])


  const handleTimeChange = (timeString) => {
    setSelectedTime(timeString);
  };



  return (
    <div className=" relative flex flex-col items-center min-h-screen bg-stone-500	 p-4 dark:bg-slate-900">

      <Header />

      <button className=' absolute top-4 right-4 p-2 rounded-full bg-gray-900 dark:bg-gray-200 dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-300  text-xl  dark: text-white '
        onClick={() => {
          setDarkMode(!darkMode);
        }}>
        <MdOutlineDarkMode />
      </button>

      <div className='w-full max-w-screen p-4'>
        <DateTimePicker onDateTimeChange={handleTimeChange} />
        <TimeZoneList selectedTime={selectedTime} />
      </div>

    </div>
  );
}

export default App;