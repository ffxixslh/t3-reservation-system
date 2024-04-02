"use client";

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { BoxIcon, PhoneIcon } from "lucide-react";
import { api } from "~/trpc/react";
import SimplePeer from "simple-peer";

const CopyToClipboard: React.FC<
  {
    text: string;
    children: React.ReactNode;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ text, children }) => {
  navigator.clipboard.writeText(text);
  return <div>{children}</div>;
};

function ChatPage() {
  api.chat.onRemoteAccepted.useSubscription(void 0, {
    onData: (data) => {
      const { signal, from } = data;
      if (from !== remoteId) return;
      setRemoteSignal(signal);
    },
  });

  api.chat.onRemoteAnswer.useSubscription(void 0, {
    onData: (data) => {
      const { signal, from } = data;
      if (from !== remoteId) return;
      setRemoteId(from);
      setRemoteSignal(signal);
    },
  });

  api.chat.onLocalCall.useSubscription(void 0, {
    onData: (data) => {
      const { signal, from, to } = data;
      if (from !== remoteId) return;
      setRemoteSignal(signal);
      setRemoteId(to);
      setReceivingCall(true);
    },
  });

  api.chat.onLocalAnswer.useSubscription(void 0, {
    onData: (data) => {
      const { signal, from } = data;
      if (from !== remoteId) return;
      setRemoteSignal(signal);
    },
  });

  const localCallMutation =
    api.chat.localCall.useMutation();
  const localAnswerMutation =
    api.chat.localAnswer.useMutation();
  const remoteAnswerMutation =
    api.chat.remoteAnswer.useMutation();
  const remoteAcceptedMutation =
    api.chat.remoteAccepted.useMutation();

  const [stream, setStream] = useState<MediaStream | null>(
    null,
  );
  const [localName, setLocalName] = useState("");
  const [localId, setLocalId] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [remoteId, setRemoteId] = useState("");
  const [remoteName, setRemoteName] = useState("");
  const [remoteSignal, setRemoteSignal] =
    useState<SimplePeer.SignalData | null>(null);

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const remoteVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<SimplePeer.Instance | null>(
    null,
  );

  useEffect(() => {
    // 获取本地 stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("error: ", err.message);
      });

    // 接收方获取从服务器传递的发起方数据
    socket.on("remoteAnswer", (data) => {
      setReceivingCall(true);
      setRemoteId(data.from);
      setRemoteSignal(data.signal);
    });
  }, []);

  // 发起呼叫
  const handleCallRemote = (idToCall: string) => {
    if (!stream) return;
    if (!idToCall) return;

    // 初始化 peer 对象
    const peer = new SimplePeer({
      initiator: true,
      stream: stream,
      trickle: false,
    });

    // 传递信令
    peer.on("signal", (data) => {
      socket.emit("callRemote", {
        userToCall: idToCall,
        signal: data,
        from: localId,
        name: localName,
      });
    });

    // 获取对方 stream
    peer.on("stream", (stream) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = stream;
      }
      console.log("remote", stream);
    });

    // 对方接受通话时设置信令
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    // 保存 peer 对象
    connectionRef.current = peer;
  };

  // 接受呼叫
  const handleCallAnswer = () => {
    if (!stream) return;
    if (!remoteSignal) return;

    setCallAccepted(true);
    console.log("callerSignal:", remoteSignal);
    const peer = new SimplePeer({
      initiator: true,
      stream: stream,
      trickle: false,
    });

    // 设置信令
    peer.on("signal", (data) => {
      socket.emit("callAnswer", {
        signal: data,
        to: remoteId,
      });
    });

    peer.on("stream", (stream) => {
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = stream;
      }
    });

    // 保存发起方信令
    peer.signal(remoteSignal);

    // 保存 peer 对象
    connectionRef.current = peer;
  };

  // 结束通话
  const handleCallEnded = () => {
    if (!connectionRef.current) return;

    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div className="App">
      <div className="container">
        {/* video container */}
        <div className="video-container">
          <div className="video">
            {stream && (
              <video
                ref={myVideo}
                playsInline
                // autoPlay
                // muted
                controls
                style={{ width: "500px" }}
              />
            )}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video
                ref={remoteVideo}
                playsInline
                // autoPlay
                // muted
                controls
                style={{ width: "500px" }}
              />
            ) : null}
          </div>
        </div>
        {/* input container */}
        <div className="myId">
          <Input
            id="filled-basic"
            value={localName}
            onChange={(e) => {
              setLocalName(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <CopyToClipboard
            text={localId}
            style={{ marginBottom: "10px" }}
          >
            <Button
              style={{ width: "100%", height: "100%" }}
              color="primary"
            >
              <BoxIcon fontSize="large" />
              我的通话ID
            </Button>
          </CopyToClipboard>
          <Input
            id="filled-basic"
            value={idToCall}
            onChange={(e) => {
              setIdToCall(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <label>对方通话ID</label>"请输入对方通话ID"
          <div className="callButtons">
            {callAccepted && !callEnded ? (
              <Button
                color="secondary"
                onClick={() => handleCallEnded()}
              >
                结束通话
              </Button>
            ) : (
              <PhoneIcon fontSize="large" />
            )}
          </div>
        </div>
        {/* accept call */}
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{userName}正在呼叫</h1>
            <Button
              color="primary"
              onClick={() => handleCallAnswer()}
            >
              同意接听
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChatPage;
