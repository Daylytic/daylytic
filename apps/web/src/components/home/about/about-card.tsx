import clsx from "clsx";
import {styles} from ".";
import { Card, Flex } from "antd";
import { ReactNode } from "react";

interface AboutCardProps {
  image: ReactNode;
  title: string;
  description: string;
  imagePosition?: 'left' | 'right';
}

export const AboutCard = ({ image, title, description, imagePosition = "left" }: AboutCardProps) => {
    const imageDiv = (
      <div className={clsx(styles.image, imagePosition === 'left' && styles.reversed)}>
        {image}
      </div>
    );
  
    const textDiv = (
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <p>{description}</p>
      </div>
    );

    return (
      <Card className={styles.card}>
        <Flex gap="large" align="center" justify="center" className={styles.inner}>
          {imagePosition === 'left' ? (
            <>
              {imageDiv}
              {textDiv}
            </>
          ) : (
            <>
              {textDiv}
              {imageDiv}
            </>
          )}
        </Flex>
      </Card>
    );
  };
  