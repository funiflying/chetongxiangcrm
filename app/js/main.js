require.config({
    baseUrl:"/js",
    paths: {
        "jquery": 'jquery-1.10.2.min',
        "bootstrap": "bootstrap.min",
        "index":"index",
        "slider":"bootstrap-slider.min",
        "cityJson":"cityJson"
    },
    shim:{
     "bootstrap": ["jquery"],
      "slider":["jquery","bootstrap"],
      "/lib/layer/1.9.3/layer.js":["jquery"]
    }
});
requirejs(["index"],function(index){
    index.init();


});