import * as fs from "fs";
import makeDir = require("make-dir");
import * as path from "path";
import { IAdapter } from "../types/adapter";
import { IWriteOptions } from "../types/options.d";
import { getAdapter } from "./adapters";

export class WriteConfig<T> {
    private obj: T;
    private options: IWriteOptions;
    private adapter: IAdapter;

    constructor(obj: T, options: IWriteOptions) {
        this.obj = obj;
        this.options = options;
        this.adapter = getAdapter(this.options.type) as IAdapter;
    }

    public modify(fn: (obj: T) => T) {
        this.obj = fn(this.obj);
        return this;
    }

    public save(pathOrOptions?: string) {
        let options: any = {};
        if (typeof pathOrOptions === "string") {
            options.path = pathOrOptions;
        }
        options = Object.assign(
            {
                encoding: "utf-8",
                indent: 2
            },
            this.options,
            options
        );
        if (options.path && options.encoding) {
            if (!fs.existsSync(path.dirname(options.path))) {
                makeDir.sync(path.dirname(options.path));
            }
            const data = this.toString(options);
            fs.writeFileSync(options.path, data, {
                encoding: options.encoding
            });
        }
        return this;
    }

    public toString(options?: any) {
        return this.adapter.stringify(this.obj, options);
    }

    public toObject() {
        return this.obj;
    }
}
