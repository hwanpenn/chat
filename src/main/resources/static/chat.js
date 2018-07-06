layui.use('layim', function(layim){
    // 先来个客服模式压压精
    // 是否简约模式（如果true则不显示主面板）
    layim.config({
        brief: true,
        minRight: '0px'
    }).chat({
        name: '客服姐姐'
        //聊天类型
        ,type: 'friend'
        //头像
        ,avatar: 'http://localhost:8080/picture/liyanhong.jpg'
        ,id: -2
    });
    layim.setChatMin();
    // delete local.chatlog;
       //建立socket.io通讯
    var socket = io.connect('http://192.168.21.152:5000/chatbot');
    socket.on('answer', function(msg) {
        console.info(msg);
        console.info(JSON.stringify(msg));
        console.info(JSON.parse(JSON.stringify(msg)));
        // console.log("回答："+msg.content);
        // var res = JSON.parse(msg);
           // if(res.emit === 'chatMessage'){
           //     layim.getMessage(JSON.parse(JSON.stringify(msg))); //res.data即你发送消息传递的数据（阅读：监听发送的消息）
           // }
    });
    var cache =  layui.layim.cache();
    var local = layui.data('layim')[cache.mine.id]
    console.log("删除聊天记录前")
    console.log(local)
    delete local.chatlog;
    console.log("删除聊天记录后")
    console.log(local)
    // socket.emit('chat', "小姐姐有男朋友嘛");

       // var socket = io.connect('http://192.168.21.152:5000/chatbot');
       //  socket.emit('chat', "你好1111");
       // var socket = new WebSocket('ws://localhost:8080/websocket');
       // socket.send('请求发起WebSocket连接');
       //连接成功时触发
       // socket.onopen = function(){
       //     socket.send('WebSocket连接成功');
       // };
//        //监听收到的消息
//        socket.onmessage = function(res){
//            //res为接受到的值，如 {"emit": "messageName", "data": {}}
//            //emit即为发出的事件名，用于区分不同的消息
//            //            {
//            //                username: "纸飞机" //消息来源用户名
//            //                    ,avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1" //消息来源用户头像
//            //                ,id: "100000" //消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
//            //                ,type: "friend" //聊天窗口来源类型，从发送消息传递的to里面获取
//            //                ,content: "嗨，你好！本消息系离线消息。" //消息内容
//            //                ,cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
//            //                ,mine: false //是否我发送的消息，如果为true，则会显示在右方
//            //                ,fromid: "100000" //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
//            //                ,timestamp: 1467475443306 //服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
//            //            }
//            res = JSON.parse(res);
//            if(res.emit === 'chatMessage'){
//                layim.getMessage(res.data); //res.data即你发送消息传递的数据（阅读：监听发送的消息）
//            }
//        };
//
//        layim.on('sendMessage', function(res){
//            //包含我发送的消息及我的信息
//                            {
//                                avatar: "avatar.jpg" //我的头像
//                                    ,content: "你好吗" //消息内容
//                                ,id: "100000" //我的id
//                                ,mine: true //是否我发送的消息
//                                ,username: "纸飞机" //我的昵称
//                            }
//            var mine = res.mine;
//            //对方的信息
//            var to = res.to;
//                            {
//                                avatar: "avatar.jpg"
//                                    ,id: "100001"
//                                ,name: "贤心"
//                                ,sign: "这些都是测试数据，实际使用请严格按照该格式返回"
//                                ,type: "friend" //聊天类型，一般分friend和group两种，group即群聊
//                                ,username: "贤心"
//                            }
//            //监听到上述消息后，就可以轻松地发送socket了，如：
//            socket.send(JSON.stringify({
//                //随便定义，用于在服务端区分消息类型
//                type: 'chatMessage'
//                ,data: res
//            }));
//
//        });
});
