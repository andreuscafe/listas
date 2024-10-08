import ms from "ms";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export const dispatchEvent = (
  eventName: "newtask" | "removedtask" | "completetask" | "updatetask",
  detail: any
) => {
  setTimeout(() => {
    if (process.env.NODE_ENV === "development") {
      console.info("dispatching event", eventName, detail);
    }
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }, 0);
};
