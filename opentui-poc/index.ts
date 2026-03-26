import { createCliRenderer, Box, Text, BoxRenderable, TextRenderable, InputRenderable, RenderableEvents } from "@opentui/core"

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  targetFps: 30,
})

renderer.root.add(
  Box(
    { borderStyle: "rounded", padding: 1, flexDirection: "column", gap: 1 },
    Text({ content: "Welcome", fg: "#FFFF00" }),
    Text({ content: "Press Ctrl+C to exit" }),
  ),
)

const input = Box(
    { borderStyle: "rounded", padding: 1, flexDirection: "column", gap: 1 },
    new InputRenderable(renderer, { id: "username", placeholder: "Enter username...", }),
)

renderer.root.add(input)

// Give focus to the input
input.focus()

// Remove focus
input.blur()

input.on(RenderableEvents.FOCUSED, () => {
  console.log("Input focused")
})

input.on(RenderableEvents.BLURRED, () => {
  console.log("Input blurred")
})

const button = new BoxRenderable(renderer, {
  id: "button",
  border: true,
  onMouseDown: (event) => {
    console.log("Clicked at", event.x, event.y)
  },
  onMouseOver: (event) => {
    button.borderColor = "#FFFF00"
  },
  onMouseOut: (event) => {
    button.borderColor = "#FFFFFF"
  },
})

button.add(Text({ content: "Click me" }))

renderer.root.add(button)