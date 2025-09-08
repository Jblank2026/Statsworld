# 🎯 JakesWorld Student Activity Tracking

## 📊 What's Being Tracked

### **Student Identification**
- ✅ UTK NetID (required for all tracking)
- ✅ Student Name (optional)
- ✅ Login timestamps
- ✅ Session tracking

### **Page Navigation**
- ✅ **Every page visit** with timestamps
- ✅ **Page titles** and paths
- ✅ **Time spent** on each page
- ✅ **Entry and exit** tracking
- ✅ **Navigation patterns** between pages

### **Content Interaction**
- ✅ **Explanation clicks** (intercept, slope, RSE, R-squared)
- ✅ **Button clicks** (all buttons site-wide)
- ✅ **Link clicks** (navigation and external links)
- ✅ **Form submissions**
- ✅ **Input field focus** (engagement tracking)

### **Engagement Metrics**
- ✅ **Scroll progress** (how far down pages students scroll)
- ✅ **User idle detection** (30-second inactivity tracking)
- ✅ **Active vs idle time**
- ✅ **Session duration**

### **Real-time Monitoring**
- ✅ **Live activity feed** showing all student actions
- ✅ **Auto-refreshing dashboard** (every 5 seconds)
- ✅ **Today's activity statistics**
- ✅ **Most popular pages and features**

## 📍 Where Tracking Occurs

### **Automatic Tracking (All Pages)**
- Home page (`/`)
- All chapter pages (automatically detects chapter/section)
- Navigation between any pages
- All button and link interactions

### **Enhanced Tracking**
- **Chapter 4 - Interpreting Summary Output**: Detailed explanation click tracking
- **Future chapters**: Easy to add the same detailed tracking

## 🔍 Analytics Available

### **Admin Dashboards**
1. **`/admin/analytics`** - Overview statistics and student summaries
2. **`/admin/activity`** - Live activity monitoring with real-time feed

### **Data Points Collected**
- Total students using JakesWorld
- Active students per day
- Most visited pages/chapters
- Student engagement patterns
- Time spent per page/section
- Click patterns on educational content
- Learning path analysis

### **Individual Student Tracking**
- Complete activity history per NetID
- Page visit sequences
- Time spent on different topics
- Interaction frequency
- Learning engagement levels

## 🎮 Activity Types Tracked

| Activity Type | Description | Example |
|---------------|-------------|---------|
| `login` | Student enters NetID | First visit to JakesWorld |
| `page_view` | Student visits a page | Going to Chapter 4 |
| `page_entry` | Enhanced page entry | Detailed chapter context |
| `page_exit` | Leaving a page | Navigation away |
| `explanation_click` | Clicking educational content | Clicking "intercept" explanation |
| `button_click` | Any button interaction | Submit, navigation buttons |
| `link_click` | Following links | Chapter navigation |
| `scroll_progress` | Scroll depth tracking | "50% scrolled" |
| `time_spent` | Time on page | "120s on Chapter 4" |
| `user_idle` | Inactivity detection | Student stepped away |
| `user_active` | Return from idle | Student returned |
| `form_submit` | Form interactions | Contact forms, quizzes |
| `input_focus` | Field engagement | Focusing on input fields |

## 🚀 Console Logging

When testing, you'll see helpful logs:
- `✅ Logged in: jsmith42`
- `📄 Page View: /chapters/4/interpreting-summary-output for jsmith42`
- `📊 Tracked: explanation_click (intercept) for jsmith42`
- `⏱️ Time Spent: 45s on /chapters/4/interpreting-summary-output for jsmith42`

## 🔧 Easy Expansion

To add tracking to any new page, simply add:
```tsx
import PageActivityTracker from '../components/PageActivityTracker';

// In your component's return:
<PageActivityTracker 
  pageType="chapter"
  chapter="Chapter 5"
  section="your-section-name"
/>
```

## 📊 Database Schema

All data is stored in PostgreSQL via Prisma:
- `Student` - NetID, name, timestamps
- `StudentVisit` - Every interaction with full context
- Indexed for fast querying and analytics

## 🎯 Perfect for Research & Analytics

This system provides comprehensive data for:
- **Learning effectiveness research**
- **Student engagement analysis** 
- **Content optimization**
- **Usage pattern identification**
- **Individual student progress tracking**
