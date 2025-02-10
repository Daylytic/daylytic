import { DecoratorNode } from 'lexical';
import React, { ReactNode } from 'react';

export class QuoteNode extends DecoratorNode<ReactNode> {
  static getType(): string {
    return 'quote';
  }

  static clone(node: QuoteNode): QuoteNode {
    return new QuoteNode(node.__key);
  }

  // Instead of createDOM, use decorate() to render with React:
  decorate(): React.ReactNode {
    const text = this.getTextContent();
    // Render the exact structure: a container div with ant-typography,
    // inside of which is a blockquote that contains the quote text.
    return (
      <div className="ant-typography">
        <blockquote className="ant-typography-quote">
          <p>{text}</p>
        </blockquote>
      </div>
    );
  }
}
