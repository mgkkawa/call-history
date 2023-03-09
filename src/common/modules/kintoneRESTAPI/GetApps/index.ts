import { getKintoneRestAPIClient, getSpaceId } from 'common'

export const getApps = async () => {
  const client = await getKintoneRestAPIClient()
  const spaceId = (await getSpaceId()) as number
  const res = await client.app.getApps({ spaceIds: [spaceId] })
  console.log('getApps')
  console.log(res.apps)
  return res.apps
}
