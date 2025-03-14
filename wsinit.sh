#!/bin/bash

echo "Starting alacritty"
alacritty --working-directory . &
sleep 0.3
echo "Starting glow"
alacritty --working-directory . -o font.size=16.0 -e glow . &
sleep 0.3
echo "Starting lazygit"
alacritty --working-directory . -e lazygit &
sleep 0.3
echo "Starting yazi"
alacritty --working-directory . -e yazi &
sleep 0.3
echo "Starting nvim"
alacritty --working-directory . -o font.size=15.0 -e nvim &
echo "done"
