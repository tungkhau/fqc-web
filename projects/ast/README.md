## Use

1. Install **ast** library

```bash
npm i ast-ast
```

2.  Import **init.scss** to the root module of section, project or where you want to use **ast**

```scss
@import "node_modules/ast-ast/src/assets/styles/init.scss";
```

## Interfaces

### Button

### Column

### HeaderRoute

## Components

### Tables

#### Data table

Selector
Options
| Option | Type | Default | Description |
|-------------|------------------------|-------------------------|-------------|
| data | BehaviorSubject<any[]> | new BehaviorSubject([]) | |
| columns | Column[] | [] | |
| button | Button[][] | [] | |
| pageOptions | number[] | [7, 50, 100] | |

Use
[Updating]

#### Infomation table

Options
| Option | Type | Default | Description |
|-------------|------------------------|-------------------------|-------------|
||

### Cards

Use

```html
<ast-card-empty> Your content </ast-card-empty>
```

## Directives

### Buttons

#### Solid button

Options
| Option | Type | Default | Description |
|-----------------|--------|----------|-------------------------|
| backgroundColor | string | color L1 | |
| color | string | white | |
| size | string | md | sm: small<br>md: medium |

Use

```html
<button astButtonSolid (click)="onClick()">Create</button>
```

#### Icon button

Options
| Option | Type | Default | Description |
|-----------------|--------|-------------|-------------|
| backgroundColor | string | transparent | |
| color | string | color theme | |
| size | string | md | md: medium |

Use

```html
<button astButtonIcon (click)="onClick()">
  <i class="fa-solid fa-circle-plus"></i>
</button>
```

### Input

Use

```html
<input astInput id="email" type="text" maxlength="1" formControlName="email" />
```

## Fragments

### Header

Options
| Option | Type | Default | Description |
|----------------|----------------------------------------------------------------|---------|-------------|
| logoPath | string | | |
| brandText | string | | |
| brandTextColor | string | | |
| routes | {<br> id: string,<br> text: string,<br> path: string<br>}[] | [] | |

## Modules

### SharedModule

Include some frequently common module of sections and projects.

### MaterialModule

Include all required Material modules for sections.
