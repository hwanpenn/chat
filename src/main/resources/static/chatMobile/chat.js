layui.use('mobile', function(){
    var mobile = layui.mobile
        ,layim = mobile.layim;
    var socket = '';
    layim.config({
        init: {
            //js文件配置在本机
            mine: {
                "username": "我"
                ,"id": "1112"
                ,"status": "online"
                ,"remark": "客户"
                ,"avatar": "/chatMobile/picture/yonghu.png"
                // ,"avatar": "/chat/picture/yonghu.png"
            }
            ,friend: []
            ,group: []
        },
        brief: true,
        voice:false,
        minRight: '0px'
    });
    layim.chat({
        name: '在线咨询'
        ,type: 'robot'
        ,avatar: '/chatMobile/picture/xiaoyue.png'
        ,id: 1111
    });
    // console.log("111")
    // var list=document.getElementsByClassName("layim-chat-main")[0];
    // list.removeChild(list.childNodes[0]);
    // var uls=list.getElementsByTagName("ul")[0];
    // // console.log(list)
    // uls.innerHTML = ""
    var obj1 = {};
    obj1 = {
        username: "小玥"
        ,avatar: "/chat/picture/xiaoyue.png"
        ,id: 1111
        ,type: "robot"
        ,content: "a(https://www.shineyue.com/)[神玥科技]正在召唤助手小玥"
        // ,content: "1、a(https://www.shineyue.com/)[神玥软件]\n2、a(https://baidu.com)[百度一下]\n3、a(http://www.sjzgjj.cn/)[石家庄住房公积金管理中心]"
    }
    layim.getMessage(obj1);
    // var cache =  layui.layim.cache();
    // if(cache===undefined){
    //
    // }else {
    //     if(cache.chatlog!==undefined){
    //         delete cache.chatlog;
    //     }
    //     var local = layui.data('layim')[cache.mine.id];
    //     if(local.chatlog!==undefined){
    //         delete local.chatlog;
    //     }
    //     layui.data('layim', {
    //         key: cache.mine.id
    //         ,value: local
    //     });
    // }


    console.log("发起连接")
    if(socket===''){
        // socket = io.connect('http://192.168.21.129:5000/chatbot');
        socket = io.connect('http://192.168.21.126:5000/chatbot');
        // socket = io.connect('http://222.222.216.162:10230/chatbot');
        // socket = io.connect('http://192.168.0.238:5000/chatbot');
        // socket = io.connect('http://192.168.21.198:5000/chatbot');
    }
    socket.on('connect',function(){
        var dataTemp = {message:"发起连接",userName:"name",userId:"11",city:"test"};
        socket.emit('open', dataTemp);
    });
    socket.on('reconnect_attempt', function(data){
        if(data === 1){
            var obj = {};
            obj = {
                username: "小玥"
                ,avatar: "/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: "非常抱歉，现在咨询客户太多了。请您稍候再试哦！"
            }
            layim.getMessage(obj);
        }
    });
    socket.on('answer', function(msg) {
        console.log("后台数据"+msg.answer);
        var primitiveAnswer = msg.answer
        var modifyAnswer = ''
        var arr= primitiveAnswer.split("<br/>")
        console.log(arr)
        var j ;
        var len=arr.length;
        if(len===1){
            modifyAnswer = primitiveAnswer;
        }else {
            for(j = 0; j < len; j++) {
                modifyAnswer = modifyAnswer + arr[j] + "\n"
            }
        }
        console.log(modifyAnswer)

        var obj = {};
        obj = {
            username: "小玥"
            ,avatar: "/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            ,content: modifyAnswer
        }
        layim.getMessage(obj);
    });


    layim.on('sendMessage', function(data){
        var value = data.mine.content;
        var sendValue = {message:value}
        socket.emit('chat', sendValue);
    });

    //监听查看更多记录
    layim.on('chatlog', function(data){
        console.log(data);
        layer.msg('do something');
    });
});
