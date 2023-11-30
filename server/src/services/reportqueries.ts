interface QueryMap {
  [key: string]: string;
}


export const queries: QueryMap = {
  totalIssuesByStatus: `
    SELECT status, COUNT(*) AS total_count
    FROM issues
    GROUP BY status;
  `,
  
  priorityDistribution: `
    SELECT priority, COUNT(*) AS priority_count
    FROM issues
    GROUP BY priority;
  `,

  issuesByCategory: `
    SELECT c.name AS category_name, COUNT(*) AS issue_count
    FROM issues i
    LEFT JOIN categories c ON i.category_id = c.category_id
    GROUP BY c.name;
  `,

  resolverPerformance: `
    SELECT c.name AS category_name, COUNT(ai.issue_id) AS resolved_issues_count
    FROM categories c
    LEFT JOIN issue_resolvers ir ON c.category_id = ir.category_id
    LEFT JOIN assigned_issues ai ON ir.resolver_id = ai.assigned_resolver_id
    WHERE ai.due_at < CURRENT_TIMESTAMP
    GROUP BY c.name;
  `,

  averageResolutionTime: `
    SELECT c.name AS category_name, AVG(EXTRACT(EPOCH FROM (ai.due_at - ai.created_at))) / 86400 AS avg_resolution_days
    FROM assigned_issues ai
    LEFT JOIN issue_resolvers ir ON ai.assigned_resolver_id = ir.resolver_id
    LEFT JOIN categories c ON ir.category_id = c.category_id
    WHERE ai.due_at < CURRENT_TIMESTAMP
    GROUP BY c.name;
  `,

  recentIssueActivity: `
    SELECT issue_id, description, status, created_at
    FROM issues
    ORDER BY created_at DESC
    LIMIT 10;
  `
};


