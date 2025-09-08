# 📊 JakesWorld Simple Page Tracking

## What's Being Tracked

### ✅ Student Login
- UTK NetID when they first enter JakesWorld
- Login timestamp

### ✅ Page Visits Only
- Every page the student visits
- Page path (e.g., `/chapters/4/interpreting-summary-output`)
- Page title 
- Timestamp of visit
- Student's NetID associated with each visit

### ✅ Optional: Explanation Clicks
- When students click on explanations (intercept, slope, etc.)
- Only on pages where you specifically want this tracking

## What You'll See

### Console Logs:
```
✅ Logged in: jsmith42
📄 Page Visit: / for jsmith42
📄 Page Visit: /chapters/4/interpreting-summary-output for jsmith42
📊 Tracked: explanation_click (intercept) for jsmith42
```

### Analytics Dashboards:
1. **`/admin/analytics`** - Student summary and popular pages
2. **`/admin/activity`** - Recent page visits in real-time

### Example Activity Feed:
```
jsmith42 visited /chapters/4/interpreting-summary-output - 2 minutes ago
mjones3 visited / - 3 minutes ago  
jsmith42 clicked explanation (intercept) - 5 minutes ago
bwilson1 visited /chapters/2/visual-id - 8 minutes ago
```

## Database Records

Each page visit creates a simple record:
- **NetID**: jsmith42
- **Page**: /chapters/4/interpreting-summary-output  
- **Action**: page_view
- **Timestamp**: 2024-01-15 10:30:45

## Perfect for:
- Seeing which students are using JakesWorld
- Understanding which pages/chapters are most popular
- Tracking student learning paths through the content
- Basic engagement analytics

**Clean, simple, and focused on just the essential navigation data!** 📊
