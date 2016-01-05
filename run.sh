#!/bin/bash

xvfb-run -e meow --server-args="-screen 0 1024x768x24" npm start
