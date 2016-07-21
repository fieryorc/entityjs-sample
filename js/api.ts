import * as express from "express";
import * as Express from "express-serve-static-core";
import * as http_status_codes from "http-status-codes";
import { DataContext } from "entityjs";
import { EmployeeRouter } from "./employeeRouter"

export function ApiRouter(context: DataContext) {

  var apiRouter: Express.Router = express.Router();

  apiRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  apiRouter.get('/', function (req, res) {
    res.send('Invalid request. Send specific request.');
  });

  // define the about route
  apiRouter.get('/about', function (req, res) {
    var aboutResponse = {
      server: "entityjs sample",
      version: "1.0",
      message: "Hello"
    };
    res.status(http_status_codes.OK)
      .send(aboutResponse);
  });

  apiRouter.use('/employee', EmployeeRouter(context));

  return apiRouter;
}