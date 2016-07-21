import * as express from "express";
import * as ExpressCore from "express-serve-static-core";
import * as body_parser from "body-parser";
import { DataContext, CloudDataStore, EntityHelpers } from "entityjs";

import { ApiRouter } from "./js/api";

/**
 * Starts the server and sets up the routes.
 */
export class AppServer {
  private app: ExpressCore.Express;
  private context: DataContext;

  public constructor(context: DataContext) {
    this.context = context;
  }

  public start(): ExpressCore.Express {
    this.app = express();
    this.app.use(body_parser.json());
    this.app.use(body_parser.urlencoded({ extended: true }));

    this.app.get('/', function (req, res) {
      res.send('Invalid request. Send specific request.');
    });

    this.app.use('/api', ApiRouter(this.context));

    var server = this.app.listen(process.env.PORT || 8080, function () {
      var host = server.address().address;
      var port = server.address().port;

      console.log('App listening at http://%s:%s', host, port);
    });
    return this.app;
  }
}
