import React, { useEffect, useRef, useState } from "react";
import styles from "./ClockView.module.scss";
import { motion } from "framer-motion";
import { basicFadeZoomAnimation } from "@/lib/animations";
import { useAppStore } from "@/store/useAppStore";

export const ClockView = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00"
  });
  const [date, setDate] = useState("XXX 00 XXX");
  const [action, setAction] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { setIsClockViewOpen } = useAppStore();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeParts = now.toLocaleString("es").split(" ")[1].split(":");

      const hours =
        timeParts[0].length === 1 ? `0${timeParts[0]}` : timeParts[0];
      const minutes = timeParts[1];
      const seconds = timeParts[2];

      setTime({ hours, minutes, seconds });

      const day = now.toLocaleString("es", { weekday: "short" }).substr(0, 3);
      const dayNumber =
        now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
      const month = now.toLocaleString("es", { month: "short" }).substr(0, 3);

      setDate(`${day} ${dayNumber} ${month}`);
    };

    const isWithinRange = (startTime: string, endTime: string) => {
      const [startHour, startMinutes] = startTime.split(":").map(Number);
      const [endHour, endMinutes] = endTime.split(":").map(Number);

      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      const start = startHour * 60 + startMinutes;
      const end = endHour * 60 + endMinutes;
      const current = currentHour * 60 + currentMinutes;

      return current >= start && current <= end;
    };

    const setLightMode = (isLight: boolean) => {
      if (isLight) {
        wrapperRef.current?.style.setProperty("--bg", "var(--white)");
        wrapperRef.current?.style.setProperty("--fg", "var(--black)");
      } else {
        wrapperRef.current?.style.setProperty("--bg", "var(--black)");
        wrapperRef.current?.style.setProperty("--fg", "var(--white)");
      }
    };

    const updateLabel = () => {
      if (isWithinRange("00:00", "09:00")) {
        setAction("Descanso");
        setLightMode(false);
      } else if (isWithinRange("09:00", "10:00")) {
        setAction("Ducha, desayuno y sol 🌞");
        setLightMode(true);
      } else if (isWithinRange("10:00", "12:30")) {
        setAction("Trabajo activo 💻");
        setLightMode(false);
      } else if (isWithinRange("12:30", "14:00")) {
        setAction("Hora de almorzar 🍔");
        setLightMode(true);
      } else if (isWithinRange("14:00", "18:00")) {
        setAction("Trabajo activo 💻");
        setLightMode(false);
      } else if (isWithinRange("18:00", "23:59")) {
        setAction("Descanso");
        setLightMode(true);
      }
    };

    const tick = () => {
      updateClock();
      updateLabel();
    };

    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      {...basicFadeZoomAnimation({ duration: 0.5 })}
      className={styles.wrapper}
      ref={wrapperRef}
    >
      <button
        onClick={() => setIsClockViewOpen(false)}
        className={styles.close}
      >
        X
      </button>

      <time className={styles.time}>
        <span className={styles.hours}>{time.hours}</span>:
        <span className={styles.minutes}>{time.minutes}</span>:
        <span className={styles.seconds}>{time.seconds}</span>
      </time>
      <span className={styles.date}>{date}</span>
      <p className={styles.action}>{action}</p>
    </motion.div>
  );
};
