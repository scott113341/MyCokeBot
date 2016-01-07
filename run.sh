#!/bin/bash

mkfontdir /app/.apt/usr/share/fonts/X11/util
xvfb-run -e meow --server-args="-fp /app/.apt/usr/share/fonts/X11 -screen 0 1024x768x24" npm start
