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

// step-info object (table 4)
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
    // jobInfo?: table 5
    maxLrecl?: number;



}
