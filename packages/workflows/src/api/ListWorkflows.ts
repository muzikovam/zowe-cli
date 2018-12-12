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


import { AbstractSession, IImperativeError, Headers } from "@brightside/imperative";
import { ZosmfRestClient } from "../../../rest";
import { WorkflowConstants, nozOSMFVersion, noWorkflowName } from "./WorkflowConstants";
import { WorkflowValidator } from "./WorkflowValidator";
import { IWorkflows } from "./doc/IWorkflows";

export class GetWorkflowInfo{
    public static WorkflowInfo(session: AbstractSession, WorkflowName: string, zOSMFVersion = WorkflowConstants.ZOSMF_VERSION) {
        WorkflowValidator.validateSession(session);
        WorkflowValidator.validateNotEmptyString(zOSMFVersion, nozOSMFVersion.message);
        WorkflowValidator.validateNotEmptyString(WorkflowName, noWorkflowName.message);
        // Filters by name
        let resourcesQuery: string = `${WorkflowConstants.RESOURCE}/${zOSMFVersion}/${WorkflowConstants.WORKFLOW_RESOURCE}`;
        resourcesQuery += `?${WorkflowConstants.WF_NAME}=${WorkflowName}`;

        return ZosmfRestClient.getExpectJSON<IWorkflows>(session, resourcesQuery);
    }
}
