import fs from "fs";
import path from "path";

const dirname = path.resolve();
const fileName = path.join(dirname, "assets/insulte.txt");

export const bark = fs.readFileSync(fileName).toString().split("\n");
