from flask import Flask, json, current_app
from flask_socketio import SocketIO, emit, send, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, engineio_logger=True)


@socketio.on('join')
def on_join(data):
    N = 2
    room = data['room']
    the_room = socketio.server.manager.rooms.get("/").get(room)
    n = len(the_room if the_room else {})
    if n >= N:
        send("Cannot enter the room<" + room + ">,it's full")
        return "full"
    else:
        username = data['username']
        join_room(room)
        send(username + ' has entered the room.' + room, room=room)
        return "success join there are {n} people in the room".format(n=n)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.' + room, room=room)
    return "success leave"


@socketio.on('candidate')
def handle_candidate(info):
    room = info.get("room")
    payload = info.get("payload")
    print('received payload:　' + json.dumps(payload))
    emit('candidate', payload, room=room, include_self=False)
    return "success candidate"


@socketio.on('offer')
def handle_offer(info):
    room = info.get("room")
    offer = info.get("offer")
    print('received message:　' + json.dumps(offer))
    emit('offer', offer, room=room, include_self=False)
    return "success offer"


@socketio.on('answer')
def handle_answer(info):
    room = info.get("room")
    answer = info.get("answer")
    print('received message:　' + json.dumps(answer))
    emit('answer', answer, room=room, include_self=False)
    return "success answer"


if __name__ == '__main__':
    socketio.run(app, port=4500)
