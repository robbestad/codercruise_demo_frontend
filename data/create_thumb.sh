#!/bin/bash
for f in *.jpg; do
    convert -resize 80x "$f" "thumb/$f"
done

