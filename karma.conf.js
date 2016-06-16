module.exports=function(config){
  config.set({
      basePath:"./app",
      frameworks:["jasmine"],
      browsers:['Chrome', 'Firefox'],
      files:[
          "lib/angular/angular.js",
          "lib/angular-resource/angular-resource.js",
          "lib/angular-ui-router/release/angular-ui-router.js"
      ],
      autoWatch:true,
      plugins:[
          'karma-chrome-launcher',
          'karma-firefox-launcher',
          'karma-jasmine'
      ]
  })
};