import { useState } from '#app'
import { computed } from 'vue'
import { translations } from '~/utils/locales'

export const useLocales = () => {
  const languages = [
    { label: 'English', value: 'en' },
    { label: 'አማርኛ (Amharic)', value: 'am' },
    { label: 'Français (French)', value: 'fr' },
    { label: 'Kiswahili (Swahili)', value: 'sw' },
    { label: 'العربية (Arabic)', value: 'ar' }
  ]
  const selectedLanguage = useState<string>('lang', () => 'en')
  
  // @ts-ignore
  const t = computed(() => translations[selectedLanguage.value] || translations['en'])

  return { languages, selectedLanguage, t }
}

