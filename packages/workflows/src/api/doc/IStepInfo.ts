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

import { IVariable } from "./IVariable";
import { IJobInfo } from "./IJobInfo";
// step-info object (table 4)
/**
 * Interface for z/OSMF API response.
 * @export
 * @interface IStepInfo
 */
export interface IStepInfo{

    /**
     * Name of the step.
     * @type {string}
     * @memberof IStepInfo
     */
    name: string;

    /**
     * HTTP status code.
     * @type {string}
     * @memberof IStepInfo
     */
    actualStatusCode?: string;

    /**
     * Step assignees.
     * @type {string}
     * @memberof IStepInfo
     */
    assignees?: string;

    /**
     * Indicates whether the step can be performed automatically.
     * @type {boolean}
     * @memberof IStepInfo
     */
    autoEnable: boolean;

    /**
     * Key of the called workflow instance.
     * @type {string}
     * @memberof IStepInfo
     */
    calledInstanceKey?: string;

    /**
     * Scope of the called workflow instance.
     * @type {string}
     * @memberof IStepInfo
     */
    calledInstanceScope?: string;

    /**
     * URI path of the called workflow instance.
     * @type {string}
     * @memberof IStepInfo
     */
    calledInstanceURI?: string;

    /**
     * Workflow ID of a workflow definition file.
     * @type {string}
     * @memberof IStepInfo
     */
    calledWorkflowID?: string;

    /**
     * Version of a workflow definition file.
     * @type {string}
     * @memberof IStepInfo
     */
    calledWorkflowVersion?: string;

    /**
     * 128-bit hash value of a workflow definition file.
     * @type {string}
     * @memberof IStepInfo
     */
    calledWorkflowMD5?: string;

    /**
     * Describes the workflow to be called.
     * @type {string}
     * @memberof IStepInfo
     */
    calledWorkflowDescription?: string;

    /**
     * Workflow definition file that is used to create a new workflow.
     * @type {string}
     * @memberof IStepInfo
     */
    calledWorkflowDefinitionFile?: string;

    /**
     * Step description.
     * @type {string}
     * @memberof IStepInfo
     */
    description: string;
    expectedStatusCode?: string;
    failedPattern?: string[];
    hasCalledWorkflow?: boolean;
    hostname?: string;
    httpMethod?: string;
    instructions?: string;
    instructionsSub?: boolean;
    isConditionStep?: boolean;
    isRestStep: boolean;
    jobInfo?: IJobInfo;
    maxLrecl?: number;
    optional: boolean;
    output?: string;
    outputSub?: boolean;
    outputVariablesPrefix?: string;
    owner?: string;
    port?: string;
    portSub?: boolean;
    prereqStep: string[];
    procName?: string;
    queryParameters?: string;
    queryParametersSub?: boolean;
    regionSize?: string;
    requestBody?: string;
    requestBodySub?: boolean;
    returnCode?: string;
    runAsUser: string;
    runAsUserDynamic: string;
    saveAsDataset?: string;
    saveAsDatasetSub?: boolean;
    saveAsUnixFile?: string;
    saveAsUnixFileSub?: boolean;
    schemeName?: string;
    schemeNameSub?: boolean;
    scriptParameters?: string[];
    skills?: string;
    state: string;
    stepNumber: string;
    steps?: IStepInfo[];
    submitAs?: string;
    successPattern?: string;
    template?: string;
    templateSub?: boolean;
    timeout?: string;
    title: string;
    uriPath?: string;
    uriPathSub?: boolean;
    userDefined: boolean;
    "variable-references"?: IVariable[];
    weight?: number;

}
