import {
  Box,
  Checkbox,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import brandsData from "../../../Data/brandsData.json";
import { capitalizeAndFormat } from "./InventoryTotal";

interface DrawerComponentProps {
  isOpen: boolean;
  toggleDrawer: () => void;
  onBrandSelect: (selected: string[]) => void;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({
  isOpen,
  toggleDrawer,
  onBrandSelect,
}) => {
  // Extract brand name keys (like "burger_king")
  const brandNames = Object.keys(brandsData);
  const theme = useTheme()

  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

  const handleCheckboxChange =
    (brand: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;
      // Update the selected brands list
      const newCheckedBrands = isChecked
        ? [...checkedBrands, brand]
        : checkedBrands.filter((b) => b !== brand);

      setCheckedBrands(newCheckedBrands);
      onBrandSelect(newCheckedBrands);
    };

  return (
    <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
      <Box sx={{backgroundColor: theme.palette.secondary.main, height: '100%'}}>
        <Box sx={{padding: '10px'}}>
          <Typography
            variant="subtitle2"
            fontWeight={"bold"}
            gutterBottom
          >
            Select Brands
          </Typography>
          <List>
            {brandNames.map((brand: any) => (
              <div key={brand}>
                <ListItem style={{ fontWeight: "bold" }}>
                  <Checkbox
                    checked={checkedBrands.includes(brand)}
                    onChange={handleCheckboxChange(brand)}
                    inputProps={{ "aria-label": `checkbox for ${brand}` }}
                  />
                  <ListItemText primary={capitalizeAndFormat(brand)} />
                </ListItem>
              </div>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};
