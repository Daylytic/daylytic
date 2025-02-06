import type {JSX} from 'react';

import './content-editable.css';

import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import * as React from 'react';
import clsx from 'clsx';

type Props = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export default function LexicalContentEditable({
  className,
  placeholder,
  placeholderClassName,
}: Props): JSX.Element {
  return (
    <ContentEditable
      className={clsx(className ?? "ContentEditable__root")}
      aria-placeholder={placeholder}
      placeholder={
        <div className={placeholderClassName ?? 'ContentEditable__placeholder'}>
          {placeholder}
        </div>
      }
    />
  );
}