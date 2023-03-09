export function setConfig(config: Plugin.Config) {
  const newConfig = { ...config }
  for (let key in config) {
    try {
      newConfig[key] = JSON.stringify(config[key])
    } catch {
      continue
    }
  }
  kintone.plugin.app.setConfig(newConfig)
}
