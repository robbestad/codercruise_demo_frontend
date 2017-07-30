#!/bin/bash
i=13
for f in IMG_*; do
    i=$((i+1))
    fname="0$i.jpg"
    mv "$f" "$fname"
    convert -resize 80x "$fname" "thumb/$fname"
done

