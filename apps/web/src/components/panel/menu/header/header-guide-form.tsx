import { Modal, Tabs } from "antd";
import { EditorType, Lexical } from "~/components/common/editor";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { SHORTCUTS } from "~/components/common/editor/plugins/shortcuts/shortcuts-list";
import { productivityLevels } from "~/components/panel/content/dashboard";

const { TabPane } = Tabs;

interface HeaderGuideFormProps {
  visible: boolean;
  onClose: () => void;
}

export const HeaderGuideForm = ({ visible, onClose }: HeaderGuideFormProps) => {
  return (
    <Modal open={visible} title="Best Practices Guide" footer={null} onCancel={onClose} width={800}>
      <Tabs defaultActiveKey="platform" type="card">
        <TabPane tab="Platform Best Practices" key="platform">
          <Lexical
            id="platform"
            editable={false}
            showToolbar={false}
            type={EditorType.rich}
            generateDefaultContent={(root) => {
              root.clear();
              $convertFromMarkdownString(platformBestPractices ?? "", TRANSFORMERS, root);
              return root;
            }}
            defaultContent={{}}
            onChange={() => {}}
          />
        </TabPane>
        <TabPane tab="Markdown Best Practices" key="markdown">
          <Lexical
            id="markdown"
            editable={false}
            showToolbar={false}
            type={EditorType.rich}
            generateDefaultContent={(root) => {
              root.clear();
              $convertFromMarkdownString(markdownGuide ?? "", TRANSFORMERS, root);
              return root;
            }}
            defaultContent={{}}
            onChange={() => {}}
          />
        </TabPane>
        <TabPane tab="Productivity Index" key="productivityIndex">
          <Lexical
            id="productivityIndex"
            editable={false}
            showToolbar={false}
            type={EditorType.rich}
            generateDefaultContent={(root) => {
              root.clear();
              $convertFromMarkdownString(productivityIndexPractices ?? "", TRANSFORMERS, root);
              return root;
            }}
            defaultContent={{}}
            onChange={() => {}}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

const platformBestPractices = `
# Daylytic Best Practices Guide

Welcome to your go-to guide for using **Daylytic** in the best possible way. This guide explains how to structure your day, set goals, manage tasks, and leverage the platform’s features for continuous progress. Whether you are a new user or already on your goal-setting journey, these best practices will help you turn your dreams into actionable steps.
\u00A0
## 1. Trust the Process & Set Your Mindset

- **Embrace the Journey:** Remember that achieving a goal is about persistent, incremental progress. Trust the process and understand that even when things are tough, every small step counts.
- **Adopt a Growth Mindset:** Let go of excuses. Acknowledge that every action (even if it feels insignificant), builds your willpower and sets you on the path to success.
\u00A0
## 2. Establish a Consistent Daily Routine

- **Create Your Routine:** Start your day with a well-defined routine. Use Daylytic to log basic tasks (e.g., “brush teeth,” “feed the dogs”) and dedicate dedicated time blocks to work toward your goals.
- **Consistency is Key:** Whether you set aside 30, 45, or 60 minutes daily, the goal is to create a habit. Consistency trains your brain (your internal “aMCC”) to overcome resistance.
\u00A0
## 3. Define Clear Goals and Break Them Down

- **Set Meaningful Goals:** Don’t just list abstract ideas like “Learn To Code.” Deepen your goal by writing a clear, and long description. This can make sure you know to the detail what you want to achieve. **It is a VERY important step in reaching your goal. Example description**:
*“I want to learn web development. From basic HTML, CSS, and JavaScript to more advanced tools (React, Next, Etc.). In order to build websites. I’m doing this to become independent, and join the tech field. When I face challenges, I take small steps, work on projects I enjoy, and get help from coding communities. This journey is about growing from a beginner into someone who confidently creates on the web.”*

- **Break Goals into Projects:** Divide each goal into projects. For example, under “Learn To Code” create projects like “Make A Website” and “Explore HTML.” This prevents overwhelm and provides structure.
- **Write Down Specific Tasks:** Within each project, list focused tasks. For example:
  - How does the internet work?
  - What do I need to make a website?
  - How to use HTML?
\u00A0
## 4. Leverage Task Prioritization & Deadlines

- **Prioritize Effectively:** Mark tasks as critical if they have an urgent deadline. Use Daylytic’s task settings to indicate priority and deadlines.
- **Keep It Actionable:** Use clear, actionable language in task descriptions. If a task feels overwhelming, break it down even further and commit to “showing up” even if you only take the first small step.
\u00A0
## 5. Use the Power of Notes and Markdown Editing

- **Enhance Your Tasks with Notes:** Attach detailed notes to tasks when needed. Use markdown for quick formatting. Titles, lists, and hyperlinks can clarify your thoughts.
- **Markdown Best Practices:** 
  - Use \`#\` for main titles and \`##\` for subheadings.
  - Create lists with \`-\` for bullet points.
  - Insert hyperlinks quickly with CTRL + K.
- **Benefit from Auto-save:** Don’t worry about losing your work. Daylytic auto-saves your notes and settings.
\u00A0
## 6. Utilize Daily Assistance for Personalized Analysis

- **Take Advantage of AI Insights:** When you’re feeling unmotivated or stuck, use the “Daily Assistant” feature. Answer a few guided questions and receive a tailored analysis with actionable recommendations.
- **Reflect and Iterate:** Use the feedback provided by Daily Assistance to adjust your routine and projects as needed. Reflection is a critical part of growth.
\u00A0
## 7. Optimize Your Work Sessions with Timelytic

- **Focus Your Time:** Use the Timelytic timer to schedule focused work sessions. Whether it’s 30 minutes in the morning or another time of day, set a clear work block to commit your attention.
- **Use the Pressure Positively:** Knowing that the session has a set end-time can help overcome procrastination by putting gentle pressure on you to start and finish tasks.
\u00A0
## 8. Monitor Progress and Celebrate Your Wins

- **Dashboard Analytics:** Check your dashboard regularly. Daylytic provides statistics on your routines, tasks, and overall progress. This data is essential for self-motivation.
- **Celebrate Milestones:** Whether it’s a streak of productive days or a high performance index, take a moment to appreciate how far you’ve come. Each accomplishment is a step toward success.
\u00A0
## 9. Remember: It’s a Continuous Process

- **Patience and Persistence:** Every day is an opportunity to learn and improve. Success isn’t an overnight phenomenon, it’s built through steady, consistent effort.
- **Refine as You Grow:** Keep reviewing and adjusting your routines, tasks, and goals. The process of improvement is ongoing, and Daylytic is designed to support that journey.
\u00A0
## 10. Conclusion

By following these best practices, you will harness the full potential of Daylytic as the ultimate tool for goal achievement. Whether you’re a seasoned goal-setter or just starting out, remember: small, consistent actions lead to great results.  
**Break free. Take control. Reach your goals with Daylytic.**
\u00A0
**Happy planning and achieving your goals!**
`;

const productivityIndexPractices = `
# Productivity Levels Index

This index provides a structured overview of different productivity levels along with the minimum points required to achieve each level. It serves as a guide to track and measure how well you are organized, and how well you reach your goals.
\u00A0
## Different Levels:
${productivityLevels.map((level) => `- **${level.name}**: ${level.minPoints}+ points\n`).join("")}
`;

const generateShortcutsMarkdown = (shortcuts: Record<string, string>): string =>
  Object.entries(shortcuts)
    .map(([key, value]) => `- **${key}**: \`${value}\``)
    .join("\n");

const markdownGuide = `
# Markdown Shortcuts Guide

Markdown is a simple markup language that lets you format text quickly using plain characters. Here’s a brief guide on how to use some of its most common shortcuts:
\u00A0
## Headings
To create headings, start your line with one or more hash (\`#\`) characters. The number of \`#\` symbols denotes the heading level:
- \`# Heading 1\` - Largest heading.
- \`## Heading 2\`
- \`### Heading 3\`
- \`#### Heading 4\`
- \`##### Heading 5\`
- \`###### Heading 6\` - Smallest heading.
\u00A0
## Lists
### Unordered (Bulleted) Lists
Start a line with a dash (\`-\`), a plus (\`+\`), or an asterisk (\`*\`) followed by a space:
- Item One
- Item Two
- Item Three

### Ordered (Numbered) Lists
Simply start each line with a number, a period and a space:
1. First item
2. Second item
3. Third item
\u00A0
## Text Formatting
- **Bold:** Wrap text with \`**\` or \`__\` (e.g., \`**bold text**\`).
- *Italic:* Wrap text with \`*\` or \`_\` (e.g., \`*italic text*\`).
- ~~Strikethrough:~~ Wrap text with \`~~\` (e.g., \`~~strikethrough~~\`).
- \`Inline Code:\` Enclose text within backticks (e.g., \`code\`).
- **Code Block:** wrap your code in triple backticks:

  \`\`\`
  const example = "This is a code block.";
  \`\`\`

- **Blockquote:** Start a line with \`>\` to format as a block quote:
  > This is a block quote.
\u00A0
## Keyboard Shortcuts Guide
Many Markdown editors offer keyboard shortcuts to speed up your formatting. Below is a guide to shortcuts as defined by our constants:

${generateShortcutsMarkdown(SHORTCUTS)}

You can copy and paste this content into any Markdown file to view the formatted list.
`;