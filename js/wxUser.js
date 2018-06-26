(function(){
    window.gg=window.gg || {};
    var reqStart=false;
    window.gg.wxUser={
        appid:window.gg.config.appid,
        getWxCode:function(uri,scope){
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                var str='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.appid;
                str+='&redirect_uri='+encodeURIComponent(uri);
                str+='&response_type=code&scope='+(scope || 'snsapi_userinfo')+'&state=1#wechat_redirect';
                window.location.href=str;
            } else {
                window.location.href=uri;
            }
        },
        register:function(callback){
            console.log(window.gg.config.projectUrl);
            if(!reqStart){
                reqStart=true;
                var param=gg.util.getUrlParam();
                $.get(window.gg.config.projectUrl+ '/wxLogin/Server/weixin_userinfo/wx_userinfo.php',{code:param.code},function(res){
                    sessionStorage.setItem(param.project || 'shareProject',JSON.stringify(JSON.parse(res.msg)));
                    reqStart=false;
                    //$.post('http://case.h5tu.com/php/custom/register_wx.php',{
                    //    project:param.project || 'shareProject',
                    //    openid:res.openid,
                    //    nick:res.nickname,
                    //    avatar:res.headimgurl,
                    //    sex:res.sex,
                    //    city:res.city,
                    //    province:res.province,
                    //    country:res.country,
                    //    m2:param.m2 || 'self'
                    //}
                    //    ,function(result){
                    callback(JSON.parse(res.msg));

                    //},'json');

                },'json');
            }
        },
        getUserInfo:function(callback){
            var param=gg.util.getUrlParam();
            var userInfo=sessionStorage.getItem(param.project || 'shareProject');
            if(userInfo){
                callback(JSON.parse(userInfo));
            }else{
                this.register(callback);
            }
        }
    };
})();