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

import { IImperativeConfig } from "@brightside/imperative";

const config: IImperativeConfig = {
    commandModuleGlobs: ["**/cli/*/*.definition!(.d).*s"],
    rootCommandDescription: "Workflows plugin for Zowe CLI",
    envVariablePrefix: "WORKFLOWS_PLUGIN",
    defaultHome: "~/.workflows_plugin",
    productDisplayName: "Workflows plugin",
    name: "workflows",
    pluginAliases: ["wf"],
};

export = config;
