import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Folder, Status } from "../components/Folder";
import { io } from "socket.io-client";
import { Navbar } from "../components/Navbar";
import { apiConfig, apiUrl } from "../config/api";

interface Folder {
  filename: string;
  id: number;
  hash: string;
  status: Status;
}

interface SocketProgress {
  hashed?: string;
  progress: string;
}

interface LogResponse extends SocketProgress {
  data: {
    hashedValue: string;
  };
}

const Home: NextPage = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [logResponse, setLogResponse] = useState<LogResponse>();

  const fetchFolders = async () => {
    const response = await fetch(`${apiUrl}/video`);
    const jsonResponse = await response.json();
    setFolders(jsonResponse);
  };

  useEffect(() => {
    const wsUrl = `ws://${apiConfig.host}`;
    const newSocket = io(wsUrl, {
      transports: ["websocket"],
    });

    newSocket.on("connect", function () {
      console.log("connected");
    });

    newSocket.on("log", function (result: LogResponse) {
      console.log(result);
      setLogResponse(result);
    });
    fetchFolders();

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <div>
      <Head>
        <title>Torrent Flix</title>
      </Head>
      <Navbar fetchFolders={fetchFolders} />
      <div className="mt-24 sm:w-full">
        {folders.length
          ? folders?.map((value, index) => (
              <Folder
                key={index}
                name={value.filename}
                hash={value.hash}
                id={value.id}
                fetchFolders={fetchFolders}
                status={value.status}
                progress={
                  logResponse?.data.hashedValue === value.hash
                    ? logResponse.progress
                    : undefined
                }
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
