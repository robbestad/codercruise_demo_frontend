#!/bin/bash
cd ../../../data/photos
for f in *; do
    convert -resize 1000x "$f" "../$f"
done
cd src/assets/images

