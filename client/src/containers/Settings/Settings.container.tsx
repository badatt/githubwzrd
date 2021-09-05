import React, { Fragment } from 'react';
import { useMount } from 'react-use';
import { useTabs } from 'react-headless-tabs';
import history, { locationIdGenerator } from 'modules/history';
import AccountSettings from './AccountSettings/AccountSettings.container';
import ReposSettings from './ReposSettings/ReposSettings.container';
import * as SettingsView from './Settings.view';
import cl from './Settings.module.scss';

const tabs = [
  {
    name: 'Account Details',
    panel: <AccountSettings />,
  },
  {
    name: 'User Repos',
    panel: <ReposSettings />,
  },
];

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useTabs(tabs.map(t => locationIdGenerator(t.name)));

  useMount(() => {
    setSelectedTab(history.location.hash.replace('#', ''));
  });

  return (
    <Fragment>
      <div className={cl.container}>
        <nav className={cl.navigation}>
          {tabs.map(t => (
            <SettingsView.TabSelector
              key={locationIdGenerator(t.name)}
              isActive={selectedTab === locationIdGenerator(t.name)}
              onClick={() => setSelectedTab(locationIdGenerator(t.name))}
              id={locationIdGenerator(t.name)}
            >
              {t.name}
            </SettingsView.TabSelector>
          ))}
        </nav>
        <div className={cl.tabs}>
          {tabs.map(t => (
            <SettingsView.Tab
              key={locationIdGenerator(t.name)}
              isHidden={selectedTab !== locationIdGenerator(t.name)}
            >
              {t.panel}
            </SettingsView.Tab>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
