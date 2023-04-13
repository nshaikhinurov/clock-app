import { useEffect, useState, useRef } from "react";
import { ClockProps } from "./ClockScreen";
import cx from "classnames";

const Clock: React.FC<ClockProps> = ({ variant, dateTime }) => {
  const [rotations, setRotations] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const transitionHelpers = useRef({
    hour: 0,
    minute: 0,
    second: 0,
  });

  useEffect(() => {
    const hour = dateTime.hour();
    const minute = dateTime.minute();
    const second = dateTime.second();

    if (second === 0) {
      transitionHelpers.current = {
        ...transitionHelpers.current,
        second: transitionHelpers.current.second + 1,
      };

      if (minute === 0) {
        transitionHelpers.current = {
          ...transitionHelpers.current,
          minute: transitionHelpers.current.minute + 1,
        };

        if (hour === 0) {
          transitionHelpers.current = {
            ...transitionHelpers.current,
            hour: transitionHelpers.current.hour + 1,
          };
        }
      }
    }

    const hrRotation =
      180 +
      (360 / 12) * (hour + transitionHelpers.current.hour * 12 + minute / 60);

    const minRotation =
      180 +
      (360 / 60) *
        (minute + transitionHelpers.current.minute * 60 + second / 60);

    const secRotation =
      180 + (360 / 60) * (second + transitionHelpers.current.second * 60);

    setRotations({
      hour: hrRotation,
      minute: minRotation,
      second: secRotation,
    });
  }, [dateTime]);

  return (
    <div
      className={cx(
        "flex justify-center items-center w-80 h-80 rounded-full drop-shadow-2xl shadow-zinc-950 ",
        {
          light: "bg-zinc-50",
          dark: "bg-indigo-700",
          colorful: "bg-zinc-50",
        }[variant]
      )}
    >
      {new Array(60).fill(0).map((_, i) => {
        const angle = (360 / 60) * i;

        return (
          <div
            key={i}
            className={cx(
              "absolute w-full h-full flex justify-center items-start",
              {
                light: "text-indigo-700",
                dark: "text-zinc-50",
                colorful: "text-indigo-700",
              }[variant]
            )}
            style={{
              transform: `rotate(${angle}deg)`,
            }}
          >
            {i % 5 === 0 ? (
              <div className="font-semibold leading-8">{i}</div>
            ) : (
              <div className="flex items-center justify-center w-8 h-8">
                <div
                  className={cx(
                    "w-[1px] h-2",
                    {
                      light: "bg-indigo-700",
                      dark: "bg-zinc-50",
                      colorful: "bg-indigo-700",
                    }[variant]
                  )}
                ></div>
              </div>
            )}
          </div>
        );
      })}

      <div
        className={cx(
          " w-64 h-64 relative rounded-full flex justify-center items-center",
          {
            light: "bg-zinc-800",
            dark: "bg-zinc-100",
            colorful: "bg-zinc-100",
          }[variant]
        )}
      >
        {new Array(12).fill(0).map((_, i) => {
          const angle = (360 / 12) * i;

          return (
            <div
              key={i}
              className={cx(
                "absolute w-full h-full flex justify-center items-start font-thin text-4xl p-2",
                {
                  light: "text-zinc-50",
                  dark: "text-zinc-500",
                  colorful: "text-zinc-500",
                }[variant]
              )}
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div>{i || 12}</div>
            </div>
          );
        })}
        <div
          id="hour-pin"
          className={cx(
            "absolute rounded-full w-7 h-7",
            {
              light: "bg-zinc-50",
              dark: "bg-zinc-800",
              colorful: "bg-zinc-800",
            }[variant]
          )}
        ></div>

        <div
          id="hour"
          className={cx(
            "origin-top h-16 w-2 absolute rotate-45 transition-transform",
            {
              light: "bg-zinc-50",
              dark: "bg-zinc-800",
              colorful: "bg-zinc-800",
            }[variant]
          )}
          style={{
            transform: `translateY(2rem) rotate(${rotations.hour}deg)`,
          }}
        ></div>

        <div
          id="minute"
          className={cx(
            "origin-top h-20 w-1 absolute rotate-6 transition-transform",
            {
              light: "bg-zinc-50",
              dark: "bg-zinc-800",
              colorful: "bg-zinc-800",
            }[variant]
          )}
          style={{
            transform: `translateY(2.5rem) rotate(${rotations.minute}deg)`,
          }}
        ></div>

        <div
          id="second"
          className="origin-top h-32 w-1 bg-indigo-700 absolute rotate-3 transition-transform"
          style={{
            transform: `translateY(4rem) rotate(${rotations.second}deg)`,
          }}
        ></div>
        <div
          id="second-pin"
          className={cx(
            "absolute rounded-full border-4 border-indigo-700 w-4 h-4",
            {
              light: "bg-zinc-800",
              dark: "bg-zinc-50",
              colorful: "bg-zinc-50",
            }[variant]
          )}
        ></div>
      </div>
    </div>
  );
};

export default Clock;
