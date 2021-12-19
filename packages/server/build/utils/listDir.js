import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { config } from "../config";
export const listDir = (folderType) => {
    const listings = [];
    const dirPath = join(config.rootVideoPath, folderType);
    const isDirAvailable = existsSync(dirPath);
    if (!isDirAvailable)
        throw new Error("directory doesnt exist");
    const dirs = readdirSync(dirPath);
    return dirs;
};
//# sourceMappingURL=listDir.js.map