import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ClockScreen from "./ClockScreen";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Footer } from "./Footer";

dayjs.extend(utc);
dayjs.extend(timezone);

function App() {
  const [datetime, setDatetime] = useState(dayjs());

  useEffect(() => {
    (async function getDatetimeFromApi() {
      const response = await fetch("https://worldtimeapi.org/api/ip");
      const data = await response.json();
      setDatetime(dayjs(data.datetime));
    })();

    const interval = setInterval(function updateTimeLocally() {
      setDatetime((datetime) => datetime.add(1, "seconds"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-screen h-screen grid grid-cols-3">
      <ClockScreen variant="light" dateTime={datetime.tz("Europe/London")} />
      <ClockScreen variant="dark" dateTime={datetime.tz("Europe/Moscow")} />
      <ClockScreen
        variant="colorful"
        dateTime={datetime.tz("Asia/Singapore")}
      />
      <Footer />
    </div>
  );
}

export default App;
