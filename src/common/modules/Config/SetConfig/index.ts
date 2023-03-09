export function setConfig(config: PluginConfig) {
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
