import types from "./types";

export default{
  updateAppState:({commit},arg)=>{
    commit(types.UPDATEAPPSTATE,arg)
  },
  setUserInfo:({commit},info)=>{
    commit(types.SETUSERINFO,info)
  }
}
