import { EditorType, Lexical } from "~/components/common/editor";
import { Assistance } from "~/types/assistance";
import { $convertFromMarkdownString, TRANSFORMERS } from "@lexical/markdown";

interface DashboardAssistanceProps {
  assistance: Assistance;
}

export const DashboardAssistance = ({ assistance }: DashboardAssistanceProps) => {
  return (
    <Lexical
      id={assistance.id}
      editable={false}
      showToolbar={false}
      type={EditorType.rich}
      generateDefaultContent={(root) => {
        root.clear();
        $convertFromMarkdownString(assistance.response ?? "", TRANSFORMERS, root);
        return root;
      }}
      defaultContent={{}}
      onChange={function (): void {}}
    />
  );
};
