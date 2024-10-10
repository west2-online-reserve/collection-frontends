import service from '../utils/request'
export const getMessageSevrvice = (senderId: any,receiverId:any) => {
  return service.request({
    method: 'get',
    url: '/getMessage',
    params: { senderId, receiverId }
  })
}
