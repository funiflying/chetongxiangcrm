define(["jquery","bootstrap","slider","/lib/layer/1.9.3/layer.js","cityJson"],function($,bootstrap,Slider,layer,cityJson){

    this.init=function(){
        $('.carousel').carousel();
        var my_slider = $(".slider").slider({
            min: 5,
            max: 180,
            step: 5,
            tooltip: 'always',
            tooltip_split: true,
            natural_arrow_keys: true,
            formatter: function (value) {
                if (value > 180) {
                    return "180万以上"
                }
                return value + " 万"
            }
        });
        my_slider.on("slideStop", function (value) {
            var href=$("#BaseUrl").val();
            var price=my_slider.slider("getValue");
            if(!price||price.length==0||price[0]==undefined||price[1]==undefined){
                return;
            }
            if(href.indexOf("?")>-1){
                    href=href+"&PriceStart="+price[0]+"&PriceEnd="+price[1];
            }else{
                href=href+"?PriceStart="+price[0]+"&PriceEnd="+price[1];
            }
            window.location.href=href
        });
        $(".che-banner-trademark").on("mouseover",".more",function(){
            $(".che-brand-all").show();
        });
        $(".che-brand-all").on("mouseleave",function(){
            $(this).hide();
        });
        $(".che-item-gallery").on("click", ".carousel-inner li", function () {
            var src = $(this).find("img").attr("src");
            if (src) {
                src = src.substring(0, src.indexOf(".")) + "_Big" + src.substring(src.indexOf("."));
            }
            $(".che-item-cover img").attr("src", src);
        });
        $(".in").on("mouseover",function(){
            var title=$(this).data('title');
            if(title){
                layer.tips(title, this, {
                    tips: [2, '#78BA32']
                });
            }
        });
        $(".out").on("mouseover",function(){
            var title=$(this).data('title');
            if(title){
                layer.tips(title, this, {
                    tips: [4, '#78BA32']
                });
            }
        });
        $(".che-item-info").on("click",".che-unit:not(.active)",function(){
            var price=$(this).data("price");
            $(".attract").text(price);
            $("#agio").text(parseFloat($("#market").text()-price).toFixed(2));
            $(this).addClass("active").siblings().removeClass("active");
        });
        $(".che-appoin").on("click",function(){
            $(".che-subscribe-pc-mask").show();
            $(".che-subscribe-pc").show();
        });
        $(".che-subscribe-close").on("click",function(){
            $(".che-subscribe-pc-mask").hide();
            $(".che-subscribe-pc").hide();
        });
        $(".subclose").on("click",function(){
            $(".che-subscribe-pc-mask").hide();
            $(".che-subscribe-pc").hide();
            $("#subscribe").show();
        });
        var flag=document.createDocumentFragment();
        $.each(province,function(index,obj){
            var opt=document.createElement("option");
            var text=document.createTextNode(obj.name);
            opt.setAttribute("value",obj.id);
            opt.appendChild(text);
            flag.appendChild(opt);
        });
        $(".select[name=province]").append(flag).on("change",function(){
            var id=$(this).val();
            var cflag=document.createDocumentFragment();
            $.each(province, function (index,obj) {
                if(obj.id==id){
                    var city=obj.city;
                    $.each(city,function(index,o){
                        var opt=document.createElement("option");
                        var text=document.createTextNode(o.name);
                        opt.setAttribute("value",o.id);
                        opt.appendChild(text);
                        cflag.appendChild(opt);
                    });
                }
            });
            $(".select[name=city]").html(cflag)



        })
        $(".che-poin-submit").on("click",function(){

            var name=$("input[name=ContactName]").val();
            var phone=$("input[name=ContactPhone]").val();
            var city=$(".select[name=city]").find("option:selected").text();
            var province=$(".select[name=province]").find("option:selected").text();
            if(!name||!phone||!city||!province){
                    layer.msg("请填写完整信息");
                    return false ;
                /*if(params.UnitCode==undefined||params.UnitCode==null){
                 layer.msg("请选择提车地");
                 return false ;
                 }*/
            }
            if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
                layer.msg("请填写完整的电话号码");
                return false;
            }

            var params={
               CarNo:$("#CarNo").val(),
               ContactName:name,
               ContactPhone:phone,
               UnitCode:$(".che-unit.active").data("uid"),
               Province:province,
               City:city
           };

            $("#subscribe").hide();
           var i=3;
            var timer=function(){
                if(i==0){
                    $(".che-subscribe-pc-mask").hide();
                    $(".che-subscribe-pc").hide();
                    $("#subscribe").show();
                    i=3;
                }
                else{
                    $("#time").text(i+"秒");
                    i--;
                    setTimeout(timer,1000);
                }
            };
            $.ajax({
                url:"/api_order/AddOrder",
                type:"post",
                async:false,
                data:params,
                dataType:"json",
                beforeSend:function(XMLHttpRequest){
                    layer.load(0, {shade: false});
                },
                complete:function(XMLHttpRequest,textStatus){
                    layer.closeAll();
                },
                success:function(data,textStatus){
                   if(data.status==1){
                       $("#subscribe").hide();
                       timer();
                   }else{
                       layer.msg("提交失败");
                   }
                },
                error:function(error){
                    layer.msg("出错了");
                    console.log(error)
                }

            })

        });
        $(window).on("scroll",function(e){
            var scrollTop=$(window).scrollTop();
            var toolbar=$("#toolbar").offset().top;
            if(scrollTop>toolbar){
                $(".cont-tips-outer").addClass("navbar-fixed");
                $(".apt-btn").show();
            }
            else{
                $(".cont-tips-outer").removeClass("navbar-fixed");
                $(".apt-btn").hide();
            }
        });
        $("#navbar-fixed").scrollspy().on('activate.bs.scrollspy', function (e) {
            console.log(e)
        });
        $(".mc-select").on("mouseover",function(){
            $(this).find(".mc-improt").show();
        }).on("mouseleave",function(){
            $(this).find(".mc-improt").hide();
        }).on("mouseover",".mc-improt li",function(){
            $(this).find("ol").show();
        }).on("mouseleave",".mc-improt li",function(){
            $(this).find("ol").hide();
        }).on("click",".mc-improt ol li",function(){
            $(".mc-select").find(".mcs-box em").text($(this).find("a").text()).find(".mc-improt").hide();
            var price=$(this).data("price");
            $(".attract").text(price);
            $("#agio").text(parseFloat($("#market").text()-price).toFixed(2));
            var _province=$(this).parents("li").find(".province-btn span").text();
            var _city=$(this).find("a").text();
            $(".select[name=province]").find("option:selected").text(_province);
            var id=$(this).val();
            var cflag=document.createDocumentFragment();
            $.each(province, function (index,obj) {
                if(obj.name==_province){
                    var city=obj.city;
                    $.each(city,function(index,o){
                        var opt=document.createElement("option");
                        var text=document.createTextNode(o.name);
                        opt.setAttribute("value",o.id);
                        opt.appendChild(text);
                        cflag.appendChild(opt);
                    });
                }
            });
            $(".select[name=city]").html(cflag).find("option:selected").text(_city);
        })
    };
    return this
});
