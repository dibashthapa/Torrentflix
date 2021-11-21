import { existsSync, lstat, lstatSync, readdir, readdirSync } from "fs";
import { join } from "path";
import { config } from "../config";

export const listDir = (folderType: string) => {
  const listings: string[] = [];
  const dirPath = join(config.rootVideoPath as string, folderType);
  const isDirAvailable = existsSync(dirPath);
  if (!isDirAvailable) throw new Error("directory doesnt exist");
  const dirs = readdirSync(dirPath);
  return dirs;
};
