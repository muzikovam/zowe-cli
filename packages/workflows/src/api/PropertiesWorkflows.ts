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
import { WorkflowConstants, nozOSMFVersion, noVendor, noStatusName, noSystem,
        noOwner, noCategory, noFilter, noWorkflowKey } from "./WorkflowConstants";
import { WorkflowValidator } from "./WorkflowValidator";
import { isNullOrUndefined } from "util";
import { IWorkflowInfo } from "./doc/IWorkflowInfo";

export class PropertiesWorkflows {
    // Optional, request can include one or more parameters to filter the results
    public static async propertiesWorkflows(session: AbstractSession, filteredQuery?: string, category?: string, system?: string, owner?: string,
                                            vendor?: string, statusName?: string, zOSMFVersion = WorkflowConstants.ZOSMF_VERSION) {
    // This operation returns list of all workflows
        WorkflowValidator.validateSession(session);
        WorkflowValidator.validateNotEmptyString(zOSMFVersion, nozOSMFVersion.message);
        WorkflowValidator.validateNotEmptyString(vendor, noVendor.message);
        WorkflowValidator.validateNotEmptyString(statusName, noStatusName.message);
        WorkflowValidator.validateNotEmptyString(system, noSystem.message);
        WorkflowValidator.validateNotEmptyString(owner, noOwner.message);
        const resourcesQuery = filteredQuery ? filteredQuery : this.getResourcesQuery(zOSMFVersion);
        return ZosmfRestClient.getExpectJSON(session, resourcesQuery, [Headers.APPLICATION_JSON]);
    }


    public static async getStatus(session: AbstractSession, WorkflowName: string, WorkflowKey: string,
                                  zOSMFVersion = WorkflowConstants.ZOSMF_VERSION){
        WorkflowValidator.validateSession(session);
        WorkflowValidator.validateNotEmptyString(zOSMFVersion, nozOSMFVersion.message);
        let wfKey: string;

        WorkflowValidator.validateNotEmptyString(WorkflowKey, noWorkflowKey.message);
        wfKey = WorkflowKey;

        let resourcesQuery: string = `${WorkflowConstants.RESOURCE}/${zOSMFVersion}/`;
        resourcesQuery += `${WorkflowConstants.WORKFLOW_RESOURCE}/${wfKey}`;

        return ZosmfRestClient.getExpectJSON<IWorkflowInfo>(session, resourcesQuery, [Headers.APPLICATION_JSON]);
    }


    // This operation returns list filtered workflows
    public static async listFilteredWorkflows(session: AbstractSession, zOSMFVersion: string, category?: string, system?: string,
                                              owner?: string, vendor?: string, statusName?: string)
    {
        WorkflowValidator.validateSession(session);
        WorkflowValidator.validateNotEmptyString(zOSMFVersion, nozOSMFVersion.message);
        const query = this.getResourcesQuery(zOSMFVersion, category, system, owner, vendor, statusName);
        return this.propertiesWorkflows(session, zOSMFVersion, query);
    }
    // Builds URI path from provided parameters.
    public static getResourcesQuery(zOSMFVersion: string, category?: string, system?: string, owner?: string, vendor?: string, statusName?: string) {
        let query = `${WorkflowConstants.RESOURCE}/${zOSMFVersion}/${WorkflowConstants.WORKFLOW_RESOURCE}`;
        if (!isNullOrUndefined(category)) {
            query += `?${WorkflowConstants.category}=${category}`;
        }
        if (!isNullOrUndefined(system)) {
            query += `?${WorkflowConstants.system}=${system}`;
        }
        if (!isNullOrUndefined(owner)) {
            query += `?${WorkflowConstants.owner}=${owner}`;
        }
        if (!isNullOrUndefined(vendor)) {
            query += `?${WorkflowConstants.vendor}=${vendor}`;
        }
        if (!isNullOrUndefined(statusName)) {
            query += `?${WorkflowConstants.statusName}=${statusName}`;
        }
        return query;
    }
}

