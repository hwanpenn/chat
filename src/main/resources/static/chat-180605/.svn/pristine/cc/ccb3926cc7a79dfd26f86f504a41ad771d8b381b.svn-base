layui.use('layim', function(layim){
    // var ipTemp = window.location.host;
    // var portTemp = window.location.port;
    // console.log(ipTemp+":"+portTemp);
    layim.config({
        init: {
            //js文件配置在本机
            mine: {
                "username": "我"
                ,"id": "1112"
                ,"status": "online"
                ,"remark": "客户"
                ,"avatar": "http://localhost:8080/chat/picture/qqxiu.jpg"
            }
            //js文件配置在测试服务器
            // mine: {
            //     "username": "我"
            //     ,"id": "1112"
            //     ,"status": "online"
            //     ,"remark": "客户"
            //     ,"avatar": "http://192.168.0.166:8080/chat/picture/qqxiu.jpg"
            // }
            ,friend: []
            ,group: []
        },
        brief: true,
        voice:false,
        minRight: '0px'
    });
    layim.chat({
        name: '在线客服'
        ,type: 'robot'
        ,avatar: 'http://localhost:8080/chat/picture/ktkf.png'
        ,id: 1111
    });
    layim.setChatMin();
    var $ = layui.jquery;
    $('.layim-chat-main').children("ul").children("li").remove();
    var socket = '';
    $('#mytempid').on('click', function(){
        // console.log(window.sessionStorage);
        var cache =  layui.layim.cache();
        // console.log(cache)
        delete cache.chatlog;
        var local = layui.data('layim')[cache.mine.id];
        delete local.chatlog;
        layui.data('layim', {
            key: cache.mine.id
            ,value: local
        });
        console.log("发起连接")
        if(socket===''){
            // socket = io.connect('http://192.168.21.152:5000/chatbot');
            socket = io.connect('http://192.168.0.238:5000/chatbot');
            // socket = io.connect('http://192.168.21.198:5000/chatbot');
        }
        socket.on('connect',function(){
            // console.log(socket);
            //这需要获取用户名用户ID，和地理位置，以区分不同的业务答案
            console.log("连接成功")
            var dataTemp = {message:"发起连接",userName:"name",userId:"11",city:"test"};
            socket.emit('open', dataTemp);
        });
        // socket.on('connecting',function(){
        //     console.log("连接中")
        // });
        // socket.on('disconnect',function(){
        //     console.log("断开连接")
        // });
        // socket.on('connect_failed',function(){
        //     console.log("连接失败")
        // });
        socket.on('answer', function(msg) {
            // console.log(msg);
            var obj = {};
            obj = {
                username: "在线客服"
                ,avatar: "http://localhost:8080/chat/picture/ktkf.png"
                ,id: 1111
                ,type: "robot"
                ,content: msg.answer
            }
            layim.getMessage(obj);
        });

        layim.on('sendMessage', function(data){
            var value = data.mine.content;
            console.log(value)
            var sendValue = {message:value}
            console.log(sendValue)
            socket.emit('chat', sendValue);
        });
    });
});
