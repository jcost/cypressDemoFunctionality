import './commands';
import { registerJiraTicketHook } from './commands'
import { defineConfig } from 'cypress'
import axios from 'axios'

// Register the global failure hook for all tests
registerJiraTicketHook();