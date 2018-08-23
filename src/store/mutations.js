import types from './types'

export default{
  [types.UPDATEAPPSTATE](state,arg){
    state.appConfig+=1
  },
  [types.SETUSERINFO](state,info){
    state.userInfo = info
  }
}

