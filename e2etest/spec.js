'use strict';
 describe("app",function(){
  describe("view:login",function(){
    browser.get("http://localhost:8080/service.html#/login");
    var btn=element.all(by.css(".btn-success"));
    var name=element.all(by.css("input[name=account]"));
    var pwd=element.all(by.css("input[name=password]"));
    name.sendKeys("ctxkf");
    pwd.sendKeys("chetongxiangkf");
    btn.click();
  });
 describe("view:list",function(){

     beforeEach(function(){
         browser.get("http://localhost:8080/service.html#/admin/list");
     });
     var list=element.all(by.repeater("obj in list"));
     it("filter by brand",function(){
         var search=element.all(by.css("#search"));
         search.sendKeys("奥迪");
         expect(list.count()).toBe(20)
     });
     it("filter",function(){
     var brandFilter = element(by.model('filter.BrandID'));
     var brandOption = brandFilter.element(by.css('option[value="103"]'));
         brandOption.click();
     var countryFilter = element(by.model('filter.CountryID'));
     var countryOption = countryFilter.element(by.css('option[value="3"]'));
         countryOption.click();
     var searchbtn=element(by.css(".btn-success"));
         searchbtn.click();
        browser.sleep(20000);
     })
 })
 });
