//Responsible for reading and managing configuration settings for the application.
import fs from 'fs/promises'
import {parse} from 'yaml';
import {rootConfigSchema} from './config.Schema.js'

export async function parseYAMLConfig(filePath:string){
   const fileContents = await fs.readFile(filePath, 'utf-8');

   //covert into json using yaml
    const configParsed=parse(fileContents)

    return JSON.stringify(configParsed);
   
}

 export async function validateConfig(config:string){
   const validatedConfig=await rootConfigSchema.parseAsync(JSON.parse(config));
   return validatedConfig;
}