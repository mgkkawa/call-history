export type ConfigProps = {
  historyAppId?: number | string
  isSettings?: boolean
}

const DEFAULT_KEY: ['appId', 'date', 'unique', 'setFields'] = ['appId', 'date', 'unique', 'setFields']

const DEFAULT_CONFIG = {
  appId: '',
  date: {
    this: '',
    to: '',
  },
  unique: {
    this: '',
    to: '',
  },
  setFields: [{ this: '', to: '' }],
}

export function getConfig(pluginId: string): Plugin.Config {
  const config = kintone.plugin.app.getConfig(pluginId)

  DEFAULT_KEY.forEach(key => {
    if (key in config) return

    config[key] = DEFAULT_CONFIG[key]
  })

  return config
}
