import { FolderIcon, TrashIcon } from "@heroicons/react/outline";
import styles from "../styles/Folder.module.css";
import Link from "next/link";

export type Status = "Downloaded" | "Pending";
interface FolderProps {
  name: string;
  hash: string;
  id: number;
  progress?: string;
  status: Status;
  fetchFolders: () => void;
}

export const Folder: React.FC<FolderProps> = ({
  name,
  id,
  fetchFolders,
  progress,
  hash,
  status,
}) => {
  const deleteVideoById = async () => {
    await fetch(`http://localhost:5600/video/${id}`, {
      method: "DELETE",
    });
    fetchFolders();
  };

  const folderStatus: Record<Status, string> = {
    Downloaded: "text-gray-50 bg-green-600",
    Pending: "bg-indigo-200",
  };
  console.log(status);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <FolderIcon className="h-8 block fill-current text-yellow-400" />
        <div className="flex lg:flex-row justify-between w-full sm:flex-col">
          <Link href={`/videos/${hash}`}>
            <a className="lg:text-2xl md:text-lg sm:text-md">{name}</a>
          </Link>
          <p
            className={`border-gray-700 rounded-md ${folderStatus[status]} flex items-center px-2`}
          >
            {progress === "" ? "Downloaded" : status}
          </p>
          <p>{progress ? `Downloading ${progress}` : null}</p>

          <button className="pr-4" onClick={deleteVideoById}>
            <TrashIcon className="text-red-700 h-8 block " />
          </button>
        </div>
      </div>
    </div>
  );
};
