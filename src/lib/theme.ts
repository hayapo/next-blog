import { ThemeConfig } from "@chakra-ui/react";
import { extendBaseTheme } from "@chakra-ui/react";
import {
  Heading as HeadingTheme,
  Button as ButtonTheme,
  Checkbox as CheckboxTheme,
  Container as ContainerTheme,
  Link as LinkTheme,
  CloseButton as CloseButtonTheme,
  Menu as MenuTheme,
  Divider as DividerTheme,
  Tag as TagTheme,
  Badge as BadgeTheme,
  Code as CodeTheme,
} from "@chakra-ui/theme/components";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendBaseTheme({
  config,
  components: {
    Heading: HeadingTheme,
    Button: ButtonTheme,
    CloseButton: CloseButtonTheme,
    CheckBox: CheckboxTheme,
    Container: ContainerTheme,
    Link: LinkTheme,
    Menu: MenuTheme,
    Divider: DividerTheme,
    Code: CodeTheme,
    Badge: BadgeTheme,
    Tag: TagTheme,
  },
});
