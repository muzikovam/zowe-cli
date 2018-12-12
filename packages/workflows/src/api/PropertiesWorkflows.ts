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


import { AbstractSession, Headers } from "@brightside/imperative";
import { ZosmfRestClient } from "../../../rest";
import { WorkflowConstants, nozOSMFVersion, noWorkflowName, noWorkflowKey } from "./WorkflowConstants";
import { WorkflowValidator } from "./WorkflowValidator";
import { GetWfKey } from "./GetWfKey";
import { isNullOrUndefined } from "util";
import { IWorkflowInfo } from "./doc/IWorkflowInfo";

export class GetStatus {
 public static async getStatus(session: AbstractSession, WorkflowName: string, WorkflowKey: string,
                               zOSMFVersion = WorkflowConstants.ZOSMF_VERSION){
    let error;
    WorkflowValidator.validateSession(session);
    WorkflowValidator.validateNotEmptyString(zOSMFVersion, nozOSMFVersion.message);
    let wfKey: string;
    if (isNullOrUndefined(WorkflowKey)){
        WorkflowValidator.validateNotEmptyString(WorkflowName, noWorkflowName.message);
        try {
        wfKey = await GetWfKey.WorkflowKey(session, WorkflowName);
        } catch (err) {
            error = "Get workflow key: " + err;
            throw error;
        }
    } else {
        WorkflowValidator.validateNotEmptyString(WorkflowKey, noWorkflowKey.message);
        wfKey = WorkflowKey;
    }
    let resourcesQuery: string = `${WorkflowConstants.RESOURCE}/${zOSMFVersion}/`;
    resourcesQuery += `${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}`;

    return ZosmfRestClient.getExpectJSON<IWorkflowInfo>(session, resourcesQuery, [Headers.APPLICATION_JSON]);
 }
}
