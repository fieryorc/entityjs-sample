import * as ExpressCore from "express-serve-static-core";
import { IDataContext, CloudDataStore, createDataContext } from "entityjs";
import { AppServer } from "./server";

var context = createDataContext(new CloudDataStore("<PUT-YOUR-GOOGLE-PROJECT-ID-HERE>"));
var useMemoryStore = false;

var appServer = new AppServer(context);
export default appServer.start();