
layui.use('layim', function(layim){



    layim.config({
        init: {
            mine: {
                "username": "我"
                ,"id": "1112"
                ,"status": "online"
                ,"remark": "客户"
                ,"avatar": "http://localhost:8080/picture/liyanhong.jpg"
            }
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
        ,avatar: 'http://localhost:8080/picture/qqxiu.jpg'
        ,id: 1111
    });
    layim.setChatMin();


    var $ = layui.jquery;


    $('.layim-chat-main').children("ul").children("li").remove();

    // var i = 0
    // for(i;i<10000;i++){
    //     console.log("连接socket")
    //     console.log(i)
    //     socket = io.connect('http://192.168.21.152:5000/chatbot');
    //         socket.on('answer', function(msg) {
    //             console.log(msg);
    //             if(msg)
    //         });
    // }

    var socket = '';
    $('#mytempid').on('click', function(){
        // console.log("触发点击事件")
        // console.log(socket)

        console.log(window.sessionStorage);
        console.log("初始化")
        var cache =  layui.layim.cache();
        console.log(cache)
        delete cache.chatlog;
        console.log(cache)
        var local = layui.data('layim')[cache.mine.id];
        console.log(local)
        delete local.chatlog;
        layui.data('layim', {
            key: cache.mine.id
            ,value: local
        });


        if(socket===''){
            console.log("连接socket")
            socket = io.connect('http://192.168.21.152:5000/chatbot');
        }
        // console.log(socket)
        io.on('connection',function(socket){
            console.log("监听连接");
            console.log(socket);
        });
        // socket.on('disconnect',function(){
        //
        // });
        socket.on('answer', function(msg) {
            console.log("回答");
            console.log(msg);
            var obj = {};
            obj = {
                username: "在线客服"
                ,avatar: "http://localhost:8080/picture/qqxiu.jpg"
                ,id: 1111
                ,type: "robot"
                ,content: msg.answer
            }
            layim.getMessage(obj);
        });

        layim.on('sendMessage', function(data){
            var value = data.mine.content;
            socket.emit('chat', value);
        });
    });
// var i = 1;
//     test(i);
});

// function test(i) {
//     console.log("第"+i+"次连接socket")
//     var socket = io.connect('http://192.168.21.152:5000/chatbot');
//     // io.on('connection',function(socket){
//     //     console.log(socket)
//     // });
//     socket.on('answer', function(msg) {
//         console.log("第"+i+"次连接成功并返回消息"+msg.answer);
//         i++;
//         if(msg!==null){
//             test(i)
//         }
//     });
// }