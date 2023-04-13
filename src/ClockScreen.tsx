import cx from "classnames";
import { Dayjs } from "dayjs";
import Clock from "./Clock";

export interface ClockProps {
  variant: "light" | "dark" | "colorful";
  dateTime: Dayjs;
}

const ClockScreen: React.FC<ClockProps> = ({ variant, dateTime }) => {
  return (
    <div
      className={cx(
        "flex flex-col justify-evenly items-center",
        {
          light: "bg-zinc-100",
          dark: "bg-zinc-800",
          colorful: "bg-indigo-700",
        }[variant]
      )}
    >
      <div
        className={cx(
          "flex flex-col items-center gap-4 font-thin text-8xl",
          {
            light: "text-zinc-800",
            dark: "text-zinc-50",
            colorful: "text-zinc-50",
          }[variant]
        )}
      >
        {dateTime.format("HH:mm")}
      </div>

      <Clock variant={variant} dateTime={dateTime} />

      <div
        className={cx(
          "flex flex-col items-center gap-4 mb-16",
          {
            light: "text-zinc-800",
            dark: "text-zinc-50",
            colorful: "text-zinc-50",
          }[variant]
        )}
      >
        <span className="text-2xl font-bold">
          {
            {
              light: "London",
              dark: "Moscow",
              colorful: "Bali",
            }[variant]
          }
        </span>

        <span className={"font-thin text-4xl"}>{`${dateTime.format(
          "D MMMM"
        )}, ${dateTime.format("dddd")}`}</span>
      </div>
    </div>
  );
};

export default ClockScreen;
