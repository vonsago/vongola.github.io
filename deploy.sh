#!/system/bin/sh

#================================================================
#   Copyright (C) 2021 Sangfor Ltd. All rights reserved.
#   
#   FileName: deploy.sh
#   Author: Vassago
#   CreateTime: 2021-11-16
#   Description: Shell
#
#================================================================

now = "$(date + "%r")"
hugo -D
git add . && git commit -m "update: $now" && git push
git checkout master

cp -r public/* .
git add . && git commit -m "update: $now"
git push
git checkout pages
