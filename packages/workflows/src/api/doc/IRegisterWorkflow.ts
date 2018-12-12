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

import { IVariable } from "./IVariables";

export interface IRegisterWorkflow {
    workflowName: string;
    // TODO validation for path
    workflowDefinitionFile: string;
    variableInputFile?: string;
    variables?: IVariable[];
    resolveGlobalConflictByUsing?: "global" | "input";
    system: string;
    owner: string;
    comments?: string;
    assignToOwner?: boolean;
    // "Public" | "Restricted" | "Prtivate" - it doesn't work when variable is passed as an argument
    accessType?: string;
    accountInfo?: string;
    jobStatement?: string;
    deleteCompletedJobs?: boolean;
}
