import ms from "ms";

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  if (!timestamp) return "never";
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? "" : " ago"
  }`;
};

export const dispatchEvent = (
  eventName: "newtask" | "removedtask",
  detail: any
) => {
  setTimeout(() => {
    console.info("dispatching event", eventName, detail);
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }, 0);
};
