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

import { AbstractSession } from "@brightside/imperative";
import { GetWorkflowInfo } from "./ListWorkflows";
import { noWorkflowName } from "./WorkflowConstants";
import { IWorkflows } from "./doc/IWorkflows";
import { WorkflowValidator } from "./WorkflowValidator";
export class GetWfKey {

    public static async WorkflowKey(session: AbstractSession, name: string): Promise<string> {

        let error;
        let response: IWorkflows;

        WorkflowValidator.validateNotEmptyString(name, noWorkflowName.message);
        try {
            response = await GetWorkflowInfo.WorkflowInfo(session, name);
        } catch (err) {
            error = "Workflow info: " + err;
            throw error;
        }
        // TODO: add it to constants like noWorkflowKey? (api still returns 200 but empty workflows array)
        if ( response.workflows.length < 1 ) {
            error = "Workflow doesn't exist";
            throw error;
        } else {
        return response.workflows[0].workflowKey;
        }
    }
}
