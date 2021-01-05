import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';
const TopMenu = () => {
  let activeItem = "browse"
  return (
    <Menu style={{ marginTop: 10 }}>
      <Link route="/">
        <a className="item">CrowdCoin</a>
      </Link>
      <Menu.Menu position='right'>
        <Menu.Item
          name='Campaigns'
        >
          Campaigns
          </Menu.Item>

        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default TopMenu;