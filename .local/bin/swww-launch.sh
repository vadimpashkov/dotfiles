#!/usr/bin/env sh 

swww kill

swww-daemon &
swww img --transition-type outer --transition-pos 0.854,0.977 --transition-step 90 ~/.local/share/Wallpapers/1.jpg
