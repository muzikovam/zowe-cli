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

// get workflow properties object
import { IAutomationStatus } from "./IAutomationStatus";
/**
 * Interface for z/OSMF API response.
 * @export
 * @interface IWorkflowsInfo
 */
export interface IWorkflowInfo {
    workflowName: string;
    workflowKey: string;
    workflowDescription: string;
    workflowID: string;
    workflowVersion: string;
    workflowDefinitionFileMD5Value: string;
    vendor: string;
    owner: string;
    system: string;
    category: string;
    productID: string;
    productName: string;
    productVersion: string;
    percentComplete: string;    // in description integer
    isCallable: string;         // in description boolean
    containsParallelSteps: string;  // in description boolean
    scope: string;
    statusName: string;
    deleteCompletedJobs: string;  // in description boolean
    automationStatus: IAutomationStatus;
    accountInfo: string;
    jobStatement: string;
    templateID: string;  // new
    actionID: string;  // new
    registryID: string; // new
    parentRegistryID: string;  // new
    domainID: string;  // new
    tenantID: string;  // new
    softwareServiceInstanceName: string;  // new
    templateName: string;  // new
    steps: string; // new, in desc array
    variables: string; // new, in desc array
    // access: string;
    // softwareType: string;
}
