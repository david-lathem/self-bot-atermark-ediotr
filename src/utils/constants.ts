import { Config } from '../typings/interfaces.js'
import configFile from './../../config.json' with { type: 'json'}


export const config: Config = configFile
export const textPrompt = `Remove the tiger from the image which is in middle. Also remove the name Trading Mafia`