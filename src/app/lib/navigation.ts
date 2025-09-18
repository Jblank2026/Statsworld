// Chapter navigation configuration
export interface ChapterInfo {
  number: number;
  title: string;
  slug: string;
  topics: TopicInfo[];
}

export interface TopicInfo {
  title: string;
  slug: string;
  order: number;
}

export const CHAPTERS: Record<number, ChapterInfo> = {
  1: {
    number: 1,
    title: "Introduction to Statistics",
    slug: "/chapters/1",
    topics: [
      { title: "What is Statistics?", slug: "/chapters/1/what-is-statistics", order: 1 },
      { title: "Populations & Samples", slug: "/chapters/1/populations-samples", order: 2 },
      { title: "Variables & Data Types", slug: "/chapters/1/variables-data-types", order: 3 },
      { title: "Statistics Game Challenge", slug: "/chapters/1/statistics-game", order: 4 }
    ]
  },
  2: {
    number: 2,
    title: "Univariate Displays",
    slug: "/chapters/2",
    topics: [
      { title: "Categorical Displays", slug: "/chapters/2/categorical-displays", order: 1 },
      { title: "Quantitative Displays", slug: "/chapters/2/quantitative-displays", order: 2 },
      { title: "Center & Spread", slug: "/chapters/2/center-spread", order: 3 }
    ]
  },
  3: {
    number: 3,
    title: "Bivariate Categorical Displays",
    slug: "/chapters/3",
    topics: [
      { title: "Contingency Tables", slug: "/chapters/3/contingency-tables", order: 1 },
      { title: "Segmented Bar Charts", slug: "/chapters/3/segmented-bar-charts", order: 2 },
      { title: "Independence vs Association", slug: "/chapters/3/independence-association", order: 3 }
    ]
  },
  4: {
    number: 4,
    title: "Comparing Distributions",
    slug: "/chapters/4",
    topics: [
      { title: "Stacked Histograms", slug: "/chapters/4/stacked-histograms", order: 1 },
      { title: "Five-Number Summary", slug: "/chapters/4/five-number-summary", order: 2 },
      { title: "Boxplots & Outliers", slug: "/chapters/4/boxplots", order: 3 },
      { title: "Boxplot Association Analysis", slug: "/chapters/4/boxplot-association", order: 4 }
    ]
  },
  5: {
    number: 5,
    title: "The Normal Model",
    slug: "/chapters/5",
    topics: [
      { title: "Normal Distribution Basics", slug: "/chapters/5/normal-basics", order: 1 },
      { title: "Z-Scores & Standardization", slug: "/chapters/5/z-scores", order: 2 },
      { title: "68-95-99.7 Rule", slug: "/chapters/5/empirical-rule", order: 3 },
      { title: "Normal Probability Plots", slug: "/chapters/5/normal-plots", order: 4 }
    ]
  },
  6: {
    number: 6,
    title: "Correlation",
    slug: "/chapters/6",
    topics: [
      { title: "Scatterplots", slug: "/chapters/6/scatterplots", order: 1 },
      { title: "Direction, Form & Strength", slug: "/chapters/6/direction-form-strength", order: 2 },
      { title: "Correlation Coefficient", slug: "/chapters/6/correlation-coefficient", order: 3 },
      { title: "Correlation vs Causation", slug: "/chapters/6/correlation-causation", order: 4 },
      { title: "Correlation Detective Game", slug: "/chapters/6/correlation-game", order: 5 }
    ]
  },
  7: {
    number: 7,
    title: "Associations",
    slug: "/chapters/7",
    topics: [
      { title: "Visual Arsenal", slug: "/chapters/7/visualizations", order: 1 },
      { title: "Association Types", slug: "/chapters/7/association-types", order: 2 },
      { title: "Quantitative-Quantitative", slug: "/chapters/7/quantitative-quantitative", order: 3 },
      { title: "Quantitative-Categorical", slug: "/chapters/7/quantitative-categorical", order: 4 },
      { title: "Categorical-Categorical", slug: "/chapters/7/categorical-categorical", order: 5 },
      { title: "Visual ID Challenge", slug: "/chapters/7/visual-id", order: 6 }
    ]
  },
  8: {
    number: 8,
    title: "R Basics",
    slug: "/chapters/8",
    topics: [
      { title: "R Studio Setup", slug: "/chapters/8/r-studio-setup", order: 1 },
      { title: "R Arithmetic Practice", slug: "/chapters/8/r-arithmetic-game", order: 2 },
      { title: "Vector Challenge", slug: "/chapters/8/vector-challenge", order: 3 },
      { title: "Data Frame Challenge", slug: "/chapters/8/data-frame-challenge", order: 4 },
      { title: "Summary Functions", slug: "/chapters/8/summary-functions", order: 5 }
    ]
  },
  9: {
    number: 9,
    title: "Simple Linear Regression",
    slug: "/chapters/9",
    topics: [
      { title: "Linear Equation", slug: "/chapters/9/linear-equation", order: 1 },
      { title: "Sum of Squared Error & Naive Model", slug: "/chapters/9/sum-of-squared-error", order: 2 },
      { title: "Making Predictions", slug: "/chapters/9/making-predictions", order: 3 },
      { title: "Transformations", slug: "/chapters/9/transformations", order: 4 },
      { title: "Interpreting Summary Output", slug: "/chapters/9/interpreting-summary-output", order: 5 },
      { title: "Regression Assumptions", slug: "/chapters/9/regression-assumptions", order: 6 }
    ]
  },
  10: {
    number: 10,
    title: "Multiple Regression",
    slug: "/chapters/10",
    topics: [
      { title: "Multiple Regression Intro", slug: "/chapters/10/multiple-regression-intro", order: 1 },
      { title: "Multiple Equation", slug: "/chapters/10/multiple-equation", order: 2 },
      { title: "Interpreting Multiple Output", slug: "/chapters/10/interpreting-multiple-output", order: 3 },
      { title: "Multiple Regression Assumptions", slug: "/chapters/10/multiple-regression-assumptions", order: 4 },
      { title: "Multicollinearity", slug: "/chapters/10/multicollinearity", order: 5 },
      { title: "Interaction Variables", slug: "/chapters/10/interaction-variables", order: 6 }
    ]
  },
  11: {
    number: 11,
    title: "Categorical Variables",
    slug: "/chapters/11",
    topics: [
      { title: "Encoding Indicator Variables", slug: "/chapters/11/encoding-indicator-variables", order: 1 },
      { title: "Regression Equation", slug: "/chapters/11/regression-equation", order: 2 },
      { title: "Interpreting Summary Output", slug: "/chapters/11/interpreting-summary-output", order: 3 },
      { title: "Visual Indicator Variables", slug: "/chapters/11/visual-indicator-variables", order: 4 }
    ]
  },
  12: {
    number: 12,
    title: "Logistic Regression",
    slug: "/chapters/12",
    topics: [
      { title: "What IS Logistic Regression?", slug: "/chapters/12/visual-logistic", order: 1 },
      { title: "Logistic Foundations", slug: "/chapters/12/logistic-foundations", order: 2 },
      { title: "Interpreting Output", slug: "/chapters/12/interpreting-output", order: 3 },
      { title: "Confusion Matrices & Accuracy", slug: "/chapters/12/confusion-matrices", order: 4 },
      { title: "Checking Logistic Regression", slug: "/chapters/12/checking-regression", order: 5 }
    ]
  },
  13: {
    number: 13,
    title: "Model Building",
    slug: "/chapters/13",
    topics: [
      { title: "Descriptive Modeling", slug: "/chapters/13/descriptive-vs-predictive", order: 1 },
      { title: "Predictive Modeling", slug: "/chapters/13/predictive-modeling", order: 2 },
      { title: "Model Hierarchy & Interactions", slug: "/chapters/13/model-hierarchy", order: 3 },
      { title: "Building Models with R", slug: "/chapters/13/building-models-r", order: 4 }
    ]
  }
};

