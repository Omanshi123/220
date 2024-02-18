$(function () {
    $("#show_chat").click(function () {
        $(".left-window").css("display", "none")
        $(".right-window").css("display", "block")
        $(".header_back").css("display", "block")
    })
    $(".header_back").click(function () {
        $(".left-window").css("display", "block")
        $(".right-window").css("display", "none")
        $(".header_back").css("display", "none")
    })
})
const socket = io("/");
var peer = new peer(undefined,{
    path:"/peerjs",
    host:"/",
    port:"443"
});

const myvideo = document.createElement("video");
myvideo.muted = true;
let myscreen;


navigator.mediaDevices
    .getUserMedia({
        audio:true,
        video:true
    })

    .then((stream) => {
        mystream = stream;
        addVideoStream(myvideo,stream);

        socket.on("user-connected", (userId) =>{
            connectedToNewUser(userId,stream)
        });

        peer.on("call",(call)=>{
            call.answer(stream);
            const video = document.createElement("video")
            call.on("stream",(userVideoStream) =>{
                addVideoStream(video,userVideoStream)
            })
        })
    })
    
function connectToNewUser(userId,stream){
    const call = peer.call(userId,stream);
    const video = document.createElement("video");
    call.on("stream",(userVideoStream) => {
        addVideoStream(video,userVideoStream);
    });
};


function addVideoStream(video,stream){
    video.srcObject = stream;
    video.addEventlistener("Loaded Metadata", () =>{
        video.play();
        $("#video_grid").append(vdeo)
    })
}