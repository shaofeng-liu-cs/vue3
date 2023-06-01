import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '@/locales'

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const locale = ref(i18n.global.locale.value)

    // 设置locale
    function setLocale(lang) {
      locale.value = lang
      i18n.global.locale.value = lang
    }
    console.log(i18n.global.locale.value)
    return { locale, setLocale }
  },
  {
    persist: true
  }
)
