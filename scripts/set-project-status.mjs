const DEFAULT_PROJECT_OWNER = "drmartin1998";
const DEFAULT_PROJECT_NUMBER = 2;
const DEFAULT_PROJECT_STATUS_FIELD = "Status";
const DEFAULT_STATUS = "Ready";
const DEFAULT_REPOSITORY = process.env.GITHUB_REPOSITORY ?? "drmartin1998/my-magical-vip";

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];

    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = "true";
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function getRepositoryParts(repository) {
  const [owner, name] = repository.split("/");

  if (!owner || !name) {
    throw new Error(
      `Repository must be in owner/name format. Received "${repository}".`
    );
  }

  return { owner, name };
}

async function githubGraphql(token, query, variables) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "my-magical-vip-project-status-script",
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json();

  if (!response.ok || payload.errors) {
    const details = payload.errors
      ? payload.errors.map((error) => error.message).join("; ")
      : JSON.stringify(payload);

    throw new Error(`GitHub GraphQL request failed: ${details}`);
  }

  return payload.data;
}

async function getProject(token, projectOwner, projectNumber) {
  const query = `
    query GetProject($projectOwner: String!, $projectNumber: Int!) {
      userOwner: user(login: $projectOwner) {
        projectV2(number: $projectNumber) {
          id
          title
          fields(first: 50) {
            nodes {
              __typename
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
      organizationOwner: organization(login: $projectOwner) {
        projectV2(number: $projectNumber) {
          id
          title
          fields(first: 50) {
            nodes {
              __typename
              ... on ProjectV2SingleSelectField {
                id
                name
                options {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await githubGraphql(token, query, {
    projectOwner,
    projectNumber,
  });

  return data.userOwner?.projectV2 ?? data.organizationOwner?.projectV2 ?? null;
}

async function getIssue(token, owner, repo, issueNumber) {
  const query = `
    query GetIssue($owner: String!, $repo: String!, $issueNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $issueNumber) {
          id
          number
          title
        }
      }
    }
  `;

  const data = await githubGraphql(token, query, {
    owner,
    repo,
    issueNumber,
  });

  return data.repository?.issue ?? null;
}

async function getProjectItemId(token, projectId, issueId) {
  const query = `
    query GetProjectItems($projectId: ID!, $cursor: String) {
      node(id: $projectId) {
        ... on ProjectV2 {
          items(first: 100, after: $cursor) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              id
              content {
                __typename
                ... on Issue {
                  id
                }
              }
            }
          }
        }
      }
    }
  `;

  let cursor = null;

  do {
    const data = await githubGraphql(token, query, {
      projectId,
      cursor,
    });

    const items = data.node?.items;
    const match = items?.nodes.find((item) => item.content?.id === issueId);

    if (match) {
      return match.id;
    }

    cursor = items?.pageInfo?.hasNextPage ? items.pageInfo.endCursor : null;
  } while (cursor);

  return null;
}

async function updateProjectItemStatus(
  token,
  projectId,
  itemId,
  fieldId,
  optionId
) {
  const mutation = `
    mutation UpdateProjectItemStatus(
      $projectId: ID!
      $itemId: ID!
      $fieldId: ID!
      $optionId: String!
    ) {
      updateProjectV2ItemFieldValue(
        input: {
          projectId: $projectId
          itemId: $itemId
          fieldId: $fieldId
          value: { singleSelectOptionId: $optionId }
        }
      ) {
        projectV2Item {
          id
        }
      }
    }
  `;

  await githubGraphql(token, mutation, {
    projectId,
    itemId,
    fieldId,
    optionId,
  });
}

function printUsage() {
  console.log(`Usage:
  npm run project:status -- --issue <number> [--status <name>] [--project-owner <login>] [--project-number <number>]

Environment:
  COPILOT_PROJECTS_TOKEN  Token with permission to edit the target GitHub Project
  GITHUB_PROJECT_OWNER    Defaults to ${DEFAULT_PROJECT_OWNER}
  GITHUB_PROJECT_NUMBER   Defaults to ${DEFAULT_PROJECT_NUMBER}
  GITHUB_PROJECT_STATUS_FIELD Defaults to ${DEFAULT_PROJECT_STATUS_FIELD}
  GITHUB_REPOSITORY       Defaults to ${DEFAULT_REPOSITORY}

Examples:
  npm run project:ready -- --issue 1
  npm run project:status -- --issue 1 --status "In Progress"
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help === "true") {
    printUsage();
    return;
  }

  const token =
    process.env.COPILOT_PROJECTS_TOKEN ??
    process.env.GITHUB_PROJECTS_TOKEN ??
    process.env.GH_TOKEN ??
    process.env.GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      "Missing GitHub token. Set COPILOT_PROJECTS_TOKEN, GH_TOKEN, or GITHUB_TOKEN."
    );
  }

  const repository = args.repository ?? process.env.GITHUB_REPOSITORY ?? DEFAULT_REPOSITORY;
  const { owner: repoOwner, name: repoName } = getRepositoryParts(repository);
  const projectOwner = args["project-owner"] ?? process.env.GITHUB_PROJECT_OWNER ?? DEFAULT_PROJECT_OWNER;
  const projectNumber = Number.parseInt(
    args["project-number"] ?? process.env.GITHUB_PROJECT_NUMBER ?? `${DEFAULT_PROJECT_NUMBER}`,
    10
  );
  const statusFieldName =
    args.field ?? process.env.GITHUB_PROJECT_STATUS_FIELD ?? DEFAULT_PROJECT_STATUS_FIELD;
  const statusName = args.status ?? DEFAULT_STATUS;
  const issueNumber = Number.parseInt(args.issue ?? "", 10);

  if (Number.isNaN(projectNumber) || projectNumber <= 0) {
    throw new Error(`Invalid project number "${args["project-number"] ?? ""}".`);
  }

  if (Number.isNaN(issueNumber) || issueNumber <= 0) {
    throw new Error("Provide a valid issue number with --issue.");
  }

  const [project, issue] = await Promise.all([
    getProject(token, projectOwner, projectNumber),
    getIssue(token, repoOwner, repoName, issueNumber),
  ]);

  if (!project) {
    throw new Error(
      `Project ${projectOwner}/${projectNumber} was not found or is not accessible.`
    );
  }

  if (!issue) {
    throw new Error(
      `Issue #${issueNumber} was not found in ${repoOwner}/${repoName}.`
    );
  }

  const statusField = project.fields.nodes.find(
    (field) => field.name === statusFieldName
  );

  if (!statusField) {
    throw new Error(
      `Project field "${statusFieldName}" was not found on project "${project.title}".`
    );
  }

  const statusOption = statusField.options.find(
    (option) => option.name === statusName
  );

  if (!statusOption) {
    throw new Error(
      `Status option "${statusName}" was not found in field "${statusFieldName}".`
    );
  }

  const itemId = await getProjectItemId(token, project.id, issue.id);

  if (!itemId) {
    throw new Error(
      `Issue #${issueNumber} is not currently added to project "${project.title}".`
    );
  }

  await updateProjectItemStatus(
    token,
    project.id,
    itemId,
    statusField.id,
    statusOption.id
  );

  console.log(
    `Updated issue #${issue.number} (${issue.title}) to "${statusName}" on project "${project.title}".`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
