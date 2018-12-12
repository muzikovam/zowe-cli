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


import { AbstractSession, Headers, ImperativeError } from "@brightside/imperative";
import { ZosmfRestClient } from "../../../rest";
import { WorkflowConstants, nozOSMFVersion, noWorkflowName, noWorkflowDefinitionFile } from "./WorkflowConstants";
import { WorkflowValidator } from "./WorkflowValidator";
import { isNullOrUndefined } from "util";
import { IRegisterWorkflow } from "./doc/IRegisterWorkflow";
import { IRegisteredWorkflow } from "./doc/IRegisteredWorkflow";
import { IVariable } from "./doc/IVariables";

// coppied from ProvisioningService.ts
export class RegisterWorkflow{
    public static parseProperties(propertiesText: string): IVariable[] {
        if (propertiesText === "") {
            return [];
        }
        return propertiesText.split(",").map((property) => {
            const tempArray = property.split("=");
            if (tempArray.length === 2 && tempArray[0].length > 0) {
                return {name: tempArray[0].trim(), value: tempArray[1].trim()};
            } else {
                throw new ImperativeError({msg: `Incorrect properties format: ${propertiesText}`});
            }
        });
    }

    public static registerWorkflow(session: AbstractSession, WorkflowName: string, WorkflowDefinitionFile: string,
                                   systemName: string, Owner: string, VariableInputFile?: string, Variables?: string,
                                   AssignToOwner?: boolean, AccessType?: string, DeleteCompletedJobs?: boolean,
                                   zOSMFVersion = WorkflowConstants.ZOSMF_VERSION,
                                    // add job statement, account info, comments and resolveGlobalConflictByUsing,
                                    ): Promise<IRegisteredWorkflow> {
        WorkflowValidator.validateSession(session);
        WorkflowValidator.validateNotEmptyString(zOSMFVersion, nozOSMFVersion.message);
        WorkflowValidator.validateNotEmptyString(WorkflowName, noWorkflowName.message);
        WorkflowValidator.validateNotEmptyString(WorkflowDefinitionFile, noWorkflowDefinitionFile.message);

        const data: IRegisterWorkflow = {
            workflowName: WorkflowName,
            workflowDefinitionFile: WorkflowDefinitionFile,
            // could we get it from session?
            system: systemName,
            owner: Owner,
            assignToOwner: AssignToOwner,
            accessType: AccessType,
            deleteCompletedJobs: DeleteCompletedJobs,
        };
        if (!isNullOrUndefined(VariableInputFile)){
            data.variableInputFile = VariableInputFile;
        }
        if (!isNullOrUndefined(Variables)){
            data.variables = this.parseProperties(Variables);
        }
        if (isNullOrUndefined(AssignToOwner)){
            data.assignToOwner = true;
        }
        if (isNullOrUndefined(AccessType)){
            data.accessType = "Public";
        }
        if (isNullOrUndefined(DeleteCompletedJobs)){
            data.deleteCompletedJobs = false;
        }

        const resourcesQuery: string = `${WorkflowConstants.RESOURCE}/${zOSMFVersion}/${WorkflowConstants.WORKFLOW_RESOURCE}`;

        return ZosmfRestClient.postExpectJSON<IRegisteredWorkflow>(session, resourcesQuery, [Headers.APPLICATION_JSON], data);
    }
}
