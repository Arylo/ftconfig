import test from "ava";
import * as fs from "fs";
import * as config from "../lib";
import { copyFileMacro } from "./common/macros";
import { createNewFilepath } from "./common/utils";

const FILENAME = "pkg.json";
let filepath: string;

test.beforeEach(async () => {
    filepath = await copyFileMacro(FILENAME);
});

test("Read File", (t) => {
    const obj = config.readFile(filepath).toObject();
    t.is(obj.name, "ftconfig");
});

test("Save File", async (t) => {
    const newFilepath = createNewFilepath(FILENAME);
    config.readFile(filepath).save(newFilepath);
    t.true(fs.existsSync(newFilepath));
    const obj = config.readFile(newFilepath).toObject();
    t.is(obj.name, "ftconfig");
});

test("Modify Object", (t) => {
    const obj = config
        .readFile(filepath)
        .modify((o) => {
            o.name = "test";
            return o;
        })
        .toObject();
    t.is(obj.name, "test");
});