layui.use('layim', function(layim){
    var ipTemp = window.location.host;
    var portTemp = window.location.port;
    console.log(ipTemp+":"+portTemp);
    layim.config({
        init: {
            //js文件配置在测试服务器
            mine: {
                "username": "我"
                ,"id": "1112"
                ,"status": "online"
                ,"remark": "客户"
                // ,"avatar": "http://192.168.21.122:8080/chat/picture/yonghu.png"
                ,"avatar": "dependences/chat/picture/yonghu.png"
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
        ,avatar: 'dependences/chat/picture/xiaoyue.png'
        ,id: 1111
    });
    layim.setChatMin();
    var $ = layui.jquery;
    $('.layim-chat-main').children("ul").children("li").remove();
    var socket = '';
    $('#mytempid').on('click', function(){
        var obj1 = {};
        var obj2 = {};
        obj1 = {
            username: "小玥"
            ,avatar: "dependences/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            ,content: "a(https://www.shineyue.com/)[神玥科技]移动端，内容更丰富，快来扫描二维码下载吧"
        }
        obj2 = {
            username: "小玥"
            ,avatar: "dependences/chat/picture/xiaoyue.png"
            ,id: 1111
            ,type: "robot"
            ,content: "img[dependences/chat/picture/ewm.png]"
        }
        layim.getMessage(obj1);
        layim.getMessage(obj2);
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
            // socket = io.connect('http://192.168.21.152:5000/chatbot');
            // socket = io.connect('http://192.168.0.238:5000/chatbot');
            socket = io.connect('http://222.222.216.162:10230/chatbot');
        }
        socket.on('connect',function(){
            // console.log(window.sessionStorage);
            //这需要获取用户名用户ID，和业务中心，以区分不同的业务答案
            console.log("连接成功")
            var dataTemp = {message:"发起连接",userName:"name",userId:"11",city:"test"};
            socket.emit('open', dataTemp);
        });
        socket.on('reconnect_attempt', function(data){
            if(data === 1){
                var obj = {};
                obj = {
                    username: "小玥"
                    ,avatar: "dependences/chat/picture/xiaoyue.png"
                    ,id: 1111
                    ,type: "robot"
                    ,content: "非常抱歉，现在咨询客户太多了。请您稍候再试哦！"
                }
                layim.getMessage(obj);
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
                ,avatar: "dependences/chat/picture/xiaoyue.png"
                ,id: 1111
                ,type: "robot"
                ,content: modifyAnswer
            }
            layim.getMessage(obj);
        });

        // 敏感词过滤，推荐不适用，很影响性能和用户体验，后台获取敏感词列表，普通for性能最好
        // var mgcList = ['习近平','共产党','世界末日']
        // function filtration(message) {
        //     var j ;
        //     var filterWord ;
        //     var index;
        //     var len=mgcList.length;
        //     for(j = 0; j < len; j++) {
        //         filterWord = mgcList[j]
        //         console.log("敏感词："+filterWord);
        //         index = message.indexOf(filterWord);
        //         // console.log(index);
        //         if(index>-1){
        //             console.log("发现敏感词，开始修改敏感词")
        //             message.replace(message, "***")
        //         }else {
        //             console.log("未发现发现敏感词")
        //         }
        //     }
        //     return message;
        // }

        layim.on('sendMessage', function(data){
            var value = data.mine.content;
            //测试敏感词
            // var newValue = filtration(value)
            var sendValue = {message:value}
            socket.emit('chat', sendValue);
        });
    });
});
