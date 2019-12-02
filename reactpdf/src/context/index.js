import * as React from 'react'

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

class AppContext extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };

    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // 整个 state 都被传递进 provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

const ThemeTogglerButton = () => {
  const {theme, toggleTheme } = React.useContext()
  return (
    <div>
      <button style={theme} onClick={toggleTheme}>{toggleTheme}</button>
    </div>
  );
}

function Content() {
  return (
    <ThemeContext.Consumer>
      <ThemeTogglerButton />
    </ThemeContext.Consumer>
  );
}

export default AppContext