import React, { ReactNode } from 'react';
import { TabPanel } from 'react-headless-tabs';
import cl from './Settings.module.scss';

export const TabSelector = (props: {
  isActive: boolean;
  id: string;
  children: ReactNode;
  onClick: () => void;
}) => (
  <a
    className={`${cl.selector} ${props.isActive ? cl.active : cl.inactive}`}
    onClick={props.onClick}
    href={`#${props.id}`}
  >
    {props.children}
  </a>
);

export const Tab = (props: { isHidden: boolean; children: ReactNode }) => (
  <TabPanel hidden={props.isHidden} component-name="TabPanel" className={cl.tab}>
    {props.children}
  </TabPanel>
);
