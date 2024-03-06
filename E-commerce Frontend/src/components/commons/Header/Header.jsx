import React from 'react'
import classes from './Header.module.css'

import { useState } from 'react';
import {
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconPlayerPause,
  IconTrash,
  IconSwitchHorizontal,
  IconChevronDown,
} from '@tabler/icons-react';

import { IconPhoto, IconMessageCircle } from '@tabler/icons-react';

const Header = () => {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
      <>
        <div className={classes.header}>
          <Container className={classes.mainSection}>
            <Group justify='space-between'>
              <Tabs defaultValue="Home" >
                <Tabs.List>
                  <Tabs.Tab value="Home" leftSection={<IconChevronDown style={iconStyle} />}>
                    Home
                  </Tabs.Tab>
                  <Tabs.Tab value="Contact" leftSection={<IconMessageCircle style={iconStyle} />}>
                    Contact
                  </Tabs.Tab>
                  <Tabs.Tab value="Settings" leftSection={<IconSettings style={iconStyle} />}>
                    Settings
                  </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="Home">
                  Gallery tab content
                </Tabs.Panel>

                <Tabs.Panel value="Contact">
                  Messages tab content
                </Tabs.Panel>

                <Tabs.Panel value="Settings">
                  Settings tab content
                </Tabs.Panel>
              </Tabs>
            </Group>
          </Container>

        </div>
      </>
  );
};

export default Header;