export type ConfigProps = {
  historyAppId?: number | string
  isSettings?: boolean
}
export const getConfig = (pluginId: string) => {
  const config = kintone.plugin.app.getConfig(pluginId)

  for (let key in config) {
    if (!config[key]) {
      continue
    }
    try {
      config[key] = JSON.parse(config[key])
    } catch {
      continue
    }
  }

  return config
}
