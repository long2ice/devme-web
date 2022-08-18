import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function formatTime(time: string) {
  return dayjs(time).fromNow();
}

export { formatTime };
