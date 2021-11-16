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
git add . && git commit -m "update: $now"
git checkout master

