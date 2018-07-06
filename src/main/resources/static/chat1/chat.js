layui.use('layim', function(layim){
    // var ipTemp = window.location.host;
    // var portTemp = window.location.port;
    // console.log(ipTemp+":"+portTemp);
    layim.config({
        init: {
            // js文件配置本机
            mine: {
                "username": "我"
                ,"id": "1112"
                ,"status": "online"
                ,"remark": "客户"
                ,"avatar": "http://localhost:8080/chat/picture/qqxiu.jpg"
            }
            // js文件配置在测试服务器
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
        minRight: '0px',
        right:'130px'
    });
    layim.chat({
        name: '在线咨询'
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
            // socket = io.connect('http://192.168.0.238:5000/chatbot');
            socket = io.connect('http://192.168.21.198:5000/chatbot');
        }
        socket.on('connect',function(){
            // console.log(socket);
            //这需要获取用户名用户ID，和地理位置，以区分不同的业务答案
            console.log("连接成功")
            var dataTemp = {message:"发起连接",userName:"name",userId:"11",city:"test"};
            socket.emit('open', dataTemp);
        });
        socket.on('reconnect_attempt', function(data){
            if(data === 1){
                var obj = {};
                obj = {
                    username: "小玥"
                    ,avatar: "http://localhost:8080/chat/picture/ktkf.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: "非常抱歉，现在咨询客户较多。请您稍候再试哦！a(http://www.baidu.com)[百度]--img[http://localhost:8080/chat/picture/ewm.png]"
                }
                layim.getMessage(obj);
            }
        });

        // socket.on('connect', function(data){
        //     onlineFlag = true;
        //     console.log(data + ' - connect');
        // });
        // socket.on('connect_error', function(data){
        //     console.log(data + ' - connect_error');
        // });
        // socket.on('connect_timeout', function(data){
        //     console.log(data + ' - connect_timeout');
        // });
        // socket.on('error', function(data){
        //     console.log(data + ' - error');
        // });
        // socket.on('disconnect', function(data){
        //     // onlineFlag = false;
        //     console.log(data + ' - disconnect');
        // });
        // socket.on('reconnect', function(data){
        //     console.log(data + ' - reconnect');
        // });
        // socket.on('reconnect_attempt', function(data){
        //     console.log(data + ' - reconnect_attempt');
        // });
        // socket.on('reconnecting', function(data){
        //     console.log(data + ' - reconnecting');
        // });
        // socket.on('reconnect_error', function(data){
        //     console.log(data + ' - reconnect_error');
        // });
        // socket.on('reconnect_failed', function(data){
        //     console.log(data + ' - reconnect_failed');
        // });
        // socket.on('ping', function(data){
        //     console.log(data + ' - ping');
        // });
        // socket.on('pong', function(data){
        //     console.log(data + ' - pong');
        // });

        socket.on('answer', function(msg) {
            // console.log(msg);
            var obj = {};
            obj = {
                username: "小玥"
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
