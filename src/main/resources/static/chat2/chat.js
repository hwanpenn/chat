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
                ,"avatar": "http://localhost:8080/chat/picture/yonghu.png"
                // ,"avatar": "http://localhost:8080/chat/picture/yonghu.png"
            }
            //js文件配置在测试服务器
            // mine: {
            //     "username": "我"
            //     ,"id": "1112"
            //     ,"status": "online"
            //     ,"remark": "客户"
            //     ,"avatar": "http://192.168.0.166:8080/chat/picture/yonghu.png"
            // }
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
        ,avatar: 'http://localhost:8080/chat/picture/xiaoyue.png'
        ,id: 1111
    });
    layim.setChatMin();
    var $ = layui.jquery;
    $('.layim-chat-main').children("ul").children("li").remove();
    var socket = '';
    $('#mytempid').on('click', function(){
        var obj1 = {};
        var obj2 = {};
        var testTemp = "1、a(https://www.shineyue.com/)[神玥软件]\n2、a(https://baidu.com)[百度一下]\n3、a(http://www.sjzgjj.cn/)[石家庄住房公积金管理中心]";
        console.log("前端数据")
        console.log(testTemp)
        obj1 = {
            username: "小玥"
            ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            // ,content: "1.a(https://www.shineyue.com/)[神玥科技移动端，内容更丰富，快来扫描二维码下载吧]\n2.a(https://www.shineyue.com/)[神玥科技移动端，内容更丰富，快来扫描二维码下载吧]\n" +
            // "3.a(https://www.shineyue.com/)[神玥科技移动端，内容更丰富，快来扫描二维码下载吧]"
            ,content: testTemp
        }
        obj2 = {
            username: "小玥"
            ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            ,content: "img[http://localhost:8080/chat/picture/ewm.png]"
        }
        layim.getMessage(obj1);
        layim.getMessage(obj2);
        // console.log(window.sessionStorage);
        var cache =  layui.layim.cache();
        // console.log(cache)
        if(cache.chatlog!==undefined){
            delete cache.chatlog;
        }
        var local = layui.data('layim')[cache.mine.id];
        if(local.chatlog!==undefined){
            delete local.chatlog;
        }
        layui.data('layim', {
            key: cache.mine.id
            ,value: local
        });
        console.log("发起连接")
        if(socket===''){
            socket = io.connect('http://192.168.21.103:5000/chatbot');
            // socket = io.connect('http://192.168.0.238:5000/chatbot');
            // socket = io.connect('http://192.168.21.198:5000/chatbot');
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
                var obj1 = {};
                var obj2 = {};
                obj = {
                    username: "小玥"
                    ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    // ,content: "1、a(https://www.shineyue.com/)[神玥软件]\n2、a(https://baidu.com)[百度一下]\n3、a(http://www.sjzgjj.cn/)[石家庄住房公积金管理中心]"
                    ,content: "非常抱歉，现在咨询客户太多了，请您稍候再试哦！"
                }
                obj1 = {
                    username: "小玥"
                    ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: "a(https://www.shineyue.com/)[神玥科技]移动端，内容更丰富，快来下载吧"
                }
                obj2 = {
                    username: "小玥"
                    ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: "img[http://localhost:8080/chat/picture/ewm.png]"
                }
                layim.getMessage(obj);
                // layim.getMessage(obj1);
                // layim.getMessage(obj2);
            }
        });
        socket.on('answer', function(msg) {
            // console.log(msg);
            console.log("后台数据"+msg.answer);
            var primitiveAnswer = msg.answer
            var modifyAnswer = ''
            var arr= primitiveAnswer.split("<br/>")
            console.log(arr)
                var j ;
                // var filterWord ;
                // var index;
                var len=arr.length;
                if(len===1){
                    modifyAnswer = primitiveAnswer;
                }else {
                    for(j = 0; j < len; j++) {
                        modifyAnswer = modifyAnswer + arr[j] + "\n"
                        // filterWord = mgcList[j]
                        // console.log("敏感词："+filterWord);
                        // index = message.indexOf(filterWord);
                        // // console.log(index);
                        // if(index>-1){
                        //     // console.log("发现敏感词，开始修改敏感词------"+message)
                        //     messageTemp = messageTemp.replace(filterWord, "***")
                        // }else {
                        //     // console.log("未发现发现敏感词")
                        // }
                    }
                }
                console.log(modifyAnswer)
                // var messageTemp = message;



            // var index = primitiveAnswer.indexOf('\n');
            //         // console.log(index);
            //         if(index>-1){
            //             console.log("发现敏感词，开始修改敏感词------"+message)
            //             // messageTemp = messageTemp.replace(filterWord, "***")
            //         }else {
            //             console.log("未发现发现敏感词")
            //         }
            var obj = {};
            var testTemp1 = "1、a(https://www.shineyue.com/)[神玥软件]\n2、a(https://baidu.com)[百度一下]\n3、a(http://www.sjzgjj.cn/)[石家庄住房公积金管理中心]";
            console.log("有效数据"+testTemp1);
            obj = {
                username: "小玥"
                ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: modifyAnswer
            }
            obj1 = {
                username: "小玥"
                ,avatar: "http://localhost:8080/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: testTemp1
            }
            layim.getMessage(obj);
            layim.getMessage(obj1);
        });

        layim.on('sendMessage', function(data){
            var value = data.mine.content;
            // console.log(value)
            var sendValue = {message:value}
            // console.log(sendValue)
            socket.emit('chat', sendValue);
        });
    });
});
