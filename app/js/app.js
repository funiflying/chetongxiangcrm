angular.module('chetongxiang',['ui.bootstrap','ui.router','ngResource','ngCookies','chetongxiang.controllers','chetongxiang.services','chetongxiang.directives','chetongxiang.filters'])
    .config(['$stateProvider','$urlRouterProvider','$httpProvider',function($stateProvider,$urlRouterProvider,$httpProvider){

    $urlRouterProvider.otherwise('login');
    //access访问权限,0未不限制，1为需登录
    $stateProvider.state('login',{
        //登录
        url:'/login',
        templateUrl:'login.html',
        controller:'LoginController',
        access:0
    }).state('admin',{
        url:'/admin',
        templateUrl:'admin.html',
        access:1
    }).state('admin.welcome',{
        url:'/welcome',
        templateUrl:'./webview/welcome.html',
        title:"欢迎",
        access:1
    }).state('admin.effect',{
        url:'/effect',
        templateUrl:'./webview/effect.html',
        title:'考核管理',
        controller:'EffectController',
        access:1
    }).state('admin.effect.all',{
        url:'/all',
        templateUrl:'./webview/all.html',
        title:'考核管理',
        controller:'EffectController',
        access:1
    }).state('admin.effect.province',{
        url:'/province',
        templateUrl:'./webview/province.html',
        title:'考核管理',
        controller:'EffectController',
        access:1
    }).state('admin.effect.city',{
        url:'/city',
        templateUrl:'./webview/city.html',
        title:'考核管理',
        controller:'EffectController',
        access:1
    }).state('admin.effect.person',{
        url:'/person',
        templateUrl:'./webview/person.html',
        title:'考核管理',
        controller:'EffectController',
        access:1
    }).state('admin.unit',{
        url:'/unit',
        templateUrl:'./webview/unit.html',
        title:'组织结构',
        controller:'UnitController',
        access:0
    }).state('admin.user',{
        url:'/user',
        templateUrl:'./webview/user.html',
        title:'用户管理',
        controller:'UserController',
        access:1
    }).state('admin.user-add',{
        url:'/user-add',
        templateUrl:'./webview/user-add.html',
        title:'新增用户',
        controller:'UserController',
        access:1
    });
     $httpProvider.interceptors.push('myInterceptor');
}]).constant('PAGE_CONFIG',{
        PageSize:20,
        PageTotal:0,
        PageNo:1
    }).run(['$rootScope','$modal','$timeout','$stateParams','$state','$cookieStore','PAGE_CONFIG','AuthService','CookieService','$compile','ResourceService',function($rootScope,$modal,$timeout,$stateParams,$state,$cookieStore,PAGE_CONFIG,AuthService,CookieService,$compile,ResourceService){
        $rootScope.app = {
            name: '车同享汽车交易平台管理系统',
            description: '',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                asideHover: false,
                theme: 'skin/default/skin.css'
            },
            dev:true,
            root:'http://oa.chetongxiang.net',
            PAGE_CONF:PAGE_CONFIG

        };
    $rootScope.USER=CookieService.GetCookie('IMPORTAUTH')||null;
    $rootScope.PAGE_CONF=PAGE_CONFIG;
    $rootScope.state=$state;
    $rootScope.stateParams=$stateParams;

        //路由控制
    $rootScope.$on("$stateChangeStart", function(event) {
        window.scrollTo(0,0)
    });
    $rootScope.$on('$stateChangeSuccess', function(event) {
        if(!$rootScope.app.dev&&$state.current.access==1&&!AuthService.IsAuthenticated()){
            var tpl=' <form class="form form-horizontal" >' +
                '<div class="row cl">'+
                '<label class="form-label col-3"><span class="c-red">*</span>用户名：</label>'+
                '<div class="formControls col-8">'+
                '<input type="text" class="input-text" id="account"/>'+
                '</div>'+
                '</div>' +
                '<div class="row cl">'+
                '<label class="form-label col-3"><span class="c-red">*</span>密码：</label>'+
                '<div class="formControls col-8">'+
                '<input type="password" class="input-text" id="pwd"/>'+
                '</div>'+
                '</div>' +
                '</form><div class="order-toolbar" style="margin-top: 20px"><button class="btn btn-default" onclick="layer.closeAll()">取消</button><button class="btn btn-primary" id="login">登录</button></div>';
            layer.open({
                title:"登录",
                type:1,
                skin: 'layui-layer-rim',
                content:tpl,
                area: ['350px', '220px']//宽高
            });
            $("#login").on("click",function(){
                var params={
                    account:$("#account").val(),
                    pwd:$("#pwd").val()
                };
                if(!params.account||!params.pwd){
                    layer.msg("请输入用户名或密码");
                    return false;
                }
                ResourceService.getFunServer('oalogin',params,'post').then(function(data){
                    if(data.status){
                        AuthService.Login(data.data);
                        $rootScope.USER=data.data;
                        layer.closeAll();
                    }
                    else{
                        layer.msg(data.message||"登录失败");
                    }
                })
            });




        }
        if ($state.current.action) {
            $rootScope.ACTION=$state.current.action
        }else{
            $rootScope.ACTION = "home"
        }
    });
    $rootScope.$on('$stateNotFound', function(event){
        $rootScope.state.go('404')
    });
}]).factory("myInterceptor",['$q', '$rootScope','CookieService', function($q,$rootScope,CookieService) {
        //http 拦截
        var requestInterceptor = {
            request: function(config) {
                layer.load(2);
                return config;
            },
            requestError:function(config){
                return config
            },
            response:function(response){
                layer.closeAll('loading');
                if(response.data.status==-1){
                    CookieService.RemoveCookie('IMPORTAUTH');
                }
                return response
            },
            responseError:function(response){
                layer.closeAll('loading');
                console.log(response);
                return response
            }
        };
        return requestInterceptor;
    }]);