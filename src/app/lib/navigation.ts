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
  2: {
    number: 2,
    title: "Associations",
    slug: "/chapters/2",
    topics: [
      { title: "Visual Arsenal", slug: "/chapters/2/visualizations", order: 1 },
      { title: "Association Types", slug: "/chapters/2/association-types", order: 2 },
      { title: "Quantitative-Quantitative", slug: "/chapters/2/quantitative-quantitative", order: 3 },
      { title: "Quantitative-Categorical", slug: "/chapters/2/quantitative-categorical", order: 4 },
      { title: "Categorical-Categorical", slug: "/chapters/2/categorical-categorical", order: 5 },
      { title: "Visual ID Challenge", slug: "/chapters/2/visual-id", order: 6 }
    ]
  },
  3: {
    number: 3,
    title: "R Basics",
    slug: "/chapters/3",
    topics: [
      { title: "R Studio Setup", slug: "/chapters/3/r-studio-setup", order: 1 },
      { title: "R Arithmetic Practice", slug: "/chapters/3/r-arithmetic-game", order: 2 },
      { title: "Vector Challenge", slug: "/chapters/3/vector-challenge", order: 3 },
      { title: "Data Frame Challenge", slug: "/chapters/3/data-frame-challenge", order: 4 },
      { title: "Summary Functions", slug: "/chapters/3/summary-functions", order: 5 }
    ]
  },
  4: {
    number: 4,
    title: "Simple Linear Regression",
    slug: "/chapters/4",
    topics: [
      { title: "Linear Equation", slug: "/chapters/4/linear-equation", order: 1 },
      { title: "Sum of Squared Error & Naive Model", slug: "/chapters/4/sum-of-squared-error", order: 2 },
      { title: "Making Predictions", slug: "/chapters/4/making-predictions", order: 3 },
      { title: "Transformations", slug: "/chapters/4/transformations", order: 4 },
      { title: "Interpreting Summary Output", slug: "/chapters/4/interpreting-summary-output", order: 5 },
      { title: "Regression Assumptions", slug: "/chapters/4/regression-assumptions", order: 6 }
    ]
  },
  5: {
    number: 5,
    title: "Multiple Regression",
    slug: "/chapters/5",
    topics: [
      { title: "Multiple Regression Intro", slug: "/chapters/5/multiple-regression-intro", order: 1 },
      { title: "Multiple Equation", slug: "/chapters/5/multiple-equation", order: 2 },
      { title: "Interpreting Multiple Output", slug: "/chapters/5/interpreting-multiple-output", order: 3 },
      { title: "Multiple Regression Assumptions", slug: "/chapters/5/multiple-regression-assumptions", order: 4 },
      { title: "Multicollinearity", slug: "/chapters/5/multicollinearity", order: 5 },
      { title: "Interaction Variables", slug: "/chapters/5/interaction-variables", order: 6 }
    ]
  },
  6: {
    number: 6,
    title: "Categorical Variables",
    slug: "/chapters/6",
    topics: [
      { title: "Encoding Indicator Variables", slug: "/chapters/6/encoding-indicator-variables", order: 1 },
      { title: "Regression Equation", slug: "/chapters/6/regression-equation", order: 2 },
      { title: "Interpreting Summary Output", slug: "/chapters/6/interpreting-summary-output", order: 3 },
      { title: "Visual Indicator Variables", slug: "/chapters/6/visual-indicator-variables", order: 4 }
    ]
  },
  7: {
    number: 7,
    title: "Logistic Regression",
    slug: "/chapters/7",
    topics: [
      { title: "What IS Logistic Regression?", slug: "/chapters/7/visual-logistic", order: 1 },
      { title: "Logistic Foundations", slug: "/chapters/7/logistic-foundations", order: 2 },
      { title: "Interpreting Output", slug: "/chapters/7/interpreting-output", order: 3 },
      { title: "Confusion Matrices & Accuracy", slug: "/chapters/7/confusion-matrices", order: 4 },
      { title: "Checking Logistic Regression", slug: "/chapters/7/checking-regression", order: 5 }
    ]
  },
  8: {
    number: 8,
    title: "Model Building",
    slug: "/chapters/8",
    topics: [
      { title: "Descriptive Modeling", slug: "/chapters/8/descriptive-vs-predictive", order: 1 },
      { title: "Predictive Modeling", slug: "/chapters/8/predictive-modeling", order: 2 },
      { title: "Model Hierarchy & Interactions", slug: "/chapters/8/model-hierarchy", order: 3 },
      { title: "Building Models with R", slug: "/chapters/8/building-models-r", order: 4 }
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