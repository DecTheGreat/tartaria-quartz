import { runPublisher } from "./publisher-v2/lib/publisher.mjs";

runPublisher().catch((error) => {
  console.error("");
  console.error(`Tartaria Publisher failed: ${error.message}`);
  process.exitCode = 1;
});