export interface NavigationInfo {
  chapterHome: string;
  chapterTitle: string;
  previousTopic?: string;
  nextTopic?: string;
  currentTopicTitle?: string;
}

export function getNavigationInfo(currentPath: string): NavigationInfo {
  // Parse the current path to extract chapter and topic
  const pathParts = currentPath.split('/');
  const chapterNumber = parseInt(pathParts[2]);
  const topicSlug = pathParts[3];
  
  const chapter = CHAPTERS[chapterNumber];
  
  if (!chapter) {
    return {
      chapterHome: "/chapters",
      chapterTitle: "Chapters"
    };
  }

  // If we're on a chapter homepage
  if (!topicSlug) {
    return {
      chapterHome: chapter.slug,
      chapterTitle: chapter.title
    };
  }

  // Find current topic
  const currentTopicIndex = chapter.topics.findIndex(topic => 
    topic.slug === currentPath
  );

  if (currentTopicIndex === -1) {
    return {
      chapterHome: chapter.slug,
      chapterTitle: chapter.title
    };
  }

  const currentTopic = chapter.topics[currentTopicIndex];
  const previousTopic = currentTopicIndex > 0 ? chapter.topics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < chapter.topics.length - 1 ? chapter.topics[currentTopicIndex + 1] : null;

  return {
    chapterHome: chapter.slug,
    chapterTitle: chapter.title,
    currentTopicTitle: currentTopic.title,
    previousTopic: previousTopic?.slug || chapter.slug,
    nextTopic: nextTopic?.slug || chapter.slug
  };
}

export function getCurrentChapterFromPath(path: string): ChapterInfo | null {
  const pathParts = path.split('/');
  const chapterNumber = parseInt(pathParts[2]);
  return CHAPTERS[chapterNumber] || null;
} 