import React, { useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  IconButton,
  Tooltip,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface MapFilterOptionsProps {
  categories: string[];
  brands: string[];
  selectedCategories: string[];
  selectedBrands: string[];
  onCategoryChange: (selected: string[]) => void;
  onBrandsChange: (selected: string[]) => void;
}

const MapFilterOptions: React.FC<MapFilterOptionsProps> = ({
  categories,
  selectedCategories,
  brands,
  selectedBrands,
  onBrandsChange,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectionChange = (event: any) => {
    const selectedValues = event?.target?.value as string[];
    if (selectedValues.includes("all")) {
      onCategoryChange(categories); // Select all categories if "all" is chosen
    } else {
      onCategoryChange(selectedValues);
    }
  };
  const handleBrandSelectionChange = (event: any) => {
    const selectedValues = event?.target?.value as string[];
    console.log(selectedValues);
    if (selectedValues.includes("allBrands")) {
      onBrandsChange(brands);
    } else {
      onBrandsChange(selectedValues);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Collapse
        in={isOpen}
        orientation="horizontal"
        timeout="auto"
        unmountOnExit
      >
        <div style={{ display: isMobile ? "grid" : "flex" }}>
          <FormControl>
            <Select
              size="small"
              multiple
              value={selectedCategories}
              onChange={handleSelectionChange}
              renderValue={(selected) =>
                selected.length === categories.length
                  ? "All Inventories"
                  : selected.map(capitalizeAndFormat).join(", ")
              }
              style={{ background: "white", borderRadius: "5px" }}
            >
              <MenuItem value="all">
                <Checkbox
                  checked={categories.length === selectedCategories.length}
                />
                <ListItemText primary="All" />
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  <Checkbox checked={selectedCategories.includes(category)} />
                  <ListItemText primary={capitalizeAndFormat(category)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{marginLeft: isMobile ? "0px": '10px',marginTop: isMobile ? "5px": '0px'}}>
            <Select
              size="small"
              multiple
              value={selectedBrands}
              onChange={handleBrandSelectionChange}
              renderValue={(selected) =>
                selected.length === brands.length
                  ? "All Brands"
                  : selected.map(capitalizeAndFormat).join(", ")
              }
              style={{ background: "white", borderRadius: "5px" }}
            >
              <MenuItem value="allBrands">
                <Checkbox checked={brands.length === selectedBrands.length} />
                <ListItemText primary="All Brands" />
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand} value={brand}>
                  <Checkbox checked={selectedBrands.includes(brand)} />
                  <ListItemText primary={capitalizeAndFormat(brand)} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Collapse>
      <Tooltip title="Filter">
        <IconButton onClick={handleToggleOpen} color="primary">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

const capitalizeAndFormat = (text: string) => {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

export default MapFilterOptions;
