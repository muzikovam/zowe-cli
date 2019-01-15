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
import { WorkflowConstants, noFilter } from "./WorkflowConstants";
import { WorkflowValidator } from "./WorkflowValidator";

export class PropertiesWorkflows{
    // Optional, request can include one or more parameters to filter the results
    public static async propertiesWorkflows(session: AbstractSession, category?: string,
                                            system?: string, owner?: string, vendor?: string, statusName?: string) {

        const zOSMFVersion = WorkflowConstants.ZOSMF_VERSION;
        WorkflowValidator.validateSession(session);
        WorkflowValidator.validateNotEmptyString(category, noFilter.message);
        WorkflowValidator.validateNotEmptyString(system, noFilter.message);
        WorkflowValidator.validateNotEmptyString(owner, noFilter.message);
        WorkflowValidator.validateNotEmptyString(vendor, noFilter.message);
        WorkflowValidator.validateNotEmptyString(statusName, noFilter.message);

        let resourcesQuery: string = `${WorkflowConstants.RESOURCE}/${zOSMFVersion}/${WorkflowConstants.PROPERTIES_WORKFLOWS}`;


        if (category){
            resourcesQuery += `${WorkflowConstants.category}=${category}`;
        }

        if (system){
            resourcesQuery += `${WorkflowConstants.category}=${system}`;}

        if (owner){
            resourcesQuery += `${WorkflowConstants.owner}=${owner}`;}

        if (vendor){
            resourcesQuery += `${WorkflowConstants.vendor}=${vendor}`;}

        if (statusName){
            resourcesQuery += `${WorkflowConstants.statusName}=${statusName}`;}

        return ZosmfRestClient.getExpectJSON(session, resourcesQuery, [Headers.APPLICATION_JSON]);

    }
}

