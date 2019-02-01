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
import {
    WorkflowConstants,
    noSession,
    noWorkflowKey,
    noOwner,
    nozOSMFVersion,
    noSteps,
    noVariables
} from "../../src/api/WorkflowConstants";
import { IVariable } from "../../src/api/doc/IVariable";
import { IWorkflowInfo } from "../../src/api/doc/IWorkflowInfo";

const wfName = "Test-Workflow";
const wfDefinitionFile = "/tmp/workflow.xml";
const systemName = "SYS1";
const wfOwner = "ABCDE01";
const varInputFile = "/tmp/var.properties";
const variables = "DUMMY=DUMMY";
const assign = true;
const access = "Public";
const deleteJobs = false;
const propertiesText = "WRONG_VAR";
const wfKey = "73c81ef4-eccc-47ce-8f08-8a5c97e753f1";
const wfVersion = "1.0";
const propertiesSteps = false;
const propertiesVariables = false;

const START_RESOURCE_QUERY: string =    `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/
                                        ${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}`;
const START_RESOURCE_QUERY_ALL_PARMS: string =  `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/
                                                ${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}?${WorkflowConstants.returnData}=
                                                ${WorkflowConstants.steps},${WorkflowConstants.variables}`;
const START_RESOURCE_QUERY_STEPS: string =  `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/
                                            ${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}?${WorkflowConstants.returnData}=
                                            ${WorkflowConstants.steps}`;
const START_RESOURCE_QUERY_VARIABLES: string =  `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/
                                                ${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}?${WorkflowConstants.returnData}=
                                                ${WorkflowConstants.variables}`;

const PRETEND_ZOSMF_RESPONSE: IWorkflowInfo = {
    workflowName: "wf1",
    workflowKey: "73c81ef4-eccc-47ce-8f08-8a5c97e753f1",
    workflowDescription: "test workflow properties",
    workflowID: "Workflow test",
    workflowVersion: "1.0",
    workflowDefinitionFileMD5Value: "md5value",
    vendor: "CA Technologies, a Broadcom company",
    owner: "zlapa01",
    system: "CA11",
    category: "general",
    productID: "CA",
    productName: "ZOWE",
    productVersion: "1.0",
    percentComplete: 100,
    isCallable: false,
    containsParallelSteps : false,
    scope: "instance",
    statusName: "completed",
    deleteCompletedJobs: true,
    // automationStatus
    accountInfo: "12700001",
    jobStatement: "JOB001",
    templateID: "null",
    actionID: "null",
    registryID: "Broadcom",
    parentRegistryID: "null",
    domainID: "null",
    tenantID: "null",
    softwareServiceInstanceName: "Instance1",
    templateName: "null",
    // steps
    // variables
};
const Variable: IVariable = {
    name: "DUMMY",
    value: "DUMMY"
};
const PRETEND_INPUT_PARMS: IWorkflowInfo = {
    workflowName: "wf1",
    workflowKey: "73c81ef4-eccc-47ce-8f08-8a5c97e753f1",
    workflowDescription: "test workflow properties",
    workflowID: "Workflow test",
    workflowVersion: "1.0",
    workflowDefinitionFileMD5Value: "md5value",
    vendor: "CA Technologies, a Broadcom company",
    owner: "zlapa01",
    system: "CA11",
    category: "general",
    productID: "CA",
    productName: "ZOWE",
    productVersion: "1.0",
    percentComplete: 100,
    isCallable: false,
    containsParallelSteps : false,
    scope: "instance",
    statusName: "completed",
    deleteCompletedJobs: true,
    // automationStatus
    accountInfo: "12700001",
    jobStatement: "JOB001",
    templateID: "null",
    actionID: "null",
    registryID: "Broadcom",
    parentRegistryID: "null",
    domainID: "null",
    tenantID: "null",
    softwareServiceInstanceName: "Instance1",
    templateName: "null",
    // steps
    // variables
};
const PRETEND_SESSION = new Session({
    user: "usr",
    password: "pasword",
    hostname: "host.com",
    port: 443,
    type: "basic",
    rejectUnauthorized: false
});
const HEAD = Headers.APPLICATION_JSON;

function expectZosmfResponseSucceeded(response: any, error: ImperativeError) {
    expect(error).not.toBeDefined();
    expect(response).toBeDefined();
}

function expectZosmfResponseFailed(response: any, error: ImperativeError, msg: string) {
    expect(response).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error.details.msg).toContain(msg);
}
describe("Get workflow properties", () => {
    describe("Successful scenarios", () => {
        it("Successful call without optional parameters returns IRegisteredWorkflow properties response.", async () => {

            (ZosmfRestClient.postExpectJSON as any) = jest.fn<string>(() => {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        resolve(PRETEND_ZOSMF_RESPONSE);
                    });
                });
            });

            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD], PRETEND_INPUT_PARMS);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call with all optional parameters returns IRegisteredWorkflow properties response.", async () => {

            (ZosmfRestClient.postExpectJSON as any) = jest.fn<string>(() => {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        resolve(PRETEND_ZOSMF_RESPONSE);
                    });
                });
            });

            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, true, true);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY_ALL_PARMS,
                [HEAD], PRETEND_INPUT_PARMS);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call with optional steps returns IRegisteredWorkflow properties response.", async () => {

            (ZosmfRestClient.postExpectJSON as any) = jest.fn<string>(() => {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        resolve(PRETEND_ZOSMF_RESPONSE);
                    });
                });
            });

            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, true, false);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY_STEPS,
                [HEAD], PRETEND_INPUT_PARMS);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call with optional variables returns IRegisteredWorkflow properties response.", async () => {

            (ZosmfRestClient.postExpectJSON as any) = jest.fn<string>(() => {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        resolve(PRETEND_ZOSMF_RESPONSE);
                    });
                });
            });

            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, false, true);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.postExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY_VARIABLES,
                [HEAD], PRETEND_INPUT_PARMS);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

    });

    describe("Fail scenarios", () => {
        it("Throws an error with undefined session.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(undefined, wfKey, wfVersion, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noSession.message);
        });
        it("Throws an error with undefined workflow key.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.
                getWorkflowProperties(PRETEND_SESSION, undefined, wfVersion, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noWorkflowKey.message);
        });
        it("Throws an error with undefined workflow zosmf version.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, undefined, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, nozOSMFVersion.message);
        });
        it("Throws an error with undefined steps parameter.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, undefined, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noSteps.message);
        });
        it("Throws an error with undefined variables parameter.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, propertiesSteps, undefined);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noVariables.message);
        });
        it("Throws an error with workflow key as empty string.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, "", wfVersion, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noWorkflowKey.message);
        });
        it("Throws an error with zOSMF version as empty string.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, "", propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, nozOSMFVersion.message);
        });
        it("Throws an error with steps parameter as empty string.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, null, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noSteps.message);
        });
        it("Throws an error with variables parameter as empty string.", async () => {
            let error: ImperativeError;
            let response: any;
            try {
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, propertiesSteps, null);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expectZosmfResponseFailed(response, error, noVariables.message);
        });

    });
});
