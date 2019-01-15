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
import { Session, ImperativeError, Imperative, Headers } from "@brightside/imperative";
import { PropertiesWorkflows } from "../../../workflows";
import { WorkflowConstants, noSession, noFilter } from "../../src/api/WorkflowConstants";
// import { IProvisionedInstances, ListRegistryInstances, noSessionProvisioning, nozOSMFVersion, ProvisioningConstants } from "../../../provisioning";

const category = "Provisioning";
const system = "CA11";
const statusName = "complete";
const owner = "user";
const vendor = "CA Technologies";

let START_RESOURCE_QUERY: string = `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/`;
START_RESOURCE_QUERY += `${WorkflowConstants.WORKFLOW_RESOURCE}/${WorkflowConstants.PROPERTIES_WORKFLOWS}/?
                        ${category}/?${system}/?${statusName}/?${owner}/?${vendor}`;
// START_RESOURCE_QUERY += `${ WorkflowConstants.RESOURCE }/${ WorkflowConstants.PROPERTIES_WORKFLOWS }`;

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

describe("PropertiesWorkflows", () => {
    // list all
    it("Successfull call returns 200 - no message. Test properties all workflows.", async () => {
        (ZosmfRestClient.putExpectString as any) = jest.fn<string>(() => {
            return "";
        });

        let error: ImperativeError;
        let response: any;
        try {
            response = await PropertiesWorkflows.propertiesWorkflows(PRETEND_SESSION);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expect((ZosmfRestClient.putExpectString as any)).toHaveBeenCalledTimes(1);
        expect((ZosmfRestClient.putExpectString as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [Headers.APPLICATION_JSON], { });
        expectZosmfResponseSucceeded(response, error);
        expect(response).toEqual("");
    });

    // list with filters
    it("Successfull call returns 200 - no message. Test properties workflows with filter.", async () => {
        (ZosmfRestClient.putExpectString as any) = jest.fn<string>(() => {
            return "";
        });

        let error: ImperativeError;
        let response: any;
        try {
            response = await PropertiesWorkflows.propertiesWorkflows(PRETEND_SESSION, category, owner, vendor, statusName, system);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
    //    expect((ZosmfRestClient.putExpectString as any)).toHaveBeenCalledTimes(1);
    //    expect((ZosmfRestClient.putExpectString as any)).
    //     toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [Headers.APPLICATION_JSON], { });
    //    expectZosmfResponseSucceeded(response, error);
   //     expect(response).toEqual("");
    });

    // error session
    it("should throw an error if the session parameter is undefined", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await PropertiesWorkflows.propertiesWorkflows(undefined,category);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, noSession.message);
    });

    // empty filter
    it("Should throw error if filter is empty string.", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await PropertiesWorkflows.propertiesWorkflows(PRETEND_SESSION, "");
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, noFilter.message);
    });
});
