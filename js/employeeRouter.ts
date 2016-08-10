import * as express from "express";
import * as ExpressCore from "express-serve-static-core";
import * as http_status_codes from "http-status-codes";
import { IDataContext, EntityHelpers } from "entityjs";
import { EmployeeEntity } from "./entities";

export function EmployeeRouter(context: IDataContext): ExpressCore.Router {

  var employeeRouter: ExpressCore.Router = express.Router();

  // CreateEmployee
  employeeRouter.post('/', function (req: ExpressCore.Request, res: ExpressCore.Response) {
    var employeeObj = req.body;
    var employee = new EmployeeEntity();
    employee.setContext(context);
    employee.id = employeeObj.id;
    employee.name = employeeObj.name;
    employee.insert()
      .then((v) => {
        if (v) {
          res.sendStatus(http_status_codes.OK);
        } else {
          res.sendStatus(http_status_codes.CONFLICT);
        }
      })
      .catch(err => {
        res.sendStatus(http_status_codes.INTERNAL_SERVER_ERROR);
      });
  });

  // GetEmployee
  employeeRouter.get('/:id', function (req: ExpressCore.Request, res: ExpressCore.Response) {
    var employeeId = req.params.id;
    var employee = new EmployeeEntity();
    employee.setContext(context);
    employee.id = employeeId;
    employee.load()
      .then((v) => {
        if (v) {
          res.status(http_status_codes.OK)
            .json(EntityHelpers.getObject(employee, false, true, ["kind"]));
        } else {
          res.sendStatus(http_status_codes.NOT_FOUND);
        }
      })
      .catch(err => {
        res.sendStatus(http_status_codes.INTERNAL_SERVER_ERROR);
      });
  });

  // DeleteEmployee
  employeeRouter.delete('/:id', function (req: ExpressCore.Request, res: ExpressCore.Response) {
    var employeeId = req.params.id;
    var employee = new EmployeeEntity();
    employee.setContext(context);
    employee.id = employeeId;
    employee.delete()
      .then(() => {
        res.status(http_status_codes.OK).send();
      })
      .catch(err => {
        res.sendStatus(http_status_codes.INTERNAL_SERVER_ERROR);
      });
  });

  return employeeRouter;
}