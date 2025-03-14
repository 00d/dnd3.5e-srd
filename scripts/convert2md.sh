#!/bin/bash

for file in ../rtf/*; do
  echo "Processing file $file"
  pandoc -t markdown-multiline_tables "$file" | tee "./${file%.rtf}.md"
done;

mv ../rtf/*.md ../md/
