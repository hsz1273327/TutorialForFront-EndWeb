window.onload = function () {
    var URL = 'ws://localhost:4500';
    var form = document.getElementById('message-form');
    var usernameField = document.getElementById('username');
    var roomField = document.getElementById('room');
    var messagesList = document.getElementById('messages');
    var socketStatus = document.getElementById('status');
    var createBtn = document.getElementById('create_room');
    var closeBtn = document.getElementById('close');
    var socket = io(URL);
    var storage = localStorage;
    var session = {};
    socket.on("error", function (error) {
        console.log('WebSocket Error: ' + error.message);
    });
    socket.on("connect", function () {
        socketStatus.innerHTML = 'Connected to: ' + URL;
        socketStatus.className = 'open';
    });
    socket.on("disconnect", function () {
        socketStatus.innerHTML = 'Disconnected from WebSocket.';
        socketStatus.className = 'closed';
    });

    createBtn.onclick = function (e) {
        e.preventDefault();
        let offer = {
            "id":"1"
        }
        session.local = offer;
        sendinfo = {
            "room":storage.room,
            "offer":offer
        }
        socket.emit("offer",sendinfo , function (data) {
            console.log(data);
        });
    };
    socket.on("answer", function (data) {
        console.log("answer");
        console.log(data);
        var message = data.id;
        session.remot=data;
        console.log(session)
        messagesList.innerHTML += '<li class="answer"><span>answer:</span>' +
            message + '</li>';
    });

    socket.on("offer", function (data) {
        console.log("offer");
        console.log(data);
        var message = data.id;
        messagesList.innerHTML += '<li class="offer"><span>offer:</span>' +
            message + '</li>';
        session.remote = data
        var answer = {
                "id":"2"
            }
        session.local = answer
        var sendinfo = {
            "room":storage.room,
            "answer":answer
        }
        socket.emit("answer",sendinfo , function (data) {
                console.log(data);
                console.log(session);
            });
    });

    socket.on("message", function (data) {

        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' +
        data+
            '</li>';
    });



    form.onsubmit = function (e) {
        e.preventDefault();
        var info = {
            "username":usernameField.value,
            'room':roomField.value
        }
        socket.emit("join",
        info,
        function (data) {
            console.log(data);
            storage.setItem("username",info["username"]);
            storage.setItem("room",info["room"]);
            console.log("local info saved");
        });
        usernameField.value = '';
        roomField.value = '';
        return false;
    };
    closeBtn.onclick = function (e) {
        e.preventDefault();

        socket.close();
        return false;
    };
};
//# sourceMappingURL=app.js.map
