import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function format_time(time: string) {
  return dayjs(time).fromNow();
}

export { format_time };
