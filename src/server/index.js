import $http from '../config/http'

export const login  = ({code},cb) => $http('/api/school/weixin_login',{code}).$login(cb)

export const getSchool = ({ latitude, longitude,searchName},cb) => $http('/api/school/location',{latitude,longitude,searchName}).$post(cb)

export const getActivity  = ({currentPage=1,pageSize=20,search={ type:1 } },cb)=>$http('/api/school/activity_page',{currentPage,pageSize,search}).$post(cb)

export const cosSign = ({method,path},cb)=>$http('http://158zfy.oicp.net:49335/api/school/cos_sign',{method,path}).$post(cb)


