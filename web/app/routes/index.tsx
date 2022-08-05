import { Button } from "@mantine/core";
import { useState } from "react";
import { MantineRichTextEditor } from "~/components/MatineRichTextEditor";

export default function Index() {
  const initalValue  = '';
  const [value, onChange] = useState(initalValue);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <MantineRichTextEditor value={value} onChange={onChange} />
        <Button>Click me !</Button>
    </div>
  );
}
