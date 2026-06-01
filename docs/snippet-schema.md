# Snippet Schema

## Purpose

This document defines the JSON format for snippet data used in the game.
The goal is to support:

- fixed snippets with no blanks
- template snippets with one or more generated blanks
- consistent difficulty buckets across all languages

## Difficulty Layout

Each snippet file should store all snippets for one language and partition them
into these five difficulty levels:

- `easy`
- `easy-medium`
- `medium`
- `medium-hard`
- `hard`

Example top-level structure:

```json
{
  "easy": [],
  "easy-medium": [],
  "medium": [],
  "medium-hard": [],
  "hard": []
}
```

## Base Snippet Format

Each entry inside a difficulty array is a snippet object.

Simple snippet with no generated blanks:

```json
{
  "snippet": "let score = 0;"
}
```

Template snippet with generated blanks:

```json
{
  "snippet": ".player { animation: float {{duration}}s infinite; }",
  "blanks": [
    {
      "name": "duration",
      "type": "number",
      "min": 1,
      "max": 100,
      "precision": 1
    }
  ]
}
```

## Fields

### `snippet`

- Type: `string`
- Required: yes
- Contains the text shown to the player
- Template placeholders must use `{{placeholderName}}`

### `blanks`

- Type: `array`
- Required: no
- If omitted, the snippet is treated as a fixed string
- If present, each item describes one placeholder to fill later

## Blank Object Format

Each entry in `blanks` should follow this shape:

```json
{
  "name": "placeholderName",
  "type": "number | color | options | identifier | string | keyword",
  "min": 1,
  "max": 100,
  "precision": 1,
  "values": ["left", "center", "right"]
}
```

Not every field is required for every blank type.

### `name`

- Type: `string`
- Required: yes
- Must match a placeholder in `snippet`
- Example: `{{duration}}` maps to `"name": "duration"`

### `type`

- Type: `string`
- Required: yes
- Describes how the blank should be generated

### `min`

- Type: `number`
- Required: only for numeric blanks
- Lowest allowed value

### `max`

- Type: `number`
- Required: only for numeric blanks
- Highest allowed value

### `precision`

- Type: `number`
- Required: optional for numeric blanks
- Controls rounding or decimal precision

### `values`

- Type: `array`
- Required: only for option-based blanks
- Contains the allowed values for the blank

## Supported Blank Types

Initial recommended blank types:

- `number`
- `color`
- `text-align`
- `identifier`
- `string`
- `boolean`
- `keyword`
- `options`
- `html-tag`
- `css-property`
- `css-value`

The implementation can expand this list over time.

## Rules

- Use `{{name}}` placeholders instead of `_`
- Always use a `blanks` array when a snippet has generated values
- Keep placeholders and blank definitions in the same order when possible
- A snippet may have zero, one, or many blanks
- Fixed snippets and templated snippets may coexist in the same difficulty bucket

## Examples

### JavaScript

```json
{
  "snippet": "let score = {{value}};",
  "blanks": [
    {
      "name": "value",
      "type": "number",
      "min": 0,
      "max": 100,
      "precision": 1
    }
  ]
}
```

```json
{
  "snippet": "if ({{condition}}) { endGame(); }",
  "blanks": [
    {
      "name": "condition",
      "type": "identifier"
    }
  ]
}
```

### HTML

```json
{
  "snippet": "<{{tagName}} class=\"{{className}}\">Start</{{tagName}}>",
  "blanks": [
    {
      "name": "tagName",
      "type": "html-tag"
    },
    {
      "name": "className",
      "type": "identifier"
    }
  ]
}
```

```json
{
  "snippet": "<input type=\"{{inputType}}\" placeholder=\"{{label}}\">",
  "blanks": [
    {
      "name": "inputType",
      "type": "options",
      "values": ["text", "email", "password"]
    },
    {
      "name": "label",
      "type": "string"
    }
  ]
}
```

### CSS

```json
{
  "snippet": ".player { animation: float {{duration}}s infinite; }",
  "blanks": [
    {
      "name": "duration",
      "type": "number",
      "min": 1,
      "max": 100,
      "precision": 1
    }
  ]
}
```

```json
{
  "snippet": ".game-over { color: {{colorValue}}; text-align: {{alignValue}}; }",
  "blanks": [
    {
      "name": "colorValue",
      "type": "color"
    },
    {
      "name": "alignValue",
      "type": "options",
      "values": ["left", "center", "right", "justify"]
    }
  ]
}
```

## Notes For Future Implementation

- The runtime can treat snippets without `blanks` as already complete
- The runtime can fill placeholders by matching `name` values
- Validation can be added later with a JSON Schema file if needed
