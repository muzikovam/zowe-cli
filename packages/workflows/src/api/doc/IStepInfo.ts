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

    name: string;
    actualStatusCode?: string;
    assignees?: string;
    autoEnable: boolean;
    calledInstanceKey?: string;
    calledInstanceScope?: string;
    calledInstanceURI?: string;
    calledWorkflowID?: string;
    calledWorkflowVersion?: string;
    calledWorkflowMD5?: string;
    calledWorkflowDescription?: string;
    calledWorkflowDefinitionFile?: string;
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
