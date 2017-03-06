angular.module("servicesModule").factory("httpPaginationData",["$http","$q",function(t,e){function a(t,e){if(this.records=[],this.pageState=null,this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.dataMapping=function(t){return t},this.method="get","object"==typeof t&&1===arguments.length){var a=t;this.sourceUrl=a.sourceUrl,this.queryData=a.queryData,this.dataField=a.dataField||this.dataField,this.dataMapping=a.dataMapping||this.dataMapping,this.pageSize=a.pageSize}else this.sourceUrl=t,this.queryData=e,this.pageSize=e.pageSize}return a.prototype.getNextPage=function(a){if(this.pageIndex<this.records.length-1)return this.pageIndex++,e.resolve(this.records[this.pageIndex]);var i=this,r=angular.extend({},i.queryData,{pageState:i.pageState,pageSize:i.pageSize},a);return"get"===i.method&&(r={params:r}),t[i.method](i.sourceUrl,r).then(function(t){return t=t.data,t[i.dataField]&&(i.pageIndex++,i.records.push(i.dataMapping(t[i.dataField]))),t.pageState!==i.pageState?i.pageState=t.pageState:i.pageState=null,t})},a.prototype.getPrevPage=function(){this.pageIndex--},a.prototype.getPages=function(){return new Array(this.records.length)},a}]).factory("paginationData",["service",function(t){function e(t,e){if(this.records=[],this.pageState=null,this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.dataMapping=function(t){return t},"object"==typeof t&&1===arguments.length){var a=t;this.sourceUrl=a.sourceUrl,this.queryData=a.queryData,this.dataField=a.dataField||this.dataField,this.dataMapping=a.dataMapping||this.dataMapping,this.pageSize=a.pageSize}else this.sourceUrl=t,this.queryData=e}return e.prototype.getNextPage=function(e){if(this.pageIndex<this.records.length-1)this.pageIndex++;else{var a=this;t.executePromiseAvoidDuplicate(this,"fetching",function(){return t.post(a.sourceUrl,angular.extend({},a.queryData,{pageState:a.pageState,pageSize:a.pageSize},e)).then(function(t){return t[a.dataField]&&(a.pageIndex++,a.records.push(a.dataMapping(t[a.dataField]))),a.pageState=t.pageState,t})})}},e.prototype.getPrevPage=function(){this.pageIndex--},e.prototype.getPages=function(){return new Array(this.records.length)},e}]).factory("paginationDataWithTotal",["service",function(t){function e(t,e){if(this.records=[],this.pageIndex=-1,this.fetching=!1,this.dataField="data",this.totalField="total",this.dataMapping=function(t){return t},"object"==typeof t&&1===arguments.length){var a=t;this.sourceUrl=a.sourceUrl,this.queryData=a.queryData,this.dataField=a.dataField||this.dataField,this.dataMapping=a.dataMapping||this.dataMapping,this.pageSize=a.pageSize}else this.sourceUrl=t,this.queryData=e}return e.prototype.getNextPage=function(e){if(this.pageIndex<this.records.length-1)this.pageIndex++;else{var a=this;t.executePromiseAvoidDuplicate(this,"fetching",function(){return t.post(a.sourceUrl,angular.extend({},a.queryData,{offset:a.pageSize*(a.pageIndex+1),pageSize:a.pageSize},e)).then(function(t){t[a.dataField]&&(a.pageIndex++,a.records.push(a.dataMapping(t[a.dataField]))),t[a.totalField]&&(a.total=t[a.totalField])})})}},e.prototype.getPrevPage=function(){this.pageIndex--},e.prototype.getPages=function(){return new Array(this.records.length)},e.prototype.getTotalRecords=function(){for(var t=0,e=0;e<this.records.length;e++)t+=this.records[e].length;return t},e}]);