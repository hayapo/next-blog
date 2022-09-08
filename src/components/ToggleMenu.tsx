import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaTwitter, FaGithub } from 'react-icons/fa';

export const ToggleMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Menu onClose={onClose} >
      <Box >
        <MenuButton
          as={IconButton}
          onClick={handleToggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        >
        </MenuButton>
        <MenuList  maxW='10px' onClick={handleToggle}>
          <MenuItem
            as="a"
            icon={<FaGithub />}
            command='Github'
            href={`https://github.com/hayapo`}
            target="_blank"
            rel="external noopener noreferrer"
          />
          <MenuItem
            as="a"
            icon={<FaTwitter />}
            command='Twitter'
            href={`https://twitter.com/hayapo_hip`}
            target="_blank"
            rel="external noopener noreferrer"
          />
        </MenuList>
      </Box>
    </Menu>
  )
}

export default ToggleMenu;
