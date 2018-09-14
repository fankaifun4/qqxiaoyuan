import $http from '../config/http'

//登录
export const login  = ({code},cb) => $http('/api/school/weixin_login',{code}).$login(cb)

//获取学习位置
export const getSchool = ({ latitude, longitude,searchName},cb) => $http('/api/school/location',{latitude,longitude,searchName}).$post(cb,true)

//获取投票活动列表
export const getActivity  = ({currentPage=1,pageSize=20,search={ type:1 } },cb)=>$http('/api/vote/activity_page',{currentPage,pageSize,search}).$post(cb)

//获取图片上传许可
export const cosSign = ({method,path},cb)=>$http('/api/school/cos_sign',{method,path}).$post(cb,true)

//创建活动
export const publisDetail = (info,cb)=>$http("/api/school/activity_create",{...info}).$post(cb,true)

//创建投票活动
export const activityCreate = (formdata,cb)=>$http('/api/vote/activity_create',formdata).$post(cb,true)

//获取投票活动详情
export const activityDetail = (id,cb)=>$http('/api/vote/activity_detail',{id}).$post(cb,true)

//投票活动 投票
export const activityVote =(id,cb)=>$http('/api/vote/activity_vote',{id}).$post(cb,true)

//投票活动 开始
export const activityStart = (id,cb)=>$http('/api/vote/activity_start',{id}).$post(cb,true)

//投票活动 暂停
export const activityStop = (id,cb)=>$http('/api/vote/activity_stop',{id}).$post(cb,true)
