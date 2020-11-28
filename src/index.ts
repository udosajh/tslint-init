import fs = require("fs");
import shelljs = require("shelljs");
import path = require("path");
import jsBeautify = require("js-beautify");
import process = require("process");
import yargs = require("yargs");

const currentDirPath = shelljs.pwd().stdout;

const args = yargs(process.argv).options({
    "indentation": {
        alias: "i",
        description: "indentation of tslint and package json",
        type: "number",
        default: 4
    },
    "tsconfigFileName": {
        description: "tsconfig file to run tslint.tsconfig file name example => tsconfig.json, tsconfig.src.json etc. tslint -c tslint.json -p <tsconfigFileName>",
        alias: "t",
        type: "string",
        default: "tsconfig.json"
    },
    "lintCommand": {
        description: "add lint command in package json",
        alias: "l",
        type: "boolean",
        default: true,
    }
}).help("help").argv;

const tslint = {
    "rules": {
        "class-name": true,
        "comment-format": [
            true,
            "check-space"
        ],
        "indent": [
            true,
            "spaces"
        ],
        "one-line": [
            true,
            "check-open-brace",
            "check-whitespace"
        ],
        "no-var-keyword": true,
        "quotemark": [
            true,
            "double",
            "avoid-escape"
        ],
        "semicolon": [
            true,
            "always",
            "ignore-bound-class-methods"
        ],
        "whitespace": [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-module",
            "check-separator",
            "check-type"
        ],
        "typedef-whitespace": [
            true,
            {
                "call-signature": "nospace",
                "index-signature": "nospace",
                "parameter": "nospace",
                "property-declaration": "nospace",
                "variable-declaration": "nospace"
            },
            {
                "call-signature": "onespace",
                "index-signature": "onespace",
                "parameter": "onespace",
                "property-declaration": "onespace",
                "variable-declaration": "onespace"
            }
        ],
        "no-internal-module": true,
        "no-trailing-whitespace": true,
        "no-null-keyword": true,
        "prefer-const": true,
        "jsdoc-format": true,
    }
};


const tsconfigBaseFilePath = currentDirPath + path.sep + "tslint.json";
const indentOpt: jsBeautify.JSBeautifyOptions = { "indent_size": args.indentation, "wrap_line_length": 1 };
fs.writeFileSync(tsconfigBaseFilePath, jsBeautify.js_beautify(JSON.stringify(tslint), indentOpt));

if (args.lintCommand) {
    try {
        console.log("adding lint command in package.json");
        const packagePath = currentDirPath + path.sep + "package.json";
        const packageObj = JSON.parse(fs.readFileSync(packagePath).toString());
        packageObj["scripts"]["lint"] = "tslint -c tslint.json -p " + args.tsconfigFileName;
        fs.writeFileSync(packagePath, jsBeautify.js_beautify(JSON.stringify(packageObj), indentOpt));
    } catch (err) {
        console.log(err);
    }
}
