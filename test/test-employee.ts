import * as ExpressCore from "express-serve-static-core";
import * as chai from "chai";
import chaiHttp = require("chai-http");
import { AppServer } from "../server";
import * as http_status_codes from "http-status-codes";

import { DataContext, TempDataStore, CloudDataStore } from "entityjs";

var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
var context = new DataContext(new TempDataStore());
var appServer = new AppServer(context);
var server = appServer.start();

function responseString(res: any) {
    if (res.error) {
        return `Response: Error: ${JSON.stringify(res.error)}`;
    } else {
        return `Response: ${JSON.stringify(res.body)}`;
    }
}

describe('employee', function () {
    it("api: about", function (done) {
        chai.request(server)
            .get("/api/about")
            .end((err, res) => {
                console.log(responseString(res));
                res.should.have.status(http_status_codes.OK);
                done();
            });
    });

    it('employee: create', function name(done: MochaDone) {
        chai.request(server)
            .post("/api/employee")
            .send({
                id: "fieryorc",
                name: "Prem Ramanathan"
            })
            .end((err: ChaiHttp.Request, res: ChaiHttp.Response) => {
                console.log(responseString(res));
                should.equal(http_status_codes.OK, res.status);
                done();
            });
    });

    it("employee: get", function (done) {
        chai.request(server)
            .get("/api/employee/fieryorc")
            .end((err, res) => {
                console.log(responseString(res));
                should.equal(http_status_codes.OK, res.status);
                should.equal("Prem Ramanathan", res.body.name);
                done();
            });
    });

    it("employee: delete", function (done) {
        chai.request(server)
            .del("/api/employee/fieryorc")
            .end((err, res) => {
                console.log(responseString(res));
                expect(res.status).be.equal(http_status_codes.OK);
                done();
            });
    });
});