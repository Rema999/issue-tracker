-- Seed data for the Issue Tracker
-- Run this in Supabase Dashboard → SQL Editor

-- ─── Users ────────────────────────────────────────────────────────────────────
INSERT INTO users (id, name, avatar_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Alice Chen',   'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'),
  ('22222222-2222-2222-2222-222222222222', 'Bob Martinez',  'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'),
  ('33333333-3333-3333-3333-333333333333', 'Carol Smith',   'https://api.dicebear.com/7.x/avataaars/svg?seed=carol'),
  ('44444444-4444-4444-4444-444444444444', 'David Kim',     'https://api.dicebear.com/7.x/avataaars/svg?seed=david')
ON CONFLICT (id) DO NOTHING;

-- ─── Labels ───────────────────────────────────────────────────────────────────
INSERT INTO labels (id, name, color) VALUES
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bug',         '#ef4444'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'feature',     '#3b82f6'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'improvement', '#8b5cf6'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'docs',        '#10b981'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'performance', '#f59e0b')
ON CONFLICT (id) DO NOTHING;

-- ─── Issues ───────────────────────────────────────────────────────────────────
INSERT INTO issues (id, title, description, status, priority, assignee_id, created_at) VALUES
  (
    'issue001-0000-0000-0000-000000000001',
    'Fix login redirect loop on Safari',
    'Users on Safari 17 are experiencing an infinite redirect loop after successful OAuth login. The issue appears to be related to cookie handling. Steps to reproduce: 1. Open Safari 17. 2. Click "Sign in with GitHub". 3. Observe endless redirect.',
    'in_progress', 'urgent',
    '11111111-1111-1111-1111-111111111111',
    NOW() - INTERVAL '5 days'
  ),
  (
    'issue001-0000-0000-0000-000000000002',
    'Add dark mode support',
    'Implement a system-aware dark mode using CSS custom properties. Should respect `prefers-color-scheme` and include a manual toggle stored in localStorage.',
    'todo', 'high',
    '22222222-2222-2222-2222-222222222222',
    NOW() - INTERVAL '4 days'
  ),
  (
    'issue001-0000-0000-0000-000000000003',
    'Improve pagination performance on large datasets',
    'Cursor-based pagination is slow when the dataset exceeds 100k rows. Profile the query planner and add appropriate indexes.',
    'backlog', 'medium',
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '3 days'
  ),
  (
    'issue001-0000-0000-0000-000000000004',
    'Update API documentation',
    'The REST API docs are out of date since the v2 migration. Update all endpoint descriptions, request/response examples, and authentication section.',
    'todo', 'low',
    '44444444-4444-4444-4444-444444444444',
    NOW() - INTERVAL '2 days'
  ),
  (
    'issue001-0000-0000-0000-000000000005',
    'Notification bell shows wrong unread count',
    'The unread notification count in the nav bar does not update in real time. It requires a full page reload to reflect new notifications.',
    'done', 'high',
    '11111111-1111-1111-1111-111111111111',
    NOW() - INTERVAL '1 day'
  ),
  (
    'issue001-0000-0000-0000-000000000006',
    'Add CSV export for issue list',
    'Allow users to export the current issue list view (including active filters) as a CSV file. Should include: id, title, status, priority, assignee, labels, created_at.',
    'backlog', 'medium',
    NULL,
    NOW() - INTERVAL '6 hours'
  )
ON CONFLICT (id) DO NOTHING;

-- ─── Comments ─────────────────────────────────────────────────────────────────
INSERT INTO comments (id, issue_id, body, author_id, created_at) VALUES
  (
    'comment1-0000-0000-0000-000000000001',
    'issue001-0000-0000-0000-000000000001',
    'Confirmed on Safari 17.2.1. Not reproducible on Firefox or Chrome.',
    '22222222-2222-2222-2222-222222222222',
    NOW() - INTERVAL '4 days 12 hours'
  ),
  (
    'comment1-0000-0000-0000-000000000002',
    'issue001-0000-0000-0000-000000000001',
    'Root cause found: the SameSite=Lax cookie attribute is not being set correctly on the OAuth callback route. Working on a fix.',
    '11111111-1111-1111-1111-111111111111',
    NOW() - INTERVAL '3 days'
  ),
  (
    'comment1-0000-0000-0000-000000000002',
    'issue001-0000-0000-0000-000000000002',
    'Should we also support a per-user preference saved to their profile?',
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '2 days'
  ),
  (
    'comment1-0000-0000-0000-000000000003',
    'issue001-0000-0000-0000-000000000003',
    'I ran EXPLAIN ANALYZE on the query. Adding a composite index on (created_at DESC, id) should help. Will open a separate issue for the index migration.',
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT (id) DO NOTHING;

-- ─── Issue Labels ─────────────────────────────────────────────────────────────
INSERT INTO issue_labels (issue_id, label_id) VALUES
  ('issue001-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), -- bug
  ('issue001-0000-0000-0000-000000000002', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'), -- feature
  ('issue001-0000-0000-0000-000000000002', 'cccccccc-cccc-cccc-cccc-cccccccccccc'), -- improvement
  ('issue001-0000-0000-0000-000000000003', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'), -- performance
  ('issue001-0000-0000-0000-000000000004', 'dddddddd-dddd-dddd-dddd-dddddddddddd'), -- docs
  ('issue001-0000-0000-0000-000000000005', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'), -- bug
  ('issue001-0000-0000-0000-000000000006', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb')  -- feature
ON CONFLICT DO NOTHING;
