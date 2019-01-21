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

    startUser: string;
    startedTime: number;
    stoppedTime: number;
    currentStepName: string;
    currentStepNumber: string;
    currentStepTitle: string;
    messageID: string;
    messageText: string;

}
