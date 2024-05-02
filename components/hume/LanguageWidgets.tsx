"use client";
import { useContext, useEffect, useRef, useState } from "react";

import { Emotion } from "@/lib/data/emotion";
import { LanguagePrediction } from "../../lib/data/languagePrediction";
import { TextArea } from "@/components/hume/textarea";
import { TopEmotions } from "@/components/hume/TopEmotions";
import { AuthContext } from "@/components/hume/Auth";
import { getApiUrlWs } from "@/lib/utilities/environmentUtilities";
import { Badge } from "../ui/badge";
type StatusKeys =
  | "connectingToServer"
  | "connected"
  | "noText"
  | "reconnecting"
  | "error";

const statusDictionary: Record<
  StatusKeys,
  {
    title: string;
    bgColor: string;
  }
> = {
  connectingToServer: {
    title: "Connecting...",
    bgColor: "bg-blue-700",
  },
  connected: {
    title: "Connected",
    bgColor: "bg-green-700",
  },
  noText: {
    title: "No Text Input Yet",
    bgColor: "bg-green-700",
  },
  reconnecting: {
    title: "Reconnecting...",
    bgColor: "bg-yellow-700",
  },
  error: {
    title: "Error",
    bgColor: "bg-red-700",
  },
};

export default function LanguageWidgets() {
  const authContext = useContext(AuthContext);
  const socketRef = useRef<WebSocket | null>(null);
  const mountRef = useRef(true);
  const numReconnects = useRef(0);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [status, setStatus] = useState<StatusKeys>("connectingToServer");
  const [text, setText] = useState("");
  const maxReconnects = 3;

  useEffect(() => {
    mountRef.current = true;
    connect();

    return () => {
      console.log("Tearing down component");
      stopEverything();
    };
  }, []);

  useEffect(() => {
    sendRequest();
  }, [text]);

  function connect() {
    const baseUrl = getApiUrlWs(authContext.environment);
    const socketUrl = `${baseUrl}/v0/stream/models?apikey=${authContext.key}`;

    console.log(`Connecting to websocket... (using ${socketUrl})`);
    setStatus("connectingToServer");
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = socketOnOpen;
    socketRef.current.onmessage = socketOnMessage;
    socketRef.current.onclose = socketOnClose;
    socketRef.current.onerror = socketOnError;
  }

  async function socketOnOpen() {
    console.log("Connected to websocket");
    setStatus("connected");
    sendRequest();
  }

  async function socketOnMessage(event: MessageEvent) {
    setStatus("connected");
    const response = JSON.parse(event.data);
    console.log("Got response", response);
    const predictions: LanguagePrediction[] =
      response.language?.predictions || [];
    const warning = response.language?.warning || "";
    const error = response.error;
    if (error) {
      setStatus("error");
      console.error(error);
      stopEverything();
      return;
    }

    if (predictions.length === 0) {
      setStatus("noText");
      console.log(warning.replace(".", ""));
      setEmotions([]);
    } else {
      setEmotions(predictions[0].emotions);
    }
  }

  async function socketOnClose(event: CloseEvent) {
    console.log("Socket closed");

    if (mountRef.current === true) {
      setStatus("reconnecting");
      console.log("Component still mounted, will reconnect...");
      connect();
    } else {
      console.log("Component unmounted, will not reconnect...");
    }
  }

  async function socketOnError(event: Event) {
    console.error("Socket failed to connect: ", event);
    if (numReconnects.current > maxReconnects) {
      setStatus("error");
      console.log(`Failed to connect to the Hume API.`);
    } else {
      numReconnects.current++;
      console.warn(`Connection attempt ${numReconnects.current}`);
    }
  }

  function stopEverything() {
    console.log("Stopping everything...");
    mountRef.current = false;
    const socket = socketRef.current;
    if (socket) {
      console.log("Closing socket");
      socket.close();
      socketRef.current = null;
    } else {
      console.warn("Could not close socket, not initialized yet");
    }
  }

  async function sendRequest() {
    if (text === "") {
      setEmotions([]);
    }

    // Note: Temporary fix for bug where language model fails if
    // the input is just a single space (or a newline)
    if (text.trim() === "") {
      return;
    }

    const socket = socketRef.current;
    if (!socket) {
      console.log("No socket found");
      return;
    }

    if (socket.readyState === WebSocket.OPEN) {
      const requestData = JSON.stringify({
        data: text,
        models: {
          language: {
            granularity: "passage",
          },
        },
        raw_text: true,
      });
      socket.send(requestData);
    } else {
      console.log("Socket connection not open");
      socket.close();
    }
  }

  const currentStatus = statusDictionary[status];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        <TextArea
          className="mb-6 w-full md:w-[500px]"
          text={text}
          placeholder="Start typing here!"
          onChange={setText}
        />
        <div className="flex items-center justify-between mb-4 text-foreground w-[400px]">
          <h2 className="text-2xl font-bold">Status</h2>
          <Badge variant={"outline"} className={currentStatus.bgColor}>
            {currentStatus.title}
          </Badge>
        </div>
        <TopEmotions emotions={emotions} />
      </div>
    </div>
  );
}
