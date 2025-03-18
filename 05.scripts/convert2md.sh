#!/bin/bash

for file in ../01.original-rtf/*; do
  echo "Processing file $file"
  pandoc -t markdown --columns 10000 "$file" | tee "./${file%.rtf}.md"
done;

mv ../rtf/*.md ../01-conversion/
