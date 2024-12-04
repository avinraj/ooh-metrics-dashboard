import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";

interface MapSearchBoxProps {
  onLocationSelect: (location: { longitude: number; latitude: number }) => void;
  onClear: () => void;
}

const MapSearchBox: React.FC<MapSearchBoxProps> = ({
  onLocationSelect,
  onClear,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json`,
        {
          params: {
            access_token:
              "pk.eyJ1Ijoib29obWV0cmljcyIsImEiOiJjbTNndWhvb3cwN3doMm9xejFnbnJhbmxjIn0.gUT_L2_wIqhQlfDMSXXrxA",
            limit: 100,
          },
        }
      );

      setSearchResults(response.data.features || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    onClear();
  };

  const handleLocationSelect = (
    longitude: number,
    latitude: number,
    text: string
  ) => {
    onLocationSelect({ longitude, latitude });
    setSearchQuery(text);
    setSearchResults([]);
  };

  return (
    <Box>
      {/* Search Input */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "5px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Search location"
          value={searchQuery}
          onChange={(e) => {
            if (!e.target.value) {
              handleClear();
            } else setSearchQuery(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={() => handleSearch()}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Paper
          elevation={3}
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <List>
            {searchResults.map((result, index) => (
              <>
                <ListItem
                  key={index}
                  onClick={() =>
                    handleLocationSelect(
                      result.center[0],
                      result.center[1],
                      result.place_name
                    )
                  }
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <ListItemText primary={result.place_name} />
                </ListItem>
                {searchResults?.length === index + 1 ? null : (
                  <Divider component="li" />
                )}
              </>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default MapSearchBox;
