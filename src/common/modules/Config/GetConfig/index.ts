export type ConfigProps = {
  historyAppId?: number | string
  editMode?: boolean
  editCheckField?: string
  editCheckValue?: string
}
export function getConfig(pluginId: string): PluginConfig {
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
