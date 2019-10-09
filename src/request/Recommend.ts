import instance from './Http'
import Recommend from './types/Recommend'

export const GET_RECOMMEND = async () => {
  const result = instance.get('getRecommend')
  return (result as unknown) as Recommend
}
