import * as ExpressCore from "express-serve-static-core";
import { DataContext, CloudDataStore, EntityHelpers, IDataStore, TempDataStore } from "entityjs";
import { AppServer } from "./server";

var context = new DataContext(new CloudDataStore("<PUT-YOUR-GOOGLE-PROJECT-ID-HERE>"));
var useMemoryStore = false;

var appServer = new AppServer(context);
export default appServer.start();