import test from "ava";
import ftconfig0 from "../../lib";
import ftconfig1 = require("../../lib");

test("es import", (t) => {
    t.is(typeof ftconfig0.read, "function");
    t.is(typeof ftconfig0.readFile, "function");
});

test("ts import", (t) => {
    t.is(typeof ftconfig1.read, "function");
    t.is(typeof ftconfig1.readFile, "function");
});
