/**
 * Created by Administrator on 2016/2/18.
 */
angular.module('chetongxiang.directives', []).directive('minTitle',['$rootScope','$state','$compile',function($rootScope,$state,$compile){
   return {
       restricet:'AE',
       replace:false,
       compile:function(element,attr){
           var _elemt=$(element);
           var _navlist=_elemt.find('dd ul');
           _elemt.on('click','dd a',function(){
               var _href=$(this).attr('href');
               var _titleName=$(this).html();
               var show_navLi=$("#min_title_list li");
               creatIframe(_href,_titleName)
           });
           function creatIframe(href,titleName){
               var show_nav=$('#min_title_list');
               show_nav.find('li').removeClass("active");
               var iframe_box=$('#iframe_box');
               if(!document.getElementById(href)){
                   show_nav.append($compile('<li class="active" id="'+href+'"><a href="'+href+'">'+titleName+'</a><i></i><em></em></li>')($rootScope));
               }
               else{
                   document.getElementById(href).setAttribute('class','active')
               }
               tabNavallwidth();
           }
       },
       link:function(scope,element,attr){

       }

   }

}]).directive('minNav',['$rootScope','$state','$compile',function($rootScope,$state,$compile){
    return {
        restricet:'AE',
        replace:false,
        compile:function(element,attr){
            var _elemt=$(element);
            _elemt.on('click','i',function(){
                var _href=$(this).parents('li').prev('li').find('a').attr('href');
                if(_href){
                    _href=__href.substr(_href.indexOf('/')+1).replace('/','.');
                    $state.go(_href);
                }
            });
        }
    }
}]).directive('goBack',['$rootScope','$state','$compile',function($rootScope,$state,$compile){
    return {
        restricet:'AE',
        replace:false,
        template:' <button  class="btn btn-default" type="button"><i class="Hui-iconfont Hui-iconfont-arrow1-left"></i> 返回</button>',
        compile:function(element,attr){
            element.on('click',function(){
                layer.confirm('数据未保存，确定返回吗？',function(index){
                    if(index){
                        window.history.go(-1);
                        layer.closeAll();
                    }
                });
            });
        }
    }
}]).directive('colorTip',['$rootScope','$state','$compile',function($rootScope,$state,$compile){
    return {
        restricet:'A',
        replace:false,
        link:function(scope,element,attr){
            var _elemt=$(element);
            _elemt.on('mouseover','.color-icon.out',function(){
                var title=$(this).attr('title');
                if(title){
                    layer.tips(title, this, {
                        tips: [4, '#78BA32']
                    });
                }

            });
            _elemt.on('mouseover','.color-icon.in',function(){
                var title=$(this).attr('title');
                if(title){
                    layer.tips(title, this, {
                        tips: [2, '#78BA32']
                    });
                }
            });
        }
    }
}]).directive('carOffer',['$rootScope','$compile',function($rootScope,$compile){
    return {
        restricet:'A',
        replace:false,
        link:function(scope,element,attr){
            var _elemt=$(element);
            _elemt.on('mouseover','.offer-container',function(){
               $(this).find('.car-moreoffer').show();
            });
            _elemt.on('mouseout','.offer-container',function(){
                $(this).find('.car-moreoffer').hide();
            });
        }
    }
}]).directive('colorMark',function(){
    return{
        restricet:"A",
        template:"",
        compile:function(element,attr){
            var panel=$('<div class="color-mark-container">'+
                '<span class="color-mark-item color-1" data-value="1"></span>'+
                '<span class="color-mark-item color-2" data-value="2"></span>'+
                '<span class="color-mark-item color-3" data-value="3"></span>'+
                '<span class="color-mark-item color-4" data-value="4"></span>'+
                '<span class="color-mark-item color-5" data-value="5"></span>'+
                '<span class="color-mark-item color-6" data-value="6"></span>'+
                '<span class="color-mark-item color-7" data-value="7"></span>'+
                '<span class="color-mark-item color-8" data-value="8"></span>'+
                '<span class="color-mark-item color-9" data-value="9"></span>'+
                '<span class="color-mark-item color-10" data-value="10"></span>'+
                '<span class="color-mark-item color-11" data-value="11"></span>'+
                '<span class="color-mark-item color-12" data-value="12"></span>'+
                '<span class="color-mark-item color-13" data-value="13"></span>'+
                '<span class="color-mark-item color-14" data-value="14"></span>'+
                '</div>');
            element.on('click',function(){
                $(element).parent('div').append(panel);
            });
            $(element).parent('div').on('click','span.color-mark-item',function(){
                $(this).addClass('active').siblings().removeClass('active');
                var color=$(this).data('value');
                $(element).removeClass().addClass('color-'+color);
                $(element).attr('data-color',color);
                $(this).parents('.color-mark-container').remove();

            })
        }
    }

}).directive('carStyle',function(){
    return{
        restricet:"A",
        compile:function(element,attr){
            element.on('click','.car-style',function(){
                $(this).addClass('active').siblings().removeClass('active');
            })
        }
    }
}).directive('carFlag',function(){
    return{
        restricet:"A",
        compile:function(element,attr){
            element.on("click","#FuturesTime",function(){
                laydate({
                    elem: "#FuturesTime"
                });
            });
            element.on('click','.car-flag',function(){
                $(this).addClass('active').siblings().removeClass('active');
                var flg=parseInt($(this).data('value'));
                if(flg==4){
                    $("#FuturesTime ").show();
                    laydate({
                        elem: "#FuturesTime"
                    });
                }else{
                    $("#FuturesTime ").hide();
                }

            })
        }
    }
}).directive('takeCity',['ResourceService',function(ResourceService){
    return{
        restricet:"A",
        templateUrl:"./template/takecity.html",
        link:function(scope,element,attr){
            element.on("change",".input-text",function(){
                if(scope.car.PriceMarket>0){
                    $(element).find(".agio").text(parseFloat(scope.car.PriceMarket-$(this).val()).toFixed(2));
                }

            })

        }
    }
}]).directive('addCity',['ResourceService','$compile',function(ResourceService,$compile){
    return{
        restricet:"A",
        templateUrl:"./template/addcity.html",
        link:function(scope,element,attr){
            element.on("change",".input-text",function(){
                if(scope.car.PriceMarket>0){
                    $(element).find(".agio").text(parseFloat(scope.car.PriceMarket-$(this).val()).toFixed(2));
                }
            });
            element.on("change","select[name=province]",function(){
                var unit=[];
                for(var i=0;i<scope.unitlist.length;i++){
                    if($(this).val()==scope.unitlist[i].Province){
                        unit=scope.unitlist[i].Citys;
                    }
                }
                var flag=document.createDocumentFragment();
                if(unit.length){
                    $.each(unit,function(index,obj){
                        var opt=document.createElement("option");
                        var text=document.createTextNode(obj.City);
                        opt.setAttribute("value",obj.UnitCode);
                        opt.appendChild(text);
                        flag.appendChild(opt);
                    });
                }
                else{
                    var opt=document.createElement("option");
                    var text=document.createTextNode("请选择城市");
                    opt.setAttribute("value","");
                    opt.appendChild(text);
                    flag.appendChild(opt);
                }
                $(this).parent(".select-box").next().find("select[name=city]").html(flag);
            })

        }
    }
}]).directive('edittakeCity',['ResourceService',function(ResourceService){
    return{
        restricet:"A",
        templateUrl:"",
        link:function(scope,element,attr){
            element.on("change","select[name=province]",function(){
                var unit=[];
                for(var i=0;i<scope.unitlist.length;i++){
                    if($(this).val()==scope.unitlist[i].Province){
                        unit=scope.unitlist[i].Citys;
                    }
                }
                var flag=document.createDocumentFragment();
                if(unit.length){
                    $.each(unit,function(index,obj){
                        var opt=document.createElement("option");
                        var text=document.createTextNode(obj.City);
                        opt.setAttribute("value",obj.UnitCode);
                        opt.appendChild(text);
                        flag.appendChild(opt);
                    });
                }
                else{
                    var opt=document.createElement("option");
                    var text=document.createTextNode("请选择城市");
                    opt.setAttribute("value","");
                    opt.appendChild(text);
                    flag.appendChild(opt);
                }
                $(this).parent(".select-box").next().find("select[name=city]").html(flag);
            })
            element.on("change",".input-text",function(){
                if(scope.car.PriceMarket>0){
                    $(element).find(".agio").text(parseFloat(scope.car.PriceMarket-$(this).val()).toFixed(2));
                }

            })
        }
    }
}]).directive("takecityAdd",['$compile',function($compile){
    return {
        restricet:"A",
        link:function(scope,element,attr){
            element.on('click',function(){
                 var tpl=$compile('<div class="take-content clearfix mt-10" add-city>')(scope);
                 $(".take-container").append(tpl)
            })
        }
    }
}]).directive("editor",['$compile',function($compile){
    return {
        restricet:"A",
        template:' <textarea name="" id="editor" cols="30" rows="20" ng-model="editorContent" style="height: 600px;"></textarea>',
        link:function(scope,element,attr,ctrl){
            var editor = new wangEditor('editor');
            editor.config.uploadImgUrl="/file/UpLoadEditorFile";
            editor.config.fontsizes = {
                1: '10px',
                2: '13px',
                3: '16px',
                4: '19px',
                5: '22px',
                6: '25px',
                7: '28px'
            };
            editor.config.menus=[
                'source',
                '|',
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                '|',
                'quote',
                'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                '|',
                'link',
                'unlink',
                'table',
                '|',
                'img',
                'video',
                'insertcode',
                '|',
                'undo',
                'redo'
            ];
            editor.onchange = function () {
                // 从 onchange 函数中更新数据
                scope.$apply(function () {
                    scope.editorContent= editor.$txt.html();
                });
            };
            editor.config.mapAk = 'W5agSgvrCQBTVGnoSnqR2fadBG8Ef86p';  // 此处换成自己申请的密钥
            wangEditor.config.printLog = false;
            editor.create();
            scope.editor=editor;
        }
    }
}]).directive('webUploader',['ResourceService',function(ResourceService){
    return{
        restrict: 'A',
        templateUrl:'template/gallery.html',
        link:function(scope,element,attr){

        },
        compile:function(element,attr) {
            var $wrap = $(element).find('.uploader'),

            // 图片容器
                $queue = $('<ul class="filelist"></ul>')
                    .appendTo($wrap.find('.queueList')),

            // 状态栏，包括进度和控制按钮
                $statusBar = $wrap.find('.statusBar'),

            // 文件总体选择信息。
                $info = $statusBar.find('.info'),

            // 上传按钮
                $upload = $wrap.find('.uploadBtn'),

            // 没选择文件之前的内容。
                $placeHolder = $wrap.find('.placeholder'),
                $progress = $statusBar.find('.progress').hide(),

            // 添加的文件数量
                fileCount = 0,

            // 添加的文件总大小
                fileSize = 0,

            // 优化retina, 在retina下这个值是2
                ratio = window.devicePixelRatio || 1,

            // 缩略图大小
                thumbnailWidth = 110 * ratio,
                thumbnailHeight = 110 * ratio,

            // 可能有pedding, ready, uploading, confirm, done.
                state = 'pedding',

            // 所有文件的进度信息，key为file id
                percentages = {},
            // 判断浏览器是否支持图片的base64
                isSupportBase64 = (function () {
                    var data = new Image();
                    var support = true;
                    data.onload = data.onerror = function () {
                        if (this.width != 1 || this.height != 1) {
                            support = false;
                        }
                    }
                    data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                    return support;
                })(),

            // 检测是否已经安装flash，检测flash的版本
                flashVersion = (function () {
                    var version;

                    try {
                        version = navigator.plugins['Shockwave Flash'];
                        version = version.description;
                    } catch (ex) {
                        try {
                            version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                                .GetVariable('$version');
                        } catch (ex2) {
                            version = '0.0';
                        }
                    }
                    version = version.match(/\d+/g);
                    return parseFloat(version[0] + '.' + version[1], 10);
                })(),

                supportTransition = (function () {
                    var s = document.createElement('p').style,
                        r = 'transition' in s ||
                            'WebkitTransition' in s ||
                            'MozTransition' in s ||
                            'msTransition' in s ||
                            'OTransition' in s;
                    s = null;
                    return r;
                })(),

            // WebUploader实例
                uploader;
            //拖拽
            $wrap.find(".filelist").dragsort({
                dragSelector: "img",
                dragEnd: function () {
                },
                dragBetween: false,
                placeHolderTemplate: "<li></li>"
            });
            if (!WebUploader.Uploader.support('flash') && WebUploader.browser.ie) {

                // flash 安装了但是版本过低。
                if (flashVersion) {
                    (function (container) {
                        window['expressinstallcallback'] = function (state) {
                            switch (state) {
                                case 'Download.Cancelled':
                                    alert('您取消了更新！')
                                    break;

                                case 'Download.Failed':
                                    alert('安装失败')
                                    break;

                                default:
                                    alert('安装已成功，请刷新！');
                                    break;
                            }
                            delete window['expressinstallcallback'];
                        };

                        var swf = './expressInstall.swf';
                        // insert flash object
                        var html = '<object type="application/' +
                            'x-shockwave-flash" data="' + swf + '" ';

                        if (WebUploader.browser.ie) {
                            html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
                        }

                        html += 'width="100%" height="100%" style="outline:0">' +
                            '<param name="movie" value="' + swf + '" />' +
                            '<param name="wmode" value="transparent" />' +
                            '<param name="allowscriptaccess" value="always" />' +
                            '</object>';

                        container.html(html);

                    })($wrap);

                    // 压根就没有安转。
                } else {
                    $wrap.html('<a href="http://www.adobe.com/go/getflashplayer" target="_blank" border="0"><img alt="get flash player" src="http://www.adobe.com/macromedia/style_guide/images/160x41_Get_Flash_Player.jpg" /></a>');
                }

                return;
            } else if (!WebUploader.Uploader.support()) {
                alert('Web Uploader 不支持您的浏览器！');
                return;
            }

            // 实例化
            uploader = WebUploader.create({
                pick: {
                    id: '.filePicker',
                    label: '',
                    style: 'up-pick'
                },
                formData: {
                    uid: 123
                },
                swf: 'lib/webuploader-0.1.5/Uploader.swf',
                chunked: false,
                chunkSize: 512 * 1024,
                server: '/file/UpLoadCarProcess',
                runtimeOrder: 'flash',
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                threads: 1,
                // 禁掉全局的拖拽功能。这样不会出现图片拖进页面的时候，把图片打开。
                disableGlobalDnd: true,
                fileNumLimit: 32,
                fileSizeLimit: 200 * 1024 * 1024,    // 200 M
                fileSingleSizeLimit: 10* 1024 * 1024    // 5 M
            });

            uploader.on('dialogOpen', function () {
                console.log('here');
            });

            uploader.on('uploadSuccess', function (file, response) {
                if (response.status == 1) {
                    $("#" + file.id).attr('data-path', response.data)
                }
            });

            // 添加“添加文件”的按钮，
            uploader.addButton({
                id: '.filePicker2',
                label: ''
            });

            uploader.on('ready', function () {
                window.uploader = uploader;
            });

            // 当有文件添加进来时执行，负责view的创建
            function addFile(file) {
                var $li = $('<li id="' + file.id + '" class="file-preview-frame">' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>' +
                        '<p class="progress"><span></span></p><p class="cover-btn">设为封面</p>' +
                        '</li>'),

                    $btns = $('<div class="file-panel">' +
                        '<span class="cancel"><i class="Hui-iconfont Hui-iconfont-del"></i></span></div>').appendTo($li),
                    $prgress = $li.find('p.progress span'),
                    $wrap = $li.find('p.imgWrap'),
                    $info = $('<p class="error"></p>'),
                    $cover=$('<p class="cover-btn">设为封面</p>'),
                    showError = function (code) {
                        switch (code) {
                            case 'exceed_size':
                                text = '文件大小超出';
                                break;

                            case 'interrupt':
                                text = '上传暂停';
                                break;

                            default:
                                text = '上传失败，请重试';
                                break;
                        }

                        $info.text(text).appendTo($li);
                    };

                if (file.getStatus() === 'invalid') {
                    showError(file.statusText);
                } else {
                    // @todo lazyload
                    $wrap.text('预览中');
                    uploader.makeThumb(file, function (error, src) {
                        var img;

                        if (error) {
                            $wrap.text('不能预览');
                            return;
                        }

                        if (isSupportBase64) {
                            img = $('<img src="' + src + '">');
                            $wrap.empty().append(img);
                        } else {
                            $.ajax('/common/file/UpLoadCarProcess', {
                                method: 'POST',
                                data: src,
                                dataType: 'json'
                            }).done(function (response) {
                                if (response.result) {
                                    img = $('<img src="' + response.result + '">');
                                    $wrap.empty().append(img);
                                } else {
                                    $wrap.text("预览出错");
                                }
                            });
                        }
                    }, thumbnailWidth, thumbnailHeight);

                    percentages[file.id] = [file.size, 0];
                    file.rotation = 0;
                }

                file.on('statuschange', function (cur, prev) {
                    if (prev === 'progress') {
                        $prgress.hide().width(0);
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid') {
                        showError(file.statusText);
                        percentages[file.id][1] = 1;
                    } else if (cur === 'interrupt') {
                        showError('interrupt');
                    } else if (cur === 'queued') {
                        percentages[file.id][1] = 0;
                    } else if (cur === 'progress') {
                        $info.remove();
                        $prgress.css('display', 'block');
                    } else if (cur === 'complete') {
                        $prgress.hide().width(0);
                        $li.append('<span class="success"><i class="Hui-iconfont Hui-iconfont-gouxuan"></i></span>');
                    }

                    $li.removeClass('state-' + prev).addClass('state-' + cur);
                });

                $li.on('mouseenter', function () {
                    $btns.stop().animate({height: 30});
                });

                $li.on('mouseleave', function () {
                    $btns.stop().animate({height: 0});
                });

                $btns.on('click', 'span.cancel', function () {

                    var index = $(this).index(),
                        deg;
                    console.log(index)
                    switch (index) {
                        case 0:
                            uploader.removeFile(file);
                            var le = $(element).find('li').length;
                            if (le == 0) {
                                $(element).find('.placeholder').show()
                            }
                            return;
                        case 1:
                            file.rotation += 90;
                            break;

                        case 2:
                            file.rotation -= 90;
                            break;
                    }

                    if (supportTransition) {
                        deg = 'rotate(' + file.rotation + 'deg)';
                        $wrap.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        });
                    } else {
                        $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                    }


                });
                $li.on('click','.cover-btn',function(){
                    $li.addClass("set-cover").attr("data-cover","1").siblings("li").removeClass("set-cover").removeAttr("data-cover").find(".cover-btn").text("设为封面");
                    $(this).text('封面图')
                });
                $li.appendTo($queue);
            }

            // 负责view的销毁
            function removeFile(file) {
                var $li = $('#' + file.id);

                var path = $li.attr('data-path');
                if (path) {
                    ResourceService.getFunServer('delimg', {fileName: path});
                }
                delete percentages[file.id];
                updateTotalProgress();
                $li.off().find('.file-panel').off().end().remove();
            }

            function updateTotalProgress() {
                var loaded = 0,
                    total = 0,
                    spans = $progress.children(),
                    percent;

                $.each(percentages, function (k, v) {
                    total += v[0];
                    loaded += v[0] * v[1];
                });

                percent = total ? loaded / total : 0;


                spans.eq(0).text(Math.round(percent * 100) + '%');
                spans.eq(1).css('width', Math.round(percent * 100) + '%');
                updateStatus();
            }

            function updateStatus() {
                var text = '', stats;

                if (state === 'ready') {
                    text = '选中' + fileCount + '张图片，共' +
                        WebUploader.formatSize(fileSize) + '。';
                } else if (state === 'confirm') {
                    stats = uploader.getStats();
                    if (stats.uploadFailNum) {
                        text = '已成功上传' + stats.successNum + '张，' +
                            stats.uploadFailNum + '张照片上传失败，<a class="retry" href="javascript:void(0)">重新上传</a>失败图片或<a class="ignore" href="javascript:void(0)">忽略</a>'
                    }

                } else {
                    stats = uploader.getStats();
                    text = '共' + fileCount + '张（' +
                        WebUploader.formatSize(fileSize) +
                        '），已上传' + stats.successNum + '张';

                    if (stats.uploadFailNum) {
                        text += '，失败' + stats.uploadFailNum + '张';
                    }
                }

                $info.html(text);
            }

            function setState(val) {
                var file, stats;

                if (val === state) {
                    return;
                }

                $upload.removeClass('state-' + state);
                $upload.addClass('state-' + val);
                state = val;

                switch (state) {
                    case 'pedding':
                        $placeHolder.removeClass('element-invisible');
                        // $queue.hide();
                        uploader.refresh();
                        break;

                    case 'ready':
                        $placeHolder.addClass('element-invisible');
                        $queue.show();
                        uploader.refresh();
                        break;

                    case 'uploading':
                        $progress.show();
                        $upload.text('暂停上传');
                        break;

                    case 'paused':
                        $progress.show();
                        $upload.text('继续上传');
                        break;

                    case 'confirm':
                        $progress.hide();
                        $upload.text('开始上传');
                        stats = uploader.getStats();
                        if (stats.successNum && !stats.uploadFailNum) {
                            setState('finish');
                            return;
                        }
                        break;
                    case 'finish':
                        stats = uploader.getStats();
                        if (stats.successNum) {
                            //alert('上传成功');
                        } else {
                            // 没有成功的图片，重设
                            state = 'done';
                            location.reload();
                        }
                        break;
                }

                updateStatus();
            }

            uploader.onUploadProgress = function (file, percentage) {
                var $li = $('#' + file.id),
                    $percent = $li.find('.progress span');
                $percent.css('width', percentage * 100 + '%');
                percentages[file.id][1] = percentage;
                updateTotalProgress();
            };

            uploader.onFileQueued = function (file) {
                fileCount++;
                fileSize += file.size;

                if (fileCount === 1) {
                    $placeHolder.addClass('element-invisible');
                    $statusBar.show();
                }

                addFile(file);
                setState('ready');
                updateTotalProgress();
            };

            uploader.onFileDequeued = function (file) {
                fileCount--;
                fileSize -= file.size;

                if (!fileCount) {
                    setState('pedding');
                }

                removeFile(file);
                updateTotalProgress();

            };

            uploader.on('all', function (type) {
                var stats;
                switch (type) {
                    case 'uploadFinished':
                        setState('confirm');
                        break;

                    case 'startUpload':
                        setState('uploading');
                        break;

                    case 'stopUpload':
                        setState('paused');
                        break;

                }
            });

            uploader.onError = function (code) {
                alert('Eroor: ' + code);
            };

            $upload.on('click', function () {
                if ($(this).hasClass('disabled')) {
                    return false;
                }

                if (state === 'ready') {
                    uploader.upload();
                } else if (state === 'paused') {
                    uploader.upload();
                } else if (state === 'uploading') {
                    uploader.stop();
                }
            });

            $info.on('click', '.retry', function () {
                uploader.retry();
            });

            $info.on('click', '.ignore', function () {

            });

            $upload.addClass('state-' + state);
            updateTotalProgress();
        }
    }
}]).directive("map",function(){
   return{
       restrict:"A",
       template:'<label for=""><span class="c-red">*</span>公司地址：<input type="text" ng-model="unit.UnionAddress" class="input-text" id="suggestId" placeholder="请输入合作公司地址" style="width: 260px" required/><button class="btn btn-primary">定位</button></label><p class="c-danger" style="padding-left: 5em;line-height: 30px">请在地图上拖动红色坐标，以便精准定位位置</p><div id="map" style="width: 100%;height: 400px;margin-top: 15px"></div>',
       link:function(scope,element,attr){
           // 百度地图API功能
           var map = new BMap.Map("map");
           var point = new BMap.Point(116.404, 39.915);
           //标注
           var marker = new BMap.Marker(point);
           marker.addEventListener("dragend",function(){
               var p = marker.getPosition();  //获取marker的位置
               //保存经纬度
               scope.unit.MapJ=p.lng;
               scope.unit.MapW=p.lat;
               console.log("标记经度" + p.lng + ",标记维度" + p.lat);
           });
           //定位
           var myCity = new BMap.LocalCity();
           map.enableScrollWheelZoom();
           map.enableInertialDragging();
           map.enableContinuousZoom();

            myCity.get(function(result){
               var cityName = result.name;
               map.setCenter(cityName);
               point = new BMap.Point(result.center.lng,result.center.lat);
               map.centerAndZoom(point, 12);
           });
           //检索
           element.on("click","button",function(){
               var options = {
                   onSearchComplete: function(results){

                       // 判断状态是否正确
                       if (local.getStatus() == BMAP_STATUS_SUCCESS){
                           map.clearOverlays();
                           var res=results.getPoi(0);
                               point = new BMap.Point(res.point.lng,res.point.lat);
                               marker = new BMap.Marker(point);
                               scope.unit.MapJ=res.point.lng;
                               scope.unit.MapW=res.point.lat;
                               marker.addEventListener("dragend",function(){
                                   var p = marker.getPosition();  //获取marker的位置
                                   //保存经纬度
                                   scope.unit.MapJ=p.lng;
                                   scope.unit.MapW=p.lat;
                                   console.log(res.point,p)
                               });
                               map.addOverlay(marker);             // 将标注添加到地图中
                               marker.enableDragging();
                              map.centerAndZoom(point, 18);
                       }
                   }
               };
               var local = new BMap.LocalSearch(map, options);
               local.search(scope.unit.UnionAddress);
           });
           // 添加带有定位的导航控件
           var navigationControl = new BMap.NavigationControl({
               // 靠左上角位置
               anchor: BMAP_ANCHOR_TOP_RIGHT,
               // LARGE类型
               type: BMAP_NAVIGATION_CONTROL_LARGE,
               // 启用显示定位
               enableGeolocation: true
           });
           map.addControl(navigationControl);
           // 添加定位控件
           var geolocationControl = new BMap.GeolocationControl();
           geolocationControl.addEventListener("locationSuccess", function(e){
               // 定位成功事件
               var address = '';
               address += e.addressComponent.province;
               address += e.addressComponent.city;
               address += e.addressComponent.district;
               address += e.addressComponent.street;
               address += e.addressComponent.streetNumber;
               console.log(address)
           });
           geolocationControl.addEventListener("locationError",function(e){
               // 定位失败事件
               alert(e.message);
           });
           map.addControl(new BMap.CityListControl({
               anchor: BMAP_ANCHOR_TOP_LEFT
           }));
           map.addControl(geolocationControl);
          /* scope.$watch("unit.City",function(newValue){
                if(newValue){
                    map.setCenter(newValue);
                }
                else{
                    myCity.get(function(result){
                        var cityName = result.name;
                        map.setCenter(cityName);
                    });
                }
           },true);*/
           scope.map=map;
       }


   }


}).directive("mapEdit",function(){
    return{
        restrict:"A",
        template:'<label for=""><span class="c-red">*</span>公司地址：<input type="text" ng-model="unit.UnionAddress" class="input-text" id="suggestId" placeholder="请输入合作公司地址" style="width: 260px"/><button class="btn btn-primary">定位</button></label><p class="c-danger" style="padding-left: 5em;line-height: 30px">请在地图上拖动红色坐标，以便精准定位位置</p><div id="map" style="width: 100%;height: 400px;margin-top: 15px"></div>',
        link:function(scope,element,attr){
            // 百度地图API功能
            var map = new BMap.Map("map");
            var point = new BMap.Point(116.404, 39.915);
            //标注
            /*var marker = new BMap.Marker(point);
            marker.addEventListener("dragend",function(){
                var p = marker.getPosition();  //获取marker的位置
                //保存经纬度
                scope.unit.MapJ=p.lng;
                scope.unit.MapW=p.lat;
                console.log("标记经度" + p.lng + ",标记维度" + p.lat);
            });*/
            map.enableScrollWheelZoom();
            map.enableInertialDragging();
            map.enableContinuousZoom();
            //检索
            element.on("click","button",function(){
                var options = {
                    onSearchComplete: function(results){
                        // 判断状态是否正确
                        if (local.getStatus() == BMAP_STATUS_SUCCESS){
                            map.clearOverlays();
                            var res=results.getPoi(0);
                            point = new BMap.Point(res.point.lng,res.point.lat);
                            marker = new BMap.Marker(point);
                            scope.unit.MapJ=res.point.lng;
                            scope.unit.MapW=res.point.lat;
                            marker.addEventListener("dragend",function(){
                                var p = marker.getPosition();  //获取marker的位置
                                //保存经纬度
                                scope.unit.MapJ=p.lng;
                                scope.unit.MapW=p.lat;
                                console.log(res.point,p)
                            });
                            map.addOverlay(marker);             // 将标注添加到地图中
                            marker.enableDragging();
                            map.centerAndZoom(point, 18);
                        }
                    }
                };
                var local = new BMap.LocalSearch(map, options);
                local.search(scope.unit.UnionAddress);
            });
            // 添加带有定位的导航控件
            var navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor: BMAP_ANCHOR_TOP_RIGHT,
                // LARGE类型
                type: BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation: true
            });
            map.addControl(navigationControl);
            // 添加定位控件
            var geolocationControl = new BMap.GeolocationControl();
            geolocationControl.addEventListener("locationSuccess", function(e){
                // 定位成功事件
                var address = '';
                address += e.addressComponent.province;
                address += e.addressComponent.city;
                address += e.addressComponent.district;
                address += e.addressComponent.street;
                address += e.addressComponent.streetNumber;
            });
            geolocationControl.addEventListener("locationError",function(e){
                // 定位失败事件
                alert(e.message);
            });
            map.addControl(new BMap.CityListControl({
                anchor: BMAP_ANCHOR_TOP_LEFT
            }));
            map.addControl(geolocationControl);
            scope.map=map;
        }


    }


}).directive("tabTool",function(){
    return{
        restrict:"A",
        compile:function(element,attr){
            element.on("click","span",function(){
                $(this).addClass("current").siblings().removeClass("current");
            })
        }
    }
});