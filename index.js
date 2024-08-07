import express from 'express'
import {config} from 'dotenv'
import { iniatapp } from './src/utils/iniate.js'
import path from 'path'
const app =express()
 iniatapp(app,express)