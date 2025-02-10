import { DecoratorNode } from 'lexical';
import { ReactNode } from 'react';

export class QuoteNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return 'quote';
  }

  static clone(node: QuoteNode): QuoteNode {
    return new QuoteNode(node.__key);
  }

  decorate(): React.ReactNode {
    const text = this.getTextContent();
    return (
      <div className="ant-typography">
        <blockquote className="ant-typography-quote">
          <p>{text}</p>
        </blockquote>
      </div>
    );
  }
}
