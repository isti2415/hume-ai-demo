import { None, Optional } from "@/lib/utilities/typeUtilities";
import { useContext, useEffect, useRef, useState } from "react";

import { AudioPrediction } from "@/lib/data/audioPrediction";
import { AudioRecorder } from "@/lib/media/audioRecorder";
import { AuthContext } from "../hume/Auth";
import { DiscreteTimeline } from "./DiscreteTimeline";
import { TopEmotions } from "./TopEmotions";
import { blobToBase64 } from "@/lib/utilities/blobUtilities";
import { getApiUrlWs } from "@/lib/utilities/environmentUtilities";
import { Badge } from "../ui/badge";

interface AudioWidgetsProps {
  modelName: string;
  recordingLengthMs: number;
  streamWindowLengthMs: number;
  onTimeline: Optional<(predictions: AudioPrediction[]) => void>;
}

type StatusKeys =
  | "connectingToServer"
  | "connected"
  | "noVocalBursts"
  | "noSpeech"
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
  noVocalBursts: {
    title: "No vocal bursts detected",
    bgColor: "bg-green-700",
  },
  noSpeech: {
    title: "No speech detected",
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

export function AudioWidgets({
  modelName,
  recordingLengthMs,
  streamWindowLengthMs,
  onTimeline,
}: AudioWidgetsProps) {
  const authContext = useContext(AuthContext);
  const socketRef = useRef<WebSocket | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioBufferRef = useRef<Blob[]>([]);
  const mountRef = useRef(true);
  const numReconnects = useRef(0);
  const serverReadyRef = useRef(true);
  const [predictions, setPredictions] = useState<AudioPrediction[]>([]);
  const [status, setStatus] = useState<StatusKeys>("connectingToServer");
  const maxReconnects = 3;

  const emotions = predictions.length == 0 ? [] : predictions[0].emotions;

  useEffect(() => {
    mountRef.current = true;
    connect();

    return () => {
      console.log("Tearing down component");
      stopEverything();
    };
  }, []);

  async function connect() {
    const baseUrl = getApiUrlWs(authContext.environment);
    const socketUrl = `${baseUrl}/v0/stream/models?apikey=${authContext.key}`;

    serverReadyRef.current = true;

    console.log(`Connecting to websocket... (using ${socketUrl})`);
    setStatus(`connectingToServer`);
    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = socketOnOpen;
    socketRef.current.onmessage = socketOnMessage;
    socketRef.current.onclose = socketOnClose;
    socketRef.current.onerror = socketOnError;
  }

  async function socketOnOpen() {
    console.log("Connected to websocket");
    setStatus("connected");

    recorderRef.current = await AudioRecorder.create();

    while (mountRef.current) {
      const blob = await recorderRef.current.record(recordingLengthMs);
      audioBufferRef.current.push(blob);
      if (serverReadyRef.current) {
        sendRequest();
      }
    }
  }

  async function socketOnMessage(event: MessageEvent) {
    setStatus("connected");
    const response = JSON.parse(event.data);
    console.log("Got response", response);
    const newPredictions: AudioPrediction[] =
      response[modelName]?.predictions || [];
    const warning = response[modelName]?.warning || "";
    const error = response.error;
    if (error) {
      setStatus(error);
      console.error(error);
      stopEverything();
      return;
    }

    setPredictions(newPredictions);
    if (onTimeline) {
      onTimeline(newPredictions);
    }
    if (newPredictions.length == 0) {
      if (modelName == "burst") {
        setStatus("noVocalBursts");
      } else {
        setStatus("noSpeech");
      }
    }

    if (audioBufferRef.current.length > 0) {
      sendRequest();
    } else {
      serverReadyRef.current = true;
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
      console.log(`Failed to connect to the Hume API (${authContext.environment}).
      Please log out and verify that your API key is correct.`);
      stopEverything();
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
    const recorder = recorderRef.current;
    if (recorder) {
      console.log("Stopping recorder");
      recorder.stopRecording();
      recorderRef.current = null;
    } else {
      console.warn("Could not stop recorder, not initialized yet");
    }
  }

  async function sendRequest() {
    console.log(
      `Will send ${audioBufferRef.current.length} recorded blobs to server`
    );

    const socket = socketRef.current;

    if (!socket) {
      console.log("No socket on state");
      return;
    }

    if (socket.readyState === WebSocket.OPEN) {
      const combinedBlob = new Blob(audioBufferRef.current);
      serverReadyRef.current = false;
      audioBufferRef.current = [];

      const encodedBlob = await blobToBase64(combinedBlob);
      const response = JSON.stringify({
        data: encodedBlob,
        models: {
          [modelName]: {},
        },
        stream_window_ms: streamWindowLengthMs,
      });

      socket.send(response);
    } else {
      console.log("Socket not open");
      socket.close();
    }
  }

  const currentStatus = statusDictionary[status];

  return (
    <div className="p-4 flex flex-col items-center justify-center w-full">
      <div className="flex items-center justify-between mb-4 text-foreground w-full">
        <h2 className="text-2xl font-bold">Status</h2>
        <Badge variant={"outline"} className={currentStatus.bgColor}>
          {currentStatus.title}
        </Badge>
      </div>
      {!onTimeline && <TopEmotions emotions={emotions} />}
      {onTimeline && (
        <div className="ml-10">
          <DiscreteTimeline predictions={predictions} />
        </div>
      )}
    </div>
  );
}

AudioWidgets.defaultProps = {
  onTimeline: None,
};
