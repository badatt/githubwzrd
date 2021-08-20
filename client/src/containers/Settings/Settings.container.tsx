import React, { Fragment } from 'react';
import { useTabs } from 'react-headless-tabs';
import AccountSettings from './AccountSettings/AccountSettings.container';
import ReposSettings from './ReposSettings/ReposSettings.container';
import * as SettingsView from './Settings.view';

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useTabs(['account', 'repos']);
  return (
    <Fragment>
      <SettingsView.TabsNavigation>
        <SettingsView.TabSelector
          isActive={selectedTab === 'account'}
          onClick={() => setSelectedTab('account')}
          id="account"
        >
          Account
        </SettingsView.TabSelector>
        <SettingsView.TabSelector
          isActive={selectedTab === 'repos'}
          onClick={() => setSelectedTab('repos')}
          id="repos"
        >
          Repos
        </SettingsView.TabSelector>
      </SettingsView.TabsNavigation>
      <SettingsView.TabsContainer>
        <SettingsView.Tab isHidden={selectedTab !== 'account'}>
          <AccountSettings />
        </SettingsView.Tab>
        <SettingsView.Tab isHidden={selectedTab !== 'repos'}>
          <ReposSettings />
        </SettingsView.Tab>
      </SettingsView.TabsContainer>
    </Fragment>
  );
};

export default Settings;
