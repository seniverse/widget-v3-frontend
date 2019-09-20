export const supportedLanguages = ['zh-chs', 'zh-cht', 'zh-cn', 'zh-tw', 'en']
export const defaultLanguage = 'zh-chs'

export function getBrowserLanguage() {
  const detected = navigator.language.toLowerCase()
  return supportedLanguages.indexOf(detected) > -1 ? detected : defaultLanguage
}
