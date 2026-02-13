// validate.js
const fs = require("fs");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync("schema.json", "utf8"));
const theme = JSON.parse(fs.readFileSync("theme.json", "utf8"));

const validate = ajv.compile(schema);
const valid = validate(theme);

if (valid) {
  console.log("Valid.");
} else {
  for (const e of validate.errors) {
    const loc = e.instancePath || "/";
    console.log(`- ${loc} ${e.message}`);
  }
  process.exit(1);
}
