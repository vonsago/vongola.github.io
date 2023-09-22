#!/bin/bash

#================================================================
#   Copyright (C) 2021 Sangfor Ltd. All rights reserved.
#   
#   FileName: deploy.sh
#   Author: Vassago
#   CreateTime: 2021-11-16
#   Description: Shell
#
#================================================================

rm -rf public
now="$(date)"
hugo -D
git add . && git commit -m "update:${now}" && git push
git checkout master

rm -r ./* 
git checkout pages public
cp -r public/* .
git add . && git commit -m "update: ${now}"
git push
git checkout pages
