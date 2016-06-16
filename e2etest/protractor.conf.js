exports.config={
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['spec.js'],
    framework:"jasmine",
    baseUrl:"http://loacalhost:8080/",
    multiCapabilities: [ {
        browserName: 'chrome'
    }],
    allScriptsTimeout: 11000
};