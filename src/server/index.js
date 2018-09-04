import $http from '../config/http'

export const login  = ({code},cb) => $http('/api/school/weixin_login',{code}).$login(cb)

export const getSchool = ({ latitude, longitude,searchName},cb) => $http('/api/school/location',{latitude,longitude,searchName}).$post(cb)

export const getActivity  = ({currentPage=1,pageSize=20,search={ type:1 } },cb)=>$http('/api/school/activity_page',{currentPage,pageSize,search}).$post(cb)

export const cosSign = ({method,path},cb)=>$http('/api/school/cos_sign',{method,path}).$post(cb)

export const publisDetail = (info,cb)=>$http("/api/school/activity_create",{...info}).$post(cb)

export const activityCreate = (formdata,cb)=>$http('/api/vote/activity_create',formdata).$post(cb)
