#!/bin/bash

for file in ../rtf/*; do
  echo "Processing file $file"
  pandoc -t markdown --columns 10000 "$file" | tee "./${file%.rtf}.md"
done;

mv ../rtf/*.md ../001-md/
