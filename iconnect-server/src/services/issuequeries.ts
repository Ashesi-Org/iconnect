export const getIssueQuery = `
SELECT
    issues.issue_id AS issueid,
    creator.avatar_url,
    creator.display_name,
    issues.category_id,
    issues.description,
    issues.status,
    issues.priority,
    issues.title,
    issues.user_id AS userid,
    issues.is_anonymous,
    categories.name AS category_name,
    issues.created_at AS issue_created_at,
    issues.updated_at AS issue_updated_at,
    issues.attachment_url,
    issues.issuelocation as location,
    CASE
        WHEN COUNT(assigned_issues.assigned_resolver_id) > 0 THEN
            json_agg(json_build_object(
                'resolver_name', user_data.display_name,
                'resolver_avatar_url', user_data.avatar_url,
                'resolver_id', user_data.user_id
            ))
        ELSE
            '[]' -- Empty JSON array when no assignees
    END AS assignees,
    CASE
        WHEN COUNT(assigned_issues.assigned_resolver_id) > 0 THEN 'Assigned'
        ELSE 'Not Assigned'
    END AS assignment_status,
    COALESCE((
        SELECT json_agg(json_build_object(
            'comment_created_at', c.created_at,
            'comment_text', c.comment_text,
            'comment_user_id', c.user_id,
            'comment_issue_id', c.issue_id,
            'comment_id', c.comment_id,
            'creator_avatar_url', cu.avatar_url,
            'creator_display_name', cu.display_name
        ))
        FROM comments c
        INNER JOIN user_data as cu ON c.user_id = cu.user_id
        WHERE c.issue_id = issues.issue_id
    ), '[]') AS comments
FROM
    issues
LEFT JOIN
    categories ON issues.category_id = categories.category_id
LEFT JOIN
    assigned_issues ON issues.issue_id = assigned_issues.issue_id
LEFT JOIN
    issue_resolvers ON assigned_issues.assigned_resolver_id = issue_resolvers.resolver_id
LEFT JOIN
    user_data ON issue_resolvers.user_id = user_data.user_id
INNER JOIN user_data as creator on issues.user_id = creator.user_id
WHERE
    issues.issue_id = $1
GROUP BY
    issues.issue_id,
    categories.name,
    creator.avatar_url,
    creator.display_name
ORDER BY
    issues.created_at DESC;


`;


export const getUserIssuesQueryUser = ` SELECT
        issues.issue_id AS issueid,
        issues.category_id,
        issues.description,
        issues.title,
        issues.user_id AS userid,
        issues.is_anonymous,
        categories.name AS category_name,
        issues.created_at AS issue_created_at,
        issues.updated_at AS issue_updated_at,
        issues.status,
        issues.priority,
        issues.attachment_url,
        CASE
            WHEN COUNT(ai.assigned_resolver_id) > 0 THEN 'Assigned'
            ELSE 'Not Assigned'
        END AS assignment_status,
        json_agg(json_build_object(
            'comment_created_at', c.created_at,
            'comment_text', c.comment_text,
            'comment_user_id', c.user_id,
            'comment_issue_id', c.issue_id,
            'comment_id', c.comment_id
        )) AS comments
    FROM
        issues
    LEFT JOIN
        categories ON issues.category_id = categories.category_id
    LEFT JOIN
        comments AS c ON issues.issue_id = c.issue_id
    LEFT JOIN
        assigned_issues AS ai ON issues.issue_id = ai.issue_id
    WHERE
        issues.user_id = $1
    GROUP BY
        issues.issue_id,
        categories.name
    ORDER BY
        issues.created_at DESC`;


export const getIssuesByCategoryQuery = `SELECT
    issues.issue_id AS issueid,
    issues.category_id,
    issues.description,
    issues.title,
    issues.user_id AS userid,
    issues.is_anonymous,
    categories.name AS category_name,
    issues.created_at AS issue_created_at,
    issues.updated_at AS issue_updated_at,
    issues.status,
    issues.priority,
    issues.attachment_url,
    CASE
        WHEN COUNT(ai.assigned_resolver_id) > 0 THEN 'Assigned'
        ELSE 'Not Assigned'
    END AS assignment_status,
    json_agg(json_build_object(
        'comment_created_at', c.created_at,
        'comment_text', c.comment_text,
        'comment_user_id', c.user_id,
        'comment_issue_id', c.issue_id,
        'comment_id', c.comment_id
    )) AS comments
FROM
    issues
LEFT JOIN
    categories ON issues.category_id = categories.category_id
LEFT JOIN
    comments AS c ON issues.issue_id = c.issue_id
LEFT JOIN
    assigned_issues AS ai ON issues.issue_id = ai.issue_id
WHERE
    issues.category_id = (SELECT category_id FROM issue_resolvers WHERE user_id = $1)
GROUP BY
    issues.issue_id,
    categories.name
ORDER BY
    issues.created_at DESC;
`



export const getAllIssuesQuery = `SELECT
    issues.issue_id AS issueid,
    issues.category_id,
    issues.description,
    issues.title,
    issues.user_id AS userid,
    issues.is_anonymous,
    categories.name AS category_name,
    issues.created_at AS issue_created_at,
    issues.updated_at AS issue_updated_at,
    issues.status,
    issues.priority,
    issues.attachment_url,
    CASE
        WHEN COUNT(ai.assigned_resolver_id) > 0 THEN 'Assigned'
        ELSE 'Not Assigned'
    END AS assignment_status,
    json_agg(json_build_object(
        'comment_created_at', c.created_at,
        'comment_text', c.comment_text,
        'comment_user_id', c.user_id,
        'comment_issue_id', c.issue_id,
        'comment_id', c.comment_id
    )) AS comments
FROM
    issues
LEFT JOIN
    categories ON issues.category_id = categories.category_id
LEFT JOIN
    comments AS c ON issues.issue_id = c.issue_id
LEFT JOIN
    assigned_issues AS ai ON issues.issue_id = ai.issue_id
GROUP BY
    issues.issue_id,
    categories.name
ORDER BY
    issues.created_at DESC;
`



export const getRessolverAssignmentsQuery = 
    `SELECT 
    i.issue_id,
    i.title,
    i.description AS issue_description,
    i.status AS issue_status,
    i.priority AS issue_priority,
    i.created_at AS issue_created_at,
    ai.assignment_id,
    ai.due_at AS end,
    ai.created_at AS start
FROM 
    issues i
INNER JOIN 
    assigned_issues ai ON i.issue_id = ai.issue_id
INNER JOIN issue_resolvers ir ON i.user_id = ir.user_id
WHERE 
    ir.user_id = $1

`


