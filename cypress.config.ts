import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { preprocessor } from "@badeball/cypress-cucumber-preprocessor/browserify";
import axios from 'axios';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    preprocessor(config, {
      typescript: require.resolve("typescript"),
    }),
  );

  on('task', {
    async createJiraTicket({
      jiraApiUrl,
      summary,
      description,
      jiraEmail,
      jiraApiToken,
      jiraProjectKey,
    }: {
      jiraApiUrl: string,
      summary: string
      description: string
      jiraEmail: string
      jiraApiToken: string
      jiraProjectKey: string
    }) {
          const credentials = `${jiraEmail}:${jiraApiToken}`;
          const base64Credentials = Buffer.from(credentials).toString('base64');

          try {
            const response = await axios.post(
              jiraApiUrl,
              {
                fields: {
                  project: { key: jiraProjectKey },
                  summary,
                  description,
                  issuetype: { name: 'Bug' },
                },
              },
              {
                headers: {
                  Authorization: `Basic ${base64Credentials}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
              }
            );

            return { status: response.status, data: response.data };
          } catch (error: any) {
            if (error.response) {
              throw new Error(`Failed to create JIRA ticket: ${JSON.stringify(error.response.data)}`);
            } else {
              throw new Error(`Failed to create JIRA ticket: ${error.message}`);
            }
          }
        },
    })

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

export default defineConfig({
  fixturesFolder: false,
  // env: {
  //   userName: 'justin.cost@gmail.com',
  //   password: 'admin'
  // },
  e2e: {
    setupNodeEvents,
    specPattern: ['**/*.feature', 'cypress/specs/bei/*.ts', 'cypress/specs/fei/*.ts', 'cypress/specs/e2e/*.ts', 'cypress/specs/utilities/*.ts'],
  },
})
