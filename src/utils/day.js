// 引入dayjs  根据文档进行配置
// dayjs 默认的语言是英语
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
export default dayjs
