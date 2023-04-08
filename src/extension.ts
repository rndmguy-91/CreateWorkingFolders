// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "createreactcomponent" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('createreactcomponent.createReactComponentFolder', async(uri) => {
		
		 // Ask for the new component name
		 const componentName = await vscode.window.showInputBox({
            prompt: "Enter a new name for your Component.",
            placeHolder: "Example: MyNewComponent"
        });

        // Check if the user entered a name
        if (componentName) {

			const componentNameKepab = componentName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

			// Get the path of the directory where the command was executed
            const dirPath = uri ? uri.fsPath : vscode.workspace.rootPath;

            // Create a new directory with the transformed name
            const newDirPath = path.join(dirPath, componentNameKepab);
            fs.mkdirSync(newDirPath);

			const reactComponentFileName = `${componentNameKepab}.tsx`;
            const reactComponentFilePath = path.join(newDirPath, reactComponentFileName);
			const reactComponentFileContent = `import React from 'react';
import styles from './${componentNameKepab}.module.scss';
import { use${componentName} } from './hooks/use-${componentNameKepab}';

interface ${componentName}Props {
	// Add your own properties here
	children?: React.ReactNode;
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
	// To avoid duplicated code and large complex logic chains, use hooks to create your logic.
	const { value } = use${componentName}({});

	return (
	<div className={styles.${componentName}}>
		{/* Add your own JSX here */}
		{value}
		{props.children}
	</div>
	);
};
			`;

            fs.writeFileSync(reactComponentFilePath, reactComponentFileContent);

			const reactComponentStyleFileName = `${componentNameKepab}.module.scss`;
            const reactComponentStyleFilePath = path.join(newDirPath, reactComponentStyleFileName);
			const reactComponentStyleFileContent = `.${componentName}{

}`;
			fs.writeFileSync(reactComponentStyleFilePath, reactComponentStyleFileContent);

			const newHooksDirPath = path.join(newDirPath,'hooks');
			fs.mkdirSync(newHooksDirPath);

			const reactComponentHooksFileName = `use-${componentNameKepab}.ts`;
            const reactComponentHooksFilePath = path.join(newHooksDirPath, reactComponentHooksFileName);
			const reactComponentHooksFileContent = `export interface ${componentName}HookProps {
	// Add required values for hook here.
	value?: string;
}

export interface ${componentName}HookReturnProps {
	// Add return values for hook here.
	value?: string;
}

export const use${componentName} = (props: ${componentName}HookProps): ${componentName}HookReturnProps => {
	// Add your Component Logic here
	return {};
};
			`;

            fs.writeFileSync(reactComponentHooksFilePath, reactComponentHooksFileContent);

            
        }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
