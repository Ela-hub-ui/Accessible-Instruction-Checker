export enum IssueCategory {
  ABLEIST_LANGUAGE = 'ableist_language',
  ACCESSIBILITY_BARRIER = 'accessibility_barrier'
}

export enum AccessibilityStandard {
  ADA_TITLE_II = 'ADA Title II',
  UDL = 'UDL',
  WCAG_2_2_AA = 'WCAG 2.2 AA'
}

export interface Issue {
  text: string;
  explanation: string;
  category: IssueCategory | string;
  standard: AccessibilityStandard | string;
}

export interface AnalysisResult {
  issues_found: Issue[];
  accessible_rewrite: string;
  guiding_prompts: string[];
}
