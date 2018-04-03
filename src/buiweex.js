/**
 * 框架中常用的工具方法
 */
const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
const navigator = weex.requireModule('navigator');
const navigatorEx = weex.requireModule("NavigatorExModule");
const stream = weex.requireModule('stream');

let buiweex = {

    /**
     * 获取当前上下文路径
     * @return {string} 当前上下文路径
     */
    getContextPath() {
        let url;
        let bundleUrl = weex.config.bundleUrl;
        url = bundleUrl.split('/').slice(0, -1).join('/');
        return url;
    },

    /**
     * 加载一个新的页面(bundleJS)
     * @method push
     * @param url {string} bundle js 地址
     * @param params {object} 传递的参数
     */
    push(url, params) {
        let paramsStr = "";
        if (params) {
            for (let key in params) {
                paramsStr += key + "=" + encodeURIComponent(params[key]) + "&";
            }
        }
        if (url.indexOf('?') < 0) {
            url += "?";
        }
        url += paramsStr;
        //link平台中使用navigatorEx,debugtool中使用navigator
        try {
            navigatorEx.push(url);
        } catch (ex) {
            navigator.push({
                url: url,
                animated: 'true'
            }, e => {
            });
        }
    },

    /**
     * 返回上个页面
     * @method pop
     */
    pop() {
        navigator.pop({
            animated: 'true'
        }, e => {
        });
    },

    /**
     * 获取页面参数(bundleJS),从url查询参数中获取
     * @method getPageParams
     * @return {object} 返回json数据
     */
    getPageParams() {
        let params = {};
        let url = weex.config.bundleUrl;
        let index = url.indexOf("?");
        if (index > 0) {
            let query = url.substring(index + 1);
            let temp = query.split('&');
            let key, value;
            for (var p in temp) {
                if (temp[p]) {
                    key = temp[p].split('=')[0];
                    value = temp[p].split('=')[1];
                    params[key] = decodeURIComponent(value);
                }
            }
        }
        return params;
    },

    /**
     * 发送POST请求
     * @method post
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，带到 HTTP body中
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
    post(params){
        let url = params.url || "";
        let headers = params.headers || {};
        let data = params.data;
        let type = params.type || "json";
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        // headers["Content-Type"]="application/x-www-form-urlencoded";
        // headers["Content-Type"]="application/json";
        return new Promise((resolve, reject) => {
            stream.fetch({
                method: "POST",
                type: type,
                url: url,
                headers: headers,
                body: data
            }, (res) => {
                if (res.ok) {
                    resolve(res.data, res.status, res.statusText);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    },

    /**
     * 发送GET请求
     * @method get
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，自动拼接到url后面
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
    get(params){
        return new Promise((resolve, reject) => {
            let url = params.url || "";
            let headers = params.headers || {};
            let data = params.data || {};
            let type = params.type || "json";
            if (!url.includes("?")) {
                url += "?";
            }
            if (typeof data == "object") {
                for (let key in data) {
                    url += `&${key}=${encodeURIComponent(data[key])}`;
                }
            }
            stream.fetch({
                method: "GET",
                type: type,
                url: url,
                headers: headers
            }, (res) => {
                if (res.ok) {
                    resolve(res.data, res.status, res.statusText);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    },

    /**
     * 判断是否是 iphone x
     * @return {*|boolean}
     */
    isIPhoneX() {
        return weex && (weex.config.env.deviceModel === 'iPhone10,3' || weex.config.env.deviceModel === 'iPhone10,6');
    }

    }

module.exports = buiweex;