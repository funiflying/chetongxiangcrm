/**
 * Created by Administrator on 2016/2/18.
 */
angular.module('chetongxiang.services',[]).factory('ResourceService', ['$resource', '$rootScope','$q', function($resource, $rootScope,$q) {
    return {
        getFunServer: function(sname,params,method) {
            var surl = "",defer = $q.defer();
            switch (sname) {
                case 'oalogin'://登录
                    surl='/account/DirectLogin';
                    break;
                case 'loginout'://登出
                    surl='/api_account/logout';
                    break;
                case 'carlist'://车辆列表
                    surl='/api_car/SearchCar';
                    break;
                case 'car'://车辆信息
                    surl='/api_car/GetCarInfo';
                    break;
                case 'rack'://车辆上架
                    surl='/api_car/SetOnline';
                    break;
                case 'soldout'://车辆下架
                    surl='/api_car/SetOffline';
                    break;
                case 'detetecar'://车辆删除
                    surl='/api_car/DeleteCar';
                    break;
                case 'save'://车辆新增
                    surl='/api_car/PostCar';
                    break;
                case 'takecity'://城市列表
                    surl='./data/city.json';
                    break;
                case 'unitlist'://提车地列表
                    surl='/oa/Direct/getDirectStuct';
                    break;
                case 'unitall'://所有提车地
                    surl='/api_putcar/GetAllUnitList';
                    break;
                case 'deleteunit'://提车删除
                    surl='/api_putcar/DeleteUnitInfo';
                    break;
                case 'saveunit'://提车地保存
                    surl='/api_putcar/AddUnitInfo';
                    break;
                case 'getunit'://提车地详情
                    surl='/api_putcar/GetUnitInfo';
                    break;
                case 'editunit'://提车地编辑
                    surl='/api_putcar/UpdateUnitInfo';
                    break;
                case 'appoinlist'://订单列表
                    surl='/api_order/SearchOrder';
                    break;
                case 'appoinupdate'://订单删除
                    surl='/api_order/UpdateOrder';
                    break;
                case 'appoindelete'://订单处理
                    surl='/api_order/DeleteOrder';
                    break;
                default:
                    break;
            }
            if (surl == "") return '';
            $resource($rootScope.app.root + surl, {}, {
                query: {
                    method: method||'get',
                    params: params||'{}',
                    isArray: false
                }
            }).query(function(data, headers) {
                defer.resolve(data);
            }, function(data, headers) {
                defer.reject(data);
            });
            return defer.promise;
        }
    }
}]).factory('LocalStorageService',function(){
    return {
        setStorage:function(name,val){
            localStorage.setItem(name,JSON.stringify(val))
        },
        getStorage:function(name){
            return JSON.parse(localStorage.getItem(name));
        },
        removeStorage:function(name){
            localStorage.removeItem(name)
        }
    }
}).factory('UploaderService',['$http','$rootScope',function($http,$rootScope){
    return {
        uploader:function(data,flag){
            flag=parseInt(flag);
            switch (flag){
                case 1:
                    return $http.post('/common/file/UpLoadImgByBase64ForCar',data);
                    break;
                case 2:
                    return $http.post('/common/file/UpLoadImgByBase64ForUser',data);
                    break;
                case 3:
                    return $http.post('/common/file/UpLoadImgByBase64ForAppraiserSign',data);
                    break;
                case 4:
                    return $http.post('/common/file/UpLoadImgByBase64ForCertificateImg',data);
                    break;
                default:
            }
            return $http.post($rootScope.HOST+'/common/file/UpLoadImgByBase64',data)
        }
    }
}]).factory('AuthService',['$http','$rootScope','$cookieStore','ResourceService','CookieService',function($http,$rootScope,$cookieStore,ResourceService,CookieService){
    return {
        Login:function(data){
            CookieService.SetCookie('IMPORTAUTH',data);
        },
        IsAuthenticated:function(){
         return !!CookieService.GetCookie('IMPORTAUTH');
        },
        LoginOut:function(){
            CookieService.RemoveCookie('IMPORTAUTH');
            window.location.href="/";
        }
    }
}]).factory('CookieService',['$rootScope',function($rootScope){
    return {
        //自定义设置COOKIE
        SetCookie: function(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(JSON.stringify(value)) + ";expires=" + exp.toGMTString();
        },
        //自定义获取COOKIE
        GetCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            arr = document.cookie.match(reg);
            if (arr){
                return JSON.parse( unescape(arr[2]));
            }else{
                return null;
            }
        },
        RemoveCookie: function(name) {

            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=a; expires=" + date.toGMTString();
        },
        SetCityCookie:function(value){
            this.SetCookie('CITY',value);
        }

    }
}]).factory('CarService',['$http','$rootScope','$cookieStore','ResourceService','CookieService',function($http,$rootScope,$cookieStore,ResourceService,CookieService){
    return {
        Save:function(params){
            return $http.post("/api_car/PostCar",params);
        },
        Car:function(params){
            return $http.post("/api_car/GetCarInfo",params);
        }
    }
}]);