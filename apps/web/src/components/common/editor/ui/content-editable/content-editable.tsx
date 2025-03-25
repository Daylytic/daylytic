import type {JSX} from "react";

import styles from "./content-editable.module.css";

import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import * as React from "react";

type LexicalContentEditableProps = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export const LexicalContentEditable = ({
  className,
  placeholder,
  placeholderClassName,
}: LexicalContentEditableProps): JSX.Element =>  {
  return (
    <ContentEditable
      className={clsx(className ?? styles.wrapper)}
      aria-placeholder={placeholder}
      placeholder={
        <div className={placeholderClassName ?? styles.placeholder}>
          {placeholder}
        </div>
      }
    />
  );
}