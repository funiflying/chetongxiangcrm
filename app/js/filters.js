angular.module('chetongxiang.filters', []).filter('UserRole', function() {
    //车辆状态
    return function(status) {
        status = status + "";
        var descr = "";
        switch (status) {
            case "0":
                descr = "售车专员";
                break;
            case "1":
                descr = "售车主管";
                break;
            case "9":
                descr = "管理员";
                break;
            default:
                descr = "售车专员";
                break;

        }
        return descr;
    }
}).filter('CarStatus', function() {
        //车辆状态
        return function(status) {
            status = status + "";
            var descr = "";
            switch (status) {
                case "0":
                    descr = "未知";
                    break;
                case "1":
                    descr = "现车";
                    break;
                case "2":
                    descr = "报关中";
                    break;
                case "3":
                    descr = "已到港";
                    break;
                case "4":
                    descr = "期货";
                    break;
                default:
                    descr = "未知：" + status;
                    break;

            }
            return descr;
        }
    }).filter('OrderFlag', function() {
    //车辆状态
    return function(status) {
        status = status + "";
        var descr = "";
        switch (status) {
            case "0":
                descr = "未处理";
                break;
            case "1":
                descr = "已预约";
                break;
            case "2":
                descr = "已取消";
                break;
            default:
                descr = "未知：" + status;
                break;

        }
        return descr;
    }
}).filter('DateFormat',function(){
        //格式化时间日期
        return function (date,format){
            if(date){
                date=date.replace(/-/gi,'/');
                var d=new Date(date);
                return d.Format(format);
            }
            return "未知"
        }
    }).filter('ClipPhone', function () {
       //格式化电话号码
        return function (phone) {
            if (phone) {
                return phone.substr(0, 3) + '****' + phone.substr(7, phone.length);
            }
        }

    }).filter('Role', function() {
        //用户角色
        return function(status) {
            var flag = "";
            status = status + "";
            switch (status) {
                case "0":
                    flag = "售车专员";
                    break;
                case "1":
                    flag = "售车主管";
                    break;
                case "9":
                    flag = "系统管理员";
                    break;
                default:
                    flag = "";
                    break;
            }
            return flag;
        }
    }).filter('LargeIcon',function(){
        //大图
        return function(src){
            var strdata;
            var ret;
            if (src == undefined || src == null) {
                return '';
            } else {
                var pos = src.lastIndexOf(".");
                var iurl = src.substring(0,pos);
                var lastname = src.substring(pos,src.length);
                ret = iurl+"_Big"+lastname;
                return ret;
            }
        }
    }).filter('Color',function(){
        //车辆颜色
        return function(status) {
            var flag = "";
            status=status+"";
            switch (status) {
                case "0":
                    flag = "未知";
                    break;
                case "1":
                    flag = "黑色";
                    break;
                case "2":
                    flag = "白色";
                    break;
                case "3":
                    flag = "银灰色";
                    break;
                case "4":
                    flag = "深灰色";
                    break;
                case "5":
                    flag = "红色";
                    break;
                case "6":
                    flag = "橙色";
                    break;
                case "7":
                    flag = "多彩色";
                    break;
                case "8":
                    flag = "绿色";
                    break;
                case "9":
                    flag = "蓝色";
                    break;
                case "10":
                    flag = "咖啡色";
                    break;
                case "11":
                    flag = "紫色";
                    break;
                case "12":
                    flag = "香槟色";
                    break;
                case "13":
                    flag = "黄色";
                    break;
                case "14":
                    flag = "其它";
                    break;
                default:
                    break;
                    flag = "未知";
            }
            return flag;
        }

    }).filter('Country', function() {
        //车辆国别
        return function(status) {
            var flag = "";
            status=status+"";
            switch (status) {
                case "0":
                    flag = "未知";
                    break;
                case "1":
                    flag = "德国";
                    break;
                case "2":
                    flag = "日本";
                    break;
                case "3":
                    flag = "美国";
                    break;
                case "4":
                    flag = "法国";
                    break;
                case "5":
                    flag = "韩国";
                    break;
                case "6":
                    flag = "国产";
                    break;
                case "7":
                    flag = "其他";
                    break;
                default:
                    break;
                    flag = "未知";
            }
            return flag;
        }
    }).filter('Style', function() {
        //车类型
        return function(status) {
            var flag = "";
            if (status > "8") {
                return '未知';
            }
            switch (parseInt(status)) {
                case 0:
                    flag = "未知";
                    break;
                case 1:
                    flag = "轿车";
                    break;
                case 2:
                    flag = "SUV";
                    break;
                case 3:
                    flag = "MPV";
                    break;
                case 4:
                    flag = "跑车";
                    break;
                case 5:
                    flag = "其他";
                    break;
                default:
                    break;
                    flag = "其他";
            }
            return flag;
        }
    }).filter('CarOffer',['$filter','$sce',function($filter,$sce){
        //格式化提车城市
        return function(data){
            if(!data){
                return false;
            }
            if(!data.CarOffers||data.CarOffers.length==0){
                var tpl='<span>'+
                    '<span> ￥'+data.Price+'</span>万'+
                    '<span>(全国统一报价)</span>'+
                    '</span>';
            }
            else if(data.CarOffers&&data.CarOffers.length==1){
                 tpl='<span>'+
                    '<span> ￥'+data.CarOffers[0].Price+'</span>万'+
                    '<span>('+data.CarOffers[0].City+')</span>'+
                    '</span>';
            }else if(data.CarOffers&&data.CarOffers.length>1){
                tpl='<span class="offer-container" style="position: relative;cursor: pointer"><span>'+
                    '<span> ￥'+data.CarOffers[0].Price+'</span>万'+
                    '<span>('+data.CarOffers[0].City+')>></span>'+
                    '</span>';
                 tpl+= '<span class="car-moreoffer">';
                for(var i=1;i<data.CarOffers.length;i++){
                    tpl+=
                        '<p>' +
                        '<span>' +
                        '<span> ￥'+data.CarOffers[i].Price+'</span>万'+
                        '<span>('+data.CarOffers[i].City+')</span>'+
                        '</span>'+
                        '</span></p>';
                }
                tpl+='</span></span>';

            }
            return $sce.trustAsHtml(tpl);
        }
    }]).filter('CarStatusFormat',['$filter','$sce',function($filter,$sce){
    //格式化车辆状态
    return function(data){
        if(!data){
            return false;
        }
        var tpl='<span class="label label-success radius"></span>';
        data=data.toString();
       var text=$filter('CarStatus')(data);
        switch (data){
            case "1":
                tpl='<span class="label label-primary radius">'+text+'</span>';
                break;
            case "2":
                tpl='<span class="label label-secondary radius">'+text+'</span>';
                break;
            case "3":
                tpl='<span class="label label-success radius">'+text+'</span>';
                break;
            case "4":
                tpl='<span class="label label-warning radius">'+text+'</span>';
                break;
            default:
                break;
        }
        return $sce.trustAsHtml(tpl);
    }
}]).filter('OrderFlagFormat',['$filter','$sce',function($filter,$sce){
    //格式化车辆状态
    return function(data){
        if(data==undefined){
            return false;
        }
        var tpl='<span class="label label-success radius"></span>';
        data=data.toString();
        var text=$filter('OrderFlag')(data);
        switch (data){
            case "0":
                tpl='<span class="label label-primary radius">'+text+'</span>';
                break;
            case "1":
                tpl='<span class="label label-success radius">'+text+'</span>';
                break;
            case "2":
                tpl='<span class="label label-warning radius">'+text+'</span>';
                break;
            default:
                break;
        }
        return $sce.trustAsHtml(tpl);
    }
}]).filter('BrandName',[function(){
    //品牌
    return function(data){
        if(data==undefined){
            return false;
        }
        data=data.toString();
        switch (data){
            case "17":
                descr="奔驰";
                break;
            case "150":
                descr="沃尔沃";
                break;
            case "103":
                descr="路虎";
                break;
            case "45":
                descr="丰田";
                break;
            case "5":
                descr="奥迪";
                break;
            case "48":
                descr="福特";
                break;
            case "70":
                descr="JEEP";
                break;
            case "8":
                descr="宝马";
                break;
            case "108":
                descr="玛莎拉蒂";
                break;
            case "100":
                descr="铃木";
                break;
            case "10":
                descr="保时捷";
                break;
            case "126":
                descr="日产";
                break;
            case "34":
                descr="大众";
                break;
            case "19":
                descr="本田";
                break;
            case "155":
                descr="现代";
                break;
            case "156":
                descr="雪佛兰";
                break;
            case "106":
                descr="MINI";
                break;
            default:
                break;
        }
        return descr;
    }
}])
