/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*
*/

import { ZosmfRestClient } from "../../../rest";
import { Session, ImperativeError, Imperative } from "@brightside/imperative";
import { ListWorkflows } from "../../../workflows";
import {
    WorkflowConstants,
    noSession,
    nozOSMFVersion,
    //noValue,
    noFilter
} from "../../src/api/WorkflowConstants";
import { IWorkflowsInfo } from "../../src/api/doc/IWorkflowsInfo";

const system = "SYS1";
const category = "Provisioning";
const statusName = "complete";
const owner = "owner1";
const vendor = "IBM";
const nocategory = "null ";
const novendor = "null";
const nosystem = "";
const nostatusname = "";
const noowner = ""


const START_RESOURCE_QUERY: string = `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/${WorkflowConstants.WORKFLOW_RESOURCE}`;

const PRETEND_ZOSMF_RESPONSE: IWorkflowsInfo = {
    workflowKey: "73c81ef4-eccc-47ce-8f08-8a5c97e753f1",
    workflowDescription: "Workflow test",
    workflowID: "Workflow test",
    workflowVersion: "1.0",
    vendor: "IBM",
    owner: "owner1",
    category: "Provisioning",
    statusName: "complete",
    system: "SYS1"
};
const PRETEND_INPUT: IWorkflowsInfo = {
    category: category,
    system: system,
    owner: owner,
    vendor: vendor,
    statusName: statusName
};
const PRETEND_URL = START_RESOURCE_QUERY + `?category=${category}&system=${system}&owner=${owner}&vendor=${vendor}&statusName=${statusName}`;

const PRETEND_SESSION = new Session({
    user: "usr",
    password: "pasword",
    hostname: "host.com",
    port: 443,
    type: "basic",
    rejectUnauthorized: false
});

function expectZosmfResponseSucceeded(response: any, error: ImperativeError) {
    expect(error).not.toBeDefined();
    expect(response).toBeDefined();
}

function expectZosmfResponseFailed(response: any, error: ImperativeError, msg: string) {
    expect(response).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error.details.msg).toContain(msg);
}

describe("List workflows", () => {
    it("Successful call with all optional parameters returns IWorkflows response.", async () => {

        (ZosmfRestClient.getExpectJSON as any) = jest.fn<string>(() => {
            return new Promise((resolve) => {
                process.nextTick(() => {
                    resolve(PRETEND_ZOSMF_RESPONSE);
                });
            });
        });

        let error: ImperativeError;
        let response: any;
        try {
            response = await ListWorkflows.listWorkflows(PRETEND_SESSION, undefined, category, system, owner, vendor, statusName);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
        expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, PRETEND_URL);
        expectZosmfResponseSucceeded(response, error);
        expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
    });


    it("Successful call without optional parameters returns IWorkflows response.", async () => {

        (ZosmfRestClient.getExpectJSON as any) = jest.fn<string>(() => {
            return new Promise((resolve) => {
                process.nextTick(() => {
                    resolve(PRETEND_ZOSMF_RESPONSE);
                });
            });
        });

        let error: ImperativeError;
        let response: any;
        try {
            response = await ListWorkflows.listWorkflows(PRETEND_SESSION);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
        expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY);
        expectZosmfResponseSucceeded(response, error);
        expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
    });

    it(" Should succeed even with zOSMF version undefined (because of default value).", async () => {
        (ZosmfRestClient.getExpectJSON as any) = jest.fn<string>(() => {
            return new Promise((resolve) => {
                process.nextTick(() => {
                    resolve(PRETEND_ZOSMF_RESPONSE);
                });
            });
        });

        let error: ImperativeError;
        let response: any;
        try {
            response = await ListWorkflows.listWorkflows(PRETEND_SESSION, undefined);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
        expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY);
        expectZosmfResponseSucceeded(response, error);
        expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
    });
    it("Throws an error with undefined session.", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await ListWorkflows.listWorkflows(undefined);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, noSession.message);
    });
    it("Throws an error with zOSMF version as empty string.", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await ListWorkflows.listWorkflows(PRETEND_SESSION, null);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, nozOSMFVersion.message);
    });

    // it("Throws an error with category name as empty string.", async () => {
    //     let error: ImperativeError;
    //     let response: any;
    //     try {
    //         response = await ListWorkflows.listWorkflows(PRETEND_SESSION, undefined, nocategory);
    //         Imperative.console.info(`Response ${response}`);
    //     } catch (thrownError) {
    //         error = thrownError;
    //         Imperative.console.info(`Error ${error}`);
    //     }
    //     expectZosmfResponseFailed(response, error, noFilter.message);
    // });

});

