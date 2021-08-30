import React, { ReactNode } from 'react';
import { TabPanel } from 'react-headless-tabs';
import { IChildrenProp, IElementProps } from 'types';
import classes from './Settings.module.css';

type Props = IChildrenProp & IElementProps;

export const TabsContainer = (props: Props) => (
  <div className={classes['tabs-container']}>{props.children}</div>
);

export const TabsNavigation = (props: Props) => (
  <nav className={classes['tabs-navigations']}>{props.children}</nav>
);

export const TabSelector = (props: {
  isActive: boolean;
  id: string;
  children: ReactNode;
  onClick: () => void;
}) => (
  <a
    className={`${classes['tab-selector']} ${
      props.isActive ? classes['tab-selector-active'] : classes['tab-selector-inactive']
    }`}
    onClick={props.onClick}
    href={`#${props.id}`}
  >
    {props.children}
  </a>
);

export const Tabs = (props: Props) => <div className={classes['tabs']}>{props.children}</div>;

export const Tab = (props: { isHidden: boolean; children: ReactNode }) => (
  <TabPanel hidden={props.isHidden} component-name="TabPanel" className={classes['tab']}>
    {props.children}
  </TabPanel>
);
