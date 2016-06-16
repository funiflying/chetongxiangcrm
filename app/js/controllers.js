/**
 * Created by Administrator on 2016/2/18.
 */
angular.module('chetongxiang.controllers',[]).controller('LoginController',['$rootScope','$scope','$cookieStore','ResourceService','AuthService','CookieService',function($rootScope,$scope,$cookieStore,ResourceService,AuthService,CookieService){
   //本地用户名
    $scope.account={
        account:$cookieStore.get('NAME')||null
    };
    //记住用户名
    $scope.remember=true;
    $scope.login=function(dialog){
        if($scope.loginForm.$valid){
            ResourceService.getFunServer('oalogin',$scope.account,'post').then(function(data){
                if(data.status){
                    AuthService.Login(data.data);
                    $rootScope.USER=data.data;
                    $rootScope.state.go('admin.welcome');
                    //记住用户名
                    if($scope.remember){
                        CookieService.SetCookie('NAME',$scope.account.account)
                    }
                    else{
                        CookieService.RemoveCookie('NAME');
                    }
                }
                else{
                   layer.msg(data.message||"登录失败");
                }

            })
        }
    };
    //退出
    $scope.loginOff=function(){
        ResourceService.getFunServer('loginout',{}).then(function(data){
            AuthService.LoginOut();
            if(data.status==1){
                AuthService.LoginOut();
            }

        });
    };
    //回车提交
    $scope.submitKey=function(e,dialog){
        var keyCode=window.event? e.keyCode: e.which;
        if(keyCode==13){
           $scope.login();
        }
    }
}]).controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout',
    function($rootScope, $scope, $state, $http, $timeout){
        // Check item and children active state
        var isActive = function(item) {

            if(!item) return;

            if( !item.sref || item.sref == '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function(value, key) {
                    if(isActive(value)) foundActive = true;
                });
                return foundActive;
            }
            else
                return $state.is(item.sref) || $state.includes(item.sref);
        };
        //sidebar allow access
        var isAccess=function(items) {
            if(!items) return;
            var list=[];
            angular.forEach(items, function(value, key) {
                if( value.access&&value.access.indexOf("-1")>-1) {
                    list.push(value);
                }
                if( value.access&&value.access.indexOf($rootScope.USER&&$rootScope.USER.IdentityTag)>-1) {
                    list.push(value)
                }
                else{
                    return null;
                }
            });
            return list;
        };

        // Load menu from json file
        // -----------------------------------

        $scope.getMenuItemPropClasses = function(item) {
            return (item.heading ? 'nav-heading' : '') +
                (isActive(item) ? ' active' : '') ;
        };

        $scope.loadSidebarMenu = function() {

            var menuJson = 'data/sidebar-menu.json',
                menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
            $http.get(menuURL)
                .success(function(items) {
                    $scope.menuItems = isAccess(items);
                })
                .error(function(data, status, headers, config) {
                    alert('Failure loading menu');
                });
        };

        $scope.loadSidebarMenu();


    }]).controller('EffectController',['$scope','$rootScope','$compile','ResourceService','CarService',"$http",function($scope,$rootScope,$compile,ResourceService,CarService,$http){
    //筛选条件
    $scope.filter={
        PageNo:$scope.currentPage,
        BrandID: null,
        CountryID: null,
        CarFlag: null,
        OnlineFlag:null,
        CityID:null,
        StyleID:null,
        CarCount_Start:null,
        CarCount_End:null,
        Price_Start:null,
        Price_End:null
    };
    $scope.searchlist=function(){
        if(isNaN($scope.filter.CarCount_Start)||isNaN($scope.filter.CarCount_End)||$scope.filter.CarCount_Start<1){
            $scope.filter.CarCount_Start=null;
            $scope.filter.CarCount_End=null;
        }
        if($scope.filter.CarCount_Start&&$scope.filter.CarCount_End<$scope.filter.CarCount_Start){
            $scope.filter.CarCount_End=$scope.filter.CarCount_Start;
        }
        if(isNaN($scope.filter.Price_Start)||isNaN($scope.filter.Price_End)||$scope.filter.Price_Start<0){
            $scope.filter.Price_Start=null;
            $scope.filter.Price_End=null;
        }
        if($scope.filter.Price_Start&&$scope.filter.Price_End&&parseFloat($scope.filter.Price_End)<parseFloat($scope.filter.Price_Start)){
            $scope.filter.Price_End=$scope.filter.Price_Start;
        }
        $scope.getList();
    };
    $scope.clearsearch=function(){
        $scope.filter={
            PageNo:$scope.currentPage,
            BrandID: null,
            CountryID: null,
            CarFlag: null,
            OnlineFlag:null,
            CityID:null,
            StyleID:null,
            CarCount_Start:null,
            CarCount_End:null,
            Price_Start:null,
            Price_End:null
        };
        $scope.unit_province=null;
        $scope.getList();
    };
    //提车地信息
    $scope.getunit=function(){
        ResourceService.getFunServer("unitall",{}).then(function(data){
             if(data.data){
                 $scope.unitlist=data.data;
             }
        })
    };
    $scope.list=[];
    $scope.car={
        PriceAgioMax:0
    };
    $scope.getList=function(){
        ResourceService.getFunServer('carlist',$scope.filter).then(function(data){
            if(data.status==1){
                $scope.list=data.data;
                $scope.pageTotal=data.count;
            }
        })
    };
    //优惠价
    $scope.$watch("Price",function(newValue){
        if($scope.car.PriceMarket){
            $scope.car.PriceAgioMax=parseFloat($scope.car.PriceMarket-newValue).toFixed(2);
        }
    });
    $scope.$watch("car.PriceMarket",function(newValue){
          if(newValue>0){
              var agio=$(".agio");
              $.each(agio,function(index,obj){
                  var price=$(obj).parent().prev().find("input[type=text]").val();
                  if(price>0){
                      $(obj).text(parseFloat(newValue-price).toFixed(2))
                  }
              });
          }
    });
    //翻页
    $scope.changePager=function(){
        $scope.filter.PageNo=$scope.currentPage;
        $scope.getList();
    };
    //上架
    $scope.rack=function(_carno){
       layer.confirm('确认要上架吗？',function(index){
           if(index){
               ResourceService.getFunServer('rack',{CarNo:_carno}).then(function(data){
                   if(data.status==1){
                       layer.msg('已上架!',{icon:1,time:1000},function(){
                           $scope.getList();
                       });
                   }else{
                       data.message&&layer.msg('操作失败,'+data.message,{icon:5,time:1000})||layer.msg('操作失败!',{icon:5,time:1000});
                   }
               })
           }
       });
   };
    //下架
    $scope.soldout=function(_carno){
        layer.confirm('确认要下架吗？',function(index){
            if(index){
                ResourceService.getFunServer('soldout',{CarNo:_carno}).then(function(data){
                    if(data.status==1){
                        layer.msg('已下架!',{icon:1,time:1000},function(){
                            $scope.getList();
                        });

                    }else{
                        data.message&&layer.msg('操作失败,'+data.message,{icon:5,time:1000})||layer.msg('操作失败!',{icon:5,time:1000});
                    }
                })
            }
        });
    };
    //删除
    $scope.deletecar=function(obj){

        if(obj.OnlineFlag==1){
            layer.msg('请先下架车辆',{icon:8,time:1000});
            return false;
        }
        layer.confirm('确认要删除吗？',function(index){
            if(index){
                ResourceService.getFunServer('detetecar',{CarNo:obj.CarNo}).then(function(data){
                    if(data.status==1){
                        layer.msg('已删除!',{icon:1,time:1000},function(){
                            $scope.getList();
                        });
                    }else{
                        layer.msg('操作失败',{icon:5,time:1000});
                    }
                })
            }
        });
    };
    $scope.deletebar=function(){
        layer.confirm('确认要删除吗？',function(index){
            if(index){
                ResourceService.getFunServer('detetecar',{CarNo:$rootScope.stateParams.CarNo}).then(function(data){
                    if(data.status==1){
                        layer.msg('已删除!',{icon:1,time:1000},function(){
                            $rootScope.state.go("admin.car");
                        });
                    }else{
                        layer.msg('操作失败',{icon:5,time:1000});
                    }
                })
            }
        });
    };
    //搜索
    $scope.searchFilter=function(item){
        if($scope.search){
            return item.FullName&&item.FullName.indexOf($scope.search)>-1;
        }
        else{
            return item;
        }
    };

    //获取车辆信息
    $scope.getCar=function(){
        var params={
            CarNo:$rootScope.stateParams.CarNo
        };
        ResourceService.getFunServer("car",params).then(function(data){
                $scope.car=data;
                $scope.Price=$scope.car.Price;
                $scope.getunit();
                setTemp($scope.car);
        });
    };

}]).controller('UnitController',['$scope','$rootScope','$compile','ResourceService','CarService',function($scope,$rootScope,$compile,ResourceService,CarService){
    //筛选条件
    $scope.filter={
        PageNo:$scope.currentPage||1,
        Province:null,
        City:null
    };
    $scope.unit={};
    //城市信息
    $scope.province=province;
    $scope.city=[];
    $scope.changeProvince=function(){
        if($scope.Province){
            $scope.city=$scope.Province.city;
            $scope.City=null;
        }
    };
    $scope.getList=function(){
        ResourceService.getFunServer('unitlist',$scope.filter).then(function(data){
            if(data.status==1){
                $scope.list=data.data;
                var dirtree = $('#treeview-direct').treeview({
                    data: $scope.list,
                    levels: 2,
                    expandIcon: 'Hui-iconfont Hui-iconfont-add2',
                    collapseIcon: 'Hui-iconfont Hui-iconfont-shenhe-tingyong',
                    emptyIcon:"Hui-iconfont Hui-iconfont-edit",
                    onNodeSelected: function(event, node) {

                        console.log(node)
                    }
                });
                var dirt = $('#direct').treeview({
                    data: $scope.list,
                    levels: 2,
                    expandIcon: 'Hui-iconfont Hui-iconfont-add2',
                    collapseIcon: 'Hui-iconfont Hui-iconfont-shenhe-tingyong',
                    showCheckbox:true,
                    onNodeSelected: function(event, node) {
                        console.log(node)
                    }
                });
            }
        })
    };
    //翻页
    $scope.changePager=function(){
        $scope.filter.PageNo=$scope.currentPage;
        $scope.getList();
    };
    //搜索
    $scope.searchFilter=function(item){
        if($scope.search){
            return item.UnionUnit.indexOf($scope.search)>-1||item.UnionBoss.indexOf($scope.search)>-1;
        }
        else{
            return item;
        }
    };
    //提交
    $scope.saveunit=function(){
        if($scope.unitForm.$valid&&$scope.Province&&$scope.City){
            $scope.unit.Province=$scope.Province&&$scope.Province.name;
            $scope.unit.City=$scope.City&&$scope.City.name;
            $scope.unit.CityID=$scope.City&&$scope.City.id;
            ResourceService.getFunServer("saveunit",$scope.unit).then(function(data){
                if(data.status==1){
                    layer.msg('编辑成功',{icon:1,time:1000},function(){
                        $rootScope.state.go('admin.unit');
                    });
                }else{
                    layer.msg(data.message||"提交失败",{icon:5,time:1000});
                }
            });
        }else{
            layer.msg('您的信息还未填写完整，无法保存',{icon:0,time:2000});
    }
    };
    //提车地详情
    $scope.getUnit=function(){
        var params={
            UnitCode:$rootScope.stateParams.ucode
        };
        ResourceService.getFunServer("getunit",params).then(function(data){
            if(data){
                $scope.unit=data;
                angular.forEach( $scope.province,function(obj,index){
                    if($scope.unit.Province==obj.name){
                        $scope.Province=obj;
                        $scope.City={
                            id:$scope.unit.CityID,
                            name:$scope.unit.City
                        };
                        $scope.city=obj.city
                    }
                });
                angular.forEach( $scope.city,function(obj,index){
                    if($scope.unit.CityID==obj.id){
                        $scope.City=obj;
                    }
                });
                setMap($scope.unit);
            }
        })
    };
   //删除
   $scope.deleteunit=function(){
       layer.confirm('确认要删除吗？',function(index){
           if(index){
               ResourceService.getFunServer('detetecar',{CarNo:$rootScope.stateParams.CarNo}).then(function(data){
                   if(data.status==1){
                       layer.msg('已删除!',{icon:1,time:1000},function(){
                           $rootScope.state.go("admin.car");
                       });
                   }else{
                       layer.msg('操作失败',{icon:5,time:1000});
                   }
               })
           }
       });
   };
    //保存编辑
    $scope.edit=function(){
        if($scope.unitForm.$valid&&$scope.Province&&$scope.City){
            $scope.unit.Province=$scope.Province&&$scope.Province.name;
            $scope.unit.City=$scope.City&&$scope.City.name;
            $scope.unit.CityID=$scope.City&&$scope.City.id;
            ResourceService.getFunServer("editunit",$scope.unit).then(function(data){
                if(data.status==1){
                    layer.msg('编辑成功',{icon:1,time:1000},function(){
                        $rootScope.state.go('admin.unit');
                    });
                }else{
                    layer.msg(data.message||"提交失败",{icon:5,time:1000});
                }
            });
        }else{
            layer.msg('您的信息还未填写完整，无法保存',{icon:0,time:2000});
        }
    }
}]).controller('AppoinController',['$scope','$rootScope','$compile','ResourceService','CarService',function($scope,$rootScope,$compile,ResourceService,CarService){
    //筛选条件
    $scope.currentPage=1;
    $scope.filter={
        PageNo:$scope.currentPage
    };
    $scope.appoin={};
    $scope.getList=function(status){
        $scope.filter.OrderFlag=status;
        ResourceService.getFunServer('appoinlist',$scope.filter).then(function(data){
            if(data.status==1){
                $scope.list=data.data;
                $scope.pageTotal=data.all_count;
                $scope.status_0=data.status0_count;
                $scope.status_1=data.status1_count;
                $scope.status_2=data.status2_count;
            }
        })
    };
    //搜索
    $scope.searchFilter=function(item){
        if($scope.search){
            return item.ContactName.indexOf($scope.search)>-1||item.ContactPhone.indexOf($scope.search)>-1;
        }
        else{
            return item;
        }
    };
    //翻页
    $scope.changePager=function(){
        $scope.filter.PageNo=$scope.currentPage;
        $scope.getList();
    };
    //删除
    $scope.deleteappion=function(_code){
        layer.confirm('确认要删除吗？',function(index){
            if(index){
                ResourceService.getFunServer('appoindelete',{OrderCode:_code}).then(function(data){
                    if(data.status==1){
                        layer.msg('已删除!',{icon:1,time:1000},function(){
                            $scope.getList();
                        });
                    }else{
                        layer.msg('操作失败!',{icon:5,time:1000});
                    }
                })
            }
        });
    };
    //处理
    $scope.update=function(obj){
      var tpl=' <form class="form form-horizontal" >' +
          '<div class="row cl">'+
          '<label class="form-label col-3"><span class="c-red">*</span>状态：</label>'+
          '<div class="formControls col-8">'+
        '<a href="javascript:void(0)" class="order-flag active" data-value="0">未处理</a>'+
        '<a href="javascript:void(0)" class="order-flag" data-value="1">已预约</a>'+
        '<a href="javascript:void(0)" class="order-flag" data-value="2">已取消</a>'+
        '</div>'+
        '</div>' +
          '<div class="row cl">'+
          '<label class="form-label col-3"><span class="c-red">*</span>备注：</label>'+
          '<div class="formControls col-8">'+
          '<textarea class="textarea" id="Readme" value="'+obj.Readme+'"></textarea>'+
          '</div>'+
          '</div>' +
          '</form><div class="order-toolbar"><button class="btn btn-default" onclick="layer.closeAll()">取消</button><button class="btn btn-primary" id="saveOrderFlag">保存</button></div>';
        layer.open({
            title:"预约处理",
            type:1,
            skin: 'layui-layer-rim',
            content:tpl,
            area: ['400px', '250px']//宽高
        });
        $(".order-flag").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active")
        });
        $("#saveOrderFlag").on("click",function(){
            var params={
                OrderCode:obj.OrderCode,
                OrderFlag:$(".order-flag.active").data("value"),
                Readme:$("#Readme").val()
            };
            if(!params.Readme){
                layer.msg("请填写备注信息");
                return false;
            }
            ResourceService.getFunServer("appoinupdate",params).then(function(data){
                if(data.status==1){
                    layer.msg('处理成功',{icon:1,time:1000},function(){
                        layer.closeAll();
                        $scope.getList();
                    });
                }else{
                    layer.msg("提交失败",{icon:5,time:1000});
                }
            })
        });

        var flag=parseInt(obj.OrderFlag) ;
        switch (flag){
            case 0:
                $(".order-flag").eq(0).addClass("active").siblings().removeClass("active");
                break;
            case 1:
                $(".order-flag").eq(1).addClass("active").siblings().removeClass("active");
                break;
            case 2:
                $(".order-flag").eq(2).addClass("active").siblings().removeClass("active");
                break;
        }
        if(obj.Readme){
            $("#Readme").val(obj.Readme);
        }


    }
}]).controller("UserController",["$rootScope","$scope",function(){

}]);