# IDE Setup Guide for Enhanced MCP Server

This guide provides comprehensive IDE integration for the Enhanced MCP Server project, supporting multiple development environments with debugging, linting, and productivity features.

## Table of Contents

- [VS Code Setup (Recommended)](#vs-code-setup-recommended)
- [IntelliJ IDEA/WebStorm Setup](#intellij-ideawebstorm-setup)
- [Vim/Neovim Setup](#vimneovim-setup)
- [Universal Configurations](#universal-configurations)
- [Development Workflows](#development-workflows)
- [Troubleshooting](#troubleshooting)

## VS Code Setup (Recommended)

### Automatic Configuration

The project includes pre-configured VS Code settings in the `.vscode/` directory:

- **Settings**: Code formatting, file associations, search preferences
- **Launch Configurations**: Multiple debug configurations for different scenarios
- **Tasks**: Build, test, and development automation
- **Extensions**: Recommended extensions for optimal development experience
- **Snippets**: Custom code snippets for MCP development

### Key Features

#### Debug Configurations

1. **Debug MCP Server** - Standard debugging with breakpoints
2. **Debug MCP Server (Production Mode)** - Test production configurations
3. **Debug MCP Server (Custom Port)** - Debug with custom port input
4. **Attach to Running Process** - Attach debugger to already running server
5. **Debug with Inspector** - Advanced debugging with Node.js inspector

#### Tasks Available

- `Ctrl+Shift+P` → `Tasks: Run Task`:
  - **Start MCP Server** - Launch server normally
  - **Start MCP Server (Debug Mode)** - Launch with debug logging
  - **Install Dependencies** - Run npm install
  - **Update Dependencies** - Update all packages
  - **Audit Dependencies** - Security audit
  - **Open Dashboard** - Launch browser to dashboard
  - **Kill Node Processes** - Terminate all Node.js processes

#### Custom Snippets

Type these prefixes and press `Tab`:

- `mcp-tool` - Create new MCP tool handler
- `mcp-tool-list` - Add tool to tools list
- `log` - Add logger statement
- `safe-exec` - Safe command execution with error handling
- `route` - Express route handler
- `zod-schema` - Zod validation schema

### Recommended Extensions

The following extensions will be automatically suggested:

**Core Development:**
- Node.js Extension Pack
- ES6/JavaScript debugging
- JSON support

**Code Quality:**
- ESLint
- Prettier
- Error Lens
- Code Spell Checker

**Git Integration:**
- GitLens
- Git History
- Git Graph

**Web Development:**
- HTML/CSS support
- Auto Rename Tag

**API Testing:**
- REST Client
- Thunder Client

### Getting Started

1. Open project in VS Code
2. Install recommended extensions when prompted
3. Use `F5` to start debugging
4. Access dashboard at `http://localhost:3001`

## IntelliJ IDEA/WebStorm Setup

### Run Configurations

Pre-configured run configurations available:

1. **Start MCP Server** - Normal execution with browser launch
2. **Debug MCP Server** - Debug mode with browser and JS debugger
3. **Install Dependencies** - NPM install task

### File Watchers

Automatic code quality with watchers for:
- **ESLint** - Real-time linting
- **Prettier** - Code formatting on save

### JavaScript Libraries

- Node.js Core library enabled
- Project dependencies automatically mapped
- IntelliSense for all dependencies

### Getting Started

1. Open project in IntelliJ IDEA/WebStorm
2. Run configurations will be available in the toolbar
3. File watchers will activate automatically
4. Use the debugger with breakpoints for development

## Vim/Neovim Setup

### Configuration Files

- `.vim/coc-settings.json` - CoC (Conquer of Completion) configuration
- `.vim/init.vim` - Project-specific Vim settings and key mappings

### Key Mappings

**Development Commands:**
- `<leader>ms` - Start server (`npm start`)
- `<leader>md` - Start in debug mode (`npm run dev`)
- `<leader>mi` - Install dependencies
- `<leader>mo` - Open dashboard in browser

**Debugging:**
- `<leader>db` - Start with breakpoint (`--inspect-brk`)
- `<leader>di` - Start with inspector (`--inspect`)

**File Navigation:**
- `<leader>fs` - Open server.js
- `<leader>fp` - Open package.json
- `<leader>fd` - Open dashboard.html
- `<leader>fr` - Open README.md

**Git Integration:**
- `<leader>gs` - Git status
- `<leader>ga` - Git add all
- `<leader>gc` - Git commit (with message prompt)
- `<leader>gp` - Git push

**Terminal:**
- `<leader>t` - Open terminal
- `<leader>tv` - Vertical split terminal
- `<leader>th` - Horizontal split terminal

### Required Plugins

For optimal experience, install these Vim/Neovim plugins:

- **CoC.nvim** - Language server support
- **vim-javascript** - JavaScript syntax
- **vim-json** - JSON support
- **vim-gitgutter** - Git integration
- **fzf.vim** - Fuzzy finding
- **nerdtree** - File explorer

### Getting Started

1. Copy `.vim/init.vim` contents to your `~/.vimrc` or `~/.config/nvim/init.vim`
2. Install required plugins using your plugin manager
3. Place `.vim/coc-settings.json` in your CoC config directory
4. Restart Vim/Neovim

## Universal Configurations

### EditorConfig (.editorconfig)

Ensures consistent formatting across all editors:
- UTF-8 encoding
- LF line endings
- 2-space indentation for JS/JSON/HTML/CSS
- Final newline insertion
- Trailing whitespace trimming

### Prettier (.prettierrc)

JavaScript/JSON/HTML/CSS formatting:
- 2-space indentation
- Single quotes
- Semicolons required
- 100 character line width
- ES5 trailing commas

### ESLint (.eslintrc.json)

Code quality and consistency:
- ES2022 support
- Node.js and browser environments
- Enforces modern JavaScript practices
- Custom rules for MCP development
- Ignores build artifacts and dependencies

## Development Workflows

### Starting Development

1. **Clone and Setup:**
   ```bash
   git clone <repository>
   cd my-mcp-server
   npm install
   ```

2. **Choose Your IDE:**
   - **VS Code**: Open folder, install extensions, press F5
   - **IntelliJ**: Import project, select run configuration
   - **Vim**: Source configuration, use `<leader>ms`

3. **Access Dashboard:**
   - Open browser to `http://localhost:3001`
   - Use command-grid-themed interface for testing

### Debugging Workflow

1. **Set Breakpoints** in your IDE
2. **Start Debug Session:**
   - VS Code: F5 or Run → Start Debugging
   - IntelliJ: Debug button or Shift+F9
   - Vim: `<leader>db`
3. **Test MCP Tools** via dashboard or Claude integration
4. **Inspect Variables** and step through code

### Code Quality Workflow

1. **Write Code** with IDE assistance
2. **Auto-formatting** on save (Prettier)
3. **Real-time Linting** feedback (ESLint)
4. **Git Integration** for version control
5. **Test Changes** via dashboard

## Troubleshooting

### Common Issues

**Port Already in Use:**
```bash
# Kill existing Node processes
# Windows:
taskkill /F /IM node.exe
# Linux/Mac:
pkill -f node
```

**ESLint/Prettier Not Working:**
1. Ensure extensions are installed
2. Check if `node_modules` exists (run `npm install`)
3. Restart your IDE
4. Check output panel for errors

**Debug Configuration Issues:**
- Verify Node.js is in PATH
- Check that `server.js` exists
- Ensure port 3001 is available
- Review debug console for errors

**VS Code Extension Issues:**
1. Open Command Palette (`Ctrl+Shift+P`)
2. Run "Developer: Reload Window"
3. Check Extensions view for errors
4. Reinstall problematic extensions

### Performance Tips

1. **Exclude Large Folders** from indexing:
   - Add `node_modules/` to IDE exclusions
   - Use `.gitignore` patterns

2. **Optimize File Watching:**
   - Disable watchers for large files
   - Use selective file monitoring

3. **Memory Management:**
   - Increase IDE memory limits if needed
   - Close unused projects/windows

### Getting Help

1. **Check IDE-specific documentation**
2. **Review extension documentation**
3. **Check Node.js and npm versions**
4. **Verify project dependencies**

---

## Quick Reference

### File Structure
```
my-mcp-server/
├── .vscode/           # VS Code configuration
├── .idea/             # IntelliJ configuration  
├── .vim/              # Vim/Neovim configuration
├── server.js          # Main MCP server
├── dashboard.html     # Web dashboard
├── package.json       # Dependencies
├── .editorconfig      # Editor formatting
├── .prettierrc        # Code formatting
├── .eslintrc.json     # Code linting
└── IDE_SETUP.md       # This file
```

### Quick Commands

| Task | VS Code | IntelliJ | Vim |
|------|---------|----------|-----|
| Start Debug | F5 | Shift+F9 | `<leader>db` |
| Run Server | Ctrl+Shift+P → Task | Run Config | `<leader>ms` |
| Open Terminal | Ctrl+` | Alt+F12 | `<leader>t` |
| Format Code | Shift+Alt+F | Ctrl+Alt+L | `:Prettier` |
| Find Files | Ctrl+P | Double Shift | `<leader>ff` |

---

*This documentation is maintained as part of the Enhanced MCP Server project. For updates and issues, please refer to the project repository.*