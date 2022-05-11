import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

// 格式化utc时间字符串
export function formatUTCString(
    utcString: string,
    format: string = DATE_TIME_FORMAT
) {
    return dayjs.utc(utcString).utcOffset(8).format(format)
}

/*// 格式化timestamp字符串
export function formatTimestamp(
  timestamp: string,
  format: string = DATE_TIME_FORMAT
) {
  console.log(timestamp, format)
  return '' // todo
}*/
