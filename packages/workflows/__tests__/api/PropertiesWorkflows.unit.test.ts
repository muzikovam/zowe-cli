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
import { IAutomationStatus } from "../../src/api/doc/IAutomationStatus";
import { IStepInfo } from "../../src/api/doc/IStepInfo";
import { IVariableInfo } from "../../src/api/doc/IVariableInfo";

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
// tslint:disable-next-line:max-line-length
const START_RESOURCE_QUERY: string =    `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}`;
// tslint:disable-next-line:max-line-length
const START_RESOURCE_QUERY_ALL_PARMS: string =  `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}?${WorkflowConstants.returnData}=${WorkflowConstants.steps},${WorkflowConstants.variables}`;
// tslint:disable-next-line:max-line-length
const START_RESOURCE_QUERY_STEPS: string =  `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}?${WorkflowConstants.returnData}=${WorkflowConstants.steps}`;
// tslint:disable-next-line:max-line-length
const START_RESOURCE_QUERY_VARIABLES: string =  `${WorkflowConstants.RESOURCE}/${WorkflowConstants.ZOSMF_VERSION}/${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}?${WorkflowConstants.returnData}=${WorkflowConstants.variables}`;

const PRETEND_ZOSMF_RESPONSE_ASTATUS: IAutomationStatus = {
    startUser: "zlapa01",
    startedTime: 1024,
    stoppedTime: 1028,
    currentStepName: "Step_name_ABCD",
    currentStepNumber: "1",
    currentStepTitle: "Step name ABCD",
    messageID: "ID001",
    messageText: "Reason is X001"
};

const PRETEND_ZOSMF_RESPONSE_STEPINFO: IStepInfo = {
    name: "Step 1",
    actualStatusCode: "404",
    assignees: "zlapa01",
    autoEnable: true,
    calledInstanceKey: "026-455-454",
    calledInstanceScope: "global",
    calledInstanceURI: "xy/hg/k",
    calledWorkflowID: "252525",
    calledWorkflowVersion: "v1",
    calledWorkflowMD5: "md5value",
    calledWorkflowDescription: "Workflow description",
    calledWorkflowDefinitionFile: "definition file1",
    description: "Step description",
    expectedStatusCode: "404",
    // failedPattern optional
    hasCalledWorkflow: false,
    hostname: "CA11",
    httpMethod: "PUT",
    instructions: "Step instructions",
    instructionsSub: false,
    isConditionStep: false,
    isRestStep: false,
    // jobInfo optional
    maxLrecl: 255,
    optional: false,
    output: "Outputfile1",
    outputSub: false,
    outputVariablesPrefix: "PFX1",
    owner: "zlapa01",
    port: "1212",
    portSub: false,
    // prereqStep optional
    procName: "Name ABCD",
    queryParameters: "A=A",
    queryParametersSub: false,
    regionSize: "1024",
    requestBody: "URL1",
    requestBodySub: false,
    returnCode: "0000",
    runAsUser: "zlapa01",
    runAsUserDynamic: false,
    saveAsDataset: "ABCD.ABCD1",
    saveAsDatasetSub: false,
    saveAsUnixFile: "file1",
    saveAsUnixFileSub: false,
    schemeName: "scheme1",
    schemeNameSub: false,
    // scriptParameters optional
    skills: "Mainframe",
    state: "Completed",
    stepNumber:"1",
    // steps optional
    submitAs: "ABCD1",
    successPattern: "A=A",
    template: "template1",
    templateSub: false,
    timeout: "100000",
    title: "STEP Title",
    uriPath: "cc/vv/gg",
    uriPathSub: false,
    userDefined: true,
    // "variable-references" optional
    weight: 10
};

const sIArray: IStepInfo[] = new Array(PRETEND_ZOSMF_RESPONSE_STEPINFO);

const PRETEND_ZOSMF_RESPONSE_VARIABLEINFO1: IVariableInfo = {
    name: "VARIABLE1",
    scope: "global",
    type: "DSNAME",
    value:"ABCD.ABCD1",
    visibility: "public"
};
const PRETEND_ZOSMF_RESPONSE_VARIABLEINFO2: IVariableInfo = {
    name: "VARIABLE2",
    scope: "global",
    type: "DSNAME",
    value:"ABC3.ABCD2",
    visibility: "private"
};

const vIArray: IVariableInfo[] = new Array(PRETEND_ZOSMF_RESPONSE_VARIABLEINFO1,PRETEND_ZOSMF_RESPONSE_VARIABLEINFO2);

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
    automationStatus: PRETEND_ZOSMF_RESPONSE_ASTATUS,
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


const PRETEND_ZOSMF_RESPONSE_WITH_STEPS: IWorkflowInfo = {
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
    automationStatus: PRETEND_ZOSMF_RESPONSE_ASTATUS,
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
    steps: sIArray
    // variables
};

const PRETEND_ZOSMF_RESPONSE_WITH_VARIABLES: IWorkflowInfo = {
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
    automationStatus: PRETEND_ZOSMF_RESPONSE_ASTATUS,
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
    // steps: sIArray
    variables: vIArray
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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call with all optional parameters returns IRegisteredWorkflow properties response.", async () => {

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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, true, true);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY_ALL_PARMS,
                [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call with optional steps returns IRegisteredWorkflow properties response.", async () => {

            (ZosmfRestClient.getExpectJSON as any) = jest.fn<string>(() => {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        resolve(PRETEND_ZOSMF_RESPONSE_WITH_STEPS);
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
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY_STEPS,
                [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE_WITH_STEPS);
        });

        it("Successful call with optional variables returns IRegisteredWorkflow properties response.", async () => {

            (ZosmfRestClient.getExpectJSON as any) = jest.fn<string>(() => {
                return new Promise((resolve) => {
                    process.nextTick(() => {
                        resolve(PRETEND_ZOSMF_RESPONSE_WITH_VARIABLES);
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
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY_VARIABLES,
                [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE_WITH_VARIABLES);
        });

        it("Successful call with undefined zosmf version returns IRegisteredWorkflow properties response.", async () => {

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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, undefined, propertiesSteps, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call without optional parameters - both undefined returns IRegisteredWorkflow properties response.", async () => {

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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, undefined, undefined);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call without optional parameters steps - set null IRegisteredWorkflow properties response.", async () => {

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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, null, propertiesVariables);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call without optional parameters variables - set null IRegisteredWorkflow properties response.", async () => {

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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, propertiesSteps, null);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD]);
            expectZosmfResponseSucceeded(response, error);
            expect(response).toEqual(PRETEND_ZOSMF_RESPONSE);
        });

        it("Successful call without both optional parameters variables - both set null IRegisteredWorkflow properties response.", async () => {

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
                response = await PropertiesWorkflows.getWorkflowProperties(PRETEND_SESSION, wfKey, wfVersion, null, null);
                Imperative.console.info(`Response ${response}`);
            } catch (thrownError) {
                error = thrownError;
                Imperative.console.info(`Error ${error}`);
            }
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledTimes(1);
            expect((ZosmfRestClient.getExpectJSON as any)).toHaveBeenCalledWith(PRETEND_SESSION, START_RESOURCE_QUERY, [HEAD]);
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

    });
});
