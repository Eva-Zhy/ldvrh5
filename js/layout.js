(function(){
    var timeCode;
    var size=-1;
    var type=0;//0 ˙∆¡ 1∫·∆¡
    function resize(){
        var clientLength=type==0?document.documentElement.clientWidth:document.documentElement.clientHeight;
        if(clientLength<720){
            document.documentElement.style.fontSize=clientLength/40+'px';
        }else if(size>0){
            document.documentElement.style.fontSize=size/40+'px';
        }else{
            document.documentElement.style.fontSize='18px';
        }
    }
    resize();
    window.addEventListener("resize", function() {
        clearTimeout(timeCode);
        timeCode = setTimeout(resize, 100);
    }, false);
    window.resize=function(s,t){
        size=s;
        type=t;
        resize();
    };
})();