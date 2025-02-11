import {LinkPlugin as LexicalLinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import * as React from 'react';
import { validateUrl } from 'utils/url';

type LinkPluginProps = {
  hasLinkAttributes?: boolean;
};

export const LinkPlugin= ({
  hasLinkAttributes = false,
}: LinkPluginProps): JSX.Element => {
  return (
    <LexicalLinkPlugin
      validateUrl={validateUrl}
      attributes={
        hasLinkAttributes
          ? {
              rel: 'noopener noreferrer',
              target: '_blank',
            }
          : undefined
      }
    />
  );
}