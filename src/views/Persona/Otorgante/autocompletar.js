import React, { Component } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ReactDOM from "react-dom";

export default class Sizes extends Component {
  state = {
    default: {}
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ default: top100Films[3] });
    });
  }

  handleChange = (event, value) => {
    // really this should be this.state.newState or something
    // for the sake of keeping it simple i'll leave it as this.state.default
    this.setState({ default: value });
  };

  render() {
    return (
      <Autocomplete
        id="size-small-standard"
        size="small"
        options={top100Films}
        getOptionLabel={option => (option.title ? option.title : "")}
        value={this.state.default}
        onChange={this.handleChange}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Size small"
            placeholder="Favorites"
            fullWidth
          />
        )}
      />
    );
  }
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 }
];
