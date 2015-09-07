(function () {
    "use strict";
    angular
        .module("sbAdminApp")
        .factory("applicationServices",
                    ["$http", "appSettings",
                     applicationServices])

    function applicationServices($http, appSettings) {

        return {
            search: function (name, status, pageindex, pagesize, order_by) {

                var filter = {};
                var params = '';

                if (name != null && name != '') {
                    params = params + '&name=' + name
                    filter['name'] = name;
                }

                if (status != null && status != '') {
                    params = params + '&status=' + status
                    filter['status'] = status;
                }

                if (pageindex != null && pageindex != '') {
                    params = params + '&pageindex=' + pageindex
                    filter['pageindex'] = pageindex;
                }

                if (pagesize != null && pagesize != '') {
                    params = params + '&pagesize=' + pagesize
                    filter['pagesize'] = pagesize;
                }

                if (order_by != null && order_by != '') {
                    params = params + '&order_by=' + order_by
                    filter['order_by'] = order_by;
                }

                //console.log(filter);

                if (params.length > 0) {
                    if (params.charAt(0) === '&')
                        params = '?' + params.slice(1);
                }

                //return $http.post(appSettings.serverPath + '/application/search', filter);
                return $http.post(appSettings.serverPath + '/application/search' + params);

            },
            detail: function (id) {
                return $http.get(appSettings.serverPath + '/application/id/' + id)
            },
            insert: function (data) {
                return $http.post(appSettings.serverPath + '/application/insert', data)
            },
            update: function (data) {
                console.log(data);
                return $http.post(appSettings.serverPath + '/application/update', data)
            },
            destroy: function (id) {
                return $http.delete(appSettings.serverPath + '/application/delete/' + id)
            },
            getActive: function () {
                return $http.get(appSettings.serverPath + '/application/getactive', null)
            }

        }
    }
}());