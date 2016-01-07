#!/bin/bash

curl https://s3.amazonaws.com/heroku-jvm-buildpack-vi/vim-7.3.tar.gz --output vim.tar.gz
mkdir vim && tar xzvf vim.tar.gz -C vim
export PATH=$PATH:/app/vim/bin

xvfb-run -e meow --server-args="-screen 0 1024x768x24" npm start
