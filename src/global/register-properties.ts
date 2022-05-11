import { App } from 'vue'
import { formatUTCString } from '@/utils/date-format'

export default function registerProperties(app: App) {
    app.config.globalProperties.$filters = {
        formatTime(value: string) {
            return formatUTCString(value)
        }
    }
}
