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
import { IWorkflowInfo, StartWorkflow } from "../../../workflows";
import { WorkflowConstants, noSession } from "../../src/api/WorkflowConstants";

const wfKey = "1234567_abcde";

let START_RESOURCE_QUERY: string = `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/`;
START_RESOURCE_QUERY += `${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}/${WorkflowConstants.START_WORKFLOW}`;


const PRETEND_SESSION = new Session({
    user: "usr",
    password: "pasword",
    hostname: "host.com",
    port: 443,
    type: "basic",
    rejectUnauthorized: false
});


function expectZosmfResponseSucceeded(response: IWorkflowInfo, error: ImperativeError) {
    expect(error).not.toBeDefined();
    expect(response).toBeDefined();
}

function expectZosmfResponseFailed(response: IWorkflowInfo, error: ImperativeError, msg: string) {
    expect(response).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error.details.msg).toContain(msg);
}


describe("Start workflow", () => {

    it("I have seriously no fucking clue", async () => {

        (ZosmfRestClient.putExpectString as any) = jest.fn<string>(() => {
            return "";
        });

        let error: ImperativeError;
        let response: any;
        try {
            response = await StartWorkflow.startWorkflow(PRETEND_SESSION, null, wfKey, WorkflowConstants.ZOSMF_VERSION);
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

    it("should throw an error if the session parameter is undefined", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await StartWorkflow.startWorkflow(undefined, null, wfKey, WorkflowConstants.ZOSMF_VERSION);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, noSession.message);
    });
});
   /*  it("should throw an error if the z/OSMF version parameter is undefined", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await DeleteInstance.deleteDeprovisionedInstance(PRETEND_SESSION, undefined, instanceId);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, nozOSMFVersion.message);
    });

    it("should throw an error if the z/OSMF version parameter is an empty string", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await DeleteInstance.deleteDeprovisionedInstance(PRETEND_SESSION, "", instanceId);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, nozOSMFVersion.message);
    });

    it("should throw an error if the instance-id parameter is undefined", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await DeleteInstance.deleteDeprovisionedInstance(PRETEND_SESSION, ProvisioningConstants.ZOSMF_VERSION, undefined);
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, noInstanceId.message);
    });

    it("should throw an error if the instance-id parameter is an empty string", async () => {
        let error: ImperativeError;
        let response: any;
        try {
            response = await DeleteInstance.deleteDeprovisionedInstance(PRETEND_SESSION, ProvisioningConstants.ZOSMF_VERSION, "");
            Imperative.console.info(`Response ${response}`);
        } catch (thrownError) {
            error = thrownError;
            Imperative.console.info(`Error ${error}`);
        }
        expectZosmfResponseFailed(response, error, noInstanceId.message);
    });
}); */
